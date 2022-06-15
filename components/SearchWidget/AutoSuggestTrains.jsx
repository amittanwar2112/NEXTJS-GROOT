import {Component, createRef, Fragment, useContext} from 'react';
import AutoSuggest from './AutoSuggest';
import { FROM, TO, PLACEHOLDER_SOURCE, PLACEHOLDER_DESTINATION, POPULAR_STATIONS_SUGGEST } from '@helpers/constants';
import { callAvailability } from '@helpers/utils';
import { knowMyTrain } from '@helpers/api/homeApi';
import Fuse from 'fuse.js';
import { pushTapEvent } from '@helpers/gaEvents';
import styles from '../../styles/Home.module.css'

let fuseInstance = null;
const options = {
	shouldSort: true,
	threshold: 0.3,
	location: 0,
	distance: 100,
	maxPatternLength: 32,
	minMatchCharLength: 1,
	keys: ['TrainText', 'number', 'name']
};

class AutoSuggestTrains extends Component {

	constructor(props) {
		super(props);
		this.autoSuggestRef = createRef();
		this.state = {
			suggestions: [],
			isApiLoaded: true
		};
		this.selectText= true;
		this.searchVal = '';
		this.label = 'I know my train (optional)';
		this.placeHolder = 'Choose your train';
		this.onNewSearchQuery = this.onNewSearchQuery.bind(this);
		this.listItemMarkup = this.listItemMarkup.bind(this);
		this.suggestionClicked = this.suggestionClicked.bind(this);
    this.outSideClick = this.outSideClick.bind(this);
		this.handleLocalStorageCache = this.handleLocalStorageCache.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleInputFocus = this.handleInputFocus.bind(this);
		this.getTrainsList = this.getTrainsList.bind(this);
		this.closeClicked = this.closeClicked.bind(this);
	}

  componentDidMount() {
		this.handleLocalStorageCache();
	}

	handleLocalStorageCache() {
		const prevSearchCache = JSON.parse(localStorage.getItem('recentTrainSearches')) || [];
		if (!prevSearchCache[0]) {
      return null;
    }
		const { train } = prevSearchCache[0];
		const { TrainText = '' } = train;
		if(TrainText){
			this.autoSuggestRef.current.autosuggestInputRef.current.updateInputBox(TrainText);
			this.props.dispatchToStore({train});
		}
  }

	onNewSearchQuery(val) {
		const {suggestions} = this.state;
		if (!val || (suggestions.length !== 0 && this.searchVal === val)) {
			if(!val) { this.props.dispatchToStore({train:{}}); }
			return null;
		}
		if(fuseInstance) {
			const list = fuseInstance.search(val);
			let results = [];
			if(list.length) {
				this.setState({suggestions: list});
			} else {
				this.setState({suggestions: []});
			}
			this.searchVal = val;
	}
}

	handleKeyUp(e) {
		if (e.target.value.length === 0) {
			this.handleInputFocus(e);
			// this.props.dispatchToStore({
			// 	train: {},
			// 	availability: []
			// });
			// this.props.resetErrorMessage('invalidTrain');
		}
	}

	// List item Markup Renderer
  listItemMarkup(suggestion) {
    let boldTxt = '';
		let txt = suggestion.TrainText;
		const typedTxt = this.searchVal.toLowerCase().trim();
		if (suggestion && suggestion.TrainText && suggestion.TrainText.toLowerCase().startsWith(typedTxt)) {
			boldTxt = suggestion.TrainText.slice(0, typedTxt.length);
			txt = suggestion.TrainText.slice(typedTxt.length);
		}
		const $stationName = (
			<span>
				<span className="fb">{boldTxt}</span>
				{txt}
			</span>
		);
		return (
			<Fragment>
				<span className="padR15"><i  className={`${styles.icontrainsnew}  ico20 grey75`} ></i></span>
				<div title={suggestion.dn}>
					<p className="ico16 black padB5">{$stationName}</p>
					<p className="grey50 ico12 lh12">{suggestion.source} - {suggestion.destination}</p>
				</div>
			</Fragment>
		);
		// let boldTxt = '';
		// let txt = suggestion.TrainText;
		// const typedTxt = this.searchVal.toLowerCase().trim();
		// if (suggestion && suggestion.TrainText && suggestion.TrainText.toLowerCase().startsWith(typedTxt)) {
		// 	boldTxt = suggestion.TrainText.slice(0, typedTxt.length);
		// 	txt = suggestion.TrainText.slice(typedTxt.length);
		// }
		// const $stationName = (
		// 	<span>
		// 		<span class="fb">{boldTxt}</span>
		// 		{txt}
		// 	</span>
		// );
		// return (
		// 	<Fragment>
		// 		<span className="ico14">{$stationName}</span>
		// 	</Fragment>
		// );
	}

  suggestionClicked(event, suggestion, index) {
		this.autoSuggestRef.current.autosuggestInputRef.current.updateInputBox(`${suggestion.TrainText}`);
		this.setState({
			suggestions: [],
			value: '',
			isApiLoaded: true
		});
		this.selectText = false;
		const { storeState = {} } = this.props;
		const { source, destination, date } = storeState;
		const {irctc_code: src} = source;
		const {irctc_code: dest} = destination;
		const trainNumber = suggestion.number;
		const month = Number(date.slice(4,6));
		callAvailability({src, dest, trainNumber, month})
		.then(availability => {
			this.props.dispatchToStore({
				availability: availability
			});
		})
		const classTypeToBeUpdated = (suggestion.classes&&suggestion.classes.length) ? suggestion.classes[0] : 'SL';
		this.props.dispatchToStore({
			train: suggestion,
			classType: classTypeToBeUpdated,
			showCalendar: true
		});
		this.props.resetErrorMessage('invalidTrain');
		pushTapEvent(`trainNewDHome_chooseTrain`);
		pushTapEvent(`trainNewDHome_openAvlCalendar`);
  }

	outSideClick() {
		this.setState({
			suggestions: [],
			isApiLoaded: true
		});
	}

	getTrainsList() {
		const { storeState = {} } = this.props;
		const { source, destination, trainsList } = storeState;
		const { irctc_code: src } = source;
		const { irctc_code: dest } = destination;
		if(trainsList && trainsList.src === src && trainsList.dest === dest) {
			this.setState({
				suggestions: trainsList.results,
				isApiLoaded: true
			});
		} else if(src && dest) {
			knowMyTrain(src, dest)
			.then(resp => {
				let results = [];
				const res = resp.response && resp.response.results;
				if(res.length) {
					res.forEach(suggestion => {
						results.push(suggestion.train);
					});
					fuseInstance = new Fuse(results, options);
					// results = results.slice(0,10);
					this.props.dispatchToStore({
						trainsList: {
							src, dest, results
						}
					});
					this.setState({
						suggestions: results,
						isApiLoaded: true
					});
				}
			})
			.catch(err => {
				fuseInstance = null
			});
		} else {
			fuseInstance = null;
		}
	}

	handleInputFocus(e) {
		if (e.target.value.length === 0) {
			this.getTrainsList();
			this.props.resetErrorMessage('invalidTrain');
			this.props.dispatchToStore({
				train: {},
				availability: []
			});
		} else {
			e.target.setSelectionRange(0, e.target.value.length);
			if(!this.selectText) {
				this.autoSuggestRef.current.autosuggestInputRef.inputRef.current.blur();
				this.selectText = true;
			}
		}
	}

	closeClicked() {
		this.autoSuggestRef.current.autosuggestInputRef.current.updateInputBox('');
		this.props.dispatchToStore({
			train: {},
			availability: []
		});
		this.props.resetErrorMessage('invalidTrain');
		pushTapEvent(`trainNewDHome_TrainDialogOpenEvent`);
		this.setState({
			isApiLoaded: false,
		});
		this.getTrainsList();
	}

  render() {
    const { suggestions, showRecentsAndPopular } = this.state;
		const {inputProps, isInvalid, setInputId = '', value = '', labelClassName = '', autoSuggestClassName = '', clickOnDisableStateHandler = () => {}, disabled = false, inputStyle = ''} = this.props;
		const className = 'widgetInput width100' + (isInvalid ? 'errorMsg' : '');
    return (
			<label className={labelClassName}>
        <p className="grey50 ico16 padB5">{this.label}</p>
        <AutoSuggest autoSuggestClassName={autoSuggestClassName} ref={this.autoSuggestRef} callback={this.onNewSearchQuery}
          suggestions={suggestions} listItemMarkup={this.listItemMarkup} handleInputFocus={this.handleInputFocus}
          suggestionClicked={this.suggestionClicked} placeholder={this.placeHolder}
          maxItems={10} delay={200} outSideClick={this.outSideClick} handleKeyUp={this.handleKeyUp}
          showRecentsAndPopular={showRecentsAndPopular} closeClicked={this.closeClicked} setInputId={setInputId} trains={true} handleDisableState={disabled} clickOnDisableStateHandler={clickOnDisableStateHandler} inputStyle={inputStyle} />
				</label>
    );
  }
}

export default AutoSuggestTrains;


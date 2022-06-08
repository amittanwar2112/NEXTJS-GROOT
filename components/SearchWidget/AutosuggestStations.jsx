import {Component, Fragment, createRef} from 'react';
import AutoSuggest from './AutoSuggest';
import { PLACEHOLDER_SOURCE, PLACEHOLDER_DESTINATION, POPULAR_STATIONS_SUGGEST } from '@helpers/constants';
import {findRecentlySearchedUniqueStations} from '@helpers/utils';
import { pushTapEvent } from '@helpers/gaEvents';
import { AutoSuggestApi } from '@helpers/api';


class AutoSuggestStations extends Component {

	constructor(props) {
		super(props);
		this.autoSuggestRef = createRef();
		this.state = {
			suggestions: []
		};
		this.selectText= true;
		this.searchVal = '';
		this.label = props.isSrc ? 'From' : 'To';
		this.val = props.isSrc ? 'source' : 'destination';
		this.placeHolder = props.isSrc ? PLACEHOLDER_SOURCE : PLACEHOLDER_DESTINATION;
		this.onNewSearchQuery = this.onNewSearchQuery.bind(this);
		this.listItemMarkup = this.listItemMarkup.bind(this);
		this.suggestionClicked = this.suggestionClicked.bind(this);
		this.outSideClick = this.outSideClick.bind(this);
		this.handleLocalStorageCache = this.handleLocalStorageCache.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleInputFocus = this.handleInputFocus.bind(this);
		this.getRecentAndPopularList = this.getRecentAndPopularList.bind(this);
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
		const { destination, source } = prevSearchCache[0];
		if (this.props.isSrc) {
			this.autoSuggestRef.current.autosuggestInputRef.current.updateInputBox(source.irctc_code  + ', ' + source.dn);
			this.props.dispatchToStore({
				source
			});
		} else {
			this.autoSuggestRef.current.autosuggestInputRef.current.updateInputBox(destination.irctc_code  + ', ' + destination.dn);
			this.props.dispatchToStore({
				destination
			});
		}
	}

	onNewSearchQuery(val) {
		let suggestionsArr = [];
		const {suggestions} = this.state;
		 if (!val || (suggestions.length !== 0 && this.searchVal === val)) {
			if(!val) { this.props.dispatchToStore({[this.val]: {}, train:{}}); }
			return null;
		}
		fetch(AutoSuggestApi(val)).then((resp) => {
			return resp.json();
		}).then((resp) => {
			resp.data.r.map((data,i)=>{
				if( data.xtr && data.xtr.grp_irctc && data.xtr.grp_irctc.length>0){
					suggestionsArr.push(data.xtr.grp_irctc);
				}
				else {
					suggestionsArr.push(data);
				}
				})
				this.setState({suggestions: suggestionsArr.flat().slice(0,10) || [] });
			})
		this.searchVal = val;
	}

	handleKeyUp(e) {
		if (e.target.value.length === 0) {
			this.handleInputFocus(e);
	 }
	}

	// List item Markup Renderer
	listItemMarkup(suggestion) {
		let boldTxt = '';
			const {cn = ''} = suggestion.xtr || {};
			let txt = suggestion.dn;
			const typedTxt = this.searchVal.toLowerCase().trim();
			if (suggestion && suggestion.dn && suggestion.dn.toLowerCase().startsWith(typedTxt)) {
				boldTxt = suggestion.dn.slice(0, typedTxt.length);
				txt = suggestion.dn.slice(typedTxt.length);
			}
			const $stationName = (
				<span>
					<span className="fb black">{boldTxt}</span>
					{txt}
				</span>
			);
			return (
				<Fragment>
					<span className="padR15"><i className="icon-trains-new ico20 grey75"></i></span>
					<div>
						<p className="ico16 black padB5">{cn}</p>
						<p className="grey50 ico12">{suggestion.irctc_code} - {$stationName}</p>
					</div>
				</Fragment>
		);
	}

	suggestionClicked(event, suggestion, index) {
		this.props.dispatchToStore({
			[this.val]: suggestion,
			train: {}
		});
		const msg = this.props.isSrc ? 'invalidSrc' : 'invalidDest';
		this.props.resetErrorMessage(msg);
		this.autoSuggestRef.current.autosuggestInputRef.current.updateInputBox(`${suggestion.irctc_code} , ${suggestion.dn}`);
		this.setState({
			suggestions: [],
		});
		this.selectText = false;
		pushTapEvent(`trainNewHome_chooseTrain${this.val}`);
	}

	outSideClick() {
		this.setState({
			suggestions: []
		});
		//TODO: handle input removal
		// const inputVal = this.autoSuggestRef.current.autosuggestInputRef.current.getValue();
		// if(!inputVal)
		// 	this.props.dispatchToStore({train:{}});
	}

	getRecentAndPopularList() {
		const prevSearchCache = JSON.parse(localStorage.getItem('recentTrainSearches')) || [];
		let recentAndPopularList = [];
		if (prevSearchCache.length > 0) {
			recentAndPopularList.push({ isHeading: true, content: 'Recent Searches'});
			recentAndPopularList = recentAndPopularList.concat(findRecentlySearchedUniqueStations(prevSearchCache));
		}
		recentAndPopularList.push({ isHeading: true, content: 'Popular Searches / Stations'});
		recentAndPopularList = recentAndPopularList.concat(POPULAR_STATIONS_SUGGEST);
		return recentAndPopularList;
	}

	handleInputFocus(e) {
		if (e.target.value.length === 0) {
			if(!this.state.suggestions.length) {
				pushTapEvent(`trainNewDHome_${this.val}DialogOpenEvent`);
			}
			this.setState({
				suggestions: this.getRecentAndPopularList()
			});
		} else {
			e.target.setSelectionRange(0, e.target.value.length);
			if(!this.selectText) {
				this.autoSuggestRef.current.autosuggestInputRef.current.inputRef.current.blur();
				this.selectText = true;
			}
		}
	}

	closeClicked() {
		this.autoSuggestRef.current.autosuggestInputRef.current.updateInputBox('');
		this.props.dispatchToStore({[this.val]: {}, train:{}});
		this.props.trainRef.current.autoSuggestRef.current.autosuggestInputRef.current.updateInputBox('');
		const msg = this.props.isSrc ? 'invalidSrc' : 'invalidDest';
		this.props.resetErrorMessage(msg);
		pushTapEvent(`trainNewHome_${this.val}DialogOpenEvent`);
		this.setState({
			suggestions: this.getRecentAndPopularList()
		});
	}

	render() {
		const { suggestions, showRecentsAndPopular} = this.state;
			const {inputProps, isInvalid, isSrc, setInputId = '', value = '', labelClassName = '', autoSuggestClassName = '', inputStyle = ''} = this.props;
			// const className = 'widgetInput width100' + (isInvalid ? 'errorMsg' : '');
	    return (
				<label className={labelClassName}>
          <p className="grey50 ico16 padB5">{this.label}</p>
          <AutoSuggest autoSuggestClassName={autoSuggestClassName} ref={this.autoSuggestRef} callback={this.onNewSearchQuery}
            suggestions={suggestions} listItemMarkup={this.listItemMarkup} handleInputFocus={this.handleInputFocus}
            suggestionClicked={this.suggestionClicked} placeholder={this.placeHolder}
            maxItems={10} delay={300} outSideClick={this.outSideClick} handleKeyUp={this.handleKeyUp}
            showRecentsAndPopular={showRecentsAndPopular} closeClicked={this.closeClicked} setInputId={setInputId} inputStyle={inputStyle} />
				</label>
	    );
	}
}

export default AutoSuggestStations;


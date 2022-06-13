import { useContext, useRef, useEffect, useState } from 'react';
import AutoSuggestStations from './AutosuggestStations';
import AutoSuggestTrains from './AutoSuggestTrains';
import Calendar from './Calendar/Calendar';
import { ERR_MSG_START, ERR_MSG_SRC, ERR_MSG_DES, ERR_MSG_DATE, ERR_MSG_CONNECTOR } from '@helpers/constants';
// import AutoSuggestTrains from './Autosuggest/AutosuggestTrains';
import { SearchContext } from '@contexts/SearchContext';
import { logEvent } from '@helpers/gaEvents';

const SearchWidget = (props) => {
	const { storeState, dispatch } = useContext(SearchContext);
	const { source, destination, errorMsg, date, train, invalidSrc, invalidDes, invalidDate, showCalendar, sameStation, hasRouteChanged = false } = storeState;

	const { initiateSearch } = props;
	const [disabledState, setDisabledState] = useState(true);

	const srcRef = useRef(null);
	const destRef = useRef(null);
	const trainRef = useRef(null);
	const calRef = useRef(null);

	const dispatchToStore = (data) => {
    dispatch({
      type: 'UPDATE_STORE',
      data
    });
	};

	useEffect(() => {
		if(Object.keys(source).length && Object.keys(destination).length) {
			setDisabledState(false);
		} else {
			setDisabledState(true);
		}
	}, [source, destination]);

	const resetErrorMessage = (typeOfErr) => {
		if (typeOfErr && storeState[typeOfErr]) {
			dispatchToStore({
				[typeOfErr]: false,
				errorMsg: ''
			});
		} else if (errorMsg) {
			dispatchToStore({
				errorMsg: ''
			});
		}
	}

	const updateSearchToLocalStorage = (searchItem) => {
		let recentTrainSearches = JSON.parse(localStorage.getItem('recentTrainSearches')) || [];
		const { source = {}, destination = {}, date, train = {} } = searchItem;
		const trainsList = recentTrainSearches.filter((item) => {
			return (item.date !== date || item.source.irctc_code !== source.irctc_code || item.destination.irctc_code !== destination.irctc_code);
		});
		trainsList.unshift(searchItem);
		localStorage.setItem('recentTrainSearches', JSON.stringify(trainsList.slice(0, 5)));
	}

	const beginSearch = () => {
		const hasNoError = validateEntries();
		if (hasNoError) {
			let  [emptyString1, trainsText, srpText, oldSrc, oldDest, oldDate, quota,emptyString2]  = window.location.pathname.split('/');
			logEvent({
				event: 'trainNewDHome_searchClicked',
				eventAction: `${source.irctc_code}-${destination.irctc_code}`,
				eventLabel: `${date}`
			})
			const trackSource = 'dwebHome';
			const trainNo = Object.keys(train).length ? train.number : '';
			updateSearchToLocalStorage({ source, destination, date, train });
			// initiateSearch({source: source.irctc_code, destination: destination.irctc_code, doj: date, selectedTrain: Object.keys(train).length ? train.number : '', trackSource, shouldScroll: false});
			window.location.href = `/trains/dsrp/${source.irctc_code}/${destination.irctc_code}/${date}/GN/?track=${trackSource}&selected_train=${trainNo}`;

			dispatchToStore({
				train: {},
				availability: [],
				hasRouteChanged: false
			})
		}
	}

	const validateEntries = () => {
		const errorStates = {};
		const errorMsgArr = [];
		if (!source || !source.irctc_code) {
			errorStates.invalidSrc = true;
			errorMsgArr.push(ERR_MSG_SRC);
		}
		if (!destination || !destination.irctc_code) {
			errorStates.invalidDes = true;
			errorMsgArr.push(ERR_MSG_DES);
		}
		if (!date) {
			errorStates.invalidDate = true;
			errorMsgArr.push(ERR_MSG_DATE);
		}
		if (Object.keys(train).length && !train.number) {
			errorStates.invalidTrain = true;
			errorMsgArr.push('valid train');
		}
		if(Object.keys(source).length && Object.keys(destination).length && source.irctc_code === destination.irctc_code) {
			errorStates.sameStation = true;
			errorMsgArr.push('Source and destination stations can not be same.');
		}
		if (Object.keys(errorStates).length !== 0) {
			const { invalidDate, invalidDes, invalidSrc, invalidTrain, sameStation} = errorStates
			const errorMsg = ERR_MSG_START + errorMsgArr.join(ERR_MSG_CONNECTOR);
			dispatchToStore({ invalidSrc, invalidDes, invalidDate, errorMsg, invalidTrain, sameStation });
		}
		return (Object.keys(errorStates).length === 0);
	}

	const swapStations = () => {
		let x = source;
		dispatchToStore({
			source: destination,
			destination: x,
			train: {}
		});
		let srcValue = Object.keys(source).length ? `${source.irctc_code}, ${source.dn}` : '' ;
		let destValue = Object.keys(destination).length ? `${destination.irctc_code}, ${destination.dn}` : '' ;
		srcRef.current.autoSuggestRef.current.autosuggestInputRef.current.updateInputBox(destValue);
		destRef.current.autoSuggestRef.current.autosuggestInputRef.current.updateInputBox(srcValue);
		trainRef.current.autoSuggestRef.current.autosuggestInputRef.current.updateInputBox('');
  }

	return (
		<section className="homeSearchWidget">
			<aside className="widgetRow borderBottom0">
        <AutoSuggestStations ref={srcRef} trainRef={trainRef} dispatchToStore={dispatchToStore} resetErrorMessage={resetErrorMessage} labelClassName="width45 posRel borderBottomGrey" autoSuggestClassName="textInput width100 ellipsis" isSrc inputStyle="margin-left:4px"/>
        <span onClick={swapStations}><i className="icon-swap3 goBlue ico30"></i></span>
        <AutoSuggestStations ref={destRef}  trainRef={trainRef} dispatchToStore={dispatchToStore} resetErrorMessage={resetErrorMessage} labelClassName="width45 txtRight toDestination borderBottomGrey" autoSuggestClassName="textInput width100 txtRight ellipsis" inputStyle="margin-left:1px"/>
      </aside>
			<aside className="padT15 widgetRow">
				<AutoSuggestTrains storeState={storeState} disabled={disabledState} clickOnDisableStateHandler={validateEntries} ref={trainRef} dispatchToStore={dispatchToStore} resetErrorMessage={resetErrorMessage} labelClassName="width100" autoSuggestClassName="textInput width100" inputStyle="margin-left:4px"/>
			</aside>
			<aside className="padT15 widgetRow">
				<Calendar resetErrorMessage={resetErrorMessage} />
			</aside>
			<aside className="searchButtonWrap" onClick={beginSearch}>
				<button className="searchBtn curPointer">Search Trains</button>
			</aside>
			{
				errorMsg ?
				<div className="red ico11 padT15 dib" style={{textAlign: 'center'}}>{errorMsg}</div>:
				null
			}
		</section>
	);
}
export default SearchWidget;

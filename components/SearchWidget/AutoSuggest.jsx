import {Component, createRef, Fragment} from 'react';
import OutsideAlerter from '@components/Home/useOutsideAlerter';
import AutoSuggestInput from './AutosuggestInput';

class AutoSuggest extends Component {
    constructor(props) {
      super(props);
      const { val = '' } = props;
      this.state = {
        selectedIndex: -1,
        inputFieldValue: val || ''
      };
      this.timer = null;
      this.autosuggestInputRef = createRef();
      // this.updateInputBox = this.updateInputBox.bind(this);
      this.onKeyup = this.onKeyup.bind(this);
      this.debouncer = this.debouncer.bind(this);
      this.renderAutosuggest = this.renderAutosuggest.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }

    // updateInputBox(val) {
    //   this.setState({
    //     inputFieldValue: val
    //   });
    // }

    debouncer() {
      const {delay} = this.props;
      const {inputFieldValue} = this.state;
      if (delay) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.props.callback(inputFieldValue);
        }, Number(delay) || 0);
      } else {
        this.props.callback(inputFieldValue);
      }
    }

    onKeyup(e) {
      if (e.keyCode === 38) {   // Up Arrow
        this.setState({
          selectedIndex: this.state.selectedIndex - 1
        });
      } else if (e.keyCode === 40) {  // Down Arrow
        this.setState({
          selectedIndex: this.state.selectedIndex + 1
        });
      } else if (e.keyCode === 13) {  // Enter
        const {suggestions} = this.props;
        const {selectedIndex} = this.state;
        this.props.suggestionClicked(null, suggestions[selectedIndex], selectedIndex);
      } else {
        this.setState({
          inputFieldValue: e.target.value
        }, () => {
          this.debouncer();
        });
      }
      if (this.props.handleKeyUp) {
        this.props.handleKeyUp(e);
      }
    }

   componentDidUpdate(prevProps, prevState) {
     const {val = ''} = this.props;
     const {inputFieldValue = ''} = this.state;
    //  if(val && inputFieldValue !== val){
    //    this.setState({inputFieldValue: val});
    //  }
   }

  handleClick() {
    const { handleDisableState = false, clickOnDisableStateHandler = () => {} } = this.props;
    if(handleDisableState) {
        clickOnDisableStateHandler();
        return;
      }
  }

   renderAutosuggest(suggestions) {
    const {listItemMarkup, suggestionClicked, trains = false} = this.props;
    const className = trains ? 'trainsSuggestionBox' : '';
    return (
      <div className={"searchWidgetDropdown  "+ className} id="autosuggest">
        <ul className="dropdownList">{
          suggestions.map((suggestion, index) => {
            const {isHeading = false} = suggestion;
            if (isHeading) {
              return (<p className="grey75 ico14 padB10 padLR20" key={index}>{suggestion.content}</p>)
            } else {
              return (<li key={index} onClick={(e) => {suggestionClicked(e, suggestion, index)}}>
                {listItemMarkup(suggestion)}
              </li>)
            }
          })
        }
        </ul>
    </div>);
   }
    render() {
      const { selectedIndex, inputFieldValue } = this.state;
      const { suggestionClicked, listItemMarkup, value, placeholder, className, maxItems, handleInputFocus, setInputId = '', val = '', popUp = false, heading = '', autoSuggestClassName = '', handleDisableState = false, callback = () => {}, handleKeyUp = () => {}, delay = 0, inputStyle = '' } = this.props;
      let { suggestions = [] } = this.props;
      if (maxItems) {
        suggestions.slice(0, maxItems);
      }
      const comp = (
        <div className="flex row" onClick={this.handleClick}>
          <span><i className="icon-search ico15 greyDr"></i></span>
          <AutoSuggestInput ref={this.autosuggestInputRef} suggestionClicked={suggestionClicked} placeholder={placeholder} handleInputFocus={handleInputFocus} autoSuggestClassName={autoSuggestClassName} handleDisableState={handleDisableState} handleKeyUp={handleKeyUp} delay={delay} callback={callback}/>
          {/* <input type="text" ref={this.inputRef} onFocus={handleInputFocus} className={autoSuggestClassName} value={inputFieldValue} onKeyUp={this.onKeyup} placeholder={placeholder} autocomplete="new-password" role="combobox" disabled={handleDisableState}/> */}
          {suggestions.length > 0 ? this.renderAutosuggest(suggestions) : null }
        </div>
      );
      return <OutsideAlerter cb={this.props.outSideClick} inlineStyle={inputStyle}>{comp}</OutsideAlerter>;
    }
  }

export default AutoSuggest;

import {Component, createRef, Fragment} from 'react';
// import OutsideAlerter from '../../Home/useOutsideAlerter';

class AutoSuggestInput extends Component {
    constructor(props) {
      super(props);
      const { val = '' } = props;
      this.state = {
        inputFieldValue: val || ''
      };
      this.forceRender = false;
      this.timer = null;
      this.inputRef = createRef();
      this.updateInputBox = this.updateInputBox.bind(this);
      this.onKeyup = this.onKeyup.bind(this);
      this.debouncer = this.debouncer.bind(this);
      this.getValue = this.getValue.bind(this);
      this.value = val;
      // this.handleClick = this.handleClick.bind(this);
    }

    updateInputBox(val) {
      this.forceRender = true;
      this.setState({
        inputFieldValue: val
      });
    }

    getValue () {
      return this.value;
    }

    shouldComponentUpdate(nextProps) {
      const { handleDisableState: prevDisable = false } = this.props;
      const { handleDisableState: nextDisable = false } = nextProps;
      const disableStateChange = prevDisable !== nextDisable;
      if(this.forceRender || disableStateChange){
        this.forceRender = false;
        return true;
      }
      return false;
    }

    componentDidMount(){
      if(this.forceRender) this.forceRender = false;
    }

    debouncer(eventVal) {
      const {delay} = this.props;
      const {inputFieldValue} = this.state;
      if (delay) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.props.callback(eventVal);
        }, Number(delay) || 0);
      } else {
        this.props.callback(eventVal);
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
        const eventVal = e.target.value;
        this.value = eventVal;
        this.debouncer(eventVal);
        // this.setState({
        //   inputFieldValue: e.target.value
        // }, () => {
        //   this.debouncer(eventVal);
        // });
      }
      if (this.props.handleKeyUp) {
        this.props.handleKeyUp(e);
      }
    }

  //  componentDidUpdate(prevProps, prevState) {
  //    const {val = ''} = this.props;
  //    const {inputFieldValue = ''} = this.state;
  //   //  if(val && inputFieldValue !== val){
  //   //    this.setState({inputFieldValue: val});
  //   //  }
  //  }

  // handleClick() {
  //   const { handleDisableState = false, clickOnDisableStateHandler = () => {} } = this.props;
  //   if(handleDisableState) {
  //       clickOnDisableStateHandler();
  //       return;
  //     }
  // }

    render() {
      const { inputFieldValue } = this.state;
      const { placeholder, handleInputFocus, autoSuggestClassName = '', handleDisableState = false } = this.props;
      return (
        <input type="text" ref={this.inputRef} onFocus={handleInputFocus} className={autoSuggestClassName} defaultValue={inputFieldValue} onKeyUp={this.onKeyup} placeholder={placeholder} autoComplete="new-password" role="combobox" aria-expanded="false" aria-controls="" disabled={handleDisableState}/>
      );
    }
  }

export default AutoSuggestInput;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon';
import { iconCloseSolid } from 'carbon-icons';
import { TextInputComponent } from '../TextInput';
import { settings } from 'carbon-components';

const { prefix } = settings;

/**
 * Text input field with a search-like clear button
 */
class SearchTextInput extends TextInputComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasContent: this.props.value || this.props.defaultValue || false,
      prevValue: this.props.value,
    };
    this.onChange = this.handleChange.bind(this);
    this.clearInput = this.handleClearInput.bind(this);
  }

  static getDerivedStateFromProps({ value }, state) {
    const { prevValue } = state;
    return prevValue === value
      ? null
      : {
        hasContent: !!value,
        prevValue: value,
      };
  }

  getInputFieldProps() {
    /* eslint-disable no-unused-vars */
    const {
      closeButtonLabelText,
      ...other
    } = super.getInputFieldProps();
    return other;
  }

  getTextInputProps() {
    const {
      onChange, // eslint-disable-line no-unused-vars
      ...other
    } = super.getTextInputProps();
    const {
      disabled,
    } = this.props;

    return {
      ...other,
      onChange: evt => {
        if (!disabled) {
          this.onChange(evt);
        }
      },
    };
  }

  getClearClasses() {
    const { hasContent } = this.state;

    return classNames(`${prefix}--search-close`, {
      [`${prefix}--search-close--hidden`]: !hasContent,
    });
  }

  getClearButton() {
    const {
      closeButtonLabelText,
    } = this.props;
    const clearClasses = this.getClearClasses();

    return <button
      className={clearClasses}
      onClick={this.clearInput}
      type="button"
      aria-label={closeButtonLabelText}>
      <Icon icon={iconCloseSolid} description={closeButtonLabelText} />
    </button>;
  }

  handleClearInput(evt) {
    if (!this.props.value) {
      this.input.current.value = '';
      this.props.onChange(evt);
    } else {
      const clearedEvt = Object.assign({}, evt.target, {
        target: {
          value: '',
        },
      });
      this.props.onChange(clearedEvt);
    }

    this.setState({ hasContent: false }, () => this.input.current.focus());
  }

  handleChange(evt) {
    this.setState({
      hasContent: evt.target.value !== '',
    });

    this.props.onChange(evt);
  }

  render() {
    const label = this.getLabel();
    const input = this.getInput();
    const button = this.getClearButton();

    this.input = this.props.forwardRef;

    return (
      <div className={`${prefix}--form-item`}>
        {label}
        <div className={`${prefix}--search`} role="search">
          {input}
          {button}
        </div>
      </div>
    );
  }
}

SearchTextInput.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  labelText: PropTypes.node.isRequired,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hideLabel: PropTypes.bool,
  /**
   * `true` to use the light version.
   */
  light: PropTypes.bool,
};

SearchTextInput.defaultProps = {
  className: 'bx--text__input',
  disabled: false,
  type: 'text',
  onChange: () => {},
  onClick: () => {},
  light: false,
};

SearchTextInput.displayName = 'SearchTextInput';

export const SearchTextInputComponent = SearchTextInput;

const forwardRef = (props, ref) => (
  <SearchTextInput {...props} forwardRef={ref || React.createRef()} />
);

forwardRef.displayName = SearchTextInput.displayName;

export default React.forwardRef(forwardRef);

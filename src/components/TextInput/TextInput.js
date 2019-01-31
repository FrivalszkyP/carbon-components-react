/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

class TextInput extends React.Component {
  getInput() {
    const other = this.getInputFieldProps();
    const textInputProps = this.getTextInputProps();
    const errorProps = this.getErrorProps();

    return <input
      {...other}
      {...textInputProps}
      {...errorProps}
    />;
  }

  getInputFieldProps() {
    /* eslint-disable no-unused-vars */
    const {
      className,
      id,
      light,
      onClick,
      placeholder,
      type,
      forwardRef,
      onChange,
      hideLabel,
      invalid,
      labelText,
      invalidText,
      helperText,
      ...other
    } = this.props;
    return other;
  }

  getTextInputProps() {
    const {
      className = `${prefix}--text__input`,
      disabled,
      id,
      light,
      onClick,
      onChange,
      placeholder,
      type,
      forwardRef: ref,
    } = this.props;

    const textInputClasses = classNames(`${prefix}--text-input`, className, {
      [`${prefix}--text-input--light`]: light,
    });

    return {
      className: textInputClasses,
      id,
      onChange: evt => {
        if (!disabled) {
          onChange(evt);
        }
      },
      onClick: evt => {
        if (!disabled) {
          onClick(evt);
        }
      },
      placeholder,
      ref,
      type,
    };
  }

  getErrorId(id) {
    return `${id}-error-msg`;
  }

  getError() {
    const {
      id,
      invalid,
      invalidText,
    } = this.props;
    const errorId = this.getErrorId(id);

    return invalid ? (
      <div className={`${prefix}--form-requirement`} id={errorId}>
        {invalidText}
      </div>
    ) : null;
  }

  getErrorProps() {
    const {
      invalid,
      id,
    } = this.props;
    const errorId = this.getErrorId(id);

    return invalid ? {
      'aria-invalid': true,
      'data-invalid': true,
      'aria-describedby': errorId,
    } : {};
  }

  getLabel() {
    const {
      id,
      hideLabel,
      labelText,
    } = this.props;

    const labelClasses = classNames(`${prefix}--label`, {
      [`${prefix}--visually-hidden`]: hideLabel,
    });

    return labelText ? (
      <label htmlFor={id} className={labelClasses}>
        {labelText}
      </label>
    ) : null;
  }

  getHelper() {
    const {
      helperText,
    } = this.props;

    return helperText ? (
      <div className={`${prefix}--form__helper-text`}>{helperText}</div>
    ) : null;
  }

  render() {
    const label = this.getLabel();
    const input = this.getInput();
    const error = this.getError();
    const helper = this.getHelper();

    return (
      <div className={`${prefix}--form-item`}>
        {label}
        {helper}
        {input}
        {error}
      </div>
    );
  }
}

TextInput.propTypes = {
  /**
   * Specify an optional className to be applied to the <input> node
   */
  className: PropTypes.string,

  /**
   * Optionally provide the default value of the <input>
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the <input> should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify a custom `id` for the <input>
   */
  id: PropTypes.string.isRequired,

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: PropTypes.node.isRequired,

  /**
   * Optionally provide an `onChange` handler that is called whenever <input>
   * is updated
   */
  onChange: PropTypes.func,

  /**
   * Optionally provide an `onClick` handler that is called whenever the
   * <input> is clicked
   */
  onClick: PropTypes.func,

  /**
   * Specify the placeholder attribute for the <input>
   */
  placeholder: PropTypes.string,

  /**
   * Specify the type of the <input>
   */
  type: PropTypes.string,

  /**
   * Specify the value of the <input>
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  hideLabel: PropTypes.bool,

  /**
   * Specify whether the control is currently invalid
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText: PropTypes.string,

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText: PropTypes.node,

  /**
   * `true` to use the light version.
   */
  light: PropTypes.bool,

  /**
   *
   */
  forwardRef: PropTypes.shape({ current: PropTypes.instanceOf(React.Element) }),
};

TextInput.defaultProps = {
  disabled: false,
  type: 'text',
  onChange: () => {},
  onClick: () => {},
  invalid: false,
  invalidText: '',
  helperText: '',
  light: false,
};

TextInput.displayName = 'TextInput';

export const TextInputComponent = TextInput;

const forwardRef = (props, ref) => (
  <TextInput {...props} forwardRef={ref} />
);

forwardRef.displayName = TextInput.displayName;

export default React.forwardRef(forwardRef);

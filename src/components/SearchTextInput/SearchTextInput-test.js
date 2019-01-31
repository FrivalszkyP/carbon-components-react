/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import SearchTextInput, { SearchTextInputComponent } from './SearchTextInput';
import SearchTextInputSkeleton from './SearchTextInput.Skeleton';

describe('SearchTextInput', () => {
  describe('renders as expected', () => {
    const wrapper = mount(
      <SearchTextInput
        id="test"
        className="extra-class"
        labelText="testlabel"
        light
      />
    );

    const textInput = () => wrapper.find('input');

    describe('input', () => {
      it('renders as expected', () => {
        expect(textInput().length).toBe(1);
      });

      it('should accept refs', () => {
        class MyComponent extends React.Component {
          constructor(props) {
            super(props);
            this.textInput = React.createRef();
            this.focus = this.focus.bind(this);
          }
          focus() {
            this.textInput.current.focus();
          }
          render() {
            return (
              <SearchTextInput id="test" labelText="testlabel" ref={this.textInput} />
            );
          }
        }
        const wrapper = mount(<MyComponent />);
        expect(document.activeElement.type).toBeUndefined();
        wrapper.instance().focus();
        expect(document.activeElement.type).toEqual('text');
      });

      it('has the expected classes', () => {
        expect(textInput().hasClass('bx--text-input')).toEqual(true);
      });

      it('should add extra classes that are passed via className', () => {
        expect(textInput().hasClass('extra-class')).toEqual(true);
      });

      it('has the expected classes for light', () => {
        wrapper.setProps({ light: true });
        expect(textInput().hasClass('bx--text-input--light')).toEqual(true);
      });

      it('should set type as expected', () => {
        expect(textInput().props().type).toEqual('text');
        wrapper.setProps({ type: 'email' });
        expect(textInput().props().type).toEqual('email');
      });

      it('should set value as expected', () => {
        expect(textInput().props().defaultValue).toEqual(undefined);
        wrapper.setProps({ defaultValue: 'test' });
        expect(textInput().props().defaultValue).toEqual('test');
      });

      it('should set disabled as expected', () => {
        expect(textInput().props().disabled).toEqual(false);
        wrapper.setProps({ disabled: true });
        expect(textInput().props().disabled).toEqual(true);
      });

      it('should set placeholder as expected', () => {
        expect(textInput().props().placeholder).not.toBeDefined();
        wrapper.setProps({ placeholder: 'Enter text' });
        expect(textInput().props().placeholder).toEqual('Enter text');
      });
    });

    describe('label', () => {
      wrapper.setProps({ labelText: 'Email Input' });
      const renderedLabel = wrapper.find('label');

      it('renders a label', () => {
        expect(renderedLabel.length).toBe(1);
      });

      it('has the expected classes', () => {
        expect(renderedLabel.hasClass('bx--label')).toEqual(true);
      });

      it('should set label as expected', () => {
        expect(renderedLabel.text()).toEqual('Email Input');
      });
    });

    describe('button', () => {
      it('renders a button', () => {
        wrapper.setProps({});
        const renderedButton = wrapper.find('.bx--search-close');
        expect(renderedButton.length).toEqual(1);
      });
    });
  });

  describe('events', () => {
    describe('disabled textinput', () => {
      const onClick = jest.fn();
      const onChange = jest.fn();

      const wrapper = shallow(
        <SearchTextInput
          id="test"
          labelText="testlabel"
          onClick={onClick}
          onChange={onChange}
          disabled
        />
      );

      const input = wrapper.dive().find('input');

      it('should not invoke onClick', () => {
        input.simulate('click');
        expect(onClick).not.toBeCalled();
      });

      it('should not invoke onChange', () => {
        input.simulate('change');
        expect(onChange).not.toBeCalled();
      });
    });

    describe('enabled textinput', () => {
      const onClick = jest.fn();
      const onChange = jest.fn();

      const wrapper = shallow(
        <SearchTextInput
          labelText="testlabel"
          id="test"
          onClick={onClick}
          onChange={onChange}
        />
      );

      const input = wrapper.dive().find('input');
      const eventObject = {
        target: {
          defaultValue: 'test',
        },
      };

      it('should invoke onClick when input is clicked', () => {
        input.simulate('click');
        expect(onClick).toBeCalled();
      });

      it('should invoke onChange when input value is changed', () => {
        input.simulate('change', eventObject);
        expect(onChange).toBeCalledWith(eventObject);
      });
    });

    describe('Detecting change in value from props', () => {
      it('changes the hasContent state upon change in props', () => {
        const wrapper = shallow(
          <SearchTextInputComponent
            id="test"
            className="extra-class"
            label="Search Field"
            labelText="testlabel"
            value="foo"
          />
        );
        expect(wrapper.state().hasContent).toBeTruthy();
        wrapper.setProps({ value: '' });
        expect(wrapper.state().hasContent).toBeFalsy();
      });

      it('avoids change the hasContent state upon setting props, unless the value actually changes', () => {
        const wrapper = shallow(
          <SearchTextInputComponent
            id="test"
            className="extra-class"
            label="Search Field"
            labelText="testlabel"
            value="foo"
          />
        );
        expect(wrapper.state().hasContent).toBeTruthy();
        wrapper.setState({ hasContent: false });
        wrapper.setProps({ value: 'foo' });
        expect(wrapper.state().hasContent).toBeFalsy();
      });
    });

  });
});

describe('SearchTextInputSkeleton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<SearchTextInputSkeleton />);

    it('Has the expected classes', () => {
      expect(wrapper.find('.bx--skeleton.bx--text-input').length).toEqual(1);
    });

    it('Label is visible and displayed as a skeleton', () => {
      expect(wrapper.find('label').length).toEqual(1);
      expect(wrapper.find('label').hasClass('bx--skeleton')).toEqual(true);
    });

    it('Label is not visible when hideLabel is true', () => {
      wrapper.setProps({ hideLabel: true });
      expect(wrapper.find('label').length).toEqual(0);
    });
  });
});

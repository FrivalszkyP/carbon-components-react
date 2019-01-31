/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import SearchTextInput from './SearchTextInput';
import SearchTextInputSkeleton from './SearchTextInput.Skeleton';

const SearchTextInputProps = () => ({
  className: 'some-class',
  id: 'test2',
  labelText: text('Label text (labelText)', 'Search text input label'),
  placeholder: text('Placeholder text (placeholder)', 'Placeholder text'),
  light: boolean('Light variant (light)', false),
  disabled: boolean('Disabled (disabled)', false),
  hideLabel: boolean('No label (hideLabel)', false),
  onClick: action('onClick'),
  onChange: action('onChange'),
});

storiesOf('SearchTextInput', module)
  .addDecorator(withKnobs)
  .add('Default', () => <SearchTextInput {...SearchTextInputProps()} />, {
    info: {
      text: `
            Text fields enable the user to interact with and input data. A single line
            field is used when the input anticipated by the user is a single line of
            text as opposed to a paragraph.
            The default type is 'text' and its value can be either 'string' or 'number'.
          `,
    },
  })
  .add(
    'skeleton',
    () => (
      <div>
        <SearchTextInputSkeleton />
        <br />
        <SearchTextInputSkeleton hideLabel />
      </div>
    ),
    {
      info: {
        text: `
            Placeholder skeleton state to use when content is loading.
            `,
      },
    }
  );

/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { prefix } = settings;

const SearchTextInputSkeleton = ({ hideLabel, id }) => {
  const label = hideLabel ? null : (
    // eslint-disable-next-line jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control
    <label className={`${prefix}--label ${prefix}--skeleton`} htmlFor={id} />
  );

  return (
    <div className={`${prefix}--form-item`}>
      {label}
      <div role="search" style={{position: 'relative'}}>
        <div className={`${prefix}--skeleton ${prefix}--text-input`} />
      </div>
    </div>
  );
};

SearchTextInputSkeleton.propTypes = {
  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,
};

export default SearchTextInputSkeleton;

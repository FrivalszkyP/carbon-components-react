/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { iconCaretDown } from 'carbon-icons';
// TODO: import { ChevronDown16 } from '@carbon/icons-react';
import ChevronDown16 from '@carbon/icons-react/lib/chevron--down/16';
import { settings } from 'carbon-components';
import Icon from '../Icon';
import { componentsX } from '../../internal/FeatureFlags';

const { prefix } = settings;

export const translationIds = {
  'close.menu': 'close.menu',
  'open.menu': 'open.menu',
};

const defaultTranslations = {
  [translationIds['close.menu']]: 'Close menu',
  [translationIds['open.menu']]: 'Open menu',
};

/**
 * `ListBoxMenuIcon` is used to orient the icon up or down depending on the
 * state of the menu for a given `ListBox`
 */
const ListBoxMenuIcon = ({ isOpen, translateWithId: t }) => {
  const className = cx({
    [`${prefix}--list-box__menu-icon`]: true,
    [`${prefix}--list-box__menu-icon--open`]: isOpen,
  });
  const description = isOpen ? t('close.menu') : t('open.menu');
  return (
    <div className={className}>
      {componentsX ? (
        <ChevronDown16 name="chevron--down" />
      ) : (
        <Icon
          icon={iconCaretDown}
          description={description}
          alt={description}
          focusable="false"
        />
      )}
    </div>
  );
};

ListBoxMenuIcon.propTypes = {
  /**
   * Specify whether the menu is currently open, which will influence the
   * direction of the menu icon
   */
  isOpen: PropTypes.bool.isRequired,

  /**
   * i18n hook used to provide the appropriate description for the given menu
   * icon. This function takes in an id defined in `translationIds` and should
   * return a string message for that given message id.
   */
  translateWithId: PropTypes.func.isRequired,
};

ListBoxMenuIcon.defaultProps = {
  translateWithId: id => defaultTranslations[id],
};

export default ListBoxMenuIcon;

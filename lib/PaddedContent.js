import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';

import { Content } from 'native-base';
import nbVariables from 'lib/native-base-theme/variables/platform';

// TODO: Consider to fork NB's Content into this repo to suit it to our needs
export default class PaddedContent extends Component {

  static propTypes = {
    children: PropTypes.node,
    enableAutomaticScroll: PropTypes.bool,
  }

  static defaultProps = {
    children: null,
    enableAutomaticScroll: true,
  }

  render() {
    const { children, enableAutomaticScroll, ...contentProps } = this.props;
    const contentContainerStyle = {padding: nbVariables.contentPadding, paddingBottom: 20};

    // KeyboardAwareScrollView (inside NB Content) doesn't properly respect enableAutomaticScroll,
    // so we use this as a workaround (which breaks some styling via NB).
    if (!enableAutomaticScroll) {
      return (
        <ScrollView contentContainerStyle={contentContainerStyle}>
          { children }
        </ScrollView>
      );
    }

    return (
      <Content
        {...contentProps}
        enableResetScrollToCoords={false}
        contentContainerStyle={contentContainerStyle}
      >
        { children }
      </Content>
    );
  }
}

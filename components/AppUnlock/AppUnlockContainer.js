import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Navigation } from 'lib/navigation';
import irmaLogoImage from 'assets/irmaLogoSmall.png';

import AppUnlock from './AppUnlock';

const mapStateToProps = (state) => {
  const {
    appUnlock: {
      blockedDuration,
      error,
      hadFailure,
      remainingAttempts,
      status,
    },
  } = state;

  return {
    blockedDuration,
    error,
    hadFailure,
    remainingAttempts,
    status,
  };
};

@connect(mapStateToProps)
export default class AppUnlockContainer extends Component {

  static propTypes = {
    blockedDuration: PropTypes.number.isRequired,
    componentId: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.object,
    hadFailure: PropTypes.bool.isRequired,
    remainingAttempts: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }

  static defaultProps = {
    error: null,
  }

  static options = {
    topBar: {
      leftButtons: {
        icon: irmaLogoImage,
      },
      title: {
        text: 'Enter your IRMA PIN',
      },
    },
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({type: 'AppUnlock.Reset'});
  }

  dismissModal = () => {
    const { componentId } = this.props;
    Navigation.dismissModal(componentId);
  }

  authenticate = pin => {
    const { dispatch } = this.props;

    if (pin.length < 5)
      return;

    dispatch({
      type: 'IrmaBridge.Authenticate',
      pin: pin,
    });
  }

  render() {
    const { status, error, hadFailure, remainingAttempts, blockedDuration } = this.props;

    return (
      <AppUnlock
        authenticate={this.authenticate}
        blockedDuration={blockedDuration}
        dismissModal={this.dismissModal}
        error={error}
        hadFailure={hadFailure}
        remainingAttempts={remainingAttempts}
        status={status}
       />
    );
  }
}

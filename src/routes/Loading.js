import React, { createRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { createScene } from '../store/sm';
import Header from '../components/Header';
import { headerHeight, landingBackgroundImage, landingBackgroundColor } from '../config';
import breakpoints from '../utils/breakpoints';

const Loading = ({
  className, connected, loading, dispatchCreateScene, error, tosAccepted,
}) => {
  // pull querystring to see if we are displaying an error
  // (app can redirect to /loading on fatal err)
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();

  // create persona scene on button press on on mount, depending on device size
  useEffect(() => {
    if (loading === false && connected === false && error === null) {
      dispatchCreateScene();
    }
  }, []);

  // use to reload page if user unblocks perms and presses "try again"
  const history = useHistory();

  useEffect(() => {
    if (connected) history.push('/video');
  }, [connected]);

  // if TOS hasn't been accepted, send to /
  // if (tosAccepted === false) history.push('/');

  return (
    <div className={className}>
      <Header />
      <div className="text-center">
        <div className="spinner-border primary-accent" role="status" style={{ width: '3rem', height: '3rem'}}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <div className="p-4" />
    </div>
  );
};

Loading.propTypes = {
  className: PropTypes.string.isRequired,
  connected: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  dispatchCreateScene: PropTypes.func.isRequired,
  error: PropTypes.shape({
    msg: PropTypes.string,
    err: PropTypes.objectOf(PropTypes.string),
  }),
  tosAccepted: PropTypes.bool.isRequired,
};

Loading.defaultProps = {
  error: null,
};

const StyledLoading = styled(Loading)`
  background: ${landingBackgroundImage ? `url(${landingBackgroundImage})` : ''} ${landingBackgroundColor ? `${landingBackgroundColor};` : ''};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center bottom;

  min-width: 100vw;
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;

const mapStateToProps = ({ sm }) => ({
  connected: sm.connected,
  loading: sm.loading,
  error: sm.error,
  tosAccepted: sm.tosAccepted,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCreateScene: (typingOnly = false) => dispatch(createScene(typingOnly)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StyledLoading);

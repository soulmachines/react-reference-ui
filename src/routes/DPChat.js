import React, { createRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import reactDom from 'react-dom';
import PersonaVideo from '../components/PersonaVideo';
import Captions from '../components/Captions';
import Controls from '../components/Controls';
import ContentCardDisplay from '../components/ContentCardDisplay';
import {
  createScene, disconnect,
} from '../store/sm/index';
import Header from '../components/Header';
import { transparentHeader, headerHeight } from '../config';
import CameraPreview from '../components/CameraPreview';
import breakpoints from '../utils/breakpoints';

const DPChat = ({
  className,
  connected,
  loading,
  dispatchCreateScene,
  dispatchDisconnect,
  error,
  tosAccepted,
  cameraOn,
}) => {
  const overlayRef = createRef();
  const [height, setHeight] = useState('100vh');

  const handleResize = () => {
    setHeight(window.innerHeight);
  };

  useEffect(() => {
  //   if (!connected) dispatchCreateScene();
  //   // cleanup function, disconnects on component dismount
  //   return () => dispatchDisconnect();
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const history = useHistory();
  useEffect(() => {
    if (error !== null) history.push('/loading?error=true');
  }, [error]);
  // // if TOS hasn't been accepted, send to /
  // if (tosAccepted === false) history.push('/');

  return (
    <div className={className}>
      <Header />
      <div className="video-overlay" ref={overlayRef} style={{ height }}>
        {/* top tow */}
        <div className="container d-flex flex-column">
          {
              cameraOn
                ? (
                  <div className="row d-flex justify-content-end">
                    <div className="col-auto">
                      <div className="camera-preview-zeroheight-wrapper">
                        <CameraPreview />
                      </div>
                    </div>
                  </div>
                )
                : <div />
            }
          {/* middle row */}
          <div className="vertical-fit-container col-md-5">
            {
            loading && connected === false
              ? (
                // loading spinner
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )
              // connect button
              : <button type="button" className={`btn btn-outline-success ${!connected && !loading ? '' : 'd-none'}`} onClick={dispatchCreateScene} data-tip="Connect">Connect</button>
            }
            <div className="d-md-block d-none">
              <ContentCardDisplay />
            </div>
          </div>
          {/* bottom row */}
          <div>
            <div className="row">
              <div className="d-block d-md-none">
                <ContentCardDisplay />
              </div>
            </div>
            <div className="row">
              <div className="col text-center">
                <Captions />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Controls />
              </div>
            </div>
          </div>
        </div>
      </div>
      {
      connected ? <PersonaVideo /> : null
    }
    </div>
  );
};

DPChat.propTypes = {
  className: PropTypes.string.isRequired,
  dispatchCreateScene: PropTypes.func.isRequired,
  dispatchDisconnect: PropTypes.func.isRequired,
  connected: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    msg: PropTypes.string,
    err: PropTypes.objectOf(PropTypes.string),
  }),
  tosAccepted: PropTypes.bool.isRequired,
  cameraOn: PropTypes.bool.isRequired,
};

DPChat.defaultProps = {
  error: null,
};

const StyledDPChat = styled(DPChat)`
  .video-overlay {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 10;

    width: 100%;
    ${transparentHeader ? 'padding' : 'margin'}-top: ${headerHeight};

    .container {
      height: 100%;
    }

    .vertical-fit-container {
      flex: 1 1 auto;
      overflow-y: scroll;

      scrollbar-width: none; /* Firefox 64 */
      &::-webkit-scrollbar {
        display: none;
      }

      @media (min-width: ${breakpoints.md}px) {
        display: flex;
        align-items: center;
      }
    }
    .loading-container {
      flex: 1 1 auto;
      text-align: center;
    }

    .camera-preview-zeroheight-wrapper {
      /* position: absolute;
      bottom: .5rem;
      right: 1rem; */
    }
  }
`;

const mapStateToProps = ({ sm }) => ({
  connected: sm.connected,
  loading: sm.loading,
  error: sm.error,
  tosAccepted: sm.tosAccepted,
  cameraOn: sm.cameraOn,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCreateScene: () => dispatch(createScene()),
  dispatchDisconnect: () => dispatch(disconnect()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StyledDPChat);

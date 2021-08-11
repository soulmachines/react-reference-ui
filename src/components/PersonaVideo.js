/* eslint-disable jsx-a11y/media-has-caption */
import React, { createRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as actions from '../store/sm';
import proxyVideo from '../proxyVideo';
import { transparentHeader, headerHeight } from '../config';

const PersonaVideo = ({
  loading, connected, setVideoDimensions, className,
}) => {
  // video elem ref used to link proxy video element to displayed video
  const videoRef = createRef();
  // we need the container dimensions to render the right size video in the persona server
  const containerRef = createRef();
  // only set the video ref once, otherwise we get a flickering whenever the window is resized
  const [videoDisplayed, setVideoDisplayed] = useState(false);

  const [height, setHeight] = useState('100vh');
  useEffect(() => {
    if (containerRef.current) {
      setHeight(window.innerHeight);
    }
  }, [containerRef]);

  const handleResize = () => {
    if (containerRef.current) {
      // the video should resize with the element size.
      // this needs to be done through the redux store because the Persona server
      // needs to be aware of the video target dimensions to render a propperly sized video
      const videoWidth = containerRef.current.clientWidth;
      const videoHeight = containerRef.current.clientHeight;
      setVideoDimensions(videoWidth, videoHeight);
    }
  };

  // persona video feed is routed through a proxy <video> tag,
  // we need to get the src data from that element to use here
  useEffect(() => {
    if (connected) {
      if (!videoDisplayed) {
        videoRef.current.srcObject = proxyVideo.srcObject;
        setVideoDisplayed(true);
      }
      handleResize();
      window.addEventListener('resize', handleResize);
    }
    // when component dismounts, remove resize listener
    return () => window.removeEventListener('resize', handleResize);
  });

  return (
    <div ref={containerRef} className={className} style={{ height }}>
      {
        connected
          ? (
            // we display captions as an overlay. this functionality is critical and
            // should not be removed in derrivative custom UI's!!
            <video ref={videoRef} autoPlay playsInline className="persona-video" id="personavideo" />
          )
          : null
      }
      {
        loading
          ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )
          : null
      }
      {
        connected === false && loading === false ? 'disconnected' : ''
      }
    </div>
  );
};

PersonaVideo.propTypes = {
  setVideoDimensions: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  connected: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
};

const StyledPersonaVideo = styled(PersonaVideo)`
  /* if you need the persona video to be different than the window dimensions, change these values */
  width: 100vw;
  height: ${transparentHeader ? '100vh' : `calc(100vh - ${headerHeight})`};

  position: relative;
  z-index: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  .persona-video {
    /* the video element will conform to the container dimensions, so keep this as it is */
    width: 100%;
    height: 100%;
  }
`;

const mapStateToProps = (state) => ({
  loading: state.sm.loading,
  connected: state.sm.connected,
  width: state.sm.videoWidth,
  height: state.sm.videoHeight,
});

const mapDispatchToProps = (dispatch) => ({
  setVideoDimensions: (videoWidth, videoHeight) => dispatch(
    actions.setVideoDimensions({ videoWidth, videoHeight }),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(StyledPersonaVideo);

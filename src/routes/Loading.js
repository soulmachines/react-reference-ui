import React, { createRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  ArrowRightCircleFill, CameraVideo, CameraVideoFill, LightningCharge, MicFill, Soundwave,
} from 'react-bootstrap-icons';
import { createScene } from '../store/sm';
import Header from '../components/Header';
import { headerHeight, landingBackground } from '../config';

const Loading = ({
  className, connected, loading, dispatchCreateScene, error, tosAccepted,
}) => {
  // pull querystring to see if we are displaying an error
  // (app can redirect to /loading on fatal err)
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();

  // create persona scene on mount if needed
  useEffect(() => {
    // if we encounter a fatal error, app redirects to /loading to display
    if (!connected && !loading && query.get('error') !== true) dispatchCreateScene();
  }, []);

  // use to reload page if user unblocks perms and presses "try again"
  const history = useHistory();

  // if TOS hasn't been accepted, send to /
  if (tosAccepted === false) history.push('/');

  const [displayedPage, setDisplayedPage] = useState(0);
  const pages = [
    <div className="card">
      <div className="card-body">
        <h1>
          Before we get face to face,
        </h1>
        <h4>there are some things we should go over.</h4>
        <p>For me to work best, I need to be able to see you and hear your voice.</p>
        <p>This will be just like a video call where we can talk face to face.</p>
        <p>
          <b>
            If that sounds okay, please turn on access to your microphone and
            camera when we request it.
          </b>
        </p>
        <div className="d-grid gap-2">
          <button type="button" onClick={() => setDisplayedPage(displayedPage + 1)} className="btn btn-primary">Next</button>
        </div>
      </div>
    </div>,
    <div className="card">
      <div className="card-body">
        <p>
          Also,
          {' '}
          <b>
            the speed of your internet connection can have a big impact on picture
            and audio quality during the call.
          </b>
        </p>
        <p>
          If you experience connectivity issues, the picture quality may
          temporarily deteriorate or disappear entirely
        </p>
        <p>
          If that happens, try finding a location with a better connection and try again.
        </p>
        <div className="d-grid gap-2">
          <button type="button" onClick={() => setDisplayedPage(displayedPage + 1)} className="btn btn-primary">Next</button>
        </div>
      </div>
    </div>,
    <div className="card">
      <div className="card-body">

        <h4>Finally, please find a quiet environment.</h4>
        <p>
          I can find it hard to hear you when you&apos;re in a noisy room or
          there is a lot of noise in the background.
        </p>
        <p>
          Find a quiet place and let&apos;s keep this one-on-one for now.
        </p>
        <p>
          <b>All ready?</b>
        </p>
        <div className="d-grid gap-2">
          <Link to="/video" className={`btn  btn-lg ${connected ? 'btn-success' : 'btn-light disabled'}`}>
            {
          connected
            ? (
              <div>
                Proceed
                {' '}
                <ArrowRightCircleFill />
              </div>
            )
            : (
              <div>
                Loading...
              </div>
            )
        }
          </Link>
        </div>
      </div>
    </div>,
  ];

  return (
    <div className={className}>
      <Header />
      <div className="container">
        {
          !error
            ? (
              <div>
                {pages[displayedPage]}
              </div>
            )
            : (
              <div className="alert alert-danger col-md-6 offset-md-3">
                {
                  // special error for webcam and mic denied permissions
                  error.msg === 'permissionsDenied'
                    ? (
                      <div>
                        <h4>
                          <CameraVideoFill />
                          {' / '}
                          <MicFill />
                          {' '}
                          Permissions Denied
                        </h4>
                        <hr />
                        Looks like you’ve denied us access to your camera and microphone.
                        If you&apos;d prefer, you can only enable the microphone.
                        You can always change permissions in your browser settings and
                        {' '}
                        <button onClick={() => history.go(0)} type="button" className="link-primary">try again</button>
                        .
                      </div>
                    )
                    : (
                      <div>
                        <h4>Encountered fatal error!</h4>
                        <hr />
                        <pre>
                          {JSON.stringify(error, null, '  ')}
                        </pre>
                      </div>
                    )
                }
              </div>
            )
        }
      </div>
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
  min-height: 100vh;

  background-image: url(${landingBackground});
  background-color: rgb(247, 232, 219);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center bottom;

  button.link-primary {
    background: none;
    border: none;
    padding: 0;
  }

  .container {
    padding-top: calc(${headerHeight} + 2rem);
    min-height: calc(100vh - ${headerHeight});
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .loading-text {
      font-size: 2rem;
    }
  }

  .instructions-wrapper {
    overflow-x: scroll;
  }
  .instructions-card {
    display: inline-block;
    width: 100%;
  }
`;

const mapStateToProps = ({ sm }) => ({
  connected: sm.connected,
  loading: sm.loading,
  error: sm.error,
  tosAccepted: sm.tosAccepted,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCreateScene: () => dispatch(createScene()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StyledLoading);

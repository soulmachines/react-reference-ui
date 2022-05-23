import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CameraVideo, Mic, Question } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { headerHeight, landingBackgroundImage, landingBackgroundColor } from '../config';
import { setTOS } from '../store/sm/index';
import eula from '../eula';
import Tutorial from '../components/Tutorial';
import breakpoints from '../utils/breakpoints';

const Landing = ({ className, dispatchAcceptTOS }) => {
  const [showTutorial, setShowTutorial] = useState(false);

  const MainContent = () => (
    <div className="d-flex justify-content-center p-4 mt-2">
      <div>
        <h1 className="fw-bold mb-3">
          Let&apos;s get started.
        </h1>
        <div className="d-flex justify-content-left align-items-center mb-4">
          <div className="landing-icon">
            <Mic size={14} />
          </div>
          This website requires use of your computer’s microphone and speaker.
        </div>
        <div className="d-flex justify-content-left align-items-center mb-4">
          <div className="landing-icon">
            <CameraVideo size={14} />
          </div>
          Your computer’s camera is optional for this website.
        </div>
        <div className="d-flex justify-content-left align-items-center mb-4">
          <div className="landing-icon">
            <Question size={14} />
          </div>
          <div>
            Never interact with a Digital Person before?
            {' '}
            <button
              className="text-button primary-accent"
              type="button"
              onClick={() => setShowTutorial(true)}
            >
              Click here

            </button>
            {' '}
            for some tips.
          </div>
        </div>
        <div>
          <Link to="/loading" onClick={() => dispatchAcceptTOS(true)} className="btn primary-accent">
            Let&apos;s begin
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className={className}>
      <Header />
      {
      showTutorial
        ? <Tutorial hide={() => setShowTutorial(false)} />
        : <MainContent />
    }
    </div>
  );
};

Landing.propTypes = {
  className: PropTypes.string.isRequired,
  dispatchAcceptTOS: PropTypes.func.isRequired,
};

const StyledLanding = styled(Landing)`
  background: ${landingBackgroundImage ? `url(${landingBackgroundImage})` : ''} ${landingBackgroundColor ? `${landingBackgroundColor};` : ''};
  background-repeat: no-repeat;
  background-position: center bottom;
  min-height: 100vh;
  min-width: 100vw;

  @media(min-width: ${breakpoints.md}px) {
    font-size: 1.3rem;
  }

  h2 {
    margin-bottom: 1.5rem;
  }

  .landing-icon {
    display: flex;
    align-items: center;
    justify-content: center;

    background: #6FCFEB;
    border-radius: 50%;
    outline: 6px solid #FFF;

    padding: 0.6rem;
    margin-right: 1rem;
  }
`;
const mapDispatchToProps = (dispatch) => ({
  dispatchAcceptTOS: (accepted) => dispatch(setTOS({ accepted })),
});

export default connect(null, mapDispatchToProps)(StyledLanding);

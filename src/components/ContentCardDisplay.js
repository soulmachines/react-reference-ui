import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { setActiveCards, animateCamera } from '../store/sm/index';
import { calculateCameraPosition } from '../utils/camera';
import Transcript from './ContentCards/Transcript';
import ContentCardSwitch from './ContentCardSwitch';
import breakpoints from '../utils/breakpoints';

const ContentCardDisplay = ({
  activeCards, dispatchAnimateCamera, videoWidth, videoHeight, showTranscript, className,
}) => {
  if (!activeCards) return null;
  const CardDisplay = activeCards.map((c, index) => (
    <div className="m-2" key={JSON.stringify(c)}>
      <ContentCardSwitch card={c} index={index} />
    </div>
  ));

  const animateCameraToFitCards = () => {
    if ((activeCards.length > 0 || showTranscript === true) && videoWidth >= breakpoints.md) {
      dispatchAnimateCamera(calculateCameraPosition(videoWidth, videoHeight, 0.7));
    } else dispatchAnimateCamera(calculateCameraPosition(videoWidth, videoHeight, 0.5));
  };

  useEffect(() => {
    animateCameraToFitCards();
  }, [showTranscript, activeCards]);

  useEffect(() => {
    window.addEventListener('resize', animateCameraToFitCards);
    return () => window.removeEventListener('resize', animateCameraToFitCards);
  });

  return (
    <div className={className}>
      { showTranscript ? <Transcript /> : CardDisplay }
    </div>
  );
};

ContentCardDisplay.propTypes = {
  activeCards: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchAnimateCamera: PropTypes.func.isRequired,
  videoWidth: PropTypes.number.isRequired,
  videoHeight: PropTypes.number.isRequired,
  showTranscript: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
};

const StyledContentCardDisplay = styled(ContentCardDisplay)`
  max-height: 10rem;
  overflow-y: scroll;

  /* show translucent background if card showing on small device */
  ${({ activeCards, showTranscript }) => (activeCards.length > 0 || showTranscript === true
    ? `background: rgba(255, 255, 255, 0.3);
    outline: 0.5rem solid rgba(255, 255, 255, 0.3);`
    : '')}

  @media(min-width: ${breakpoints.md}px) {
    max-height: 100%;
    background: none;
  }
  width: 100%;
`;

const mapStateToProps = ({ sm }) => ({
  activeCards: sm.activeCards,
  videoWidth: sm.videoWidth,
  videoHeight: sm.videoHeight,
  showTranscript: sm.showTranscript,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchActiveCards: (activeCards) => dispatch(
    setActiveCards({ activeCards, cardsAreStale: true }),
  ),
  dispatchAnimateCamera: (options, duration = 1) => dispatch(animateCamera({ options, duration })),
});

export default connect(mapStateToProps, mapDispatchToProps)(StyledContentCardDisplay);

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';
import { setActiveCards, animateCamera } from '../store/sm/index';
import { calculateCameraPosition } from '../utils/camera';
import Transcript from './ContentCards/Transcript';
import ContentCardSwitch from './ContentCardSwitch';
import breakpoints from '../utils/breakpoints';

type ContentCardDisplayProps = {
    activeCards: any[];
    dispatchAnimateCamera: (...args: any[]) => any;
    videoWidth: number;
    videoHeight: number;
    showTranscript: boolean;
    className: string;
    connected: boolean;
};

function ContentCardDisplay({
  activeCards, dispatchAnimateCamera, videoWidth, videoHeight, showTranscript, className, connected,
}: ContentCardDisplayProps) {
  if (!activeCards) return null;
  const CardDisplay = activeCards.map((c, index) => (
    <div className="mb-2" key={JSON.stringify(c)}>
      <ContentCardSwitch card={c} index={index} />
    </div>
  ));

  const animateCameraToFitCards = () => {
    if (connected) {
      if ((activeCards.length > 0 || showTranscript === true) && videoWidth >= breakpoints.md) {
        dispatchAnimateCamera(calculateCameraPosition(videoWidth, videoHeight, 0.7));
      } else dispatchAnimateCamera(calculateCameraPosition(videoWidth, videoHeight, 0.5));
    }
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
}

const StyledContentCardDisplay = styled(ContentCardDisplay)`
  max-height: 10rem;
  overflow-y: scroll;
  margin-bottom: 0.9rem;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  /* show translucent background if card showing on small device */
  ${({
    activeCards,
    showTranscript,
  }: any) => (activeCards.length > 0 || showTranscript === true
    ? `background: rgba(255, 255, 255, 0.3);
    outline: 0.5rem solid rgba(255, 255, 255, 0.3);`
    : '')}

  @media(min-width: ${breakpoints.md}px) {
    max-height: 100%;
    background: none;
    outline: none;
    margin-bottom: auto;
  }
  width: 100%;
`;

const mapStateToProps = ({
  sm,
}: any) => ({
  activeCards: sm.activeCards,
  videoWidth: sm.videoWidth,
  videoHeight: sm.videoHeight,
  showTranscript: sm.showTranscript,
  connected: sm.connected,
});

const mapDispatchToProps = (dispatch: any) => ({
  dispatchActiveCards: (activeCards: any) => dispatch(
    // the next time the persona speaks, if the cards are stale, it will clear them.
    // if this value isn't desired, don't set this value to true.
    setActiveCards({ activeCards, cardsAreStale: true }),
  ),

  // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
  dispatchAnimateCamera: (options: any, duration = 1) => dispatch(animateCamera({ options, duration })),
});

export default connect(mapStateToProps, mapDispatchToProps)(StyledContentCardDisplay);

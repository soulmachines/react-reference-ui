import React, { createRef, useEffect, useState } from 'react';
import YouTube from 'react-youtube';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  mute, sendTextMessage, setActiveCards, keepAlive,
} from '../../store/sm/index';

type OwnVideoProps = {
    data: {
        videoId: string;
        autoplay?: string;
    };
    className: string;
    isMuted: boolean;
    dispatchMute: (...args: any[]) => any;
    dispatchTextMessage: (...args: any[]) => any;
    dispatchHideCards: (...args: any[]) => any;
    inTranscript?: boolean;
    dispatchKeepAlive: (...args: any[]) => any;
    activeCards: any[];
};

// @ts-expect-error TS(2565): Property 'defaultProps' is used before being assig... Remove this comment to see the full error message
type VideoProps = OwnVideoProps & typeof Video.defaultProps;

function Video({
  data, className, isMuted, dispatchMute, dispatchTextMessage, dispatchHideCards, inTranscript, dispatchKeepAlive, activeCards,
}: VideoProps) {
  const { videoId, autoplay } = data;
  const containerRef = React.createRef();
  const [YTElem, setYTElem] = useState();
  const [fadeOut, setFadeOut] = useState(false);
  const [wasMuted, setWasMuted] = useState(isMuted);
  // we display videos inline in the transcript, then when they're clicked on,
  //  we enter lightbox mode and mute the DP
  const [isLightbox, setIsLightbox] = useState(inTranscript ? !inTranscript : true);

  useEffect(() => {
    const thisVideoCardIsActive = data === activeCards[0]?.data;
    if (thisVideoCardIsActive) setIsLightbox(true);
  }, [activeCards]);

  const endVideo = () => {
    setFadeOut(true);
    setTimeout(() => {
      setIsLightbox(false);
      setFadeOut(false);
      dispatchHideCards();
      dispatchTextMessage('I\'m done watching');
    }, 500);
  };

  useEffect(() => {
    if (isLightbox) setFadeOut(false);
    const ytRef = createRef();
    let ytTarget: any;
    const handleKeyboardInput = (e: any) => {
      // 1 = playing, 2 = paused
      const playerState = ytTarget.getPlayerState();
      switch (e.nativeEvent.data) {
        case (' '): {
          if (playerState === 1) ytTarget.pauseVideo();
          else ytTarget.playVideo();
          break;
        }
        default: { break; }
      }
    };
    // use containerRef to size video embed to elem dimensions
    // assume 16:9 aspect ratio for video
    // @ts-expect-error TS(2339): Property 'clientWidth' does not exist on type 'unk... Remove this comment to see the full error message
    const { clientWidth: width, clientHeight: height } = containerRef.current;
    let computedWidth = width * 0.9;
    let computedHeight = computedWidth / (16 / 9);
    if (computedHeight > (0.9 * height)) {
      computedHeight = 0.8 * height;
      computedWidth = (16 / 9) * computedHeight;
    }
    const opts = {
      width: computedWidth,
      height: computedHeight,
      playerVars: {
        autoplay: !isLightbox ? false : !!autoplay,
        mute: 0,
      },
    };
    const elem = (
      <div>
        {/* capture focus to enable play/pause functionality */}
        <input
          className="visually-hidden"
          aria-label="press space to play or pause video"
          type="text"
          // @ts-expect-error TS(2322): Type 'RefObject<unknown>' is not assignable to typ... Remove this comment to see the full error message
          ref={ytRef}
          onChange={handleKeyboardInput}
          value=""
        />
        <YouTube
          videoId={videoId}
          // @ts-expect-error TS(2769): No overload matches this call.
          opts={opts}
          containerClassName="video-container"
          onEnd={endVideo}
          onStateChange={(e) => {
            const { data: playerState } = e;
            if (playerState === -1) setIsLightbox(true);
          }}
          onReady={(e) => {
            ytTarget = e.target;
            if (isLightbox) (ytRef as any).current.focus();
          }}
        />
      </div>
    );

    // @ts-expect-error TS(2345): Argument of type 'Element' is not assignable to pa... Remove this comment to see the full error message
    setYTElem(elem);
    if (isLightbox) setWasMuted(isMuted);
    if (!isMuted && isLightbox) {
      dispatchMute(true);
    }
    return () => {
      // @ts-expect-error TS(2345): Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
      setYTElem(null);
      if (isLightbox) {
        dispatchMute(wasMuted);
      }
    };
  }, [isLightbox]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLightbox) dispatchKeepAlive();
    }, 10000);
    return () => clearInterval(interval);
  });

  if (isLightbox === false) {
    // @ts-expect-error TS(2322): Type 'RefObject<unknown>' is not assignable to typ... Remove this comment to see the full error message
    return <div ref={containerRef}>{YTElem}</div>;
  }

  return (
    // @ts-expect-error TS(2322): Type 'RefObject<unknown>' is not assignable to typ... Remove this comment to see the full error message
    <div ref={containerRef} className={`${className} ${fadeOut === true ? 'fade' : ''}`} key={videoId}>
      <div>
        <div className="row">
          {YTElem}
        </div>
        <div className="row d-flex align-items-center justify-content-between mt-2 video-controlblock">
          <span className="text-white text-center text-md-start col-md-auto mb-2">
            The Digital Person is paused while you watch this video and
            will not respond to your voice.
          </span>
          <div className="d-flex col-md-auto justify-content-center mt-2 mt-md-0">
            <button type="button" className="btn btn-outline-light" onClick={endVideo}>I&apos;m done watching</button>
          </div>
        </div>
      </div>
    </div>
  );
}

Video.defaultProps = {
  inTranscript: false,
};

const mapStateToProps = ({
  sm,
}: any) => ({
  isMuted: sm.isMuted,
  activeCards: sm.activeCards,
});

const mapDispatchToProps = (dispatch: any) => ({
  // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
  dispatchMute: (muteValue: any) => dispatch(mute(muteValue)),
  dispatchHideCards: () => dispatch(setActiveCards({})),
  // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
  dispatchTextMessage: (text: any) => dispatch(sendTextMessage({ text })),
  dispatchKeepAlive: () => dispatch(keepAlive()),
});

const ConnectedVideo = connect(mapStateToProps, mapDispatchToProps)(Video);

export default styled(ConnectedVideo)`
  position: absolute;
  z-index: 5000;
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(0,0,0,0.9);
  backdrop-filter: blur(3px);

  .sm-fade {
    transition: opacity 0.5s;
  }
  .sm-fade-out {
    opacity: 0;
  }

  span, button {
    font-size: 1.2rem;
  }

  .video-container {
    display: flex;
    justify-content: center;
  }
  .video-controlblock {
    max-width: 90%;
    margin: 0px auto;
  }
`;

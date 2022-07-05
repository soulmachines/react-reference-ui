import React from 'react';
import { connect } from 'react-redux';
import Options from './ContentCards/Options';
import Markdown from './ContentCards/Markdown';
import Link from './ContentCards/Link';
import Image from './ContentCards/Image';
import Video from './ContentCards/Video';
import { setActiveCards, animateCamera } from '../store/sm/index';

const returnCardError = (errMsg: any) => {
  console.error(errMsg);
  return <div className="alert alert-danger" key={Math.random()}>{errMsg}</div>;
};

type OwnContentCardSwitchProps = {
    activeCards: {
        type?: string;
        data?: any;
    }[];
    dispatchActiveCards: (...args: any[]) => any;
    inTranscript?: boolean;
    card: any;
    index: number;
};

// @ts-expect-error TS(2565): Property 'defaultProps' is used before being assig... Remove this comment to see the full error message
type ContentCardSwitchProps = OwnContentCardSwitchProps & typeof ContentCardSwitch.defaultProps;

function ContentCardSwitch({
  activeCards, dispatchActiveCards, card, index, inTranscript,
}: ContentCardSwitchProps) {
  const componentMap = {
    options: {
      element: Options,
      removeOnClick: true,
    },
    markdown: {
      element: Markdown,
      removeOnClick: false,
    },
    externalLink: {
      element: Link,
      removeOnClick: false,
    },
    image: {
      element: Image,
      removeOnClick: false,
    },
    video: {
      element: Video,
      removeOnClick: false,
    },
  };

  if (card === undefined) return returnCardError('unknown content card name! did you make a typo in @showCards()?');
  const { data, id, type: componentName } = card;

  if (componentName in componentMap === false) return returnCardError(`component ${componentName} not found in componentMap!`);
  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const { element: Element, removeOnClick } = componentMap[componentName];

  let removeElem;
  if (index) {
  // for some cards, we want them to be hidden after the user interacts w/ them
  // for others, we don't
    removeElem = (e: any) => {
    // we need to write our own handler, since this is not an interactive element by default
      if (e.type === 'click' || e.code === 'enter') {
        const newActiveCards = [...activeCards.slice(0, index), ...activeCards.slice(index + 1)];
        dispatchActiveCards(newActiveCards);
      }
    };
  } else { removeElem = null; }
  const elem = (
    // disable no static element interactions bc if removeOnClick is true,
    // elem should have interactive children
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      // @ts-expect-error TS(2322): Type '((e: any) => void) | null' is not assignable... Remove this comment to see the full error message
      onClick={removeOnClick ? removeElem : null}
      // @ts-expect-error TS(2322): Type '((e: any) => void) | null' is not assignable... Remove this comment to see the full error message
      onKeyPress={removeOnClick ? removeElem : null}
      className="m-2"
      data-sm-content={id}
    >
      {/* elements that are interactive but shouldn't be removed immediately
         can use triggerRemoval to have the card removed */}
      <Element
        data={{ id, ...data }}
        triggerRemoval={removeElem}
        inTranscript={inTranscript}
      />
    </div>
  );
  return elem;
}

ContentCardSwitch.defaultProps = {
  inTranscript: false,
};

const mapStateToProps = ({
  sm,
}: any) => ({
  activeCards: sm.activeCards,
  videoWidth: sm.videoWidth,
  videoHeight: sm.videoHeight,
  showTranscript: sm.showTranscript,
});

const mapDispatchToProps = (dispatch: any) => ({
  dispatchActiveCards: (activeCards: any) => dispatch(
    setActiveCards({ activeCards, cardsAreStale: true }),
  ),

  // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
  dispatchAnimateCamera: (options: any, duration = 1) => dispatch(animateCamera({ options, duration })),
});
export default connect(mapStateToProps, mapDispatchToProps)(ContentCardSwitch);

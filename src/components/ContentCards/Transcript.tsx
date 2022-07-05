import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';
import ContentCardSwitch from '../ContentCardSwitch';

type TranscriptProps = {
    className: string;
    transcript: {
        source?: string;
        text?: string;
        timestamp?: string;
    }[];
};

function Transcript({ className, transcript }: TranscriptProps) {
  const transcriptDisplay = transcript.map(({
    // @ts-expect-error TS(2339): Property 'card' does not exist on type '{ source?:... Remove this comment to see the full error message
    source, text, card, timestamp,
  }) => {
    // we don't want to wrap cards in a bubble, return as is w/ a key added
    if (card) {
      return (
        <ContentCardSwitch
          card={card}
          // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'number'.
          index={null}
          key={timestamp}
          inTranscript
        />
      );
    }
    return (
      <div key={timestamp} className={`transcript-entry ${source === 'user' ? 'transcript-entry-user' : ''}`}>
        <div className="transcript-entry-content">
          {text || null}
        </div>
      </div>
    );
  });

  // scroll to bottom of transcript whenever it updates
  let scrollRef: any;
  const [isMounting, setIsMounting] = useState(true);
  useEffect(() => {
    scrollRef.scrollIntoView({ behavior: isMounting ? 'instant' : 'smooth' });
    setIsMounting(false);
  }, [transcript]);

  return (
    <div className={className}>
      <div className="transcript-list-group">
        {transcriptDisplay.length > 0
          ? transcriptDisplay
          : (
            <li className="list-group-item">
              No items to show, say something!
            </li>
          )}
        <div ref={(el) => { scrollRef = el; }} />
      </div>
    </div>
  );
}

const StyledTranscript = styled(Transcript)`
    width: 100%;
  .transcript-list-group {
    flex-shrink: 1;
    overflow-y: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .transcript-entry {
    clear: both;
    display: flex;
    align-items: center;
    margin-bottom: 0.8rem;
  }

  .transcript-entry-content {
    padding: 0.5rem 0.8rem 0.5rem 0.8rem;
    width: fit-content;
    background: #FFFFFF;
    border-radius: 1.1rem;
  }

  .transcript-entry-user {
    float: right;
    flex-direction:  row-reverse;
    .transcript-entry-content {
      background: #0d6efd;
      color: #FFFFFF;
    }
  }
`;

const mapStateToProps = ({
  sm,
}: any) => ({
  transcript: sm.transcript,
});

export default connect(mapStateToProps)(StyledTranscript);

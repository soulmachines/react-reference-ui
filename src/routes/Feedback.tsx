import React, { useState } from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { headerHeight } from '../config';

type Props = {
    className: string;
};

function Feedback({ className }: Props) {
  const [display, setDisplay] = useState(null);
  return (
    <div className={className}>
      <Header />
      <div className="container feedback-container d-flex justify-content-center align-items-center">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <h4>How was your experience?</h4>
            </div>
            <div className="row">
              <div className="col-auto">
                {/* @ts-expect-error TS(2345): Argument of type '"👍"' is not assignable to param... Remove this comment to see the full error message */}
                <button className="btn btn-success" type="button" onClick={() => setDisplay('👍')}>
                  Good
                </button>
              </div>
              <div className="col">
                <h1 className="text-center">{display}</h1>
              </div>
              <div className="col-auto">
                {/* @ts-expect-error TS(2345): Argument of type '"👎"' is not assignable to param... Remove this comment to see the full error message */}
                <button className="btn btn-danger" type="button" onClick={() => setDisplay('👎')}>
                  Bad
                </button>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col d-flex justify-content-center">
                <Link to="/" className="btn btn-primary">Start Over</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default styled(Feedback)`
  .feedback-container {
    height: calc(100vh - ${headerHeight});
  }
`;

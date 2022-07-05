import React from 'react';
import { connect } from 'react-redux';
import { sendTextMessage } from '../../store/sm/index';

type OptionsProps = {
    data: {
        options?: {
            label?: string;
            value?: string;
        }[];
    };
    dispatchTextFromData: (...args: any[]) => any;
};

function Options({ data, dispatchTextFromData }: OptionsProps) {
  const { options } = data;
  // @ts-expect-error TS(2532): Object is possibly 'undefined'.
  const optionsDisplay = options.map(({ label, value }) => (
    <button type="button" className="btn primary-accent" data-trigger-text={value} onClick={dispatchTextFromData} key={JSON.stringify({ label, value })}>
      {label}
    </button>
  ));
  return (
    <div className="d-grid gap-2">
      {optionsDisplay}
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
  dispatchTextFromData: (e: any) => dispatch(sendTextMessage({ text: e.target.dataset.triggerText })),
});

export default connect(null, mapDispatchToProps)(Options);

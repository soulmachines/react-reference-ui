import React from 'react';
import ReactMarkdown from 'react-markdown';

type Props = {
    data: {
        text: string;
    };
};

function Markdown({ data }: Props) {
  const { text } = data;
  return (
    <div className="card">
      <div className="card-body">
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  );
}

export default Markdown;

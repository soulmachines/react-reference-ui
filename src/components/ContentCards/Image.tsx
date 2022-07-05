import React from 'react';

type Props = {
    data: {
        url: string;
        alt: string;
    };
};

function Image({ data }: Props) {
  const { url, alt } = data;
  return (
    <div style={{ width: 'auto', maxWidth: '100%' }}>
      <img src={url} alt={alt} style={{ width: '100%', height: 'auto' }} />
    </div>
  );
}

export default Image;

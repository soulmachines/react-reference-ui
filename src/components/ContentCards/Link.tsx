import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';
import { ArrowUpRightSquare } from 'react-bootstrap-icons';

type Props = {
    data: {
        [key: string]: any;
    }; // TODO: { url: PropTypes.string.isRequired, title: PropTypes.string.isRequired, imageUrl: PropTypes.string.isRequired, description: PropTypes.string.isRequired, imageAltText: PropTypes.string, }
    className: string;
};

function Link({ data, className }: Props) {
  const {
    title, url, imageUrl, description, imageAltText,
  } = data;
  return (
    <div className={className}>
      <div className="card">
        <div className="d-flex justify-content-center">
          <img src={imageUrl} alt={imageAltText || description} />
        </div>
        <div className="card-body">
          <h5>{title}</h5>
          <p>{description}</p>
          <div className="d-flex justify-content-center">
            {/* open link in new tab */}
            <a href={url} className="btn btn-primary" target="_blank" rel="noreferrer">
              Visit Link
              <ArrowUpRightSquare />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default styled(Link)`
  width: 20rem;

  img {
    width: auto;
    height: auto;
  }
`;

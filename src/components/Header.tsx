import React from 'react';
import { connect } from 'react-redux';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Link, useLocation } from 'react-router-dom';
import {
  logo, logoAltText, transparentHeader, headerHeight, logoLink,
} from '../config';
import {
  disconnect,
} from '../store/sm/index';

type HeaderProps = {
    className: string;
    connected: boolean;
    loading: boolean;
    dispatchDisconnect: (...args: any[]) => any;
};

function Header({
  className, connected, loading, dispatchDisconnect,
}: HeaderProps) {
  const { pathname } = useLocation();
  return (
    <div className={`${className}`}>
      <div className="container">
        <div className="row">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              {/* left align */}
              <Link to={logoLink}>
                <img src={logo} className="logo position-relative" alt={logoAltText} />
              </Link>
            </div>
            <div>
              {/* middle align */}
            </div>
            <div>
              {/* right align */}
              <button type="button" disabled={!connected} className={`btn btn-outline-danger ${connected && !loading && pathname === '/video' ? '' : 'd-none'}`} onClick={dispatchDisconnect} data-tip="Disconnect" data-place="bottom">
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const StyledHeader = styled(Header)`
  position: relative;
  z-index: 20;
  top: 0;
  width: 100%;
  background-color: ${transparentHeader ? 'none' : '#FFFFFF'};

  .position-relative {
    position: relative;
  }

  .row {
    height: ${headerHeight};
  }
  .logo {
    /* height constrain logo image */
    height: calc(0.6 * ${headerHeight});
    width: auto;
    // Medium devices (tablets, 768px and up)
    @media (min-width: 768px) {
      height: calc(0.8 * ${headerHeight});
   }
  }
`;

const mapStateToProps = ({
  sm,
}: any) => ({
  connected: sm.connected,
  loading: sm.loading,
});

const mapDispatchToProps = (dispatch: any) => ({
  dispatchDisconnect: () => dispatch(disconnect()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StyledHeader);

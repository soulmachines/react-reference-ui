import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';
// import { CameraVideoOff } from 'react-bootstrap-icons';
import { mediaStreamProxy } from '../proxyVideo';

type CameraPreviewProps = {
    connected: boolean;
    className: string;
    cameraOn: boolean;
};

function CameraPreview({ connected, className, cameraOn }: CameraPreviewProps) {
  const videoRef = React.createRef();
  const stream = mediaStreamProxy.getUserMediaStream();

  useEffect(() => {
    if (stream !== null && mediaStreamProxy.videoOff === false) {
      // display webcam preview in video elem
      (videoRef as any).current.srcObject = stream;
    }
  }, [connected]);

  // disable camera preview if camera is off
  // in the future, if smwebsdk supports toggling the camera on and off, remove this line
  if (cameraOn === false) return null;

  return (
    <div className={className}>
      {/* NOTE: toggleVideo behavior is not supported by smwebsdk so it's not recommended */}
      {/* <button onClick={mediaStreamProxy.toggleVideo} type="button" className="video-button"> */}
      <div className="video-button">
        <video
          // @ts-expect-error TS(2322): Type 'RefObject<unknown>' is not assignable to typ... Remove this comment to see the full error message
          ref={videoRef}
          muted
          autoPlay
          playsInline
          // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
          className={cameraOn ? null : 'd-none'}
        />
        {/* { cameraOn ? null : <CameraVideoOff /> } */}
        {/* </button> */}
      </div>
    </div>
  );
}

const StyledCameraPreview = styled(CameraPreview)`
  display: ${({
    connected,
  }: any) => (connected ? '' : 'none')};
  align-items: center;
  height: ${({
    size,
  }: any) => size || 4}rem;

  .video-button {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0;
    height: ${({
    size,
  }: any) => size || 4}rem;
    aspect-ratio: ${({
    cameraWidth,
    cameraHeight,
  }: any) => cameraWidth / cameraHeight};

    border-radius: 3px;
    background: rgba(0,0,0,0.2);
    border: ${({
    cameraOn,
  }: any) => (cameraOn ? 'none' : '1px solid gray')};
  }

  video {
    height: ${({
    size,
  }: any) => size || 4}rem;
    transform: rotateY(180deg);
    aspect-ratio: ${({
    cameraWidth,
    cameraHeight,
  }: any) => cameraWidth / cameraHeight};
    border-radius: 3px;
    z-index: 20;
  }
`;

const mapStateToProps = ({
  sm,
}: any) => ({
  connected: sm.connected,
  cameraOn: sm.cameraOn,
  cameraWidth: sm.cameraWidth,
  cameraHeight: sm.cameraHeight,
});

export default connect(mapStateToProps)(StyledCameraPreview);

import React from 'react';
import {
  CameraVideo, LightningCharge, Soundwave,
} from 'react-bootstrap-icons';
import styled from 'styled-components';
import Header from './Header';
import { landingBackgroundImage, landingBackgroundColor } from '../config';
import { Link } from 'react-router-dom';

const Tutorial = ({ className }) => (
  <div className={className}>
    <div className="p-2">
      <div className="card mb-2" key="page-1">
        <div className="card-body">
          <div className="text-center">
            <CameraVideo className="primary-accent" size={42} />
          </div>
          <hr />
          <p>For me to work best, I need to be able to see you and hear your voice.</p>
          <p>This will be just like a video call where we can talk face to face.</p>
          <p>
            <b>
              If that sounds okay, please turn on access to your microphone and
              camera when we request it.
            </b>
          </p>
          <div className="d-grid gap-2 d-md-none d-block">
            {/* <button type="button" onClick={createSceneAndIteratePage} className="btn btn-primary">Next</button> */}
          </div>
        </div>
      </div>
      <div className="card mb-2" key="page-2">
        <div className="card-body">
          <div className="text-center">
            <LightningCharge className="primary-accent" size={42} />
          </div>
          <hr />
          <p>
            Also,
            {' '}
            <b>
              the speed of your internet connection can have a big impact on picture
              and audio quality during the call.
            </b>
          </p>
          <p>
            If you experience connectivity issues, the picture quality may
            temporarily deteriorate or disappear entirely
          </p>
          <p>
            If that happens, try finding a location with a better connection and try again.
          </p>
          <div className="d-grid gap-2 d-md-none d-block">
            {/* <button type="button" onClick={() => setDisplayedPage(displayedPage + 1)} className="btn btn-primary">Next</button> */}
          </div>
        </div>
      </div>
      <div className="card mb-2" key="page-3">
        <div className="card-body">
          <div className="text-center">
            <Soundwave className="primary-accent" size={42} />
          </div>
          <hr />
          <p><b>Finally, please find a quiet environment.</b></p>
          <p>
            I can find it hard to hear you when you&apos;re in a noisy room or
            there is a lot of noise in the background.
          </p>
          <p>
            Find a quiet place and let&apos;s keep this one-on-one for now.
          </p>
          <div className="d-grid gap-2 d-md-none d-block">
            {/* {proceedButton} */}
          </div>
        </div>
      </div>
      <Link to="/loading" className="btn primary-accent">
        Let&apos;s begin
      </Link>
    </div>
  </div>
);

export default Tutorial;

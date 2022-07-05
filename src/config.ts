/* eslint-disable import/prefer-default-export */
// @ts-expect-error TS(2307): Cannot find module './img/sm-logo-retina.webp' or ... Remove this comment to see the full error message
import smLogo from './img/sm-logo-retina.webp';

// header will not take up vertical height when transparent, so you need to be mindful of overlap
export const transparentHeader = true;
export const headerHeight = '4.2rem';
export const logo = smLogo;
export const logoAltText = 'Soul Machines logo';
export const logoLink = '/';

// background image is positioned in a way that is best for pictures of the persona's face.
// adjust spacing as necessary in Landing.js for different images
// if you want just a color, set landingBackgroundImage to null
// if desired, a gradient can also be added to landingBackgroundColor
export const landingBackgroundColor = '#fff';
export const landingBackgroundImage = null;

// if set to true, on disconnect, the app will redirect to the specified route.
// if false, it will redirect to /
export const disconnectPage = true;
export const disconnectRoute = '/feedback';

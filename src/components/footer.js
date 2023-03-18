import React from 'react';

const Footer = () => (
  <div className="app-wrapper-footer">
    <div className="app-footer">
      <div className="app-footer__inner text-center justify-content-center">
        <p className="my-0">
          {`Copyright © ${new Date().getFullYear()}`}
          {' '}
          <strong>SKULMAN</strong>
          . All rights reserved.
        </p>
      </div>
    </div>
  </div>
);

export default Footer;

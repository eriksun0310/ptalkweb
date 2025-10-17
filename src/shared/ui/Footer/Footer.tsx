import React from 'react';
import { SocialMediaLinks } from '../SocialMediaLinks';

const Footer = () => {
  return (
    <footer
      style={{
        width: '100%',
        padding: '24px 16px',
        backgroundColor: '#f8f8f8',
        // borderTop: '1px solid #e5e5e5',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <SocialMediaLinks />
        <p
          style={{
            fontSize: '14px',
            color: '#666',
            margin: 0,
            textAlign: 'center',
          }}
        >
          © 2025 PTalk. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

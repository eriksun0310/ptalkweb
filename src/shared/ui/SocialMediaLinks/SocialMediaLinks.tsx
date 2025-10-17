import React from 'react';
import { FaGlobe, FaEnvelope, FaInstagram, FaThreads } from 'react-icons/fa6';
import { CONTACT_INFO } from '../../../../shared/constants/contactInfo';

interface SocialMediaLinksProps {
  variant?: 'default' | 'small';
}

const SocialMediaLinks = ({ variant = 'default' }: SocialMediaLinksProps) => {
  const iconSize = variant === 'small' ? 18 : 22;
  const gap = variant === 'small' ? 16 : 20;
  const padding = variant === 'small' ? 4 : 6;
  const iconColor = '#f29a2e'; // Colors.logo

  const iconStyle = {
    padding: `${padding}px`,
    display: 'inline-flex',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: `${gap}px`,
      }}
    >
      <a
        href={CONTACT_INFO.website}
        target="_blank"
        rel="noopener noreferrer"
        style={iconStyle}
        aria-label="Website"
      >
        <FaGlobe size={iconSize} color={iconColor} />
      </a>
      <a
        href={`mailto:${CONTACT_INFO.email}`}
        style={iconStyle}
        aria-label="Email"
      >
        <FaEnvelope size={iconSize} color={iconColor} />
      </a>
      <a
        href={CONTACT_INFO.instagram.url}
        target="_blank"
        rel="noopener noreferrer"
        style={iconStyle}
        aria-label="Instagram"
      >
        <FaInstagram size={iconSize} color={iconColor} />
      </a>
      <a
        href={CONTACT_INFO.threads.url}
        target="_blank"
        rel="noopener noreferrer"
        style={iconStyle}
        aria-label="Threads"
      >
        <FaThreads size={iconSize} color={iconColor} />
      </a>
    </div>
  );
};

export default SocialMediaLinks;

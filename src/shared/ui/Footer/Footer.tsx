import React from 'react';
import { FaGlobe, FaEnvelope, FaInstagram, FaThreads } from 'react-icons/fa6';
import { CONTACT_INFO } from '../../../../shared/constants/contactInfo';

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="max-w-[600px] mx-auto bg-white border-t border-gray-200 py-6 px-4">
        {/* 社交媒體連結 */}
        <div className="flex justify-center items-center gap-5 mb-3">
          <a
            href={CONTACT_INFO.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="官網"
          >
            <FaGlobe size={20} />
          </a>
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Email"
          >
            <FaEnvelope size={20} />
          </a>
          <a
            href={CONTACT_INFO.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href={CONTACT_INFO.threads.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Threads"
          >
            <FaThreads size={20} />
          </a>
        </div>

        {/* 版權聲明 */}
        <p className="text-xs text-gray-400 text-center">
          © 2025 PTalk. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

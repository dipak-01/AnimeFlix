import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default () => {
  return (
    <>
      <footer className="w-full bg-gray-950 py-6 text-center text-slate-400 shadow-inner">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-2 px-4">
          <p className="text-sm">
            All rights reserved to its corresponding developer
          </p>
          <a
            href="https://github.com/dipak-01/AnimeFlix"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-red-500 hover:underline"
          >
            <span className="font-medium">Github</span>
            <FontAwesomeIcon icon={faGithub} className="text-lg" />
          </a>
        </div>
      </footer>
    </>
  );
};
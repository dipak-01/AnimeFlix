import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default () => {
  return (
    <>
      <div className=" bottom-0 mb-0 mt-auto   flex w-full items-center justify-center p-10 text-slate-300">
        <p>
          All right reservers to its corresponding developer <br />
          
          <a href="https://github.com/dipak-01/AnimeFlix" target='blank'><span  className="ml-1 text-red-600 font-medium">Github<FontAwesomeIcon icon={faGithub} className="ml-3 text-red-600" /></span>
          </a>
        </p>
      </div>
    </>
  );
};
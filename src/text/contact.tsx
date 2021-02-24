import React from 'react';
import { PageTextProps } from '../util/types';

const ContactBlock: React.FC<PageTextProps> = (props) => {
  const { baseClasses } = props;
  const className = `${baseClasses}`;
  const personalEmail = <span className="text-blue-200">smithmick14 at gmail.com</span>;
  const dinogramEmail = <span className="text-blue-200">emailodon at gmail.com</span>;
  return (
    <div>
      <p className={className}>
        Feel free to email my personal email address: {personalEmail}
      </p>
      <p className={className}>
        For Dinogram-specific queries/concerns: {dinogramEmail}
      </p>
      <p className={className}>
        For news related to the Dinogram and other random projects:
      </p>
    </div>
  );
};

const textBlocks = [ ContactBlock ];

export default textBlocks;
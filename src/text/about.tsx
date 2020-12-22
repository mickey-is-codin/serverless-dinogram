import React from 'react';
import { PageTextProps } from '../util/types';

// DODO: Make a component for individual PageText
const Intro: React.FC<PageTextProps> = (props) => {
  const { baseClasses } = props;
  const className = `${baseClasses}`;
  return (
    <p className={className}>{
      `Welcome to the new home of the Dinogram!`
    }</p>
  );
};

const NewSite: React.FC<PageTextProps> = (props) => {
  const { baseClasses } = props;
  const className = `${baseClasses}`;
  return (
    <p className={className}>{
      `
      This is the reason the Dinogram hasn't been coming for the past couple weeks.
      I wanted to make some of the information a bit more centralized. 
      `
    }</p>
  );
};

const textBlocks = [
  Intro,
  NewSite
];

export default textBlocks;
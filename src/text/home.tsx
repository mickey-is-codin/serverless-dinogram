import React from 'react';
import { PageTextProps } from '../util/types';

// DODO: Make a component for individual PageText
const Intro: React.FC<PageTextProps> = (props) => {
  const { baseClasses } = props;
  const className = `${baseClasses}`;
  return (
    <p className={className}>{
      `Welcome to old readers and new! This is the new home of the Dinogram!`
    }</p>
  );
};

const NewSite: React.FC<PageTextProps> = (props) => {
  const { baseClasses } = props;
  const className = `${baseClasses}`;
  return (
    <p className={className}>{
      `
      This site is the reason the Dinogram hasn't been coming for the past couple weeks.
      I wanted to make some of the information a bit more centralized. 
      (And maybe practice some frontend development 😉) 
      `
    }</p>
  );
};

const TimelineExplanation: React.FC<PageTextProps> = () => {
  return (
    <div className="my-8">
      <p className="text-bone">
        Dinogram articles will go in the <a href="/timeline" className="text-blue-200">Timeline</a> section.
      </p>
      <p className="text-bone">
        It's a bit of an experiment I'm putting together for storing archive info
      </p>
      <p className="text-bone">
        Please take a look and let me know what you think!
      </p>
    </div>
  );
};

const PeopleExplanation: React.FC<PageTextProps> = () => {
  return (
    <div className="my-8">
      <p className="text-bone">
        You'll also notice a <a href="/people" className="text-blue-200">People</a> section.
      </p>
      <p className="text-bone">
        This is where I'll collect interviews from some members of the paleontology community that I conduct
      </p>
      <p className="text-bone">
        A couple of these interviews are already complete and are being transcribed!
      </p>
    </div>
  );
};

const BetaSite: React.FC<PageTextProps> = (props) => {
  const { baseClasses } = props;
  const className = `${baseClasses}`;
  const personalEmailURL = 'mailto: smithmick14@gmail.com';
  const dinogramEmailURL = 'mailto: emailodon@gmail.com';
  const personalEmail = (
    <a href={personalEmailURL} className="text-blue-200">
      my personal email address, smithmick14@gmail.com
    </a>
  );
  const dinogramEmail = (
    <a href={dinogramEmailURL} className="text-blue-200">
      the Dinogram's email address, emailodon@gmail.com
    </a>
  );
  return (
    <div>
      <p className={className}>
        So with that feel free to check out the site and give me some feedback!
      </p>
      <p className={className}>
        As always, you can reach me at either {personalEmail} or {dinogramEmail}.
      </p>
    </div>
  );
};

const textBlocks = [
  Intro,
  NewSite,
  TimelineExplanation,
  PeopleExplanation,
  BetaSite,
];

export default textBlocks;
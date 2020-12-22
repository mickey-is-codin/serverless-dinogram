import React from 'react';
import { PageTextProps } from '../util/types';

const AboutOne: React.FC<PageTextProps> = (props) => {
  const { baseClasses } = props;
  const className = `${baseClasses}`;
  return (
    <p className={className}>{
      `
      The Dinogram is a project that I started a little over a year ago now. 
      I realized that, despite being pretty interested in dinosaurs I didn't really know much about them.
      I knew the basics like T. rex and Triceratops, but wanted to learn about more of them and 
      some of the history around how dinosaurs were discovered.
      `
    }</p>
  );
};

const AboutTwo: React.FC<PageTextProps> = (props) => {
  const { baseClasses } = props;
  const className = `${baseClasses}`;
  return (
    <p className={className}>{
      `
      Thus the Dinogram was born.
      It originated as a program that emailed myself and some close friends a new dinosaur every day. 
      The information was scraped from Wikipedia articles and sent automatically every so it got old pretty quick. 
      A lot of people seemed to think that I had been writing entire Wikipedia articles everyday so I figured 
      I might as well actually write some articles. 
      That way some of the cooler information about dinos might actually stick. 
      `
    }</p>
  );
};

const AboutThree: React.FC<PageTextProps> = (props) => {
  const { baseClasses } = props;
  const className = `${baseClasses}`;
  return (
    <p className={className}>{
      `
      So now we're at a new incarnation of this fun joke that's taken far more of my time than I'm comfortable admitting. 
      I've learned to read paleontology and paleobiology research papers. 
      I've gone down pretty deep rabbitholes looking for paleoart throughout the internet. 
      But more than anything I've had a blast getting to learn about some of the INSANE creatures that used to walk the Earth. 
      I hope that reading about them is a fraction as fun as it is to write about them. 
      `
    }</p>
  );
};

const SignOff: React.FC<PageTextProps> = (props) => {
  return (
    <>
      <p className="text-bone">Best,</p>
      <p className="text-bone">Mickey</p>
    </>
  );
};

const textBlocks = [
  AboutOne,
  AboutTwo,
  AboutThree,
  SignOff,
];

export default textBlocks;
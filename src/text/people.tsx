import React from 'react';
import { PageTextProps } from '../util/types';

const Explanation: React.FC<PageTextProps> = (props) => {
  const { baseClasses } = props;
  const className = `${baseClasses}`;
  return (
    <p className={className}>{
      `
      Since the Dinogram started one of the aspects of paleontology I've tried to emphasize is the human element.
      That's why I think it'll be fun to have a separate cache of information devoted to the people who bring us dinosaurs.
      This'll mean anything from interviews with paleontologists to random write-ups on people who discover fossils!
      `
    }</p>
  );
};

const textBlocks = [
  Explanation,
];

export default textBlocks;
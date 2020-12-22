import React from 'react';
import { PageTextProps } from '../util/types';

interface PageTextListProps {
  name: string;
  textBlocks: React.FC<PageTextProps>[];
  baseClasses: string;
};
const PageText: React.FC<PageTextListProps> = (props) => {
  const { name, textBlocks, baseClasses } = props;
  return (
    <>
      {textBlocks.map((TextBlock, ix) => {
        return (
          <TextBlock baseClasses={baseClasses} key={`text-block-${name}-${ix}`}/>
        );
      })}
    </>
  );
};

export default PageText;
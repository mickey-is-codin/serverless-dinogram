import React from 'react';
import MarkdownPost from '../../components/MarkdownPost';
import raw from 'raw.macro';

export const EricLund: React.FC = () => {
  const markdown = raw('../../markdown/people/eric-lund.md');
  return <MarkdownPost markdown={markdown} />;
};
export default EricLund;
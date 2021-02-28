import React, { useEffect, useState } from 'react';
import MarkdownPost from '../../components/MarkdownPost';

export const EricLund: React.FC = () => {
  const [ markdown, setMarkdown ] = useState('');
  useEffect(() => {
    if (!markdown) {
      getMarkdown();
    }
  }, [markdown]);
  const getMarkdown = async () => {
    const markdownFile = await import('../../markdown/people/eric-lund.md');
    const markdownImport = await fetch(markdownFile.default);
    const markdownText = await markdownImport.text();
    setMarkdown(markdownText);
    // import('../../markdown/people/eric-lund.md')
    //   .then((markdownFile) => fetch(markdownFile.default))
    //   .then((markdownImport) => markdownImport.text())
    //   .then((markdownText) => setMarkdown(markdownText));
  };
  return <MarkdownPost markdown={markdown} />;
};
export default EricLund;
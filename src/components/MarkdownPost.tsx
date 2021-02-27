import React, { useState, useEffect } from 'react';
import ReactMarkdownWithHtml from 'react-markdown/with-html';

interface MarkdownPostProps {
  importedMarkdown: string;
};
const MarkdownPost: React.FC<MarkdownPostProps> = (props) => {
  const { importedMarkdown } = props;

  console.log('importedMarkdown: ', importedMarkdown);

  const [markdownPost, setMarkdownPost] = useState('');

  useEffect(() => {
    fetch(importedMarkdown)
      .then((response) => response.text())
      .then((text) => {
        console.log('markdown post text: ', text);
        setMarkdownPost(text);
      });
  }, [importedMarkdown]);

  return (
    <div className="markdown">
      <ReactMarkdownWithHtml>{markdownPost}</ReactMarkdownWithHtml>
    </div>
  );
};
export default MarkdownPost
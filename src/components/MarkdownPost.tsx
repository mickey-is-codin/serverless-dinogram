import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownPost = (props: any) => {
  const { importedMarkdown } = props;

  const [markdownPost, setMarkdownPost] = useState('');

  useEffect(() => {
    fetch(importedMarkdown)
      .then((response) => response.text())
      .then((text) => {
        setMarkdownPost(text);
      });
  }, [importedMarkdown]);

  return (
    <div className="text-white markdown">
      <ReactMarkdown>{markdownPost}</ReactMarkdown>
    </div>
  );
};
export default MarkdownPost
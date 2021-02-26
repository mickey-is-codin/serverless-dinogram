import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownPostProps {
  importedMarkdown: string;
};
const MarkdownPost: React.FC<MarkdownPostProps> = (props) => {
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
    <div className="markdown">
      <ReactMarkdown>{markdownPost}</ReactMarkdown>
    </div>
  );
};
export default MarkdownPost
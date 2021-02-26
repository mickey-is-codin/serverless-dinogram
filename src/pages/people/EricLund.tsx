import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import markdownImport from '../../markdown/people/eric-lund.md';

const EricLund = (props: any) => {

  const [interviewMarkdown, setInterviewMarkdown] = useState('');

  useEffect(() => {
    fetch(markdownImport)
      .then((response) => response.text())
      .then((text) => {
        setInterviewMarkdown(text);
      });
  }, []);

  return (
    <div className="text-white markdown">
      <ReactMarkdown>{interviewMarkdown}</ReactMarkdown>
    </div>
  );
};
export default EricLund;
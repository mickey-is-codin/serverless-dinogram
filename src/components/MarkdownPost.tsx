import React from 'react';
import ReactMarkdownWithHtml from 'react-markdown/with-html';

interface MarkdownPostProps {
  markdown: string;
};
const MarkdownPost: React.FC<MarkdownPostProps> = (props) => {
  const { markdown } = props;

  return (
    <div className="markdown">
      <br/>
      <hr className="text-white"/>
      <ReactMarkdownWithHtml>
        {markdown}
      </ReactMarkdownWithHtml>
    </div>
  );
};
export default MarkdownPost;
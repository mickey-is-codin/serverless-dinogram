import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { PageNames } from '../util/types';
import ReactMarkdownWithHtml from 'react-markdown/with-html';

interface MarkdownPageProps {
  markdownImport: any;
};
const MarkdownPage: React.FC<MarkdownPageProps> = (props) => {
  const { markdownImport } = props;
  const [postMarkdown, setPostMarkdown] = useState('');

  useEffect(() => {
    fetch(markdownImport)
      .then((response) => response.text())
      .then((text) => {
        console.log(text);
        setPostMarkdown(text);
      });
  }, [markdownImport]);

  return (
    <>
      <Navbar pageName={PageNames.Home} />
      <div>
        <div 
          className="flex justify-around"
          style={{ 
            backgroundImage: `url("img/dirt_bg_1.jpg")`,
          }}
        >
          <div className="w-1/5"></div>
          <div className="w-3/5">
            Hello
            {/* <ReactMarkdownWithHtml children={postMarkdown} allowDangerousHtml className="markdown"/> */}
          </div>
          <div className="w-1/5"></div>
        </div>
      </div>
    </>
  );
};

export default MarkdownPage;
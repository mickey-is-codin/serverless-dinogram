import React from 'react';
import MarkdownPost from '../../components/MarkdownPost';
import markdownImport from '../../markdown/people/eric-lund.md';

export const EricLund: React.FC = () => <MarkdownPost importedMarkdown={markdownImport} />;
export default EricLund;
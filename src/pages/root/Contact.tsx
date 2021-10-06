import React from 'react';
import PageContainer from '../../components/PageContainer';
import { PageNames } from '../../util/types';
import PageText from '../../components/PageText';
import textBlocks from '../../text/contact';
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillLinkedin,
} from 'react-icons/ai';
import { IconType } from 'react-icons/lib';

interface SocialMediaIconProps {
  href: string;
  IconComponent: IconType;
};
const SocialMediaIcon: React.FC<SocialMediaIconProps> = (props) => {
  const { href, IconComponent } = props;
  const className = "flex-0 hover:bg-green-500 cursor-pointer mx-2 rounded-md";
  return (
    <a href={href}>
      <IconComponent className={className} size={36} />
    </a>
  );
};

const About: React.FC = () => {
  return (
    <PageContainer pageName={PageNames.CONTACT}>
      <h1 className="text-3xl text-bone">Contact</h1>
      <h1 className="text-2xl text-bone">How to get in touch...</h1>
      <PageText 
        name="contact"
        textBlocks={textBlocks}
        baseClasses="text-bone my-4"
      />
      <div className="text-bone flex-0 flex my-2 ml-auto">
        <SocialMediaIcon 
          href="https://github.com/mickey-is-codin"
          IconComponent={AiFillGithub}
        />
        <SocialMediaIcon 
          href="https://twitter.com/mickey_is_codin"
          IconComponent={AiFillTwitterCircle}
        />
        <SocialMediaIcon 
          href="https://www.instagram.com/mickey_is_codin/"
          IconComponent={AiFillInstagram}
        />
        <SocialMediaIcon 
          href="https://www.linkedin.com/in/mickeysmith2300/"
          IconComponent={AiFillLinkedin}
        />
      </div>
    </PageContainer>
  );
};

export default About;
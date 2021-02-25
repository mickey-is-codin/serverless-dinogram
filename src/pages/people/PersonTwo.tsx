import React from 'react';

const PersonTwo = (props: any) => {
  console.log('person two rendered');
  const { match } = props;
  console.log('match: ', match);
  return (
    <div
      className="text-white"
    >
      Person Three
    </div>
  );
};
export default PersonTwo;
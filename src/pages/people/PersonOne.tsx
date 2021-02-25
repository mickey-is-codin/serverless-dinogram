import React from 'react';

const PersonOne = (props: any) => {
  console.log('person one rendered');
  const { match } = props;
  console.log('match: ', match);
  return (
    <div
      className="text-white"
    >
      Person One
    </div>
  );
};
export default PersonOne;
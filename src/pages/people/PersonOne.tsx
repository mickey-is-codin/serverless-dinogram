import React from 'react';

const PersonOne = (props: any) => {
  console.log('person one rendered');
  const { match } = props;
  console.log('match: ', match);
  return <div className="text-white">Person 1</div>;
};
export default PersonOne;
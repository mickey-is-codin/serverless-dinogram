import React from 'react';

const PersonThree = (props: any) => {
  console.log('person three rendered');
  const { match } = props;
  console.log('match: ', match);
  return <div className="text-white">Person 3</div>;
};
export default PersonThree;
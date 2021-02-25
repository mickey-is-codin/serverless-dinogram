import React from 'react';

const PersonThree = (props: any) => {
  console.log('person three rendered');
  const { match } = props;
  console.log('match: ', match);
  return <div>Person 3</div>;
};
export default PersonThree;
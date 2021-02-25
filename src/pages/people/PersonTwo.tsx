import React from 'react';

const PersonTwo = (props: any) => {
  console.log('person two rendered');
  const { match } = props;
  console.log('match: ', match);
  return <div>Person 2</div>;
};
export default PersonTwo;
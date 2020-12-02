import React from 'react';
import './App.css';

const Thing = (props: any) => {
  return (<div className="thing">{`Hello ${props.number}`}</div>);
};

const App = () => {
  return (
    <>
      <Thing number={1}/>
      <Thing number={2}/>
      <Thing number={3}/>
      <Thing number={4}/>
      <Thing number={5}/>
      <Thing number={6}/>
      <Thing number={7}/>
      <Thing number={8}/>
    </>
  );
};

export default App;

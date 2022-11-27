import React from 'react'
import Content from './components/Content/Content';
import Header from './components/Header/Header';

function App() {
  return ( 
    <div style={style.body} >
      <Header/>
      <Content/>
    </div>
  );
}

export default App;

const style={
  body:{
    backgroundColor: 'grey',
    width:'100vw',
    height:'100vh'
  },
}
import React from 'react'
import Content from './components/Content/Content';
import Header from './components/Header/Header';

function App() {
  return (
    <div style={style.body} >
      <header style={style.header}>
        <Header />
      </header>
      <main style={style.content}>
        <Content />
      </main>
      <footer style={style.footer}>
        <p>@By Denys Vynohradnyi, 2022</p>
      </footer>
    </div>
  );
}

export default App;

const style = {
  body: {
    display: 'flex',
    backgroundColor: 'grey',
    flexDirection: 'column',
    height:'100vh',
  },
  header:{
    display: 'flex',
    flex: '2 1 0%',
    alignItems: 'center',
    justifyContent: "space-between",
    backgroundColor: 'grey',
    height:'100%',
  },
  content:{
    display:'flex',
    flex: '15 1 0%',
    flexDirection:'row',
    backgroundColor:'#aaa',
    borderTop: '1px solid black',
    overflow: 'hidden'
  },
  footer:{
    display:'flex',
    flex: '1 1 0%',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#333',
    color:'gray',
    borderTop:"1px solid black",
    textShadow:'1px 1px 1px black'
  }
}
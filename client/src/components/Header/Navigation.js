import { NavLink } from 'react-router-dom';

export const Navigation = (props) => {

  return (
    <nav style={{ display: 'flex', alignItems:'center'}}>
      <NavLink to="/file-loader" style={{...style.item, justifyContent: "center"}}>
        <img src="https://i.ibb.co/42GDgLt/Paper-Waste.png" alt="logo" width="50px" height="50px" />
      </NavLink>
      {[{ to: "/home", title: "Welcome" }, { to: "/mailer", title: "Mailer" }, { to: "", title: "Files" }].map((elem, index) => (
        <NavigationItem {...elem} index={index} />
      ))}
    </nav>
  )
}

// path={["/home","/offers", "/counterparties", "/staff"]}

const NavigationItem = ({ to, title, index }) => {
  return (<>
    <NavLink to={to} key={index} style={style.item}>
      <span>{title}</span>
    </NavLink>
  </>)
}

const style = {
  header: {
    backgroundColor: 'grey',
    width: "100%",
    height: "100px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: "flex-start",
    borderBottom: '1px solid black'
  },
  item: {
    display: 'flex',   
    alignItems:'center',
    justifyContent: "flex-start",
    width: '150px',
    height:'70px',
    backgroundColor: 'lightgray',
    borderTopRightRadius:'35px',
    borderTopLeftRadius:'10px',
  }
}
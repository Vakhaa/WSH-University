import { NavLink } from 'react-router-dom';

export const Navigation = (props) => {

  return (
    <nav style={{ display: 'flex', alignItems: 'center' }}>
      <NavLink to="/home" style={({ isActive }) => ({
        ...style.item, boxShadow: isActive ? '1px -2px 5px black' : 'unset', justifyContent: 'center'
      })}>
        <img src="https://i.ibb.co/42GDgLt/Paper-Waste.png" alt="logo" width="50px" height="50px" />
      </NavLink>
      {props.isLogin && [{ to: "files", title: "Files" }, { to: "/tags", title: "Tags" }, { to: "/groups", title: "Groups" }, { to: "/settings", title: "Settings" }].map((elem, index) => (
        <NavigationItem {...elem} index={index} />
      ))}
    </nav>
  )
}

// path={["/home","/offers", "/counterparties", "/staff"]}

const NavigationItem = ({ to, title, index }) => {
  return (<>
    <NavLink to={to} key={index} style={({ isActive }) => ({
      ...style.item, boxShadow: isActive ? '1px -2px 5px black' : 'unset'
    })}>
      <p style={{ marginLeft: '5px' }}>{title}</p>
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
    alignItems: 'center',
    justifyContent: "flex-start",
    width: '150px',
    height: '70px',
    marginLeft: '2px',
    backgroundColor: 'lightgray',
    borderTopRightRadius: '35px',
    borderTopLeftRadius: '10px',
    textDecoration: 'none',
    color: 'black'
    // padding: '5px'
  },
}
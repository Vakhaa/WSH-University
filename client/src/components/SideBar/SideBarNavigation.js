import { NavLink, useLocation } from "react-router-dom";


const SideBarNavigation = (props) => {

  let location = useLocation();
  let isActiveExplorer = location.pathname.split('/')[2] != "description";

  return (<>
    <nav style={style.explorer_navigation}>
      <NavLink to={`/${location.pathname.split('/')[1]}`} style={{
        ...style.navigaton_button, boxShadow: isActiveExplorer ? '1px -2px 5px black' : 'unset'
      }}>
        <p style={{ marginLeft: '5px' }}>Explorer</p>
      </NavLink>
      <NavLink to={`/${location.pathname.split('/')[1]}/description`} style={{
        ...style.navigaton_button, boxShadow: !isActiveExplorer ? '1px -2px 5px black' : 'unset'
      }}>
        <p style={{ marginLeft: '5px' }}>Description</p>
      </NavLink>
    </nav>
  </>)
}

export default SideBarNavigation;

const style = {
  explorer_navigation: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    // padding: '15px 15px 0 0',
    borderBottom: '1px solid black',
    backgroundColor: '#aaa',
    height: '45px',
  },
  navigaton_button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: "flex-start",
    width: '150px',
    height: '35px',
    paddingLeft: '2px',
    backgroundColor: 'gray',
    borderTopRightRadius: '35px',
    borderTopLeftRadius: '10px',
    textDecoration: 'none',
    color: 'black'
  }

} 

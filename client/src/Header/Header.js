import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <>
    <header>
      <NavLink to={"/home"} key={0} >
        <span>Welcome</span> 
      </NavLink>
      <NavLink to={"/mailer"} key={1} >
        <span>Mailer</span> 
      </NavLink>
      <NavLink to={"/file-loader"} key={2} >
        <span>Files</span> 
      </NavLink> 
    </header>
    </>
  );
}

export default Header;


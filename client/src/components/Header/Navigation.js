import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import {
  logoutAction
} from '../../redux/features/authentication/authenticationsAction'

export const Navigation = (props) => {

  const dispatch = useDispatch();


  return (<nav>
    <NavLink to="/home" key={0} >
        <span>Welcome</span> 
      </NavLink>
      <NavLink to="/mailer" key={1} >
        <span>Mailer</span> 
      </NavLink>
      <NavLink to="/file-loader" key={2} >
        <span>Files</span> 
      </NavLink> 
      <NavLink to="/" key={3} onClick={()=>dispatch(logoutAction())}>
        <span>Logout</span>
      </NavLink>
  </nav>)
}

// path={["/home","/offers", "/counterparties", "/staff"]}
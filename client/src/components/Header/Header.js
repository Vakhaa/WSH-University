import { useSelector, useDispatch } from 'react-redux'
import { loginAction } from '../../redux/features/authentication/authenticationsAction'
import { MiniProfile } from './MiniProfile';
import { Navigation } from './Navigation';
import {
  logoutAction
} from '../../redux/features/authentication/authenticationsAction'
import { NavLink } from 'react-router-dom';

function Header() {
  const isLogin = useSelector(state => state.auth.isLogin);
  const dispatch = useDispatch();

  return (
    <>
      <header style={style.header}>
        <div style={{ alignSelf:'flex-end'}}>
          {/* clear ! */}
          {isLogin && <Navigation />}
        </div>
        <div style={style.iam_and_logout}>
          {isLogin ? <MiniProfile /> : <Login login={() => dispatch(loginAction())} />}
          {isLogin && <>
            <NavLink to="/" key={3} onClick={() => dispatch(logoutAction())}>
              <span>Logout</span>
            </NavLink>
          </>}
        </div>
      </header>
    </>
  );
}

export default Header;

const style = {
  header: {
    backgroundColor: 'grey',
    width: "100%",
    height: "100px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: "space-between",
    borderBottom: '1px solid black'

  },
  signin: {
    width: "150px",
    height: "35px",
    cursor: "pointer",
    marginRight: "15px"
  },
  iam_and_logout: {
    // marginLeft: '75%'
    // display:'flex'
  }
}

const SIGNIN_PHOTO_URL = "https://4.bp.blogspot.com/-tjAWzkiPuLc/VkTU_D9IwbI/AAAAAAAACUg/_dNxgUbTV_Q/s400/signin.png"

const Login = ({ login }) => {
  return (<>
    <div>
      <img onClick={login} style={style.signin} alt="sign in via google" src={SIGNIN_PHOTO_URL} />
    </div>
  </>)
}
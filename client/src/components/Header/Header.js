import { useSelector, useDispatch } from 'react-redux'
import { loginAction } from '../../redux/features/authentication/authenticationsAction'
import { MiniProfile } from './MiniProfile';
import { Navigation } from './Navigation';
import {
  logoutAction
} from '../../redux/features/authentication/authenticationsAction'

function Header() {
  const isLogin = useSelector(state => state.auth.isLogin);
  const dispatch = useDispatch();

  return (
    <>
      <div style={{ alignSelf: 'flex-end' }}>
        {/* clear ! */}
        <Navigation isLogin={isLogin} />
      </div>
      <div style={style.iam_and_logout}>
        {isLogin ? <MiniProfile logout={() => dispatch(logoutAction())} /> : <Login login={() => dispatch(loginAction())} />}
      </div>
    </>
  );
}

export default Header;

const style = {
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
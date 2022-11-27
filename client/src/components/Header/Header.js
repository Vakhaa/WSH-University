import { useSelector, useDispatch } from 'react-redux'
import { loginAction } from '../../redux/features/authentication/authenticationsAction'
import { MiniProfile } from './MiniProfile';
import { Navigation } from './Navigation';

function Header() {
  const isLogin = useSelector(state => state.auth.isLogin);
  const dispatch = useDispatch();
 
  return (
    <>
    <header style={style.header}>
      {/* logo */}
      <div style={style.logo}>
        <img src="https://s2.abcstatics.com/Media/201201/12/OBJ4029626_1--478x440.jpg" alt="logo" width="50px" height="50px"/>
      </div>
      <div style={style.iam_and_menu}>
        {isLogin ? <MiniProfile />: <Login login={()=>dispatch(loginAction())}/>}
        {isLogin && <Navigation />}   
      </div>
    </header>
    </>
  );
}

export default Header;

const style = {
  header:{
    backgroundColor: 'grey', 
    width:"100%", 
    height:"100px", 
    display:'flex', 
    alignItems:'center', 
    justifyContent: "space-between",
    borderBottom:'1px solid black'

  },
  logo:{
    marginLeft:'15px'
  },
  signin:{
    width:"150px",
    height:"35px",
    cursor:"pointer",
    marginRight:"15px"
  },
  iam_and_menu:{
    // display:'flex'
  }
}

const SIGNIN_PHOTO_URL = "https://4.bp.blogspot.com/-tjAWzkiPuLc/VkTU_D9IwbI/AAAAAAAACUg/_dNxgUbTV_Q/s400/signin.png"

const Login = ({login}) => {
  return (<>
  <div>
    <img onClick={login} style={style.signin} alt="sign in via google" src={SIGNIN_PHOTO_URL}/>
  </div>
  </>)
}
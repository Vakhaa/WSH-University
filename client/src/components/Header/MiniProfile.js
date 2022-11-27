import { useSelector } from 'react-redux'

export const MiniProfile = (props) => {
  const user = useSelector(state => state.auth.user);
 
  return (<>
    <div style={style.mini_profile}>
      <p style={{marginRight:"15px"}}>{user.displayName}</p>
      <img style={style.mini_avatar} src={user.photoURL} alt="My avatar"/>
    </div>
  </>)
}

const style = {
  mini_profile:{
    display: "flex",
    marginRight:"15px"
  },
  mini_avatar:{
    width:"50px",
    height:"50px",
    borderRadius:"30px"
  }
}
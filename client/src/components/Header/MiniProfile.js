import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';

export const MiniProfile = (props) => {
  const user = useSelector(state => state.auth.user);

  return (<>
    <div style={style.mini_profile}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <p style={{ marginRight: "15px" }}>{user.fullName}</p>
        <NavLink to="/" key={3} onClick={props.logout} style={style.logout}>
          <span>Logout</span>
        </NavLink>
      </div>
      <img style={style.mini_avatar} src={user.photo} alt="My avatar" />
    </div>
  </>)
}

const style = {
  mini_profile: {
    display: "flex",
    marginRight: "15px",
    justifyContent: 'center',
    alignItems: 'center',
  },
  mini_avatar: {
    width: "70px",
    height: "70px",
    borderRadius: "50%"
  },
  logout: {
    padding: '5px',
    width: 'fit-content',
    marginBottom: '5px',
    marginRight: '15px',
    color: 'black',
    backgroundColor: 'lightgray',
    textDecoration: 'unset',
    borderRadius: '25px',
  }
}
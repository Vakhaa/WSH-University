import {useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addFileAction} from '../../redux/features/files/filesAction'


function Filer({path}) {

  const userId = useSelector(state => state.auth.user._id);
  const dispatch = useDispatch();

  var loadFile = useCallback((event) => {

    let folders = "";
    path.url.forEach( item => folders += item+"/");    
      

    if(event.target.files[0]){
      console.log("folders -> ", folders);
        dispatch(addFileAction(event.target.files[0], userId, folders));
    };

  },[path]);

  return (<>
  <div style={style.file_loader}>
    <label htmlFor="upload">
      <img src="https://cdn-icons-png.flaticon.com/512/2088/2088591.png" style={style.file_loader_body}/>
      <input type="file" id="upload" style={{display:"none"}} onChange={loadFile}/>
    </label>
  </div>
  </>);
}

export default Filer;

const style = {
  file_loader:{
    display:'block',
    width:"100px", 
    height:"100px", 
    marginLeft: "50px",
    marginTop: "15px", 
  },
  file_loader_body:{
    width:'100px',
    height:'100px',
    cursor:"pointer"
  }
}
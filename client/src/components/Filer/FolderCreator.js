import {useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addFolderAction} from '../../redux/features/files/filesAction'


function FolderCreator({path}) {

  const dispatch = useDispatch();

  var createFolder = useCallback(() => {

    let folders = "";
    path.url.forEach( item => folders += item+"/");          

    let fileName = "example" + Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');

    dispatch(addFolderAction(folders, fileName));

  },[path]);

  return (<>
  <div style={style.file_loader} onClick={createFolder}>
    <img src="https://img.icons8.com/ios/512/add-folder.png" style={style.file_loader_body}/>
  </div>
  </>);
}

export default FolderCreator;

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
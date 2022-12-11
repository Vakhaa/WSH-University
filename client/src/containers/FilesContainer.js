import {useEffect, useState} from 'react'
import FilesList from '../components/Filer/FilesList';
import Filer from '../components/Filer/Filer';

import { useSelector, useDispatch } from 'react-redux'
import { getFilesAction} from '../redux/features/files/filesAction'
import { selectFiles } from '../redux/features/files/filesSlice'
import { Outlet } from 'react-router-dom';
import FolderCreator from '../components/Filer/FolderCreator';

function FilesContainer() {
  
    
    const files = useSelector(selectFiles);
    const userId = useSelector(state => state.auth.user._id);

    const [path, setPath] = useState({
      level:0,
      url:["media", userId]
    });

    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getFilesAction(userId));
    },[]);

    const goToFolder = (nextFolder) =>{
      let url = path.url;
      url.push(nextFolder);
      setPath({
        level: path.level+1,
        url
      })
    }

    const backFromFolder = () =>{
      let url = path.url;
      
      url.pop();
      setPath({
        level: path.level-1,
        url
      })
    }


  return (
  <div style={{display:"flex", justifyContent:"space-between", alignItems:'start'}}>
    <div style={style.files_container}>
      {files.length != 0 && <FilesList files={files} path={path} goToFolder={goToFolder} backFromFolder={backFromFolder}/>}
      <Filer path={path}/>
      <FolderCreator path={path}/>
      {files.length == 0 && <h4> You don't have the files</h4>}
    </div>
    <Outlet />
  </div>
  );
}

export default  FilesContainer;

const style = {
  files_container:{
    display:'flex', 
    alignItems:'center', 
  }
}

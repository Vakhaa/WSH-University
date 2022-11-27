import {useEffect} from 'react'
import FilesList from '../components/Filer/FilesList';
import Filer from '../components/Filer/Filer';

import { useSelector, useDispatch } from 'react-redux'
import { getFilesAction} from '../redux/features/files/filesAction'
import { selectFiles } from '../redux/features/files/filesSlice'
import { Outlet } from 'react-router-dom';


function FilesContainer() {
  
    const files = useSelector(selectFiles);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getFilesAction());
    },[]);

  return (
  <div style={{display:"flex", justifyContent:"space-between", alignItems:'start'}}>
    <div style={style.files_container}>
      {files.length != 0 && <FilesList files={files}/>}
      <Filer />
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

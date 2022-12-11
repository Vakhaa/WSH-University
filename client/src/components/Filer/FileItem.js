import axios from 'axios'
import { useCallback } from 'react';
import { useDispatch } from 'react-redux'
import {deleteFileAction} from '../../redux/features/files/filesAction'

const FileItem = ({file, path}) => {
  console.log("FilesItem")
  const dispatch = useDispatch();
  
    // it's also must be in redux
  var downloadFile = useCallback(async () => {
    
    let folders = "";
    path.url.forEach( item => folders += item+"/");    
    
    let response = await axios({
    url: "http://localhost:5000/file/" + file.name,
    headers:{
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "path": folders
    },
    responseType: "blob" 
    })

    // I'm agree. Isn't good enogh solution. But it's still work.
    const url = window.URL.createObjectURL(new Blob([response.data]));
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      file.name,
    );

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);

  }, []);

  var deleteFile = useCallback(async () => {
    let folders = "";
    path.url.forEach( item => folders += item+"/");    
    
    dispatch(deleteFileAction(file.name, folders))
  },[]);

  return (<div style={style.file_item}>
    <div style={style.file} onClick={downloadFile}>
      <img src="https://cdn-icons-png.flaticon.com/512/101/101671.png" style={style.file_body}/>
      <span>
        <p>
          {file.name}
        </p>
      </span>
    </div>
    <div style={style.file_options}>
      {/* other options... */}
      <span>
        <button onClick={deleteFile}>Delete</button>
      </span>
    </div>
  </div>);
}

export default FileItem;

const style = {
  file_item:{
    display:"flex", 
    border:"1px solid black", 
    borderRadius:"15px",
    alignItems:'center',
    marginLeft: "15px",
  },
  file:{
    marginTop: "15px", 
    marginLeft: "15px",
    display:'flex',
    flexDirection:'column',
    cursor:'pointer'
  },
  file_body:{
    width:"100px", 
    height:"100px", 
    // justifyContent: "space-between"
  },
  file_options:{
    display:'flex',
    flexDirection:'column'

  },
  file_title:{

  }
}
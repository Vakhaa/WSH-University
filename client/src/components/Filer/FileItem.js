import axios from 'axios'
import { useCallback } from 'react';
import { useDispatch } from 'react-redux'
import {deleteFileAction} from '../../redux/features/files/filesAction'

const FileItem = ({file}) => {
  console.log("FilesItem")
  const dispatch = useDispatch();
  
    // it's also must be in redux
  var downloadFile = useCallback(async () => {
    let response = await axios({
    url: "http://localhost:5000/file/" + file.name.split('/')[1],
    headers:{
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
    responseType: "blob" 
    })

    // I'm agree. Isn't good enogh solution. But it's still work.
    const url = window.URL.createObjectURL(new Blob([response.data]));
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      file.name.split('/')[1],
    );

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);

  }, []);

  var deleteFile = useCallback(async () => {
    dispatch(deleteFileAction(file.name.split('/')[1]))
  },[]);

  return (<>
  <div>
    <span>
      <a href="#"  onClick={downloadFile}>
        {file.name.split('/')[1]}
      </a>
    </span>
    <span>
      <button onClick={deleteFile}>Delete</button>
    </span>
  </div>
  </>);
}

export default FileItem;

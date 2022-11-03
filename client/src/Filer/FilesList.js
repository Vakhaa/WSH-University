import {useLayoutEffect, useState} from 'react'
import axios from 'axios'

function FilesList() {

  let [files, setFiles] = useState([]);

  useLayoutEffect(()=>{
    refreshFilesList();
  },[]);

  let refreshFilesList = async () => {
    let response = await axios.get("http://localhost:5000/file/all_names",{
      headers:{
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    });

    setFiles(response.data);
  }

  

  return (<>
  <div>
    {files.length == 0? "You not added file yet!":
      files.map((item, index)=>{
        return <FileItem file={item} key={index} />
      })
    }
  </div>
  </>);
}

export default FilesList;


const FileItem = ({file}) => {

  var takeStaticFile = async () => {
    let response = await axios({
      url: "http://localhost:5000/file/" + file,
      headers:{
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      responseType: "blob" 
    });

    // I'm agree. Isn't good enogh solution. But it's still work.
    const url = window.URL.createObjectURL(new Blob([response.data]));
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      file,
    );

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
  }
 
  var deleteStaticFile = async () => {
    await axios.delete("http://localhost:5000/file/" + file, {
      headers:{
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    });
  }

  return (<>
  <div>
    <span>
      <a href="#"  onClick={takeStaticFile}>
        {file}
      </a>
    </span>
    <span>
      <button onClick={deleteStaticFile}>Delete</button>
    </span>
  </div>
  </>);
}
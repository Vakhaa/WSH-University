import axios from 'axios'
import {
  fileAdded,
  filesGet,
  fileDelete,
  folderAdded
} from './filesSlice'

// const response = await userAPI.fetchById(userId);

// the outside "thunk creator" function
export const addFileAction = (file,userId, path) => {
  return async (dispatch, getState) => {
    try {
      // const response = await userAPI.fetchById(userId);
      let form = new FormData();
      form.append("file", file);
  
      let result = await axios({
        url: "http://localhost:5000/file",
        method:'POST',
        headers:{
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "path":path
        },
        data:form
      });

      if(result.status == 201) {
        setTimeout(async ()=>{
          const response = await axios.get("http://localhost:5000/file/meta/" + file.name, {
          headers:{
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "path":path,
            "isfolder": false
          }
        });

        dispatch(fileAdded(response.data));
        },"1000");
      }else{
        // another dispatch with failed
        console.log("ypu fiald me")
      }
      
    } catch (err) {
      console.log(err.message);
    }
  }
}

export const deleteFileAction = (filename, path) => {
  return async (dispatch, getState) => {
    try {
      await axios.delete("http://localhost:5000/file/" + filename, {
      headers:{
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "path": path
      },
    });
      
      dispatch(fileDelete({path, name:filename}));

    } catch (err) {
      console.log(err.message);
    }
  }
}

export const getFilesAction = (userId) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get("http://localhost:5000/file/all_names",{
        headers:{
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "userId": userId
        },
      });
      
      dispatch(filesGet(response.data));

    } catch (err) {
      console.log(err.message);
    }
  }
}

export const addFolderAction = ( path, folderName) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post("http://localhost:5000/file/folder",{
        path: path+folderName + "/"
      },{
        headers:{
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        },
      });
      
      if(response.status != 204) return;

      const folder = await axios.get("http://localhost:5000/file/meta/"+ folderName,{
        headers:{
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "path": path,
          "isfolder": true
        },
      });
      console.log(folder.data);
      dispatch(folderAdded(folder.data));

    } catch (err) {
      console.log(err.message);
    }
  }
}

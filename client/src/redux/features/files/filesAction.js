import axios from 'axios'
import {
  fileAdded,
  filesGet,
  fileDelete
} from './filesSlice'

// const response = await userAPI.fetchById(userId);

// the outside "thunk creator" function
export const addFileAction = file => {
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
        },
        data:form
      });
      console.log("file action", file);
      if(result.status == 201) {
        setTimeout(async ()=>{
          const response = await axios.get("http://localhost:5000/file/meta/" + file.name, {
          headers:{
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
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

export const deleteFileAction = (filename) => {
  return async (dispatch, getState) => {
    try {
      await axios.delete("http://localhost:5000/file/" + filename, {
      headers:{
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    });
      
      dispatch(fileDelete(filename));

    } catch (err) {
      console.log(err.message);
    }
  }
}

export const getFilesAction = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get("http://localhost:5000/file/all_names",{
        headers:{
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      });
      
      dispatch(filesGet(response.data));

    } catch (err) {
      console.log(err.message);
    }
  }
}
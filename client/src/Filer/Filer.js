import {useLayoutEffect, useState} from 'react'
import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import FormData from 'form-data';

function Filer() {

  let [file, setFile] = useState("");
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

  let sendFile = async () => {
    let form = new FormData();
    form.append("file", file);

    let response = await axios({
      url: "http://localhost:5000/file/upload",
      method:'POST',
      headers:{
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      data:form
    });

    if(response.data) await refreshFilesList();
  }

  var loadFile = function(event) {
        
    if(event.target.files[0]){
        setFile(event.target.files[0]);
    }
    
};

  var takeStaticFile = async (e, item) => {
    let response = await axios({
      url: "http://localhost:5000/file/" + item,
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
      item,
    );

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
  }

  return (<>
  <div>
    <input name="file" type="file" onChange={loadFile}  />
    {/* <Field name="file" type="file" accept="image/*" onChange={loadFile}  /> */}
    <button type="submit" onClick={sendFile}>
      Submit
    </button>
  </div>
  <div>
    {files.length == 0? "You not added file yet!":
      files.map((item, index)=>{
        return <div><a href="#" key={index} 
        onClick={
          async (e)=> await takeStaticFile(e.currentTarget.cl, item)
        }>{item}</a></div>
      })
    }
  </div>
  </>);
}

export default Filer;


// <Formik
// enableReinitialize
// // initialValues={getInitData()}
// onSubmit={(values,{ setSubmitting }) => {
//   setTimeout(() => {
//     sendFile(file);
//     setSubmitting(false);
//   }, 400);
// }}>
// { ({values, setValues, isSubmitting}) => (
//     <Form>
//       <ErrorMessage name="file" component="div" />
//<input name="file" type="file" onChange={loadFile}  />
/* <Field name="file" type="file" accept="image/*" onChange={loadFile}  /> */
//<button type="submit" disabled={isSubmitting}>
//   Submit
// </button>

//     </Form>
// )}
// </Formik>
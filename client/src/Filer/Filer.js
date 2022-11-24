import {useState} from 'react'
import axios from 'axios'
import FormData from 'form-data';
import FilesList from './FilesList';

function Filer() {

  let [file, setFile] = useState("");

  let sendFile = async () => {
    let form = new FormData();
    form.append("file", file);

    let response = await axios({
      url: "http://localhost:5000/file",
      method:'POST',
      headers:{
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      data:form
    });

    // if(response.data) await refreshFilesList(); // it must be props.refreshFilesList()
  };

  var loadFile = function(event) {
        
    if(event.target.files[0]){
        setFile(event.target.files[0]);
    }
    
  };

  return (<>
  <div>
    <input name="file" type="file" onChange={loadFile}  />
    {/* <Field name="file" type="file" accept="image/*" onChange={loadFile}  /> */}
    <button type="submit" onClick={sendFile}>
      Submit
    </button>
  </div>
  <FilesList/>
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
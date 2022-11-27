import {useCallback, useEffect, useLayoutEffect} from 'react'
import FilesList from '../components/Filer/FilesList';
import Filer from '../components/Filer/Filer';

import { useSelector, useDispatch } from 'react-redux'
import {
  getFilesAction
} from '../redux/features/files/filesAction'
import { selectFiles } from '../redux/features/files/filesSlice'


function FilesContainer() {
  
    const files = useSelector(selectFiles);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getFilesAction());
    },[]);

  return (<>
    <Filer />
    {files.length == 0? "You do not added file yet!": <FilesList files={files}/>}
  </>);
}

export default  FilesContainer;


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

import Mailer from '../Mailer/Mailer'
import {
  Routes,
  Route,
} from "react-router-dom";
import FilesContainer from '../../containers/FilesContainer';


function Content() {
  return (
  <Routes>
    <Route path="/mailer" element={<Mailer/>}>
      <Route path="explorer" element={<TempElement name={"explorer"}/>}/>
      <Route path="description" element={<TempElement name={"description"}/>}/>
    </Route>
    <Route path="/file-loader" element={<FilesContainer/>}>
      <Route path="" element={<TempElement name={"explorer"}/>}/>
      <Route path="explorer" element={<TempElement name={"explorer"}/>}/>
      <Route path="description" element={<TempElement name={"description"}/>}/>
    </Route>
    <Route path="/home" element={<h1>Home</h1>}/>
    <Route path="/" element={<h1>Home</h1>}/>
  </Routes>
  );
}

export default Content;

const TempElement = ({name}) => {

  return <div style={style.block}><h1>{name}</h1></div>
}

const style = {
  block: {
    width:"20vw",
    height:"87vh",
    borderLeft:"1px solid black",
    backgroundColor:'white'
  }
} 

// import {ErrorMessage, Field, Form, Formik} from 'formik'
// <Formik
//         enableReinitialize
//         initialValues={getInitData()}
//         onSubmit={(values,{ setSubmitting }) => {
//         setTimeout(() => {
//             sendFile(file);
//             setSubmitting(false);
//         }, 400);
//         }}>
//         { ({values, setValues, isSubmitting}) => (
//         <Form>
//             <ErrorMessage name="file" component="div" />
//             <Field name="file" type="file" accept="image/*" onChange={loadFile}  />
//             <button type="submit" disabled={isSubmitting}>
//             Submit
//             </button>
//         </Form>
//         )}
//     </Formik>
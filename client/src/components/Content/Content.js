import {
  Routes,
  Route,
} from "react-router-dom";
import FilesContainer from '../../containers/FilesContainer';
import Explorer from '../SideBar/Explorer/Explorer';
import Description from '../SideBar/Description/Description';
import Home from '../Home/Home';


function Content() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/files" element={<FilesContainer />}>
        <Route index element={<Explorer />} />
        <Route path="description" element={<Description />} />
      </Route>
      <Route path="/tags" element={<>Tags</>}>
        <Route index element={<Explorer />} />
        <Route path="description" element={<Description />} />
      </Route>
      <Route path="/groups" element={<>Groups</>}>
        <Route index element={<Explorer />} />
        <Route path="description" element={<Description />} />
      </Route>
      <Route path="/settings" element={<>Settings</>}>
        <Route index element={<Explorer />} />
        <Route path="description" element={<Description />} />
      </Route>
    </Routes>
  );
}

export default Content;

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
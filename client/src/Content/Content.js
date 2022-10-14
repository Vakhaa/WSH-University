import Mailer from '../Mailer/Mailer'
import {
  Routes,
  Route,
} from "react-router-dom";

function Content() {
  return (
  <Routes>
    <Route path="/mailer" element={<Mailer/>}/>
    <Route path="/file-loader" element={<></>}/>
    {/* <FileLoader/> */}
    <Route path="*" element={<h1>Hello my dear friend :)</h1>}/>
  </Routes>
  );
}

export default Content;

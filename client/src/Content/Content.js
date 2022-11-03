import Mailer from '../Mailer/Mailer'
import {
  Routes,
  Route,
} from "react-router-dom";
import Filer from '../Filer/Filer';

function Content() {
  return (
  <Routes>
    <Route path="/mailer" element={<Mailer/>}/>
    <Route path="/file-loader" element={<Filer/>}/>
    {/* <Route path="*" element={<h1>Hello my dear friend :)</h1>}/> */}
  </Routes>
  );
}

export default Content;

import {useCallback, useState} from 'react'
import { useDispatch } from 'react-redux'
import {addFileAction} from '../../redux/features/files/filesAction'


function Filer(props) {

  let [file, setFile] = useState("");
  const dispatch = useDispatch();

  var loadFile = useCallback((event) => {
    if(event.target.files[0]){
        setFile(event.target.files[0]);
    }
  },[]);

  return (<>
  <div>
    <input name="file" type="file" onChange={loadFile}  />
    {/* <Field name="file" type="file" accept="image/*" onChange={loadFile}  /> */}
    <button type="submit" onClick={()=>dispatch(addFileAction(file))}>
      Submit
    </button>
  </div>
  </>);
}

export default Filer;

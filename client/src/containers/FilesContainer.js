import { useEffect, useState } from 'react'
import FilesList from '../components/Filer/FilesList';
import Filer from '../components/Filer/Filer';

import { useSelector, useDispatch } from 'react-redux'
import { getFilesAction } from '../redux/features/files/filesAction'
import { selectFiles } from '../redux/features/files/filesSlice'
import { Outlet } from 'react-router-dom';
import FolderCreator from '../components/Filer/FolderCreator';
import FilesTools from '../components/FilesTools/FilesTools';

function FilesContainer() {


  const files = useSelector(selectFiles);
  const userId = useSelector(state => state.auth.user._id);

  const [path, setPath] = useState({
    level: 0,
    url: ["media", userId]
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFilesAction(userId));
  }, []);

  const goToFolder = (nextFolder) => {
    let url = path.url;
    url.push(nextFolder);
    setPath({
      level: path.level + 1,
      url
    })
  }

  const backFromFolder = () => {
    let url = path.url;

    url.pop();
    setPath({
      level: path.level - 1,
      url
    })
  }

  return (<>
    <div style={style.files_container}>
      <div style={style.tools}>
        <FilesTools path={path}/>
      </div>
      <div style={style.files}>
        {files.length != 0 && <FilesList files={files} path={path} goToFolder={goToFolder} backFromFolder={backFromFolder} />}
        {true && <><Filer path={path} />
          <FolderCreator path={path} /></>}
        {files.length == 0 && <h4> You don't have the files</h4>}
      </div>
    </div>
    <Outlet />
  </>);
}

export default FilesContainer;

const style = {
  files_container: {
    // display: 'flex',
    flex: '4 1 0%',
    flexDirection: 'column',
    justifyContent: "space-between",
    alignItems: 'start',
    borderRight: '1px solid black',
    borderTopRightRadius: '35px',
    backgroundColor: 'lightgrey',
    overflow: 'hidden'
  },
  files: {
    display: 'flex',
    alignItems: 'center',
  },
  tools: {
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
    height: '45px',
    width:' 80%',
    margin:'10px auto 0 auto',
    backgroundColor:'#aaa',
    borderRadius:'30px',
    boxShadow:'2px 2px 10px black'
  }
}

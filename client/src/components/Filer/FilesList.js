import FileItem from './FileItem'
import FolderItem from './Foldertem';
import FolderBackButton from './FolderBackItem';

function FilesList({files, path, goToFolder, backFromFolder}) {

  // remeber abot rendering
console.log("FilesList"); // now there two renders of component instead of one 
return (<>
  <div style={style.files}>
    {path.level != 0 && <FolderBackButton backFromFolder={backFromFolder}/>}
    {files.map((item, index)=>{
        
        let filePath = item.path.split("/");
        if(item.isFolder) filePath.pop();

        // there we are put our file into folders
        if(filePath[filePath.length-2] != path.url[path.level+1]) return<></>;
        
        return !item.isFolder? <FileItem file={item} path={path} key={index} />: <FolderItem file={item} key={index} goToFolder={goToFolder} />
      })}
  </div>
  </>);
}

export default FilesList;

const style = {
  files:{
    display:'flex', 
    alignItems:'center', 
    marginTop: "15px", 
  }
}

import FileItem from './FileItem'

function FilesList({files}) {

  // remeber abot rendering
console.log("FilesList"); // now there two renders of component instead of one 
return (<>
  <div>
    {files.map((item, index)=>{
        return <FileItem file={item} key={index} />
      })}
  </div>
  </>);
}

export default FilesList;

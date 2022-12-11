import { useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux'

const FolderItem = ({file, goToFolder}) => {
  console.log("FilesItem")
  
  const openFolder = useCallback(() =>{
    goToFolder(file.name);
  },[])

  return (<div style={style.file_item}>
    <div style={style.file} onClick={openFolder}>
      <img src="https://img.icons8.com/ios/512/folder-invoices--v1.png" style={style.file_body}/>
      <span>
        <p>
          {file.name}
        </p>
      </span>
    </div>
    <div style={style.file_options}>
      {/* other options... */}
      <span>
        {/* <button onClick={deleteFile}>Delete</button> */}
      </span>
    </div>
  </div>);
}

export default FolderItem;

const style = {
  file_item:{
    display:"flex", 
    border:"1px solid black", 
    borderRadius:"15px",
    alignItems:'center',
    marginLeft: "15px",
  },
  file:{
    marginTop: "15px", 
    marginLeft: "15px",
    display:'flex',
    flexDirection:'column',
    cursor:'pointer'
  },
  file_body:{
    width:"100px", 
    height:"100px", 
    // justifyContent: "space-between"
  },
  file_options:{
    display:'flex',
    flexDirection:'column'

  },
  file_title:{

  }
}
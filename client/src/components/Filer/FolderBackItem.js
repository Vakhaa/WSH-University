

const FolderBackButton = ({backFromFolder}) => {  

return (<div style={style.file_item}>
    <div style={style.file} onClick={backFromFolder}>
      <img src="https://img.icons8.com/ios/512/folder-invoices--v1.png" style={style.file_body}/>
      <span><p>...</p></span>
    </div>
  </div>);
}

export default FolderBackButton;

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
  file_title:{

  }
}
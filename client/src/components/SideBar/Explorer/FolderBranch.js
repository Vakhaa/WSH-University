import React from "react";

const FolderBranch = ({ id, name, child, lvl = 1 }) => {

  let style = useStyle(lvl);
  return (<>
    {name !== "" && <li key={id} style={style.branch}>
      <span style={style.p}>{name}</span>
      {
        child?.map(folder => <FolderBranch {...folder} lvl={lvl + 1} />)
      }
    </li>}
  </>)

}

export default FolderBranch;

const useStyle = (lvl) => {
  let marginLeft = (15 * lvl) + "px";
  let color = (lvl == 1) ? '#005900' : '#000';
  return {
    branch: {
      margin: `10px 0px 5px ${marginLeft}`,
      // justifyContent: 'center'
    },
    p: {
      fontSize: '20px',
      cursor: 'pointer',
      color: color
    }
  }
}


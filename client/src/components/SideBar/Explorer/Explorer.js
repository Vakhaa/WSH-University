import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectFolders } from "../../../redux/features/files/filesSlice";
import SideBarNavigation from "../SideBarNavigation";
import FolderBranch from "./FolderBranch";


const Explorer = ({ match }) => {

  const folders = useSelector(selectFolders);
  const userId = useSelector(state => state.auth.user._id);

  const [tree, setTree] = useState([]);

  const convertFoldersToPath = useCallback((paths) => {
    paths = paths.map(folder => folder.path.slice(7 + userId.toString().length)) // remove from the path: '/media/{userId}/'
    paths.sort();

    return paths.map(path => {

      let splitPath = path.split('/');
      return {
        path: splitPath,
        lvl: splitPath.length - 2,
      }
    })
  }, [userId, folders]);


  const compareLvl = useCallback((a, b) => {
    if (a.lvl < b.lvl) {
      return -1;
    }
    if (a.lvl > b.lvl) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }, [])


  useEffect(() => {

    let paths = convertFoldersToPath(folders, userId);
    paths.sort(compareLvl);

    let newTree = [];
    // roots
    paths.filter(elem => elem.lvl === 0).forEach(elem => {
      newTree.push({
        id: Math.floor(Math.random() * Date.now()).toString(16),
        name: elem.path[0],
        child: []
      });
    });

    setTree(recursiveMapChildrenToparents(newTree, paths));
  }, [folders])


  return (<>
    <div style={style.container}>
      <SideBarNavigation />
      <ul style={style.ul}>
        {tree.map((branch) => {
          return <FolderBranch  {...branch} />
        })}
      </ul>
    </div>
  </>)
}

export default Explorer;

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 0%',
    backgroundColor: 'gray',
    // justifyContent: 'center'
  },
  ul: {
    width: '80%',
    margin: '20px auto',
    padding: '15px',
    backgroundColor: 'lightgray',
    boxShadow: '5px 5px 10px black',
    borderRadius: '20px',
  }
}

const recursiveMapChildrenToparents = (tree, convertPath) => {

  convertPath.forEach(elem => {
    let branch = tree.find(root => root.name === elem.path[0]);
    let newBranch = buildTree(elem.path, branch, tree);
    tree.forEach(root => {
      if (root.name === newBranch?.name) return newBranch;
    })
  });

  return tree;

}

// branch = {id, name: string, child: []};
const buildTree = (path, branch, prevBranch, lvl = 1) => {

  let isExists = branch.child.some(child => child.name == path[lvl]);
  if (!isExists) {
    let newBranch = branch.child.push({
      id: Math.floor(Math.random() * Date.now()).toString(16),
      name: path[lvl],
      child: []
    });

    return prevBranch?.child?.forEach(elem => {
      if (elem?.name === newBranch.name) return newBranch;
    });
  }

  return buildTree(path, branch.child.find(child => child.name == path[lvl]), branch, ++lvl);
}

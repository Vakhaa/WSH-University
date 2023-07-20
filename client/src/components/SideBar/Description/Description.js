import SideBarNavigation from "../SideBarNavigation";


const Description = () => {

  return (<>
    <div style={style.container}>
      <SideBarNavigation />
      <div>
        {/* Main information */}
        <div></div>
        {/* Tools */}
        <div></div>
        {/*  Tags*/}
        <div></div>
      </div>
    </div>
  </>)
}

export default Description;

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 0%',
    backgroundColor: 'gray',
    // justifyContent: 'center'
  }
} 

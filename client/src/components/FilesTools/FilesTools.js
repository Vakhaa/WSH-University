import React from 'react'

const FilesTools = ({ path }) => {

    let folders = "";
    path.url.forEach((item, index) => {
        if (index !== 0 && index !== 1)
            folders += item + "/"
    });

    return (<>
        <div style={style.item}>

            <span style={{ cursor: 'pointer' }}>
                {"<"}
                {/* <img src="https://www.pngkey.com/png/full/830-8304891_png-file-svg-carousel-button-left.png" width='20px' height='20px' style={{ transform: 'rotate(180deg)' }} /> */}
            </span>
            <span style={{ cursor: 'pointer', marginLeft: '10px' }}>
                {">"}
                {/* <img src="https://www.pngkey.com/png/full/830-8304891_png-file-svg-carousel-button-left-right.png" width='20px' height='20px' /> */}
            </span>
        </div>
        {/* button tools  */}
        <div style={{ ...style.item }}>
            <span style={{ cursor: 'pointer' }}>
                <img src="https://img.icons8.com/ios/512/add-folder.png" width='25px' height='25px' />
            </span>
            <span style={{ cursor: 'pointer', marginLeft: '15px' }}>
                <img src="https://cdn-icons-png.flaticon.com/512/2088/2088591.png" width='25px' height='25px' />
            </span>
        </div>
        {/* search  */}
        <div style={{ ...style.item, width: '85%', position: 'relative' }}>
            <input style={{ width: '100%', height: '25px', borderRadius: '25px' }} type="search" />
            <img style={{ position: 'absolute', right: '5px', top: '2px' }} src="https://www.iconpacks.net/icons/2/free-search-icon-2903-thumb.png" width="20px" height="20px" />
        </div>
    </>);
}

export default FilesTools;

const style = {
    item: {
        // flex: 1, 
        // flexDirection: 'row'
        marginLeft: '15px'
    },
    input: {

    }
}
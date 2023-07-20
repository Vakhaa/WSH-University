import React from 'react'

const Home = () => {

    return (<>
        <div style={style.container}>
            <div style={{ ...style.intro, scrollbarWidth: 'none' }}>
                <h1>Hello there! This is Documanagery.</h1>
                <span style={{ fontSize: '18px' }}>
                    <p><b>This is aplication for document management in an easier way.</b></p>
                    <ul>
                        <li>Keep your documents clearly and safety!</li>
                        <li>The fastet access to your documents!</li>
                        <li>And got a new enjoable experience!</li>
                    </ul>
                    <p><b>Use our aplication you can get:</b></p>
                    <ul>
                        <li>filter - tags</li>
                        <li>smth</li>
                        <li>another expirience!</li>
                        <li>wow, no way!</li>
                    </ul>
                </span>
            </div>
            <div style={style.news_container}>
                <h2 style={{ display: 'flex', justifyContent: 'center' }}>News</h2>
                {[1, 2, 3, 4, 5, 6].map(() => (<>
                    <div style={style.news}>
                        <h3>Title</h3>
                        <img src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2017/08/facebook-skeleton.png?ssl=1" width='100%' height='300px' alt="image of news" />
                        <p>Something doing there, no way. Just...</p>
                    </div></>))}
            </div>
        </div>
    </>)
}

export default Home;

const style = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: '1 1 0%',
        overflow: 'auto',
        height: '100%'
    },
    intro: {
        display: 'flex',
        flexDirection: 'column',
        flexShrink: '0',
        height: '100%',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',

        marginTop: '15px',

        backgroundColor: 'lightgray',
        borderRadius: '25px',
        boxShadow: '5px 5px 10px black'
    },
    news_container: {
        height: 'fit-content',
        width: '50%',
        marginTop: '15px',
    },
    news: {
        width: '80%',
        flexDirection: 'column',
        padding: '15px ',
        margin: '15px auto',
        backgroundColor: '#ccc',
        borderTop: '1px solid black',
        borderLeft: '1px solid black',
        borderTopLeftRadius: '40px',
        borderBottomRightRadius: '40px',
        boxShadow: '5px 5px 10px black',
        cursor: 'pointer'
    }
}
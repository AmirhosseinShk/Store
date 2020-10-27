import React, {Fragment} from 'react';
import Header from './header.js';
import MainPage from './MainPage.js';
import Footer from './footer.js';

function main() {
    return (
    <Fragment>
        <Header></Header>
        <MainPage></MainPage>
        <Footer></Footer>
     </Fragment>    
    );
}

export default main;
import React, {Fragment} from 'react';
import Header from './header.js';
import AboutPage from './aboutUsMain.js';
import Footer from './footer.js';

function main() {
    return (
    <Fragment>
        <Header></Header>
        <AboutPage></AboutPage>
        <Footer></Footer>
     </Fragment>    
    );
}

export default main;
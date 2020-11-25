import React, {Fragment} from 'react';
import Header from './header.js';
import LegalInfo from './legalInfoMain.js';
import Footer from './Footer.js';

function legalInfo() {
    return (
    <Fragment>
        <Header></Header>
        <LegalInfo></LegalInfo>
        <Footer></Footer>
     </Fragment>    
    );
}

export default legalInfo;
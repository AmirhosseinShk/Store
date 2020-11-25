import React, {Fragment} from 'react';
import Header from './header.js';
import Shopping from './shoppingItemMain.js';
import Footer from './Footer.js';

function shopping() {
    return (
    <Fragment>
        <Header></Header>
        <Shopping></Shopping>
        <Footer></Footer>
     </Fragment>    
    );
}

export default shopping;
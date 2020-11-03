import React, {Fragment} from 'react';
import Header from './header.js';
import DetailPage from './detailPage.js';
import Footer from './footer.js';

function itemDetails() {
    return (
    <Fragment>
        <Header></Header>
        <DetailPage></DetailPage>
        <Footer></Footer>
     </Fragment>    
    );
}

export default itemDetails;
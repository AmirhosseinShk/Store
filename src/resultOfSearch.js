import React, {Fragment} from 'react';
import Header from './header.js';
import ResultOfSearch from './resultMain.js';
import Footer from './footer.js';

function result() {
    return (
    <Fragment>
        <Header></Header>
        <ResultOfSearch></ResultOfSearch>
        <Footer></Footer>
     </Fragment>    
    );
}

export default result;
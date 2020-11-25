import React, {Fragment} from 'react';
import Header from './header.js';
import Question from './askQuestionMain.js';
import Footer from './Footer.js';

function policy() {
    return (
    <Fragment>
        <Header></Header>
        <Question></Question>
        <Footer></Footer>
     </Fragment>    
    );
}

export default policy;
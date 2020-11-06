import React from 'react';
import Main from './main.js';
import Details from './itemDetails.js';
import AboutUs from './aboutUs.js';
import LegalInfo from './legalInfo.js';
import Policy from './policy.js';
import Questions from './askQuestion.js';
import shoppingItem from './shoppingItem.js';
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter  >
      <Route exact path="/" component={Main}></Route>
      <Route  path="/Details" component={Details}></Route>
      <Route  path="/AboutUs" component={AboutUs}></Route>
      <Route  path="/LegalInfo" component={LegalInfo}></Route>
      <Route  path="/Policy" component={Policy}></Route>
      <Route  path="/Questions" component={Questions}></Route>
      <Route  path="/ShoppingItem" component={shoppingItem}></Route>
    </BrowserRouter  >
  );
}

export default App;

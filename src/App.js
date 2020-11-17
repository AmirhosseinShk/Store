import React from "react";
import Main from "./main.js";
import Details from "./itemDetails.js";
import AboutUs from "./aboutUs.js";
import LegalInfo from "./legalInfo.js";
import Policy from "./policy.js";
import Questions from "./askQuestion.js";
import shoppingItem from "./shoppingItem.js";
import ResultOfSearch from "./resultOfSearch.js";
import { BrowserRouter, Route } from "react-router-dom";
import ScrollToTop from './ScrollToTop.js';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Main}></Route>
      <ScrollToTop>
        <Route path="/Details" component={Details}></Route>
      </ScrollToTop>
      <Route path="/AboutUs" component={AboutUs}></Route>
      <Route path="/LegalInfo" component={LegalInfo}></Route>
      <Route path="/Policy" component={Policy}></Route>
      <Route path="/Questions" component={Questions}></Route>
      <Route path="/ShoppingItem" component={shoppingItem}></Route>
      <Route path="/Result" component={ResultOfSearch}></Route>
    </BrowserRouter>
  );
}

export default App;

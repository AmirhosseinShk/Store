import React from "react";
import Main from "./Main.js";
import Details from "./DetailPage.js";
import AboutUs from "./AboutUs.js";
import LegalInfo from "./LegalInfo.js";
import Policy from "./Policy.js";
import Questions from "./AskQuestion.js";
import shoppingItem from "./ShoppingItem.js";
import ResultOfSearch from "./Result.js";
import ScrollToTop from "./ScrollToTop.js";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Route path="/Details/:id" component={Details}></Route>
      </ScrollToTop>
      <Route path="/AboutUs" component={AboutUs}></Route>
      <Route path="/LegalInfo" component={LegalInfo}></Route>
      <Route path="/Policy" component={Policy}></Route>
      <Route path="/Questions" component={Questions}></Route>
      <Route path="/ShoppingItem" component={shoppingItem}></Route>
      <Route path="/Result" component={ResultOfSearch}></Route>
      <Route exact path="/" component={Main}></Route>
    </BrowserRouter>
  );
}

export default App;

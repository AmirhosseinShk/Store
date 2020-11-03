import React from 'react';
import Main from './main.js';
import Details from './itemDetails.js';
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter  >
      <Route exact path="/" component={Main}></Route>
      <Route  path="/Details" component={Details}></Route>
    </BrowserRouter  >
  );
}

export default App;

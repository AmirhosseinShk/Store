import React from 'react';
import Main from './main.js';
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter  >
      <Route exact path="/" component={Main}></Route>
    </BrowserRouter  >
  );
}

export default App;

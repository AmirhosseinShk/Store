import React, { Fragment } from "react";

import Header from "./Header.js";
import Footer from "./Footer.js";
import { addToStorage, removeFromStorage } from "./JsonHelperFunction.js";

import "./asstes/css/shoppingItem.css";
import carpet2 from "./asstes/Photos/carpet2.PNG";

export default class ShoppingItem extends React.Component {
  constructor(props) {
    super(props);
    var Items = localStorage.getItem("ShoppingItems");
    var ShoppingItems = JSON.parse(Items);
    this.state = {
      items: ShoppingItems,
    };
    this.changIcon = this.changIcon.bind(this);
    console.log(ShoppingItems);
  }

  changIcon(event, item) {
    var butplusItem = event.target;
    if (event.target.id == "shopCardShoppingButton") {
      butplusItem = event.target.firstChild;
    }
    var elements = document.querySelectorAll("[id='" + butplusItem.id + "']");
    console.log(elements);
    for (let j = 0; j < elements.length; j++) {
      var butplus = elements[j];
      var shopCardButton = butplus.parentElement;
      if (butplus.classList[1] == "fa-plus") {
        var ShoppingItems = localStorage.getItem("ShoppingItems");
        var resItems = addToStorage(ShoppingItems, item);
        localStorage.setItem("ShoppingItems", resItems);
        console.log(butplus);
        butplus.setAttribute("class", "fa fa-times");
        shopCardButton.style.background = "rgb(255,0,94)";
      } else {
        var ShoppingItems = localStorage.getItem("ShoppingItems");
        var resItems = removeFromStorage(ShoppingItems, item);
        localStorage.setItem("ShoppingItems", resItems);
        butplus.setAttribute("class", "fa fa-plus");
        shopCardButton.style.background = "#651fff";
      }
    }
  }

  render() {
    return (
      <Fragment>
        <Header></Header>
        <div class="mainShopping">
          <div class="row">
            {this.state.items.map((item) => (
              <div className="col-md-3 cardMargin">
                <div class="shopCardShopping">
                  <p id="shopCardShoppingName">{item.name}</p>
                  <img id="shopCardShoppingImage" src={carpet2}></img>
                  <div className="row shopCardShoppingRow">
                    <span id="shopCardShoppingPrice">{item.price}</span>
                    <button
                      className="ml-auto mr-3"
                      id="shopCardShoppingButton"
                      onClick={(e) => this.changIcon(e, item)}
                    >
                      <i id={item.id} class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer></Footer>
      </Fragment>
    );
  }
}

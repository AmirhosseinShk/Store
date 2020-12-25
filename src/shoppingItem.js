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
    var totalPrice = 0;
    for (let i = 0; i < ShoppingItems.length; i++) {
      totalPrice += ShoppingItems[i].price;
    }
    this.state = {
      items: ShoppingItems,
      totalPrice: totalPrice,
    };
    this.changIcon = this.changIcon.bind(this);
  }

  changIcon(event, item) {
    var butplusItem = event.target;
    var totalPrice = this.state.totalPrice;
    if (event.target.id === "shopCardShoppingButton") {
      butplusItem = event.target.firstChild;
    }
    var elements = document.querySelectorAll("[id='" + butplusItem.id + "']");
    for (let j = 0; j < elements.length; j++) {
      var butplus = elements[j];
      var shopCardButton = butplus.parentElement;
      if (butplus.classList[1] === "fa-plus") {
        var ShoppingItems = localStorage.getItem("ShoppingItems");
        var resItems = addToStorage(ShoppingItems, item);
        totalPrice += item.price;
        localStorage.setItem("ShoppingItems", resItems);
        butplus.setAttribute("class", "fa fa-times");
        shopCardButton.style.background = "rgb(255,0,94)";
      } else {
        var ShoppingItems = localStorage.getItem("ShoppingItems");
        var resItems = removeFromStorage(ShoppingItems, item);
        totalPrice -= item.price;
        localStorage.setItem("ShoppingItems", resItems);
        butplus.setAttribute("class", "fa fa-plus");
        shopCardButton.style.background = "#651fff";
      }
    }
    this.state = {
      totalPrice: totalPrice,
    };
  }

  render() {
    return (
      <Fragment>
        <Header></Header>
        <div className="main">
          <div className="row">
            {this.state.items.map((item) => (
              <div className="col-md-3 cardMargin">
                <div className="shopCardShopping">
                  <p id="shopCardShoppingName">{item.name}</p>
                  <img
                    id="shopCardShoppingImage"
                    src={carpet2}
                    alt="carpet"
                  ></img>
                  <div className="row shopCardShoppingRow">
                    <span id="shopCardShoppingPrice">{item.price}</span>
                    <button
                      className="ml-auto mr-3"
                      id="shopCardShoppingButton"
                      onClick={(e) => this.changIcon(e, item)}
                    >
                      <i id={item.id} className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div class="row">
            <div class="col text-center">
              <button className="order" data-toggle="modal" data-target="#cash">
                заказ
              </button>
            </div>
          </div>
          <div
            className="modal fade"
            id="cash"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content" id="my-modal">
                <div>
                  <button
                    type="button"
                    className="close setsizetimes"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span className="times" aria-hidden="true">
                      &times;
                    </span>
                  </button>
                  <div className="registerFormCash">
                    <div className="row ItemOrder">
                      <span className="titlePriceDetails">детали цены</span>
                    </div>
                    {this.state.items.map((item) => (
                      <div className="row">
                        <div class="col text-center">
                          <span className="itemsCash">{item.name} :</span>
                          <span className="price">{item.price} ₽</span>
                        </div>
                      </div>
                    ))}
                    <hr className="lineTotal"></hr>
                    <span className="totalamountCash">Итого :</span>
                    <span className="price totalamountCash">
                      {" "}
                      {this.state.totalprice} ₽
                    </span>
                    <br />
                    <button
                      className="pay"
                      data-toggle="modal"
                      data-target="#register"
                    >
                      платить
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal fade"
              id="register"
              tabindex="-2"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content" id="my-modal">
                  <div>
                    <button
                      type="button"
                      className="close setsizetimes"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span className="times" aria-hidden="true">
                        &times;
                      </span>
                    </button>
                    <form className="addinformation">
                      <h6 className="inputsLable" for="Name">
                        название
                      </h6>
                      <input
                        className="inputs"
                        type="text"
                        placeholder="Matthew"
                        name="Name"
                        id="Name"
                        required
                      />
                      <br />
                      <h6 className="inputsLable" for="Email">
                        электронное письмо
                      </h6>
                      <input
                        className="inputs"
                        type="text"
                        placeholder="matyousefian@yahoo.com"
                        name="Email"
                        id="Email"
                        required
                      />
                      <br />
                      <h6 className="inputsLable" for="number">
                        Контактный телефон
                      </h6>
                      <input
                        className="inputs"
                        type="text"
                        placeholder="Contact Number"
                        name="number"
                        id="number"
                        required
                      />
                      <br />
                      <h6 className="inputsLable" for="address">
                        адрес
                      </h6>
                      <textarea
                        className=" inputsAddress"
                        type="text"
                        placeholder="Address"
                        name="address"
                        id="address"
                        required
                      />
                    </form>
                    <button className="submit" data-toggle="modal">
                      представить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </Fragment>
    );
  }
}

import React, {Fragment} from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import "./asstes/css/shoppingItem.css";
import carpet2 from "./asstes/Photos/carpet2.PNG";

export default class ShoppingItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { name: "Red Carpet", src: carpet2, price: "785.000 ₽" },
        { name: "Red Carpet", src: carpet2, price: "785.000 ₽" },
        { name: "Red Carpet", src: carpet2, price: "785.000 ₽" },
        { name: "Red Carpet", src: carpet2, price: "785.000 ₽" },
        { name: "Red Carpet", src: carpet2, price: "785.000 ₽" },
      ],
    };
  }

  render() {
    return (
      <Fragment>
        <Header></Header>
        <div class="mainShopping">
          <div class="row">
            {this.state.items.map((item) => (
              <div className="col-md-3 cardMargin ">
                <div class="shopCardShopping">
                  <p id="shopCardShoppingName">{item.name}</p>
                  <img id="shopCardShoppingImage" src={item.src}></img>
                  <div className="row shopCardShoppingRow">
                    <span id="shopCardShoppingPrice">{item.price}</span>
                    <button
                      className="ml-auto mr-3"
                      id="shopCardShoppingButton"
                    >
                      <i class="fas fa-times"></i>
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

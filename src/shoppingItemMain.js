import React from "react";
import IconAboutUs from './Asset4.svg';
import './asstes/css/shoppingItem.css'
import carpet2 from "./asstes/Photos/carpet2.PNG";

export default class header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                { name: 'Red Carpet', src: carpet2, price: '785.000 ₽' },
                { name: 'Red Carpet', src: carpet2, price: '785.000 ₽' },
                { name: 'Red Carpet', src: carpet2, price: '785.000 ₽' },
                { name: 'Red Carpet', src: carpet2, price: '785.000 ₽' },
                { name: 'Red Carpet', src: carpet2, price: '785.000 ₽' }
            ]

        };
    }


    render() {
        return (
            <div class="mainShopping" >
                <div class="row">
                    {this.state.items.map((item) => (
                        <div className="col-md-3 cardMargin ">
                            <div class="shopCardShopping">
                                <p id="shopCardShoppingName">{item.name}</p>
                                <img id="shopCardShoppingImage" src={item.src}></img>
                                <div className="row shopCardShoppingRow">
                                    <span id="shopCardShoppingPrice">{item.price}</span>
                                    <button className="ml-auto mr-3" id="shopCardShoppingButton">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                    )
                    }
                </div>
            </div>

        )
    }
}
import React from "react";
import "./asstes/css/Header.css";
import "./asstes/css/global.css";
import testShop from "./shopTest.png";

export default class header extends React.Component {
  constructor(props) {
    super(props);
  this.openNav = this.openNav.bind(this);
  this.closeNav = this.closeNav.bind(this);
  }

   openNav() {
    var x =document.getElementsByClassName("header")[0];
    x.setAttribute("id" , "blur");
    var x =document.getElementsByClassName("main")[0];
    x.setAttribute("id" , "blur");
    var x =document.getElementsByClassName("MainFooter")[0];
    x.setAttribute("id" , "blur");
     document.getElementById("mySidenav").style.width = "35%";
    
    
    
    
    
  }
  
   closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    var x =document.getElementsByClassName("header")[0];
    x.setAttribute("id" , null);
    var x =document.getElementsByClassName("main")[0];
    x.setAttribute("id" , null);
    var x =document.getElementsByClassName("MainFooter")[0];
    x.setAttribute("id" , null);
  }


  render(){
  return (
    <div>
    <div className="header">
      <div className="row">
        <img src={testShop} className="headerImage" />
        <div className="searchBorder col-5" style={{ marginTop: "0" }}>
          <div className="row" style={{ height: "80%" }}>
            <input
              type="text"
              id="zoneArea"
              className="SelectZone col-9"
              placeholder="&#xF002; Search for carpets, clothes and..."
            ></input>
            <div className=" col-3">
              <button className="SearchButton" type="submit">
                <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>
        <i class="MenuBar fas fa-grip-lines" onClick={this.openNav}></i>
      </div>
      
            </div>
            <div id="mySidenav" class="sidenav">
            <i class="closebtn fa fa-times fa-2x" onClick={this.closeNav}></i>
            <div class="row ShowMenu">
                        <div class="col-6 marginlist">
                            <h3>Products</h3>
                            <a class="item"href="#">Clothes</a>
                            <br></br>
                            <a  class="item"href="#">Carpet</a>
                            <br></br>
                            <a class="item" href="#">Handicrafts</a>
                            <br></br>
                            <a class="item" href="#">Bags</a>
                        </div>
                        <div class="col-6">
                            <h3>About Us</h3>
                            <a class="item" href="#">Introduction</a>
                            <br></br>
                            <a class="item" href="#">Legal Info</a>
                            <br></br>
                            <a class="item" href="#">Policy</a>
                        </div>

                    </div>
                    <div class="row ShowMenu ">
                        <div class="col-6 ">
                            <h3>Support</h3>
                            <a class="item" href="#">Condition</a>
                            <br></br>
                            <a class="item" href="#">FAQ</a>
                        </div>
  

                    </div>
    </div>
  </div>  

    
  );
  }
};


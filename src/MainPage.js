import React from "react";
import "./asstes/css/MainPage.css";
import LargeHorizontal from "./2.PNG";
import Vertical from "./1.PNG";
import SmallHorizontal from "./3.png";
import carpet from "./carpet.PNG";
import carpet2 from "./carpet2.PNG";
import Flickity from "react-flickity-component";
import "flickity/css/flickity.css";

const flickityOptions = {
  initialIndex: 0,
  accessibility: true,
  cellAlign: "left",
  dragThreshold: 3,
  freeScrollFriction: 2,
  percentPosition: true,
  resize: true,
  draggable: true,
  pageDots: false,
  setGallerySize: true,
  // prevNextButtons: false,
  // namespaceJQueryEvents: true,
   arrowShape: { x0: 10, x1: 40, y1: 30, x2: 50, y2: 30, x3: 20 },
  //pauseAutoPlayOnHover: false,
};

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Categories: [
        { icon: "fa fa-phone fa-3x", Name: "Carpet" },
        { icon: "fa fa-shopping-bag fa-3x", Name: "Bags" },
        { icon: "fa fa-tshirt fa-3x", Name: "Clothes" },
        { icon: "fa fa-phone fa-3x", Name: "Handicrafts" },
      ],
    };
  }

  render() {
    return (
      <div class="main">
        <div class="row" style={{ height: "80%" }}>
          <div class="col-9">
            <img
              class="HorizontalImge"
              src={LargeHorizontal}
              alt="picture1"
            ></img>
            <div class="row">
              <div class="col-9">
                <h4 class="category">Categories</h4>
                <div class="row">
                  {this.state.Categories.map((item) => (
                    <div class="col-3">
                      <div class="setcolor">
                        <i class={item.icon} id="iconCenter"></i>
                        <h5 id="titleCategories">{item.Name}</h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div class="col-3">
                <img
                  class="HorizontalImge2"
                  src={SmallHorizontal}
                  alt="picture3"
                ></img>
              </div>
            </div>
          </div>
          <div class="col-3">
            <img class="VerticalImge" src={Vertical} alt="picture1"></img>
          </div>
        </div>
        <div className="recent">
          <h4>Most recent</h4>
          <Flickity
            className={"carousel"} // default ''
            elementType={"div"} // default 'div'
            options={flickityOptions} // takes flickity options {}
            disableImagesLoaded={false} // default false
            reloadOnUpdate // default false
            static={true} // default false
          >
            {this.state.Categories.map((item) => (
              <div className="col-md-3 cardMargin">
                <div class="shopCard">
                  <p id="shopCardName">{item.Name}</p>
                  <img id="shopCardImage" src={carpet2}></img>
                  <div className="row shopCardRow">
                    <span id="shopCardPrice">785.000 ₽</span>
                    <button className="ml-auto mr-3" id="shopCardButton">
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Flickity>
        </div>
        <div className="popular">
          <h4>Popular products</h4>
          <Flickity
            className={"carousel"} // default ''
            elementType={"div"} // default 'div'
            options={flickityOptions} // takes flickity options {}
            disableImagesLoaded={false} // default false
            reloadOnUpdate // default false
            static // default false
          >
            {this.state.Categories.map((item) => (
              <div className="col-md-3 cardMargin">
                <div class="shopCard">
                  <p id="shopCardName">{item.Name}</p>
                  <img id="shopCardImage" src={carpet}></img>
                  <div className="row shopCardRow">
                    <span id="shopCardPrice">785.000 ₽</span>
                    <button className="ml-auto mr-3" id="shopCardButton">
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Flickity>
        </div>
      </div>
    );
  }
}

export default MainPage;

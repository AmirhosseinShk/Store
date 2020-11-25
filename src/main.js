import React, {Fragment} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Flickity from "react-flickity-component";

import Header from './Header.js';
import Footer from './Footer.js';

import "./asstes/css/MainPage.css";
import "./asstes/css/global.css";
import "flickity/css/flickity.css";
import "./asstes/icons/fontello/css/fontello.css";

import LargeHorizontal from "./asstes/Photos/LargeHorizontal.PNG";
import Vertical from "./asstes/Photos/Vertical.PNG";
import SmallHorizontal from "./asstes/Photos/SmallHorizontal.png";
import carpet from "./asstes/Photos/carpet.PNG";
import carpet2 from "./asstes/Photos/carpet2.PNG";


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
    console.log(props.location);
    this.state = {
      Categories: [
        { icon: "fa icon-carpet", Name: "Carpet" },
        { icon: "fa icon-hand-bag", Name: "Bags" },
        { icon: "fa icon-jacket", Name: "Clothes" },
        { icon: "fa icon-page-1", Name: "Handicrafts" },
      ],
      mostRecentCarpets: [],
      popularCarpets: [],
    };
    this.refreshFlickity = this.refreshFlickity.bind(this);
  }

  componentDidMount() {
    var urlDb = "http://localhost:8080/Server/rest/getMostRecent";
    axios(urlDb).then(
      (result) => {
        var MostRecent = result.data.Carpets;
        console.log(MostRecent);
        console.log(MostRecent[1].name);
        this.setState({
          mostRecentCarpets: MostRecent,
        });
      },
      (error) => {
        console.log(error);
      }
    );

    var urlDb = "http://localhost:8080/Server/rest/getPopularCarpet";
    axios(urlDb).then(
      (result) => {
        var popular = result.data.Carpets;
        console.log(popular);
        console.log(popular[1].name);
        this.setState({
          popularCarpets: popular,
        });
      },
      (error) => {
        console.log(error);
      }
    );
    this.refreshFlickity();
  }

  refreshFlickity() {
    this.flkty.resize();
  }

  render() {
    return (
      <Fragment>
        <Header></Header>
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
                      <Link
                        to={{
                          pathname: "/Result",
                          state: { searchData: item },
                        }}
                        class="col-3 deleteUnderLink"
                      >
                        <div class="setcolor">
                          <i class={item.icon} id="iconCenter"></i>
                          <h5 id="titleCategories">{item.Name}</h5>
                        </div>
                      </Link>
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
              flickityRef={(c) => (this.flkty = c)}
              className={"carousel"} // default ''
              elementType={"div"} // default 'div'
              options={flickityOptions} // takes flickity options {}
              disableImagesLoaded={false} // default false
              reloadOnUpdate={true} // default false
              static={false} // default false
            >
              {this.state.mostRecentCarpets.map((item) => (
                <Link
                  to={{ pathname: "/Details", state: { carpetDetails: item } }}
                  className="col-md-3 deleteUnderLink"
                >
                  <div class="shopCard">
                    <p id="shopCardName">{item.name}</p>
                    <img id="shopCardImage" src={carpet2}></img>
                    <div className="row shopCardRow">
                      <span id="shopCardPrice">{item.price} ₽</span>
                      <button className="ml-auto mr-3" id="shopCardButton">
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </Flickity>
          </div>
          <div className="popular">
            <h4>Popular products</h4>
            <Flickity
              flickityRef={(c) => (this.flkty = c)}
              className={"carousel"} // default ''
              elementType={"div"} // default 'div'
              options={flickityOptions} // takes flickity options {}
              disableImagesLoaded={false} // default false
              reloadOnUpdate={true} // default false
              static={false} // default false
            >
              {this.state.popularCarpets.map((item) => (
                <Link
                  to={{ pathname: "/Details", state: { carpetDetails: item } }}
                  className="col-md-3 deleteUnderLink"
                >
                  <div class="shopCard">
                    <p id="shopCardName">{item.name}</p>
                    <img id="shopCardImage" src={carpet}></img>
                    <div className="row shopCardRow">
                      <span id="shopCardPrice">{item.price} ₽</span>
                      <button className="ml-auto mr-3" id="shopCardButton">
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </Flickity>
          </div>
        </div>
        <Footer></Footer>
      </Fragment>
    );
  }
}

export default MainPage;

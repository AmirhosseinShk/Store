import React from "react";
import IconAskQuestion from './Asset4.svg';
import IconChecked from './checked.svg';
import './asstes/css/askQuestion.css'

export default class header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false

        };
        this.OpenMessage = this.OpenMessage.bind(this);
    }

    OpenMessage(event) {
        console.log(event.target.value);
        if (event.target.value == 'bsubmitt') {
           this.setState({isOpen :true})
            var x = document.getElementsByClassName("header")[0];
            x.setAttribute("id", "blur");
            var x = document.getElementsByClassName("main")[0];
            x.setAttribute("id", "blur");
            var x = document.getElementsByClassName("MainFooter")[0];
            x.setAttribute("id", "blur");
            document.getElementById("MessageSuccessfully").style.width = "35%";
            document.getElementById("MessageSuccessfully").setAttribute("class", "shadowbackground");
            console.log(this.state.isOpen);

        }
        else{
            document.getElementById("MessageSuccessfully").style.width = "0";
            document.getElementById("MessageSuccessfully").setAttribute("class", "");
        }
        event.preventDefault();
    }


    render() {
        return (
            <div >
                <div class="main" onClick={this.OpenMessage}>
                    <div class="row">
                        <div class="col-4">
                            <img class="IconLegalInfo" width="200" height="260" src={IconAskQuestion} alt="Icon Ask Question">
                            </img>
                        </div>
                        <div class="col-8 textAskQuestion">
                            <h4>Submit your Request</h4>
                            <p class="pAskQuestion">Ask any question you have and leave your contact info here.</p>
                            <textarea class="typeQuestion" placeholder="Example"></textarea>
                            <button class="submitButton" value="bsubmitt" on onClick={this.OpenMessage}>Submit</button>
                        </div>
                    </div>

                </div>
                <div id="MessageSuccessfully">
                    <img class="IconMessage" src={IconChecked} alt="ok" height="200" width="100"></img>
                    <div class="row">
                        <p class="pMessage">Your request has been
submitted successfully</p>
                    </div>
                </div>
            </div>
        )
    }
}
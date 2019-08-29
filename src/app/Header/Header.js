import React from 'react';
import './Header.css';
import BlueButton from '../Buttons/BlueButton.js'
import PurpleButton from '../Buttons/PurpleButton.js'
import Logo from './Logo/Logo.js'
import {withRouter} from "react-router";

class Header extends React.Component {
    constructor(){
        super();
        this.state = {
            windowWidth : window.innerWidth
        }
    }
    handleRedirect = (route) => {
         this.props.history.push(route);
    }
    componentDidMount(){
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions = () => {
        this.setState({
            windowWidth: window.innerWidth
        })
    }

    render(){
        return (
            <div className="container-fluid" >
                {this.state.windowWidth >= 690 ? 
                <div className="row" id="header">
                    <div className="col">
                        <Logo />
                    </div>
    
                    <div className="col buttons">
                            <BlueButton title={"PROFILE"} onClick={() => this.handleRedirect("/profile")}/>
                             <BlueButton title={"SHOP"} onClick={()=>this.handleRedirect("/shop")} /> 
                            <PurpleButton title={"RANKS"} onClick={()=>this.handleRedirect("/ranking")} />
                    </div>
                    <div className="col rightWrapper">
                        ovdje ide search
                    </div>
                    <div className="col rightWrapper">
                        ovdje ide slika profila
                    </div>
                </div> 
                :
                <div>ja sam mobilna!</div>
                }
                

            </div>
        );
    }
    
}


export default withRouter(Header);
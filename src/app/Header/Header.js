import React from 'react';
import './Header.css';
import BlueButton from '../Buttons/BlueButton.js'
import PurpleButton from '../Buttons/PurpleButton.js'
import Logo from '../../assets/logo.png'
import {withRouter} from "react-router";
import AccountDetails from './AccountDetail/AccountDetail';

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
                    <img className="logo" alt="X" src={Logo}  />
                    </div>
    
                    <div className="col buttons">
                            <BlueButton title={"PROFILE"} onClick={() => this.handleRedirect("/profile")}/>
                            <BlueButton title={"SHOP"} onClick={()=>this.handleRedirect("/shop")} /> 
                            <PurpleButton title={"RANKS"} onClick={()=>this.handleRedirect("/ranking")} />
                    </div>
                    <div className="col rightWrapper search">
                        ovdje ide search
                    </div>
                    <div className="col rightWrapper">
                        <AccountDetails/>
                    </div>
                </div> 
                :
                <div className="search">ovdje ide search</div>
                }
                

            </div>
        );
    }
    
}


export default withRouter(Header);
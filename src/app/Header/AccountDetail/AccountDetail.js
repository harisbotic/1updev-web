import React from 'react'
import img from "../../../app/Image 545.png";
import './AccountDetail.css';

function AccountDetails(props) {
    return <div>
        <img className="userImg" alt="X" src={img}  />

        <button className="btn dropdown-toggle"
         type="button" id="dropdownMenuButton"
         style={{ color:"white"}}>
            @NekoNekic
  </button>


    </div>
}

export default AccountDetails
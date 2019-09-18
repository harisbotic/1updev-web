import React from 'react'

import Logo from './logoforloading.png'

import './LoadingElement.style.scss'

export default function LoadingElement() {
    return (
        <div className="loadingContainer">
            <div className="elements">
                <img src={Logo} alt=""/>
                <p>Loading...</p>
            </div>
        </div>
    )
}

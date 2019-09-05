import React from 'react';

import './skin-in-use.styles.scss';

class SkinInUse extends React.Component{
    constructor(){
        super();
        this.state = {
            skin:{
                type:'skin',
                id:1
            }
        }
    }
    render(){
        return(
            <div className='parent-div'>
                <div className='skin-text'>
                    Skin in Use:
                </div>
                <div className='skin-container'>
                    <div className={`skin${this.state.skin.id}`}></div>
                </div>
            </div>
        )
    }
}

export default SkinInUse;
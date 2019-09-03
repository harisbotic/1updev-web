import React from 'react';

import './badges-in-use.styles.css';

class BadgesInUse extends React.Component{
    constructor(){
        super();
       
        this.state = {
            // zasad hardkodirano
            badges:[
            {
                name:'badge1',
                type:'badge',
                id:1
            },
            {
                name:'badge2',
                type:'badge',
                id:2
            },
            {
                name:'badge3',
                type:'badge',
                id:3
            }
        ]
    }
    }
    render(){
        return(

            <div className='badges-parent-div'>
                {/* <img src='https://cdn0.iconfinder.com/data/icons/black-friday-shopping/512/certificate-standard-medal-certified-ribbon-badge-512.png' alt='mark' width='100px' height='auto' /> */}
                {/* <img transparent {url( '../../Assets/mark.svg' )} alt='mark' src='govno' /> */}
               <div className='badge-text'>
                        Badges in use:
                </div>
             <div className='badges-in-use-container'>                 
                {
                    this.state.badges.map( (badge) =>{
                        return(
                        <div className= { `badge-container${badge.id}` }>
                            <div className={ `badge${badge.id}` }>
                            </div>
                        </div>
                        )
                    }
                    )
                }
             </div>
            </div>
        )
        
    }
}

export default BadgesInUse;
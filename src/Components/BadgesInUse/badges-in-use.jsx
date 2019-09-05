import React from 'react';

import './badges-in-use.styles.scss';

class BadgesInUse extends React.Component{
    constructor(){
        super();
       
        this.state = {
            // zasad hardkodirano
            badges:[
            {
                name:'badge1',
                type:'badge',
                id:1,
                icon:'fas fa-medal'
            },
            {
                name:'badge2',
                type:'badge',
                id:2,
                icon:'fas fa-award'
            },
            {
                name:'badge3',
                type:'badge',
                id:3,
                icon:'fas fa-trophy'
            }
        ]
    }
    }
    render(){
        return(
            <div className='badges-parent-div'>
               <div className='badge-text'>
                        Badges in use:
                </div>
             <div className='badges-in-use-container'>             
                {
                    this.state.badges.map( (badge) =>{
                        return(
                            <div class='col-4' className='badge-container'>
                            <i className= {badge.icon}></i>
                            {/* award,trophy,dice */}
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
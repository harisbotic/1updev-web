import React, {useState} from 'react';

import './badges-in-use.styles.scss';

function BadgesInUse() {
    const badges = [
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

    const [badgesInUse, setBadgesInUse] = useState(badges);

    return(
    <div className='badges-parent-div'>
               <div className='badge-text'>
                        Badges in use:
                </div>
             <div className='badges-in-use-container'>             
                {
                    badgesInUse.map( (badge) =>{
                        return(
                            <div className='badge-container col-4'>
                            <i className= {badge.icon}></i>
                        </div>
                        )
                    }
                    )
                }
             </div>
            </div>
    )
}



export default BadgesInUse;
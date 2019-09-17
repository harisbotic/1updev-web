import React, {useState} from 'react';

import './skin-in-use.styles.scss';

 function SkinInUse(){
     const skins = [
         {
              type:'skin',
              id:1
         }
     ]
     const [skinInUse, setSkinInUse] = useState(skins);
        return(
            <div className='parent-div'>
                <div className='skin-text'>
                    Skin in Use:
                </div>
                <div className='skin-container'>
                    <div className={`skin${skinInUse[0].id}`}></div>
                </div>
            </div>
        )
}



export default SkinInUse;
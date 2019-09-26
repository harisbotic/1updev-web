import React, {useState,useEffect} from 'react';
import {shop} from '../../api/index';

import './skin-in-use.styles.scss';

 function SkinInUse(){
     const skins = [
         {
              type:'skin',
              id:1
         }
     ]
     const [skinInUse, setSkinInUse] = useState(skins);

     const [activeSkin, setActiveSkin] = useState([]);

     useEffect(() => {
       const fetchData = async () => {
         const fetchSkin = await shop.fetchSkin.get();
           setActiveSkin(fetchSkin.data);
       }
    console.log( "aaa" );
     console.log( activeSkin );
       fetchData();
      
     }, []);
     
        return(
            
            <div className='parent-div'>
                <div className='skin-text'>
                    Skin in Use:
                </div>
                <div className='skin-container'>
                    <img src = {activeSkin.skinImage}></img>
                    {/* <div className={`skin${skinInUse[0].id}`}></div> */}
                </div>
            </div>
        )
}



export default SkinInUse;
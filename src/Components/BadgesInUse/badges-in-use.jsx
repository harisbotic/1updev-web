import React, { useState,useEffect } from "react";
import {shop} from '../../api/index';

import "./badges-in-use.styles.scss";

function BadgesInUse() {

   const [activeBadges, setBadges] = useState([]);
  // const { badges } = activeBadges;


  /*const fetchData = async () => {
      
      const fetchBadges = await shop.fetchBadges.get(
        );
        console.log( "bota" );
        console.log( fetchBadges );
        setBadges({
          badges: fetchBadges.data
      });
    };

    fetchData();*/
  useEffect(() => {
    const fetchData = async () => {
      
      const fetchBadges = await shop.fetchBadges.get();
       console.log( fetchBadges.data, " prvo text pa onda to " )
        setBadges(fetchBadges.data);
        console.log( " ramiz " );
        console.log( activeBadges );
    }

    fetchData();
   
  }, []);

  console.log( " asinkrona" );
  console.log( activeBadges );

  return (
    <div className="badges-parent-div">
      
      {console.log(activeBadges), console.log(" eeeee ")}

      <div className="badge-text">Badges in use:</div>
      <div className="badges-in-use-container">
        { activeBadges.map(badge => {
          console.log( "pashaaa " );
          console.log( badge );
           return (
            <div className="badge-container col-4">
              <img src={badge.badgeImage}></img>
            </div>
           );
        })}
      </div>
    </div>
  );
}

export default BadgesInUse;

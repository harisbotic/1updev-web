import React, { useState,useEffect } from "react";
import {shop} from '../../api/index';

import "./badges-in-use.styles.scss";

function BadgesInUse() {

   const [activeBadges, setBadges] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      
      const fetchBadges = await shop.fetchBadges.get();
        setBadges(fetchBadges.data);
    }

    fetchData();
   
  }, []);


  return (
    <div className="badges-parent-div">

      <div className="badge-text">Badges in use:</div>
      <div className="badges-in-use-container">
        { activeBadges.map(badge => {
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

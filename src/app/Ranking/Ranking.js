import React from "react";
import { mockRanks } from "../../api/ranking_mock";
import { mockActivity } from "../../api/activity_mock";


class Ranking extends React.Component {

    render() {
        return (
            <div className="container">
                <h1>Ranking table:</h1>
                <div className="row">
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Special Title</th>
                    <th scope="col">Value Of Inventory</th>
                    <th scope="col">Badges</th>
                </tr>

                    {mockRanks.map(x =>
                        <div className="col mx-3 my-5">
                            <div>
                                <p> 
                                    {x.user} has {x.value}.
                                </p>
                                <img src={x.profileImg} alt='' />
                                <br></br>
                                Badges:
                        <br></br>
                                {x.badges.map(y => <img src={y} alt='' />)}
                            </div>
                        </div>
                    )}
                </div>
                <h1>Activity Log</h1>
                <div className="row">
                    {mockActivity.map(x =>
                        <div className="col-12">
                            <p>{x.user} has bought {x.itemName} for {x.itemPrice} at {x.purchaseTime}</p>
                        </div>
                    )}
                </div>
            </div>);
    }
}

export default Ranking;
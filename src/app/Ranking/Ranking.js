import React from "react";
import { mockRanks } from "../../api/ranking_mock";
import { mockActivity } from "../../api/activity_mock";
import './Ranking.scss';


class Ranking extends React.Component {

    render() {
        return (
            <div class="container">
                <div className="upper">
                    <div class="row">
                        <div class="col-1">slicica</div>
                        <div class="col-1">profilna slika</div>
                        <div class="col-5">podaci</div>
                        <div class="col-1">prazno</div>
                        <div class="col-3">bedzevi</div>
                        <div class="col-1">prazno desno</div>
                    </div>
                </div>

                {/* za sad ne dirati iznad*/}

                <div class="row">
                    <div class="col-1">prazno lijevo</div>
                    <div class="col-6">
                        <div className="wholeTable">
                        <div className="title">
                            <div className="name col-6">Ranking table:</div>
                            <div className="titleValue col-6">Value^</div>
                        </div>
                        <div className="subtitle">
                            <div className="number col-1"></div>
                            <div className="picture col-1"></div>
                            <div className="usernameTitle col-2">Username</div>
                            <div className="specialTitle col-3">Special Title</div>
                            <div className="valueOfInventory col-2">Value of Inventory</div>
                            <div className="badgesIcon col-3">Badges</div>
                        </div>
                        <div className="data">
                            {mockRanks.map(x => (
                                <div className="data_rows">
                                    <div className="orderNumber col-1">1</div>
                                    <div className="picture col-1">{<img src={x.profileImg}/>}</div>
                                    <div className="username col-2">{x.user}</div>
                                    <div className="ttl col-3">{x.title}</div>
                                    <div className="value col-2">{x.value}</div>
                                    <div className="badges col-3">{x.badges.map(y=> <img src={y}/>)}</div>
                                </div>
                            ))}
                        </div>

                        </div>
                        {/* close whole table */}
                    </div> 
                    {/* close lg-6*/}

                    {/* dolje ne dirati */}

                    <div class="col-4">activity log</div>
                    <div class="col-1">prazno desno</div>
                    </div>
                </div>
        );
    }
}

export default Ranking;
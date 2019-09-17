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
                        <div class="col-lg-1">slicica</div>
                        <div class="col-lg-1">profilna slika</div>
                        <div class="col-lg-5">podaci</div>
                        <div class="col-lg-1">prazno</div>
                        <div class="col-lg-3">bedzevi</div>
                        <div class="col-lg-1">prazno desno</div>
                    </div>
                </div>

                {/* za sad ne dirati iznad*/}

                <div class="row">
                    <div class="col-lg-1">prazno lijevo</div>
                    <div class="col-lg-6">
                        <div class="row"> {/*odavde */}
                        <div className="wholeTable">
                            <div className="tableTitle">
                                <div class="row">
                                    <div class="col-lg-6">Ranking table:</div>
                                    <div class="col-lg-6">Value ^</div>
                                </div>
                            </div>
                            <div class="row">
                                <tbody>
                                    <tr>
                                        <th scope="col-lg-0.5"></th>
                                        <th scope="col-lg-0.7"></th>
                                        <th scope="col-lg-2.3">Username</th>
                                        <th scope="col-lg-3">Special Title</th>
                                        <th scope="col-lg-3">Value Of Inventory</th>
                                        <th scope="col-lg-2.5">Badges</th>
                                    </tr>

                                    {mockRanks.map(x=>        
                                        <tr>
                                            <td scope="row">1</td>
                                            <td scope="row">{<img src={x.profileImg} />}</td>
                                            <td scope="row">{x.user}</td>
                                            <td scope="row">{x.title}</td>
                                            <td scope="row">{x.value}</td>
                                            <td scope="row">{x.badges.map(y => <img src={y} />)}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* dolje ne dirati */}

                    <div class="col-lg-4">
                        activity log
                    </div>
                    <div class="col-lg-1">prazno desno</div>
                </div>
            </div>
        );
    }
}

export default Ranking;
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import jwtdecode from "jwt-decode";

import ConfirmDeactivationModal from '../Modals/ConfirmDeactivationModal/ConfirmDeactivationModal.component'
import InactiveBadgeModal from '../Modals/InactiveBadgeModal/InactiveBadgeModal.component'

import './Badge.style.scss';

export default function Badge(props) {

    const currentUser = jwtdecode(localStorage.getItem("access_token")).Username;

    const {
        badgeData,
        item,
        toggleBadge,
        background,
        routeParams,
        username
    } = props

    const [isModalVisible, setModalVisible] = useState(false);

    return (

        <div className="badgeHolder">

            {item.name != "empty" ?

                <div className="activeBadge" style={{ background: background }}>

                    <div className="modalClick" onClick={() => setModalVisible(true)}></div>

                    <img src={props.item.image} />

                    <Modal show={isModalVisible} className="badgeModal">
                        <Modal.Header>
                            <Modal.Title>Badge Info - <span className="bold">{item.name}</span></Modal.Title>
                        </Modal.Header>

                        {routeParams == currentUser ?
                            (
                                <Modal.Body>
                                    <p>You obtained this badge on {badgeData.created}</p>
                                    <p>Rarity : {item.rarity.name}</p>
                                    <p>Tier : Basic</p>
                                    <p>Quantitiy: 0</p>
                                    <p>Badge description</p>

                                    {/* <div className="modalBodyButtons">

                            <ConfirmDeactivationModal
                                item={item}
                                deactivateBadge={toggleBadge}
                                onClick={() => setModalVisible(false)}
                            />

                        </div> */}

                                </Modal.Body>
                            ) : (
                                <Modal.Body>
                                    <p>{username} obtained badge on {badgeData.created}</p>
                                    <p>Rarity : {item.rarity.name}</p>
                                    <p>Tier : Basic</p>
                                    <p>Quantitiy: 0</p>
                                    <p>Badge description</p>

                                </Modal.Body>
                            )
                        }


                        <Modal.Footer>
                            {routeParams == currentUser ?
                                (
                                    <div className="modalBodyButtons">

                                        <ConfirmDeactivationModal
                                            item={item}
                                            deactivateBadge={toggleBadge}
                                            onClick={() => setModalVisible(false)}
                                        />
                                        <div className="modalButton closeButton" onClick={() => setModalVisible(false)} >
                                            <p>CLOSE</p>
                                        </div>

                                    </div>
                                ) : (

                                    <div className="modalButton closeButton" onClick={() => setModalVisible(false)} >
                                        <p>CLOSE</p>
                                    </div>
                                )}
                        </Modal.Footer>

                    </Modal>

                </div>
                :
                <div className="inactiveBadge">


                    <InactiveBadgeModal
                        activateBadge={toggleBadge}
                        routeName={routeParams}
                    />

                </div>
            }

        </div>
    )
}

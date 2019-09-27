import React,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';
import { profile } from "../../../api/index";
import jwtdecode from "jwt-decode";

import './InactiveBadgeModal.style.scss';

export default function InactiveBadgeModal (props) {

    const [isModalVisible,setModalVisible] = useState(false);
    const [itemsList, setItemsList] = useState([]);
    const [isLoading,setIsLoading] = useState(false);

    const {
        activateBadge,
        routeName
    } = props;

    const currentUser = jwtdecode(localStorage.getItem("access_token"));

    useEffect(() => {   
        const fetchData = async () => {

            setIsLoading(true);

            const getInactiveBadges = await profile.getInactiveBadges.get(currentUser.ProfileId);

            setItemsList(getInactiveBadges.data);

            setIsLoading(false);

        }

        fetchData();
    }, []);

    return (
        <div>

            <div className="modalClick" onClick={()=>setModalVisible(true)}></div>

            <Modal show={isModalVisible} className="badgeModal">
                                
                <Modal.Header className="modalHeader">
                    <Modal.Title>Badge Info</Modal.Title>
                </Modal.Header>
                {routeName==currentUser.Username ? (
                <Modal.Body>

                    This badge spot is not active yet! <br/> To activate a badge hover over it and than click activate or select one from the list below
                    

                    <div className="itemsContainerModal">
                    {
                        itemsList.map((inventoryItem, index) => {
                            return (
                                <div className="itemCard"
                                    key={index}
                                    style={{ background: inventoryItem.item.rarity.backgroundColor }}
                                    onClick={()=>activateBadge(inventoryItem.item.id)}
                                    
                                >
                                    <img src={inventoryItem.item.image} alt="" />
                                    <p>{inventoryItem.item.name}</p>
                                </div>
                            )
                        })
                    }
                    </div>
                </Modal.Body>
                ):(
                    <p><br/>This badge spot is not active yet! <br/></p>
                )
                }

                <Modal.Footer>
                    <div className = "modalButton" onClick={()=>setModalVisible(false)} >
                        <p>CLOSE</p>
                    </div>
                </Modal.Footer>
                
            </Modal>

        </div>
    )
}

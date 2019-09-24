import React,{useState} from 'react'

import Modal from 'react-bootstrap/Modal';

import './Badge.style.scss';



export default function Badge(props) {

    const {
        badgeData,
        item,
        deactivateBadge
    } = props

    const [state,setState] = useState({
        isModalVisible:false,
        isConfirmationVisible:false
    })
    
    const {
        isModalVisible,
        isConfirmationVisible
    } = state;
    
    return (
        
        <div className="badge">
        
        { item.name != "empty" ?

            <div className="activeBadge">

                <div className="modalClick" onClick={()=>setState({isModalVisible:true})}></div>

                <img src={props.item.image} />

                <Modal show={isModalVisible} className="badgeModal">
                                
                    <Modal.Header>
                        <Modal.Title>Badge Info - <span className="bold">{item.name}</span></Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                        <p>You obtained this badge on {badgeData.created}</p>
                        <p>Rarity : {item.rarity.name}</p>
                        <p>Tier : Basic</p>
                        <p>Quantitiy: 0</p>
                        <p>Badge description</p>

                        <div className="modalBodyButtons">
                            <div className = "modalButton actionButton" onClick={()=>setState({isModalVisible:false})}>
                                <p>UPGRADE</p>
                            </div>

                            <div className = "modalButton actionButton" onClick={()=>setState({isConfirmationVisible:true})}>
                                <p>DEACTIVATE</p>
                            </div>
                        </div>

                    </Modal.Body>
                        
                    <Modal.Footer>
                        <div className = "modalButton closeButton" onClick={()=>setState({isModalVisible:false})} >
                            <p>CLOSE</p>
                        </div>
                    </Modal.Footer>
                    
                </Modal>

                <Modal show={isConfirmationVisible} className="badgeModal">
                                
                    <Modal.Header>
                        <Modal.Title>Confirm Deactivation</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                        <p>You are about to deactive your badge <span className="bold">{item.name}</span> </p>
                        <p>Note that this badge will go back to your inventory and you can activate it again whenever you want !</p>
                        <br/>
                    </Modal.Body>
                        
                    <Modal.Footer>
                    <div className = "modalButton closeButton" onClick={()=>{setState({isModalVisible:false}); deactivateBadge(item.id)}}>
                            <p>ACCEPT</p>
                        </div>
                        <div className = "modalButton closeButton" onClick={()=>setState({isModalVisible:false})} >
                            <p>CLOSE</p>
                        </div>
                    </Modal.Footer>
                    
                </Modal>

            </div>
        : 
            <div className="inactiveBadge">

                <div className="modalClick" onClick={()=>setState({isModalVisible:true})}></div>

                <Modal show={isModalVisible} className="badgeModal">
                                
                    <Modal.Header className="modalHeader">
                        <Modal.Title>Badge Info</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                        <p>This badge spot is not active yet, to activate a badge hover over it and than click activate !</p>
                    </Modal.Body>
                        
                    <Modal.Footer>
                        <div variant="primary" className = "modalButton" onClick={()=>setState({isModalVisible:false})} >
                            <p>CLOSE</p>
                        </div>
                    </Modal.Footer>
                    
                </Modal>
            </div>
        } 

        </div>
    )
}

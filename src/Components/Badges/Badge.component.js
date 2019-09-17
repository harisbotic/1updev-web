import React,{useState} from 'react'

import Modal from 'react-bootstrap/Modal';

import './Badge.style.scss';

export default function Badge(props) {

    const {
        badgeData,
        item
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

                <i className={item.image}/>

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

                            <div className = "modalButton actionButton" onClick={()=>setState({isModalVisible:false})}>
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
            </div>
        : 
            <div className="inactiveBadge">

                <div className="modalClick" onClick={()=>setState({isModalVisible:true})}></div>

                <i className={item.image}/>

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

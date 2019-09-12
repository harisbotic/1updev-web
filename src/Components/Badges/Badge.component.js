import React,{useState} from 'react'

import Modal from 'react-bootstrap/Modal';

import './Badge.style.scss';

export default function Badge(props) {

    const {
        badgeData,
        item
    } = props

    const [state,setState] = useState({
        isModalVisible:false
    })
    
    const {
        isModalVisible
    } = state;

    
    return (
        
        <div className="badge">
        
        { badgeData != null ?

            <div className="activeBadge">

                <div className="modalClick" onClick={()=>setState({isModalVisible:true})}></div>

                <i className={item.image}/>

                <Modal show={isModalVisible} className="badgeModal">
                                
                    <Modal.Header className="modalHeader">
                        <Modal.Title>Badge Info</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                        <p>You are about to deactivate <span className="modalSpan"> {item.name}</span> Badge</p> 
                        <p>Click accept to continue or cancle to go back</p>
                        <p>Note that this badge will go back to your inventory and you can activate it again whenever you want</p>
                    </Modal.Body>
                        
                    <Modal.Footer>
                        <div variant="secondary" className = "modalButton" onClick={()=>setState({isModalVisible:false})}>
                            <p>ACCEPT</p>
                        </div>
                        <div variant="primary" className = "modalButton" onClick={()=>setState({isModalVisible:false})} >
                            <p>CANCEL</p>
                        </div>
                    </Modal.Footer>
                    
                </Modal>
            </div>
        : 
        <div className="inactiveBadge">
        </div>
        } 
        </div>
    )
}

import React, {useState} from 'react'
import { Accordion, Card } from 'react-bootstrap';

import "./FilterOptions.style.scss"

export function FilterOptions(props) {

    const {
        searchFilter,
        categoryFilter
    } = props;

    const [state, setState] = useState({
        nameFilterAscending:true,
        valueFilterAscending:true,
        typeFilterAscending:true
    });

    const {
        nameFilterAscending,
        valueFilterAscending,
        typeFilterAscending
    } = state;

    return (

        <div className="filterOptionsDesktop">                    
            <div className="filterOptions">
                <p>FILTER</p>
                <p id="sortByName" onClick={()=>{categoryFilter("name",nameFilterAscending);setState({nameFilterAscending:!nameFilterAscending})}}>Name <i className='fas fa-chevron-down'></i></p>
                <p id="sortByValue" onClick={()=>{categoryFilter("value",valueFilterAscending);setState({valueFilterAscending:!valueFilterAscending})}}>Value <i className='fas fa-chevron-down'></i></p>
                <p id="sortByType" onClick={()=>{categoryFilter("type",typeFilterAscending);setState({typeFilterAscending:!typeFilterAscending})}}>Category <i className='fas fa-chevron-down'></i></p>

                <div className="searchBoxComponent">
                    <i className="fas fa-search"></i>
                    <input
                        type="text"
                        name="search"
                        className="searchBox"
                        onChange={(e) => searchFilter(e.target.value)}
                        placeholder="Search items..."
                    />
                </div>
            </div>
        </div>
    )
}

export function FilterOptionsMobile(props) {

    const {
        searchFilter,
        categoryFilter
    } = props;

    const [state, setState] = useState({
        nameFilterAscending:true,
        valueFilterAscending:true,
        typeFilterAscending:true
    });

    const {
        nameFilterAscending,
        valueFilterAscending,
        typeFilterAscending
    } = state;

    return (
        <div className="filterOptionsMobile">                    
            <Accordion>
                <Card>
                
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    Show Filter Options
                </Accordion.Toggle>

                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <div className="filterOptions">
                            
                            <div className="typeFilter">
                                <p id="sortByName" onClick={()=>{categoryFilter("name",nameFilterAscending);setState({nameFilterAscending:!nameFilterAscending})}}>Name <i className='fas fa-chevron-down'></i></p>
                                <p id="sortByValue" onClick={()=>{categoryFilter("value",valueFilterAscending);setState({valueFilterAscending:!valueFilterAscending})}}>Value<i className='fas fa-chevron-down'></i></p>
                                <p id="sortByType" onClick={()=>{categoryFilter("type",typeFilterAscending);setState({typeFilterAscending:!typeFilterAscending})}}>Category <i className='fas fa-chevron-down'></i></p>
                            </div>

                            <div className="searchBoxComponent">
                                <i className="fas fa-search"></i>
                                <input
                                    type="text"
                                    name="search"
                                    className="searchBox"
                                    onChange={(e) => searchFilter(e.target.value)}
                                    placeholder="Search items..."
                                />
                            </div>
                        </div>
                    </Card.Body>

                </Accordion.Collapse>

            </Card>
        </Accordion>
    </div>
    )
}

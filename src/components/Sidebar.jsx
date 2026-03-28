import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faAngleDown } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  return (
    <div className='sidebar'>
        <div className='filter-header'><span>FILTERS</span><span>1000+ Products</span></div>
        <div className='filter-body'>
            <div className='filter-section'>
                <div className='filter-menu'>
                    <label>Category</label>
                    <span className='toggle'>
                        <FontAwesomeIcon 
                        icon={faAngleDown} 
                        style={{
                            fontSize:"1.5rem"
                        }}
                        />
                    </span>
                </div>
                <div className='filter-section-list'>
                    <div className='checkbox'>
                        <span>
                            <FontAwesomeIcon icon={faSquare} style={{ 
                                color: "transparent",
                                border: "2px solid rgb(139, 139, 163)",
                                borderRadius:"3px"
                            }} />
                        </span>
                    </div>
                    <div className='label'>
                        <span>Men</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

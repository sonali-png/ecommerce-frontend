import React from 'react'

export default function Grid4({title, data}) {
  return (
    <div className='container'>
        <div className='section-heading'>
            <h2>{title}</h2>
        </div>
        <div className='sp-grid-4-section'>
            <div className='sp-grid-4-widget-container'>
                <div className='sp-grid-4-widget' style={{display: "flex" , alignItems: "center"}}>

                    { 
                        data.map(d => 
                            <div className='sp-grid-4-image' style={{ width: "355px"}}>
                                <a href={d.url}>
                                    <img src={d.image.url}  alt="image" style={{width:"98%"}}/>
                                </a>
                            </div>
                        )
                    }
                    
                </div>
            </div>
        </div>
    </div>
  )
}

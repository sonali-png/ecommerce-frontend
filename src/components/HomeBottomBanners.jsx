import React from 'react'

export default function HomeBottomBanners({bannersData}) {
  return (
    <div className="sp-container-top-grid-banners">
        <div className="sp-container-top-grid-widget">
          {
            bannersData.map(d => d.displayOrder !== 1 && 
                <div className="sp-container-top-grid-img-list">
                  <div className="top-grid">
                    
                      <div className="top-grid-image bg-std" style={{backgroundImage: `url(${d.image.url})`, height:"320px", width:"100%" }}>
                      </div>
                      <div className="top-grid-info">
                        <div className="sp-title">{d.title}</div>
                        <div className="sp-subtitle">{d.subtitle}</div>
                      </div>
                  </div>
                </div>
              )
          }
            
        </div>
    </div>
  )
}

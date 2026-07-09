import React from 'react'

export default function HomeTopBanner({bannersData}) {
  return (
    <div className="sp-container-right">
        <div className="sp-container-right-content">
            <div className="sp-widget-container">
                <form>
                    <div className="input-group">
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Search products here ..."
                            />
                        </div>

                        <select>
                            <option>All Categories</option>
                            <option>Men</option>
                            <option>Women</option>
                            <option>Footwear</option>
                            <option>Beauty</option>
                        </select>

                        <button type="submit">
                            Search
                        </button>
                    </div>
                </form>
            </div>

            
            <div className="sp-content-container">
                <div className="sp-home-banner-widget-container">
                    <div className="sp-home-banner-widget">
                        <div className="sp-home-hero-banners-list">
                            {
                                bannersData.map(d =>   d.displayOrder === 1 &&
                                    <div className="sp-home-hero-banner">
                                        <div className="content-left">
                                            <div className="hero-banner-text">
                                                <div className="heading">{d.title}</div>
                                                <div className="sub-heading">{d.subtitle}</div>
                                                <div className="link">Explore Now</div>
                                            </div>
                                        </div>
                                        <div className="content-right">
                                            <div className="hero-banner-image">
                                                <img src={d.image.url} alt="image" />
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
  )
}

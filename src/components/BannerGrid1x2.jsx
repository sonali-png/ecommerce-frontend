import React from 'react'

import CategorySidebar from "../components/CategorySidebar";
import HomeTopBanner from "../components/HomeTopBanner.jsx";
import HomeBottomBanners from "../components/HomeBottomBanners.jsx";

export default function BannerGrid1x2({data}) {
  return (
  <>
    <div className="container">
      <section className="sp-section">
        <div className="sp-container">
          <CategorySidebar />
          <HomeTopBanner bannersData={data || []} />
        </div>
      </section>
    </div>

    <div className="container">
      <HomeBottomBanners bannersData={data || []} />
    </div>
    </>
  )
}

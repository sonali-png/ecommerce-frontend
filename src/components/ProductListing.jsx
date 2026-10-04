import React, { useState } from "react";

import CategorySidebar from "../components/CategorySidebar";
import { Link } from "react-router-dom";

import LayoutCss from "../css/newLayoutCopy.module.css";

export default function ProductListing({ products, lastProductRef }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div className={LayoutCss.container}>
        <section>
          <div className={LayoutCss.spContainer}>
            <CategorySidebar />

            <div className={LayoutCss.spContainerRight}>
              <div className={LayoutCss.spContainerRightContent}>

                <div className={LayoutCss.spProductListingContainer}>
                  <div className={LayoutCss.spProductListingWrapper}>

                    <div className={LayoutCss.spProductList}>
                      {products.map((product, index) => {
                        const isLastItem =
                          products.length === index + 1;

                        console.log(
                          `product :${JSON.stringify(product)}`
                        );

                        return (
                          <div
                            key={product._id}
                            className={LayoutCss.spProductBox}
                            ref={isLastItem ? lastProductRef : null}
                          >
                            <div>
                              <Link
                                to={`/product/${product.slug}/${product.details.productCode}`}
                              >
                                <div className={LayoutCss.prodImgContainer}>
                                  <div
                                    className={`${LayoutCss.listImage} ${LayoutCss.bgStd}`}
                                  >
                                    <img
                                      src={
                                        product?.thumbnail ||
                                        "https://assets-jiocdn.ajio.com/medias/sys_master/root1/20251128/PH42/69297d368945db77cff6a65a/-473Wx593H-443091809-maroon-MODEL.jpg"
                                      }
                                      alt={product.name}
                                      loading="lazy"
                                      onLoad={() => setLoaded(true)}
                                      style={{
                                        opacity: loaded ? 1 : 0,
                                        transition: "opacity .3s",
                                      }}
                                    />
                                  </div>
                                </div>

                                <div className={LayoutCss.prodInfo}>
                                  <div className={LayoutCss.brand}>
                                    {product?.brandId?.name?.toUpperCase()}
                                  </div>

                                  <div className={LayoutCss.title}>
                                    {product.name}
                                  </div>

                                  <div className={LayoutCss.priceGroup}>
                                    <div className={LayoutCss.price}>
                                      ₹ {product?.minPrice}
                                    </div>

                                    <div className={LayoutCss.mrp}>
                                      ₹ {product?.minPriceMRP}
                                    </div>

                                    <div className={LayoutCss.discount}>
                                      ({product?.minPriceDiscount}% off)
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

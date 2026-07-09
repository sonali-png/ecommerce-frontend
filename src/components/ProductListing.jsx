import React, {useState} from 'react'
import CategorySidebar from "../components/CategorySidebar";
import { Link } from 'react-router-dom';

export default function ProductListing({ products, lastProductRef}) {
    const [loaded, setLoaded] = useState(false);
    return (
    <>
        <div className="container">
            <section className="sp-section">
                <div className="sp-container">
                    <CategorySidebar />
                    <div className="sp-container-right">
                        <div className="sp-container-right-content">
                            <div className='sp-product-listing-container'>
                                <div className='sp-product-listing-wrapper'>
                                    <div className='sp-product-list'>
                                        {
                                            products.map((product, index) => {
                                                const isLastItem = products.length === index + 1;
                                                console.log(`product :${JSON.stringify(product)}`);
                                                return ( <div 
                                                    key={product._id} 
                                                    className='sp-product-box' 
                                                    ref={isLastItem ? lastProductRef : null}
                                                >
                                                    <div className='sp-product-box-a'>
                                                    <Link to={`/product/${product.slug}/${product.details.productCode}`}>
                                                        <div className='prod-img-container'>
                                                            <div className='list-image bg-std'>
                                                                <img 
                                                                    src={product?.thumbnail || 'https://assets-jiocdn.ajio.com/medias/sys_master/root1/20251128/PH42/69297d368945db77cff6a65a/-473Wx593H-443091809-maroon-MODEL.jpg'} 
                                                                    alt={product.name}
                                                                    loading="lazy"
                                                                    onLoad={() => setLoaded(true)}
                                                                    style={{
                                                                        opacity: loaded ? 1 : 0,
                                                                        transition: "opacity .3s"
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='prod-info'>
                                                            <div className='brand'>{product?.brandId?.name.toUpperCase()}</div>
                                                            <div className='title'>{product.name}</div>
                                                            <div className='price-group'>
                                                                <div className='price'>
                                                                    ₹ {product?.minPrice}
                                                                </div>
                                                                <div className='mrp'>
                                                                    ₹ {product?.minPriceMRP}
                                                                </div>
                                                                <div className='discount'>({product?.minPriceDiscount}% off)</div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    </div>
                                                </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>
    )
}

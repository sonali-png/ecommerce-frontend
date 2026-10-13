import { useMemo, useState, useEffect  } from "react";
import { useParams, Link } from "react-router-dom";

import useCommonList from "../hooks/useCommonList";

import ProductImageGallery from "../components/ProductImageGallery";
import ProductInfo from "../components/ProductInfo";

import LayoutCss from "../css/newLayoutCopy.module.css";

export default function ProductDetail() {
  const { productCode } = useParams();

  const whereClause = useMemo(
    () => ({
      "details.productCode": productCode,
    }),
    [productCode]
  );

  const {records:product  } = useCommonList("products", {whereClause});
  const productDetailData = product?.[0] || [];
  const breadCrumbPath = productDetailData.categoryId?.path || [];
  const [selectedColor, setSelectedColor] = useState("");

  const colorSlugs = (productDetailData?.colorImages || []).map(
    item => item.color
  );

  const {records:colors  } = useCommonList("colors", {
    limit: colorSlugs.length,
    color: { $in: colorSlugs }
  });

  const colorImages = (productDetailData?.colorImages || []).map(item => {
    const color = colors.find(
        c => c.slug === item.color
    );

    return {
        ...item,
        hex: color?.hex || ""
    };
  });

  useEffect(() => {
    if (!selectedColor && productDetailData?.colorImages?.length > 0) {
      setSelectedColor( productDetailData.colorImages[0].color );
    }
  }, [productDetailData, selectedColor]);
  
  return (
    <>
      <div className={LayoutCss.bgfWrapper}>
        <div className={LayoutCss.container}>
          
          <div>
            <ul className={LayoutCss.breadcrumbUl}>
              {breadCrumbPath.length > 0 &&
                breadCrumbPath.map((d, index) => (
                  <li key={index}>
                    <Link to="/">{d}</Link> /
                  </li>
                ))}
            </ul>
          </div>
          <div className={LayoutCss.spDetailWrapper}>
            <ProductImageGallery 
              productImages={colorImages}
              selectedColor={selectedColor}
            />

            <ProductInfo
              product={productDetailData}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />
          </div>

        </div>
      </div>
    </>
  );
}
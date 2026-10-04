import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";

import useCommonList1 from "../hooks/useCommonList1";
import ProductImageGallery from "../components/ProductImageGallery";
import ProductInfo from "./ProductInfo";

import LayoutCss from "../css/newLayoutCopy.module.css";

export default function ProductDetail() {
  const { productCode } = useParams();

  const whereClause = useMemo(
    () => ({
      "details.productCode": productCode,
    }),
    [productCode]
  );

  const { records: data, loading } = useCommonList1(
    "products",
    null,
    whereClause
  );

  const { records: colorsData } = useCommonList1("colors");

  const breadCrumbPath = data[0]?.categoryId?.path || [];

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
            <ProductImageGallery />

            <ProductInfo
              product={data}
              colorsData={colorsData}
            />
          </div>

        </div>
      </div>
    </>
  );
}
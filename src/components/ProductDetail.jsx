import {useMemo} from 'react'
import useCommonList from '../hooks/useCommonList'
import { useParams } from 'react-router-dom';
import ProductImageGallery from "../components/ProductImageGallery";
import ProductInfo from './ProductInfo';
import { Link } from 'react-router-dom';
export default function ProductDetail() {
  const { productCode } = useParams();
  const whereClause = useMemo(
    () => ({
      "details.productCode": productCode
    }),
    [productCode]
  );
  const {records:data, loading} = useCommonList("products", null, whereClause);
  const {records:colorsData} = useCommonList("colors");
  const breadCrumbPath = data[0]?.categoryId?.path || []; 
  // console.log(data[0].categoryId.path.map((e) => console.log(`hdsfhgdsgf ${e}`)))
  return (
      <>
        <div className='bgf-wrapper'>
          <div className="container">
            <section className="sp-section">
              <div className='breadcrumb-section'>
                <ul className='breadcrumb-ul'>
                  { 
                    breadCrumbPath.length > 0 && breadCrumbPath.map((d) => 
                    <li className='breadcrumb-li'>
                        <Link to={`/`}> {d} </Link> /
                      </li>
                    )
                  }
                </ul>
              </div>
              <div className='sp-detail-wrapper'>
                <ProductImageGallery />      
                <ProductInfo product={data} colorsData={colorsData} />
              </div> 
            </section>
          </div>
        </div>
      </>
      )
}
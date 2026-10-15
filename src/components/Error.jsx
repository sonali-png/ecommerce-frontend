import LayoutStyle from "../css/newLayoutCopy.module.css";
import { Link } from "react-router-dom";
export default function Error({
    heading="",
    info=""
}) {
  return (
    <div className={LayoutStyle.bgfWrapper}>
        <div className={LayoutStyle.container}>
            <div className={LayoutStyle.emptyRecordsContainer}>
                <div className={LayoutStyle.emptyRecordsWrapper}>
                    <div className={LayoutStyle.oopsCircle}>Oops !</div>
                    <h3>{heading || ""}</h3>
                    <p className={LayoutStyle.info}>{info || ""}</p>
                    <Link to="/" className={LayoutStyle.btnShopping}>Continue Shopping</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

import { Audio } from 'react-loader-spinner'
import CommonStyles from "../../css/Admin/Common.module.css";

export default function Loader() {
  return (
    <div className={CommonStyles.loaderOverlay}>
        <Audio
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="audio-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
        visible={true}
        />
    </div>
  )
}
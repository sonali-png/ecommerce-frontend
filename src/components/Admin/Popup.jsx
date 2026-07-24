import PopupStyles from '../../css/Admin/Popup.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faTriangleExclamation,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

export default function Popup( {
    open, 
    type,
    title, 
    message,
    onClose
}) {
    if (!open) return null;
    const iconMap = {
        success: faCircleCheck,
        error: faCircleXmark,
        warning: faTriangleExclamation,
        info: faCircleInfo,
    };
    const titles = {
        success: "Success",
        error: "Error",
        warning: "Warning",
        info: "Information",
    };
    return (
    <>
        <div 
            className={PopupStyles.alertOverlay} 
            role="dialog" 
            aria-modal="true" 
            aria-labelledby="alertTitle" 
            aria-describedby="alertMsg">
            
            <div className={PopupStyles.alertBox}>
                <div className={`${PopupStyles.alertIcon}  ${PopupStyles[type]}`}>
                    <FontAwesomeIcon icon={iconMap[type]} style={{fontSize:"3rem"}}/>
                </div>
                <h2 className={PopupStyles.alertTitle}>{title || titles[type]}</h2>
                <p className={PopupStyles.alertMessage}>{message}</p>
                <div className={PopupStyles.alertActions}>
                    <button 
                        className={PopupStyles.alertBtn} 
                        onClick={onClose}>Close
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}

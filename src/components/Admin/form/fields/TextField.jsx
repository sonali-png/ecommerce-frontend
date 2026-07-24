import CommonStyles from "../../../../css/Admin/Common.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark ,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
export default function TextField({
    field,
    value,
    setFormData,
    error,
    clearError
}) {
    const valuesData = field.addMore
    ? (Array.isArray(value) && value.length > 0 ? value : [""])
    : [value || ""];
    return (
        <div className={CommonStyles.formGroup}>
        <label className={CommonStyles.formLabel}>{field.label}</label>
        {
            valuesData.map((item, index) => (
                
                <div key={index}>
                    {console.log(item)}
                    <input
                        className={ `${CommonStyles.formControl} ${field.addMore ? CommonStyles.actionIcons : ''}` }
                        value={item}
                        onChange={(e) => {
                            const updated = [...valuesData];
                            updated[index] = e.target.value;

                            setFormData(prev => ({
                                ...prev,
                                [field.name]: field?.addMore ? updated : updated[0],
                            }));
                        }}
                    />
                    {
                        field.addMore &&  
                        <>
                        <FontAwesomeIcon 
                            icon={faXmark} 
                            style={{fontSize:"1.5rem"}}
                            onClick={() => {
                                const updated = valuesData.filter((_, i) => i !== index);

                                setFormData(prev => ({
                                    ...prev,
                                    [field.name]: updated
                                }));
                            }}
                        
                        />
                        
                        <FontAwesomeIcon 
                            icon={faPlus} 
                            style={{fontSize:"1.5rem"}}
                            className={CommonStyles.addField}
                            onClick={() => {
                                setFormData(prev => ({
                                    ...prev,
                                    [field.name]: [...valuesData, ""]
                                }));
                            }}
                        />
                    </>
                    }
                    
                </div>
            ))
        }
        {error && (
            <div className={CommonStyles.error}>
                * {error}
            </div>
        )}
        </div>
    );
}
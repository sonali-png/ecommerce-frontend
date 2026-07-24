import CommonStyles from "../../../../css/Admin/Common.module.css"
export default function TextArea({
    field,
    value,
    setFormData,
    error,
    clearError
}) {

    return (
        <div className={CommonStyles.formGroup}>

            <label className={CommonStyles.formLabel}>{field.label}</label>

            <textarea
                className={CommonStyles.formControl}
                value={value || ""}
                onChange={(e) =>{
                    clearError(field.name)
                    setFormData(prev => ({
                        ...prev,
                        [field.name]: e.target.value
                    }))}   
                }
            />
            {error && (
                <div className={CommonStyles.error}>
                    * {error}
                </div>
            )}
        </div>
    );
}
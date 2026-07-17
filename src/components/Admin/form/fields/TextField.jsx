import CommonStyles from "../../../../css/Admin/Common.module.css"

export default function TextField({
    field,
    value,
    setFormData
}) {

    return (
        <div className={CommonStyles.formGroup}>

            <label className={CommonStyles.formLabel}>{field.label}</label>

            <input
                className={CommonStyles.formControl}
                type={field.type}
                placeholder={field.placeholder}
                value={value || ""}
                onChange={(e) =>
                    setFormData(prev => ({
                        ...prev,
                        [field.name]: e.target.value
                    }))
                }
            />

        </div>
    );
}
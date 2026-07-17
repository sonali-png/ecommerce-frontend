import CommonStyles from "../../../../css/Admin/Common.module.css"

export default function CheckboxField({
    field,
    value,
    setFormData
}) {

    return (
        <div className={`${CommonStyles.formGroup} ${CommonStyles.singleCheckbox}`}>

            <label className={CommonStyles.formLabel}>
                {field.label} 
            </label>

            <input
                    type="checkbox"
                    checked={!!value}
                    onChange={(e) =>
                        setFormData(prev => ({
                            ...prev,
                            [field.name]: e.target.checked
                        }))
                    }
                />

        </div>
    );
}
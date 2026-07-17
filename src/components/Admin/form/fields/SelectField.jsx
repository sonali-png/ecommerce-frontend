import useCommonList from "../../../../hooks/useCommonList";

import CommonStyles from "../../../../css/Admin/Common.module.css";
import FilterStyles from "../../../../css/Admin/Filter.module.css";

export default function SelectField({
    field,
    value,
    formData,
    setFormData
}) {

    const { records } = useCommonList(
        field.collection,
        {},
        !field.collection
    );

    return (
        <div className={CommonStyles.formGroup}>

            <label className={CommonStyles.formLabel}>
                {field.label}
            </label>

            <select
                className={`${CommonStyles.formControl} ${FilterStyles.filterSelect}`}
                value={value || ""}
                onChange={(e) =>
                    setFormData(prev => ({
                        ...prev,
                        [field.name]: e.target.value
                    }))
                }
            >
                <option value="">
                    Select {field.label}
                </option>

                {records.map(item => (
                    <option
                        key={item[field.valueField]}
                        value={item[field.valueField]}
                    >
                        {item[field.labelField]}
                    </option>
                ))}

            </select>

        </div>
    );
}
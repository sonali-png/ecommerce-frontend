import useCommonList from "../../../../hooks/useCommonList";
import CommonStyles from "../../../../css/Admin/Common.module.css";

export default function CheckboxGroup({
    field,
    value = [],
    setFormData,
    error,
    clearError
}) {
    const { records } = useCommonList(
        field.collection,
        {},
        !field.collection
    );

    const handleChange = (selectedValue) => {

        const exists = value.some(
            item => item[field.valueField] === selectedValue
        );

        let updatedValue;

        if (exists) {
            updatedValue = value.filter(
                item => item[field.valueField] !== selectedValue
            );
        } else {
            updatedValue = [
                ...value,
                { [field.valueField]: selectedValue }
            ];
        }
        clearError(field.name)
        setFormData(prev => ({
            ...prev,
            [field.name]: updatedValue
        }));
    };

    return (
        <div className={CommonStyles.formGroup}>

            <label className={CommonStyles.formLabel}>{field.label}</label>

            <div className={CommonStyles.checkboxGroup}>

                {records.map(record => {

                    const checked = value.some(
                        item =>
                            item[field.valueField] ===
                            record[field.valueField]
                    );

                    return (
                        <label
                            key={record[field.valueField]}
                            className={CommonStyles.checkboxLabel}
                        >
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={() =>
                                    handleChange(record[field.valueField])
                                }
                            />

                            <span>
                                {record[field.labelField]}
                            </span>

                        </label>
                    );
                })}

            </div>
            {error && (
                <div className={CommonStyles.error}>
                    * {error}
                </div>
            )}
        </div>
    );
}
import useCommonList from "../../../../hooks/useCommonList";
import CommonStyles from "../../../../css/Admin/Common.module.css";

export default function CheckboxGroup({
    field,
    value = [],
    setFormData,
    error,
    clearError = () => {},
    options = null,
    onChange,
    listStyle=""
}) {

    // Fetch records only if options are not provided
    const { records } = useCommonList(
        field.collection,
        {},
        !field.collection || !!options
    );

    const data = options || records;

    const isObjectArray =
        value.length > 0 && typeof value[0] === "object";

    const handleChange = (selectedValue) => {

        let updatedValue;
        let checked;

        if (isObjectArray) {

            const exists = value.some(
                item => item[field.valueField] === selectedValue
            );

            checked = !exists;

            updatedValue = exists
                ? value.filter(
                      item => item[field.valueField] !== selectedValue
                  )
                : [
                      ...value,
                      { [field.valueField]: selectedValue }
                  ];

        } else {

            const exists = value.includes(selectedValue);

            checked = !exists;

            updatedValue = exists
                ? value.filter(item => item !== selectedValue)
                : [...value, selectedValue];
        }

        // For custom handling (Variants etc.)
        if (onChange) {
            onChange(updatedValue, selectedValue, checked);
            return;
        }

        // Default form handling
        clearError(field.name);

        setFormData(prev => ({
            ...prev,
            [field.name]: updatedValue
        }));
    };

    return (
        <div className={CommonStyles.formGroup}>

            {field.label && (
                <label className={CommonStyles.formLabel}>
                    {field.label}
                </label>
            )}

            <div className={
                `${
                    listStyle === 'grid' ? 
                    CommonStyles.checkboxGroupGrid :
                    CommonStyles.checkboxGroup
                }`
            }>

                {data.map(record => {

                    const recordValue =
                        record[field.valueField];

                    const recordLabel =
                        record[field.labelField];

                    const checked = isObjectArray
                        ? value.some(
                              item =>
                                  item[field.valueField] ===
                                  recordValue
                          )
                        : value.includes(recordValue);

                    return (
                        <label
                            key={recordValue}
                            className={CommonStyles.checkboxLabel}
                        >
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={() =>
                                    handleChange(recordValue)
                                }
                            />

                            <span>{recordLabel}</span>
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
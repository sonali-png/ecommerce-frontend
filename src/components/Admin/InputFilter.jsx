import FilterStyles from "../../css/Admin/Filter.module.css";
import CommonStyles from "../../css/Admin/Common.module.css";

export default function InputFilter({
    name,
    placeholder,
    filters,
    control,
    onFilterChange
}) {
    return (
        <>
            <input
                className={CommonStyles.formControl}
                key={name}
                placeholder={placeholder}
                value={filters?.[control.name] ?? ""}
                onChange={(e)=>
                    onFilterChange(
                        control.name,
                        e.target.value
                    )
                }
            />    
        </>
    )
}

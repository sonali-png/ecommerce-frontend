import useCommonList from "../../hooks/useCommonList";
import CommonStyles from "../../css/Admin/Common.module.css";
import FilterStyles from "../../css/Admin/Filter.module.css";

export default function SelectFilter({ control, filters={}, onFilterChange }) {

    const { records = [] } = useCommonList(control.collection);

    const options = control.collection
        ? records.map(item => ({
            label: item[control.labelField],
            value: item[control.valueField]
        }))
        : control.options;

        console.log(control.name);
    return (
        <select
            className={`${CommonStyles.formControl} ${FilterStyles.filterSelect}`}
            value={filters?.[control.name] ?? ""}
            onChange={(e) =>
                onFilterChange(control.name, e.target.value)
            }
        >
            <option value="">
                {control.placeholder}
            </option>

            {options.map(option => (
                <option
                    key={option.value}
                    value={option.value}
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
}
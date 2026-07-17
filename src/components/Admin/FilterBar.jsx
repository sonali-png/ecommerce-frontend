import SelectFilter from "./SelectFilter";
import InputFilter from "./InputFilter"; 
import FilterStyles from "../../css/Admin/Filter.module.css";
import CommonStyles from "../../css/Admin/Common.module.css";

export default function FilterBar({
    controls,
    filters={},
    onFilterChange,
    setPage,
    setFilters
}) {
    const handleClear = async () => {
        setFilters({})
        setPage(1);
    }

    return (
        <div className={FilterStyles.filterBar}>
            {controls.map(control => {
                switch(control.type){
                    case "search":
                        return (
                            <InputFilter
                                name={control.name}
                                placeholder={control.placeholder}
                                filters={filters}
                                control={control}
                                onFilterChange={onFilterChange}
                            />
                        );

                    case "select":
                        return (
                            <SelectFilter
                                key={control.name}
                                control={control}
                                filters={filters}
                                onFilterChange={onFilterChange}
                            />
                        );
                    
                }

            })}

            <button className={CommonStyles.btn} onClick={()=>handleClear()}>
                Clear
            </button>

        </div>
    );

}
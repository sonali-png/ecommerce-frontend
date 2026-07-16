import SelectFilter from "./SelectFilter";
import FilterStyles from "../../css/Admin/Filter.module.css";

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
                            <input
                                key={control.name}
                                placeholder={control.placeholder}
                                value={filters[control.name] || ""}
                                onChange={(e)=>
                                    onFilterChange(
                                        control.name,
                                        e.target.value
                                    )
                                }
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

            <button onClick={()=>handleClear()}>
                Clear
            </button>

        </div>
    );

}
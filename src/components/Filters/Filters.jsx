import styles from "./Filters.module.css"

export function Filters({columnFilters, setColumnFilters, columnId}) {
    // console.log("columnFilters", columnFilters)
    // console.log("columnId", columnId)
    const controllerName = columnFilters.find((f) => f.id === columnId)?.value || "";

    const onFilterchange = (id, value) =>
        setColumnFilters((prev) => prev.filter((f) => f.id !== id).concat({ id, value }));

    // console.log(columnFilters)
    return (
        <div>
            <input className ={styles["filter-input"]} value={controllerName} onChange={(e) => onFilterchange(columnId, e.target.value)} />
        </div>
    );
}

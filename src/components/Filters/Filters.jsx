export function Filters({columnFilters, setColumnFilters}) {
    console.log("columnFilters", columnFilters)
    const controllerName = columnFilters.find((f) => f.id === "controller")?.value || "";
    
    const onFilterchange = (id, value) =>
        setColumnFilters((prev) => prev.filter((f) => f.id !== id).concat({ id, value }));
    return (
        <div>
            <input value={controllerName} onChange={(e)=>onFilterchange("controller", e.target.value)} />
        </div>
    );
}

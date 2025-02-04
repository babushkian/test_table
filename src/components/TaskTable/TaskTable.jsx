import { useMemo, useRef, useState } from "react";
import {flexRender, getCoreRowModel, useReactTable, getFilteredRowModel, filterFns, getSortedRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { useVirtualizer } from '@tanstack/react-virtual';
import styles from "./TaskTable.module.css"
// import DATA from "../../../data.js";
// import DATA from "../../../fake_dataset.js";

import { EditableCell } from "../EditableCell/EditableCell.jsx";
import { Filters } from "../Filters/Filters.jsx"


// const columns = [
//     {
//         accessorKey: "task",
//         header: "Task",
//         size: 225,
//         cell: EditableCell,
//     },
//     {
//         accessorKey: "status",
//         header: "Status",
//         cell: (props) => <p>{props.getValue()?.name}</p>,
//     },
//     {
//         accessorKey: "due",
//         header: "Due",
//         cell: (props) => <p>{props.getValue()?.toLocaleTimeString()}</p>,
//     },
//     {
//         accessorKey: "notes",
//         header: "Notes",
//         size: 225,
//         cell: (props) => <p>{props.getValue()}</p>,
//     },
// ];

// Функция для фильтрации по солбцам. Обычная фильтрация не сработала, так как она не умеет фильтровать по числам
// мне нужно, чтобы числа фильтровались так же как и строки
const defaultFilter = (row, columnId, filterValue) => {
    const filterValueLower = String(filterValue).toLowerCase();
    const valueString = String(row.getValue(columnId));
    if (!isNaN(Number(row.getValue(columnId)))) {
        return valueString.includes(filterValueLower);
      }
    return valueString.toLowerCase().includes(filterValueLower);
}

// функция для кастомной сортировки по статусам
const statusSortFn = (rowA, rowB, _columnId) => {
    const statusA = rowA.original.status
    const statusB = rowB.original.status
    const statusOrder = ["сделано", "отменено", "в процессе", "ожидает"]
    return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB)
}


export const TaskTable = ({data, columns}) => {
    const [tabledata, setData] = useState(data);
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])
    const [pagination, setPagination] = useState({pageSize: 15, pageIndex: 0})
    const parentRef = useRef(null)


    const defineColumns = () => Object.keys(columns).map(key=>{
        const sortableColumn = key ==="remark" ? false: true 
        const columnDict = { 
            accessorKey: key, 
            header: columns[key], 
            cell: (props) => <span>{props.getValue()}</span>,
            filterFn: defaultFilter,
            enableSorting: sortableColumn,
        }
        if (key==="status") {
            columnDict["sortingFn"] = statusSortFn;
        }

        return columnDict
    })

    // чтобы заголовок не перерисовывался в случае обновления data
    const table_columns = useMemo(defineColumns, []); //не зависимостей, будет отрисован один раз

    const table = useReactTable({data: data, 
        columns: table_columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: setPagination,
        state: {
            columnFilters,
            pagination, // нужно именно так называть переменную, иначе он не присваивает ей новые значения
        },
        
        // meta: {
        //     updateData: (rowIndex, columnId, value)=> setData(prev => prev.map(
        //        (row, index) => index === rowIndex? {...prev[rowIndex], [columnId]: value} : row
        //     ))
        // }
        debugTable: true,
        // debugHeaders: true,
        // debugColumns: false,
     });
    // console.log("ряды", table.getRowModel())
    // console.log("таблица", table.getLeafHeaders())
    // console.log("таблица", table.getHeaderGroups()[0])

    return (
            <div ref={parentRef} className={styles.container}>
            
            <table className={styles.table} style={{ width: table.getTotalSize()}}>
                <thead>
                {table.getHeaderGroups().map((HeaderGroup) => (
                    <tr className={styles.tr} key={HeaderGroup.id}>
                        {HeaderGroup.headers.map((header) => (
                            <th className={styles.th} style={{ width:header.getSize()}} key={header.id}>
                                <div>
                                    <div><span onClick={header.column.getToggleSortingHandler()}>{header.column.columnDef.header}</span>
                                        {{
                                            asc: ' 🔼',
                                            desc: ' 🔽',
                                        }[header.column.getIsSorted()]}
                                    </div>
                                    
                                    <div><Filters columnFilters = {columnFilters} setColumnFilters = {setColumnFilters} columnId = {header.column.id} /></div>
                                </div>
                                <div className={styles.resizer}></div>

                            </th>
                        ))}
                    </tr>
                ))}
                </thead>    
                <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr className={styles.tr} key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td className={styles.td} style={{ width: cell.column.getSize()}} key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            <br></br>
            <span> Страница {table.getState().pagination.pageIndex + 1} из {table.getPageCount()}</span>
            <div>
                <button onClick={table.previousPage} disabled={!table.getCanPreviousPage()}> &lt; </button>
                <button onClick={table.nextPage} disabled={!table.getCanNextPage()}> &gt; </button>
            </div>
            
        </div>
    );
};

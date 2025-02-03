import { useMemo, useRef, useState } from "react";
import {flexRender, getCoreRowModel, useReactTable, getFilteredRowModel, filterFns } from "@tanstack/react-table";
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




export const TaskTable = ({data, columns}) => {
    const [tabledata, setData] = useState(data);
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])

    const defineColumns = () => Object.keys(columns).map(key=>{
        return { accessorKey: key, 
                header: columns[key], 
                cell: (props) => <p>{props.getValue()}</p>,
                filterFn: (row, columnId, filterValue) => {
                    const filterValueLower = String(filterValue).toLowerCase();
                    const valueString = String(row.getValue(columnId));
                    console.log("фильтруемые значения", filterValueLower.valueOf(), valueString.valueOf())
                    if (!isNaN(Number(row.getValue(columnId)))) {
                        return valueString.includes(filterValueLower);
                      }
                    return valueString.toLowerCase().includes(filterValueLower);
                    
                },

            }
    })

    // чтобы заголовок не перерисовывался в случае обновления data
    const table_columns = useMemo(defineColumns, []); //не зависимостей, будет отрисован один раз

    const table = useReactTable({data: data, 
        columns: table_columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        state: {
            columnFilters
        },
        
        // meta: {
        //     updateData: (rowIndex, columnId, value)=> setData(prev => prev.map(
        //        (row, index) => index === rowIndex? {...prev[rowIndex], [columnId]: value} : row
        //     ))
        // }
        // debugTable: true,
        // debugHeaders: true,
        // debugColumns: false,
     });
    // console.log("ряды", table.getRowModel())
    // console.log("таблица", table.getLeafHeaders())
    // console.log("таблица", table.getHeaderGroups()[0])

    return (
            <>
            
            <table className={styles.table} style={{ width: table.getTotalSize()}}>
                <thead>
                {table.getHeaderGroups().map((HeaderGroup) => (
                    <tr className={styles.tr} key={HeaderGroup.id}>
                        {HeaderGroup.headers.map((header) => (
                            <th className={styles.th} style={{ width:header.getSize()}} key={header.id}>
                                <div>
                                    <div>{header.column.columnDef.header}</div>
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
            
        </>
    );
};

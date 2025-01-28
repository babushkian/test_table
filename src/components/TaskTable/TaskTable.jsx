import { useRef, useState } from "react";
import {flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import styles from "./TaskTable.module.css"
// import DATA from "../../../data.js";
// import DATA from "../../../fake_dataset.js";

import { EditableCell } from "../EditableCell/EditableCell.jsx";
import { meta } from "@eslint/js";



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

    const table_columns = Object.keys(columns).map(key=>{
        return { accessorKey: key, header: columns[key], cell: (props) => <p>{props.getValue()}</p>,}
    })

    const table = useReactTable({data: data, 
        columns: table_columns,
        getCoreRowModel: getCoreRowModel(),
        // meta: {
        //     updateData: (rowIndex, columnId, value)=> setData(prev => prev.map(
        //        (row, index) => index === rowIndex? {...prev[rowIndex], [columnId]: value} : row
        //     ))
        // }
     });
    console.log("ряды", table.getRowModel())

    return (
            <>

            <div className={styles.table} style={{ width: table.getTotalSize()}}>
                {table.getHeaderGroups().map((HeaderGroup) => (
                    <div className={styles.tr} key={HeaderGroup.id}>
                        {HeaderGroup.headers.map((header) => (
                            <div className={styles.th} style={{ width:header.getSize()}} key={header.id}>
                                {header.column.columnDef.header}
                                <div className={styles.resizer}></div>
                            </div>
                        ))}
                    </div>
                ))}

                {table.getRowModel().rows.map((row) => (
                    <div className={styles.tr} key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <div className={styles.td} style={{ width: cell.column.getSize()}} key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};

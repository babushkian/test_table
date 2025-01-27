import { useState } from "react";
import {flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import styles from "./TaskTable.module.css"
import DATA from "../../../data.js";

const columns = [
    {
        accessorKey: "task",
        header: "Task",
        size: 225,
        cell: (props) => <p>{props.getValue()}</p>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: (props) => <p>{props.getValue()?.name}</p>,
    },
    {
        accessorKey: "due",
        header: "Due",
        cell: (props) => <p>{props.getValue()?.toLocaleTimeString()}</p>,
    },
    {
        accessorKey: "notes",
        header: "Notes",
        size: 225,
        cell: (props) => <p>{props.getValue()}</p>,
    },
];

export const TaskTable = () => {
    const [data, SetData] = useState(DATA);
    const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });
    console.log(table.getRowModel())
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


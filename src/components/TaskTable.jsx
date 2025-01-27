import { useState } from "react";
import {flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

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
        cell: (props) => <p>{props.getValue().name}</p>,
    },
];

const TaskTable = () => {
    const [data, SetData] = useState(DATA);
    const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });
    return (
        <Box>
            <Box className="table" width={table.getTotalSize()}>
                {table.getHeaderGroups().map((HeaderGroup) => (
                    <Box className="tr" key={HeaderGroup.id}>
                        {HeaderGroup.headers.map((header) => (
                            <Box className="th" w={header.getSize()} key={header.id}>
                                {header.column.columnDef.header}
                                <Box className="resizer"></Box>
                            </Box>
                        ))}
                    </Box>
                ))}
                {table.getRowModel().rows.map((row) => (
                    <Box className="tr" key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <Box className="td" w={cell.column.getSize()} key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </Box>
                        ))}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};
export default TaskTable;

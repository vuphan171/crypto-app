import { FC } from 'react';
import ITableHeadCell  from '../../../interfaces/TableHeadCell';
import TableCell from './TableCell';

interface ITableHeadProps {
    order: "asc" | "desc",
    orderBy: string;
    headCells: ITableHeadCell[];
    onRequestSort: (id: string, direction: "asc" | "desc") => void;
};

const TableHead: FC<ITableHeadProps> = ({ order, orderBy, headCells, onRequestSort }) => {

    const handleClick = (id: string, direction: "asc" | "desc") => {
        onRequestSort(id, direction)
    }

    return (
        <thead>
            <tr>
                {headCells.map((cell, index) => {
                    return <TableCell
                        key={cell.id}
                        id={cell.id}
                        label={cell.label}
                        active={orderBy === cell.id}
                        allowSort={cell.allowSort}
                        className={index === 0 ? "sticky left-0 z-20 min-w-9" : index === 1 ? "sticky left-9 z-20" : ""}
                        direction={orderBy === cell.id ? order : 'asc'}
                        onHandleClick={handleClick}
                    />
                })}
            </tr>
        </thead>
    );
};

export default TableHead;
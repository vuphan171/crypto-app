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
                {headCells.map((cell) => {
                    return <TableCell
                        key={cell.id}
                        id={cell.id}
                        label={cell.label}
                        active={orderBy === cell.id}
                        allowSort={cell.allowSort}
                        direction={orderBy === cell.id ? order : 'asc'}
                        onHandleClick={handleClick}
                    />
                })}
            </tr>
        </thead>
    );
};

export default TableHead;
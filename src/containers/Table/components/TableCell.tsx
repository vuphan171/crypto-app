import React, { FC, memo } from 'react';

interface ITableCellProps {
    id: string;
    label: string;
    active: boolean;
    allowSort: boolean;
    direction: "asc" | "desc",
    onHandleClick: (id: string, direction: "asc" | "desc") => void;
}

function areEqual(prevProps: ITableCellProps, nextProps: ITableCellProps) {
    /*
        return true if passing nextProps to render would return
        the same result as passing prevProps to render,
        otherwise return false
    */
    return prevProps.active === nextProps.active && prevProps.direction === nextProps.direction && prevProps.label === nextProps.label;
}

const TableCell: FC<ITableCellProps> = memo(({ id, label, active = false, allowSort = false, direction = "asc", onHandleClick }) => {

    const handleClick = () => {
        onHandleClick(id, direction);
    }

    return (
        <th className='text-left dark:text-white'>
            {allowSort ? <button onClick={handleClick} className="flex items-center">
                {label}
                {active && <div className="flex-col flex ml-1">
                    <svg
                        className={`w-5 h-5 fill-black dark:fill-white inline-block transition-transform ease-in-out ${direction === "asc" ? "rotate-180" : "rotate-0"}`}
                        focusable="false"
                        aria-hidden="true"
                        viewBox="0 0 24 24">
                        <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path>
                    </svg>
                </div>
                }
            </button> : label}
        </th>
    )
}, areEqual);

export default TableCell;
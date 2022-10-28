import React, { FC, useState } from 'react';
import { range } from '../../utils';
import useMediaQuery from '../../hooks/useMediaQuery';

interface IPaginationProps {
    page: number;
    count: number;
    onChange: (page: number) => void;
};

const activeClass = `z-10 px-3 py-1 rounded-sm text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white`;
const defaultClass = `px-3 py-1 text-gray-500 bg-white rounded-sm hover:bg-gray-100 hover:text-gray-700 border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`;

const Pagination: FC<IPaginationProps> = ({ page, count, onChange }) => {

    const matches = useMediaQuery('(min-width: 340px)');

    const startPages = range(1, 1);
    const endPages = range(count, count);
    const siblingsStart = Math.max(Math.min(page - 2, count - 4), 2);
    const siblingsEnd = Math.max(Math.min(page + 1, count - 1), Math.min(count - 1, matches ? 5 : 4));

    const items = [...startPages, ...range(siblingsStart, siblingsEnd), ...endPages];

    const [currentPage, setCurrentPage] = useState<number>(page);
    
    const handlePageChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, page: number) => {
        setCurrentPage(page);
        onChange(page);
    };

    const handleNextPage = () => {
        if(currentPage < count){
            setCurrentPage(page => page + 1);
            onChange(page + 1);
        }
    }

    const handlePreviousPage = () => {
        if(currentPage > 1){
            setCurrentPage(page => page - 1);
            onChange(page - 1);
        }
    }

    return (
        <div className="flex items-center space-x-1">
            <button disabled={page === 1} onClick={handlePreviousPage} className="flex items-center px-2 py-1 text-gray-500 bg-white rounded-sm border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
                <span className="sr-only">Previous</span>
                <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            </button>
            {items.map((item, index) => {
                return <button key={index} onClick={(event) => handlePageChange(event, item)} className={item === page ? activeClass : defaultClass}>
                    {item}
                </button>
            })}
            <button disabled={page === count} onClick={handleNextPage} className="flex items-center px-2 py-1 text-gray-500 bg-white rounded-sm border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
                <span className="sr-only">Next</span>
                <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
            </button>
        </div>
    );
};

export default Pagination;
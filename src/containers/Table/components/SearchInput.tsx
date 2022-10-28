import React, { FC, useState, useCallback, useEffect } from 'react';
import _debounce from 'lodash/debounce';

interface ISearchInputProps {
    value: string;
    onSearch: (value: string) => void;
    onReset: () => void;
};

const SearchInput: FC<ISearchInputProps> = ({ value, onSearch, onReset }) => {

    const [keyword, setKeyword] = useState(value);

    useEffect(() => {
        if(value === ''){
            setKeyword(value);
        }
    },[value])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceFn = useCallback(_debounce(handleDebounceFn, 1000), []);

    function handleDebounceFn(value: string) {
        onSearch(value);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let { value } = event.target;
        setKeyword(value);
        debounceFn(value);
    }

    const handleClearKeyword = () => {
        setKeyword('');
        onReset();
    }

    return (
        <form className="flex items-center md:w-1/3">
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                </div>
                <input
                    value={keyword}
                    onChange={handleChange}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search"
                    required
                />
                {keyword &&
                    <div className="flex absolute -inset-y-full right-0 items-center pr-3">
                        <svg onClick={handleClearKeyword} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 cursor-pointer text-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                }
            </div>
        </form>
    );
};

export default SearchInput;
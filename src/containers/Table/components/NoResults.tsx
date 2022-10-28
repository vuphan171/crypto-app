import React, { FC } from 'react';

interface INoResultsProps {
    keyword: string;
    onReset: () => void;
}

const NoResults: FC<INoResultsProps> = ({keyword, onReset}) => {

    const handleReset = () => {
        onReset();
    }
    return (
        <div className='flex justify-center items-center flex-col py-12 px-5'>
            <h2 className='dark:text-gray-50 font-medium text-2xl mb-2'>No Results</h2>
            <p className='dark:text-gray-50 text-sm mb-7'>We couldn't find a result matching <b>"{keyword}"</b></p>
            <button onClick={handleReset} className='bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-7 rounded'>Go back</button>
        </div>
    );
};

export default NoResults;
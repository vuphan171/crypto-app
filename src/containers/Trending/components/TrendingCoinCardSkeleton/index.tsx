import React from 'react';

const TrendingCoinCardSkeleton = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-800 p-4 border-r-4 rounded-md animate-pulse">
            <div className='flex justify-between items-center'>
                <div className="flex justify-center items-center w-8 h-8 bg-gray-300 rounded-sm dark:bg-gray-700" />
                <div className="flex justify-center items-center w-36 h-10 bg-gray-300 rounded-sm dark:bg-gray-700" />
            </div>
            <div className='mt-2 mb-2 flex space-x-1'>
                <div className="flex justify-center items-center w-16 h-4 bg-gray-300 rounded-sm dark:bg-gray-700" />
                <div className="flex justify-center items-center w-8 h-4 bg-gray-300 rounded-sm dark:bg-gray-700" />
            </div>
            <div className='flex justify-between items-center'>
                <div className="flex justify-center items-center w-16 h-11 bg-gray-300 rounded-sm dark:bg-gray-700" />
                <div className="flex justify-center items-center w-16 h-4 bg-gray-300 rounded-sm dark:bg-gray-700" />
            </div>
        </div>
    );
};

export default TrendingCoinCardSkeleton;
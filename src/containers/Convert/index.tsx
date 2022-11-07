import React, { FC, Fragment } from 'react';
import Select from '../../components/Select';

const Convert: FC = () => {
    return (
        <Fragment>
            <div>
                <h2 className='text-2xl font-medium dark:text-white'>Currency Converter</h2>
            </div>
            <div className='mt-4'>
                <p className='text-base mb-2 dark:text-white'>Amount</p>
                <div className='block'>
                    <Select />
                </div>
                <div className='flex justify-center my-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                    </svg>
                </div>
                <div className='block'>
                    <Select />
                </div>
                <h2 className="mt-8 font-medium text-lg dark:text-white">1 BTC = 29,029.41 SGD</h2>
                <p className='text-sm mb-4 dark:text-white'>Rate is for reference only. Updated 4 minutes ago</p>
                <button
                    type="button"
                    className="my-5 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Convert
                </button>
            </div>
        </Fragment>
    );
};

export default Convert;



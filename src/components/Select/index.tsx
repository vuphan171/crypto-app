import React, { FC, Fragment, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ICurrency } from '../../interfaces/Currency';
import { getCurrenciesApi } from '../../services/CurrencyService';
import Loading from '../Loading';

interface ISelectProps {

};

const limit = 30;

const Select: FC<ISelectProps> = () => {

    const [isSelecting, setSelecting] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<string>('');
    const [options, setOptions] = useState<ICurrency[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const [item, setItem] = useState<ICurrency | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);


    useEffect(() => {
        getCurrenciesApi(offset, limit).then(resp => {
            setOptions(preVal => ([...preVal, ...resp.data]));
        });
    }, [offset])

    const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            setSelecting(false);
        }
    };

    const handleSelecting = () => {
        setSelecting(preVal => !preVal);
    };

    const handleKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
        let { value } = event.target;
        setKeyword(value);
    };

    const fetchMoreData = () => {
        setOffset(preVal => preVal + 30);
    };

    const handleSelectCurrency = (currency: ICurrency) => () => {
        setItem(currency);
        setSelecting(false);
    };

    return (
        <Fragment>
            <div className="block relative items-center">
                <div className={`${isSelecting ? "visible" : "visible"} bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    onClick={handleSelecting}
                >
                    <div className='flex items-center justify-between'>
                        {item && <Fragment>
                            <div className='flex items-center'>
                                <div className='w-6'>
                                    <img className='h-5 w-5' src={item.iconUrl} alt={item.name} />
                                </div>
                                <div className='ml-2'>
                                    <span>{item.name}</span>
                                </div>
                            </div>
                            <button className='flex absolute inset-y-0 right-0 items-center pr-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                        </Fragment>}
                    </div>
                </div>
                {isSelecting &&
                    <Fragment>
                        <div className='absolute top-0 left-0 right-0 block' ref={wrapperRef}>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={keyword}
                                    onChange={handleKeyword}
                                    className="block p-2.5 w-full outline-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Type to seach..."
                                />
                                <button className='flex absolute inset-y-0 right-0 items-center pr-3'>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                <ul id='scrollableDiv' className='absolute top-12 left-0 right-0 z-30 bg-white h-64 rounded-md overflow-y-auto'>
                                    <InfiniteScroll
                                        dataLength={options.length}
                                        next={fetchMoreData}
                                        hasMore={true}
                                        loader={<div className='flex justify-center items-center h-8'>
                                            <Loading size='small' />
                                        </div>}
                                        scrollableTarget="scrollableDiv"
                                    >
                                        {options.map((item, index) => {
                                            return <li key={item.uuid} onClick={handleSelectCurrency(item)} className='flex items-center p-2.5 cursor-pointer hover:bg-blue-50'>
                                                <div className='w-6'>
                                                    <img src={item.iconUrl} alt="" />
                                                </div>
                                                <div className='ml-2'>
                                                    <span>{`${index + 1} ${item.name}`}</span>
                                                </div>
                                            </li>
                                        })
                                        }
                                    </InfiniteScroll>
                                </ul>
                            </div>
                        </div>
                    </Fragment>
                }
            </div>
        </Fragment>
    );
};

export default Select;
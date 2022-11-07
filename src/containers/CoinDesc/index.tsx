import React, { FC, useState } from 'react';

interface ICoinDescProps {
    coinName: string;
    coinDesc: string;
}

const CoinDesc: FC<ICoinDescProps> = ({ coinName, coinDesc }) => {

    const [show, setShow] = useState(false);

    const toggleShow = () => {
        setShow(preVal => !preVal);
    }

    return (
        <div className='shadow-lg bg-gray-50 dark:bg-gray-800 rounded-md p-4 mt-8'>
            <div className='mb-4'>
                <h2 className='font-medium text-2xl dark:text-white'>About {coinName}</h2>
            </div>
            <div className='relative'>
                <div className={`dark:text-white overflow-hidden ${show ? "max-h-99999" : "max-h-28"}`} dangerouslySetInnerHTML={{
                    __html: coinDesc
                }}>
                </div>
                {!show ? <div className='absolute top-0 h-28 w-full' style={{
                    background: "linear-gradient(rgba(255, 255, 255, 0) 30%, rgb(255, 255, 255) 100%)"
                }}></div> : null}
            </div>
            <div className='flex justify-center items-end my-3'>
                <p onClick={toggleShow} className="dark:text-white cursor-pointer leading-none font-medium">
                    {show ? "Hide" : "More"}
                </p>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-3 h-3 ml-0.5 font-medium transition-transform ease-in-out ${show ? "rotate-0" : "-rotate-180"} `}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
        </div>
    );
};

export default CoinDesc;
import React, { FC} from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import ICoin from '../../../../interfaces/Coin';
import { formatCurrency, isPositiveChange } from '../../../../utils';

interface ITrendingCoinCardProps {
    coin: ICoin;
};

const TrendingCoinCard : FC<ITrendingCoinCardProps> = ({coin}) => {
    return (
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
            <div className='flex justify-between items-center'>
                <img src={coin.iconUrl} width={32} height={32} alt="Arand" />
                <Sparklines svgWidth={140} svgHeight={40} data={coin.sparkline}>
                    <SparklinesLine style={{ fill: "none" }} color={isPositiveChange(coin.change) ? "rgb(34, 197, 94)" : "rgb(220, 38, 38)"} />
                </Sparklines>
            </div> 
            <div className='mt-2 mb-2 flex'>
                <p className='m-0 font-medium text-ellipsis truncate overflow-hidden text-lg mr-2 dark:text-white'>{coin.name}</p>
                <p className='m-0 font-medium text-gray-400 text-lg'>{coin.symbol}</p>
            </div>
            <div className='flex justify-between items-center'>
                <p className='font-medium text-2xl m-0 dark:text-white'>{formatCurrency(parseInt(coin.price))}</p>
                <p className={`font-medium m-0 ${isPositiveChange(coin.change) ? "text-green-500" : "text-red-500" }`}>{coin.change}%</p>
            </div>
        </div>
    );
};

export default TrendingCoinCard;
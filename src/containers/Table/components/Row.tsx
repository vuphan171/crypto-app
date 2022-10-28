import { FC, memo } from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import ICoin from '../../../interfaces/Coin';
import { formatCurrency, isPositiveChange } from '../../../utils';
import "../main.scss";

interface IRowProps {
    coin: ICoin;
};

const Row: FC<IRowProps> = memo(({ coin }) => {

    return <tr className="dark:hover:bg-gray-700 hover:bg-blue-50 cursor-pointer">
        <th>
            <span className='dark:text-white'>{coin.rank}</span>
        </th>
        <td>
            <div className='flex items-center'>
                <div>
                    <img style={{ width: 24, height: 24 }} src={coin.iconUrl} alt={coin.name} loading='lazy' />
                </div>
                <div className="ml-2">
                    <p className='font-medium m-0 dark:text-white'>{coin.name}</p>
                    <p className='font-medium m-0  text-gray-400 '>{coin.symbol}</p>
                </div>
            </div>
        </td>
        <td>
            <span className='font-medium dark:text-white'>{formatCurrency(parseFloat(coin.price))}</span>
        </td>
        <td><span className={`font-medium ${isPositiveChange(coin.change) ? "text-green-500" : "text-red-500"}`}>{coin.change}%</span></td>
        <td>
            <span className='font-medium dark:text-white'>{formatCurrency(parseFloat(coin['24hVolume']))}</span>
        </td>
        <td>
            <span className='font-medium dark:text-white'>{formatCurrency(parseFloat(coin.marketCap))}</span>
        </td>
        <td>
            <Sparklines svgWidth={140} svgHeight={40} data={coin.sparkline}>
                <SparklinesLine color={isPositiveChange(coin.change) ? "rgb(34, 197, 94)" : "rgb(220, 38, 38)"} />
            </Sparklines>
        </td>
    </tr>
});

export default Row;
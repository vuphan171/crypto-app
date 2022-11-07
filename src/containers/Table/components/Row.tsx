import { FC, memo } from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import ICoin from '../../../interfaces/Coin';
import { formatCurrency, isPositiveChange } from '../../../utils';
import "../main.scss";
import { useNavigate } from 'react-router-dom';

interface IRowProps {
    coin: ICoin;
};

const Row: FC<IRowProps> = memo(({ coin }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/coin/${coin.uuid}`);
    };

    return <tr onClick={handleClick} className="dark:hover:bg-gray-700 hover:bg-blue-50 cursor-pointer">
        <th className='sticky left-0 z-20 min-w-9 p-0 bg-gray-50 dark:bg-gray-800'>
            <span className='text-sm md:text-base dark:text-white'>{coin.rank}</span>
        </th>
        <td className='sticky left-9 z-20 bg-gray-50 dark:bg-gray-800'>
            <div className='flex items-center'>
                <div className='w-6 min-w-6'>
                    <img style={{ width: 24, height: 24 }} src={coin.iconUrl} alt={coin.name} loading='lazy' />
                </div>
                <div className="ml-2">
                    <p className='text-sm md:text-base font-medium m-0 dark:text-white'>{coin.name}</p>
                    <p className='text-sm md:text-base font-medium m-0 text-gray-400'>{coin.symbol}</p>
                </div>
            </div>
        </td>
        <td className='bg-gray-50 dark:bg-gray-800'>
            <span className='text-sm md:text-base font-medium dark:text-white'>{formatCurrency(parseFloat(coin.price))}</span>
        </td>
        <td className='bg-gray-50 dark:bg-gray-800'>
            <span className={`text-sm md:text-base font-medium ${isPositiveChange(coin.change) ? "text-green-500" : "text-red-500"}`}>{coin.change}%</span>
        </td>
        <td className='bg-gray-50 dark:bg-gray-800'>
            <span className='text-sm md:text-base font-medium dark:text-white'>{formatCurrency(parseFloat(coin['24hVolume']))}</span>
        </td>
        <td className='bg-gray-50 dark:bg-gray-800'>
            <span className='text-sm md:text-base font-medium dark:text-white'>{formatCurrency(parseFloat(coin.marketCap))}</span>
        </td>
        <td className='bg-gray-50 dark:bg-gray-800'>
            <Sparklines svgWidth={140} svgHeight={40} data={coin.sparkline}>
                <SparklinesLine color={isPositiveChange(coin.change) ? "rgb(34, 197, 94)" : "rgb(220, 38, 38)"} />
            </Sparklines>
        </td>
    </tr>
});

export default Row;
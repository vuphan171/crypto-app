import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { FC, Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import { ISupply } from '../../interfaces/Coin';
import { TimePeriod, ITimePeriod } from '../../interfaces/Chart';
import { getCoinHistoryApi } from '../../services/CoinService';
import { commarize, formatCurrency, isPositiveChange } from '../../utils';
import './chart.scss';

interface IChartProps {
    coinName: string;
    coinLogoUrl: string;
    price: string;
    change: string;
    marketCap: string;
    volumn: string;
    supply: ISupply;
};

const TIME_PERIOD_LIST: ITimePeriod[] = [
    {
        label: "1H",
        value: "1h"
    },
    {
        label: "12H",
        value: "12h"
    },
    {
        label: "24H",
        value: "24h"
    },
    {
        label: "7D",
        value: "7d"
    },
    {
        label: "30D",
        value: "30d"
    },
    {
        label: "3M",
        value: "3m"
    },
    {
        label: "1Y",
        value: "1y"
    },
    {
        label: "ALL",
        value: "all"
    }
];

const Chart: FC<IChartProps> = ({ coinLogoUrl, coinName, price, change, marketCap, volumn, supply }) => {

    const { coinId } = useParams();
    const [timePeriod, setTimePeriod] = useState<TimePeriod>('24h');
    const [chart, setChart] = useState<Highcharts.Options>({
        chart: {
            height: 320,
            backgroundColor: "rgb(249 250 251)"
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },
        accessibility: {
            enabled: false
        },
        series: [{
            type: 'area',
            name: 'Price',
            data: []
        }]
    })

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (timePeriod && coinId) {
            setLoading(true);
            getCoinHistoryApi(coinId, timePeriod).then((resp) => {
                setChart(preValue => ({
                    ...preValue,
                    series: [{
                        type: 'area',
                        name: 'Price',
                        data: resp
                    }]
                }))
                setLoading(false);
            }, (err) => {
                setLoading(false);
            })
        }
    }, [timePeriod, coinId])

    const handleChangeTimePeriod = (time: TimePeriod) => {
        setTimePeriod(time);
    };

    return (
        <Fragment>
            <div className='shadow-lg bg-gray-50 dark:bg-gray-800 rounded-md p-4'>
                <div className='flex flex-col mb-4'>
                    <div className='flex items-center'>
                        <img src={coinLogoUrl} width={32} height={32} alt={coinName} />
                        <p className="text-2xl ml-2 font-medium dark:text-white">{coinName}</p>
                    </div>
                    <div className='flex items-center mt-4'>
                        <h2 className='text-4xl leading-none font-medium dark:text-white'>{formatCurrency(parseFloat(price))}</h2>
                        <div className='flex items-center ml-2'>
                            <p className={`text-2xl font-medium leading-none ${isPositiveChange(change) ? "text-green-500" : "text-red-500"}`}>{change}%</p>
                            <p className='text-lg ml-1 font-medium leading-none uppercase dark:text-white'>({timePeriod})</p>
                        </div>
                    </div>
                </div>
                <div className='w-full mb-6 mt-10'>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm font-medium dark:text-white">{coinName} Price Chart</p>
                        </div>
                        <div className='flex rounded-md py-1 px-2 bg-gray-200 space-x-1'>
                            {TIME_PERIOD_LIST.map((item) => {
                                return <p key={item.value} onClick={() => { handleChangeTimePeriod(item.value) }} className={`py-1 px-2 ${item.value === timePeriod ? "bg-gray-50" : ""} hover:bg-gray-100 border border-transparent rounded-md cursor-pointer text-xs font-medium dark:text-white`}>{item.label}</p>
                            })}

                        </div>
                    </div>
                    <div className='chart h-80 w-full mt-10 flex justify-center items-center'>
                        {loading ? <Loading /> :
                            <div className='block w-full h-full' >
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    options={chart}
                                />
                            </div>
                        }
                    </div>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    <div>
                        <h2 className='text-sm font-medium m-0 text-gray-400'>Market Cap (USD)</h2>
                        <p className='text-xl font-medium dark:text-white'>{formatCurrency(parseFloat(marketCap), true)}</p>
                    </div>
                    <div>
                        <h2 className='text-sm font-medium m-0 text-gray-400'>24H VOLUME (USD)</h2>
                        <p className='text-xl font-medium dark:text-white'>{formatCurrency(parseFloat(volumn), true)}</p>
                    </div>
                    <div>
                        <h2 className='text-sm font-medium m-0 text-gray-400'>Circulating Supply</h2>
                        <p className='text-xl font-medium dark:text-white'>{commarize(supply.circulating)}</p>
                    </div>
                    <div>
                        <h2 className='text-sm font-medium m-0 text-gray-400'>Max Supply</h2>
                        <p className='text-xl font-medium dark:text-white'>{commarize(supply.total)}</p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Chart;
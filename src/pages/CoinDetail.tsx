import React, { useEffect, useState } from 'react';
import Convert from '../containers/Convert';
import Chart from '../containers/Chart';
import CoinDesc from '../containers/CoinDesc';
import { getCoinApi } from '../services/CoinService';
import { useParams } from 'react-router-dom';
import ICoin from '../interfaces/Coin';

const CoinDetail = () => {

    const { coinId } = useParams();

    const [coin, setCoin] = useState<ICoin | null>(null)

    useEffect(() => {
        if (coinId) {
            getCoinApi(coinId).then((resp) => {
                setCoin(resp);
            }, (err) => {
                console.log(err);
            })
        }
    }, [coinId])

    return (
        <div className='mb-10 p-4 md:p-5'>
            {coin &&
                <div className="flex flex-col md:flex-row gap-5">
                    <div className='h-max md:flex-1'>
                        <Chart 
                            coinName={coin.name} 
                            coinLogoUrl={coin.iconUrl}
                            price={coin.price} 
                            change={coin.change} 
                            marketCap={coin.marketCap} 
                            volumn={coin['24hVolume']} 
                            supply={coin.supply} 
                        />
                        <CoinDesc 
                            coinName={coin.name} 
                            coinDesc={coin.description} 
                        />
                    </div>
                    <div className='shadow-lg bg-gray-50 dark:bg-gray-800 rounded-md p-4 h-max'>
                        <Convert />
                    </div>
                </div>
            }
        </div>
    );
};

export default CoinDetail;
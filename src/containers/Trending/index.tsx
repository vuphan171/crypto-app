// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { useEffect, useState, useContext } from 'react';
import { Autoplay } from "swiper";
import 'swiper/css';
import TrendingCoinCard from './components/TrendingCoinCard';
import ICoin from '../../interfaces/Coin';
import { getCoinsApi } from '../../services/CoinService';
import CardSkeleton from './components/TrendingCoinCardSkeleton';
import { languages } from '../../config';
import { AppContext } from '../../App';


const limit: number = 50;
const page: number = 1;
const orderBy: string = 'change';

const Trending = () => {

    const [data, setData] = useState<ICoin[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { languageCode } = useContext(AppContext);

    useEffect(() => {
        setLoading(true);
        getCoinsApi(page, limit, orderBy).then(resp => {
            if (resp && resp.data) {
                setData(resp.data);
                setLoading(false);
            }
        }, () => {
            setLoading(false);
        })
    }, [])


    return (
        <div className="container max-w-screen-xl mx-auto mb-5">
            <div>
                <h2 className='text-2xl font-bold dark:text-white'>{languages[languageCode].trendingLable}</h2>
            </div>
            <div>
                <Swiper
                    spaceBetween={20}
                    slidesPerView={4}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                >
                    {loading ? Array.from(Array(4).keys()).map((_, index) => {
                        return <SwiperSlide key={index}>
                            <CardSkeleton />
                        </SwiperSlide>
                    }) : data.map((item) => {
                        return <SwiperSlide key={item.uuid}>
                            <TrendingCoinCard coin={item} />
                        </SwiperSlide>
                    })}
                </Swiper>
            </div>
        </div>
    );
};

export default Trending;
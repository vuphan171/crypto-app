// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { useContext, useEffect, useState } from 'react';
import { Autoplay } from "swiper";
import 'swiper/css';
import { AppContext } from '../../App';
import { languages } from '../../config';
import ICoin from '../../interfaces/Coin';
import { getCoinsApi } from '../../services/CoinService';
import TrendingCoinCard from './components/TrendingCoinCard';
import TrendingCoinCardSkeleton from './components/TrendingCoinCardSkeleton';


const limit: number = 10;
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
        <div className="mb-10 p-4 sm:p-5">
            <div className='mb-5'>
                <h2 className='text-2xl font-bold dark:text-white'>{languages[languageCode].trendingLable}</h2>
            </div>
            <div className='block'>
                <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        480: {
                            slidesPerView: 2
                        },
                        768: {
                            slidesPerView: 3
                        },
                        1024: {
                            slidesPerView: 4
                        }
                    }}
                    modules={[Autoplay]}
                >
                    {loading ? Array.from(Array(4).keys()).map((_, index) => {
                        return <SwiperSlide key={index}>
                            <TrendingCoinCardSkeleton />
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
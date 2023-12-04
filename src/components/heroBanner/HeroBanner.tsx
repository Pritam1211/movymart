import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import useFetch from '../../hooks/useFetch';
import "./style.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { MediaDetails } from '../../../models';
import dayjs from "dayjs";
import { IoStar } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
  const [banners, setBanners] = useState<MediaDetails[]>([]);
  const { urls } = useSelector((state: RootState) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.results) {
      let res: MediaDetails[] = data.results.sort(() => 0.5 - Math.random());
      setBanners(res.slice(0, 7));
    }
  }, [data, urls]);


  return (
    <div className='hero-banner'>
        {!loading && banners.length && (
          <Carousel
            showThumbs={false}
            autoPlay={true}
            transitionTime={3}
            infiniteLoop={true}
            showStatus={false}
            interval={5000}
            swipeable={true}
            className='backdrop-img'
          >
            {
              banners.map((item, index) => (
                <div className='banner' key={index} onClick={()=> navigate(`/movie/${item.id}`)}>
                  <img src={urls.backdrop + item.backdrop_path} alt='banner' />
                  <div className="banner-content">
                    <div className="title">{item.title}</div>
                    <div className='sub-title'>
                      <span className='date'>{dayjs(item.release_date).format("MMM D, YYYY")}</span>
                      <span className='rating'><IoStar className='icon' />{Math.round(item.vote_average)}</span>
                    </div>
                    <div className="overview">
                      {item.overview.substring(0,100)}...
                    </div>
                  </div>
                </div>
              ))
            }
          </Carousel>
        )}
      <div className="opacity-layer"></div>
    </div>

  )
}

export default HeroBanner


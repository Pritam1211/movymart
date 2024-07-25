import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { MediaDetails } from '../../../models';
import PosterFallback from "../../assets/no-poster.png";
import Img from '../lazyLoadImg/Img';
import Rating from '../rating/Rating';
import Genres from '../genres/Genres';
import dayjs from 'dayjs';
import "./style.scss";
type Props = {
  data: MediaDetails,
  fromSearch?: any,
  type?: string
}
const MovieCard = ({ data, fromSearch, type }: Props) => {
  const { urls } = useSelector((state: RootState) => state.home);
  const navigate = useNavigate();
  return (
    <div
      key={data.id}
      className="movie-card"
      onClick={() => navigate(`/${type}/${data.id}`)}
    >
      <div className="poster-block">
        <Img src={data.poster_path ? urls.poster + data.poster_path : PosterFallback} />
        { 
          !fromSearch && <>
          <Rating rating={data.vote_average.toFixed(1)} />
          <Genres data={data.genre_ids.slice(0, 2)} />
          </>
        }
      </div>
      <div className="text-block">
        <span className="title">{data.title || data.name}</span>
        <span className="date">{dayjs(data.release_date || data.first_air_date).format("MMM D, YYYY")}</span>
      </div>
    </div>
  )
}

export default MovieCard
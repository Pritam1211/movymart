import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Img from '../../components/lazyLoadImg/Img';
import fallBackPoster from "../../assets/no-poster.png"
import Genres from '../../components/genres/Genres';
import Rating from '../../components/rating/Rating';
import VideoPopup from '../../components/videoPopup/VideoPopup';
import { Playbtn } from '../../components/playbtn/Playbtn';
import dayjs from 'dayjs';


const DetailsBanner = ({ video, crew }: { video: any, crew: any }) => {

  const [show, setShow] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<number | null>(null);
  const { type, id } = useParams();
  const { data, loading } = useFetch(`/${type}/${id}`);
  const { urls } = useSelector((state: RootState) => state.home);

  const genres = data?.genres?.map(({ id }: any) => id)
  const director = crew?.filter((f: any) => f.job === "Director");
  const writer = crew?.filter((f: any) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer");

  const toHoursAndMinutes = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };
  return (
    <section className="details-banner">
      {!loading && data ? (
        <>
          <div className="backdrop-img">
            <Img src={urls.backdrop + data.backdrop_path} />
          </div>
          <div className="opacity-layer"></div>
          <div className="content-wrapper">
            <div className="content">
              <div className="left">
                <Img src={data.poster_path ? urls.backdrop + data.poster_path : fallBackPoster} className='poster-img' />
              </div>
              <div className="right">
                <div className="title">
                  {`${data.title || data.name}(${dayjs(data.release_date).format('YYYY')})`}
                </div>
                <div className="subtitle">{data.tagline}</div>
                <Genres data={genres} />
                <div className="row">
                  <Rating rating={data.vote_average.toFixed(1)} />
                  <div className="playbtn"  onClick={() => {
                    setShow(true);
                    setVideoId(video.key);
                  }}>
                    <Playbtn />
                    <span className="text">Watch Trailer</span>
                  </div>
                </div>
                <div className="overview">
                  <div className="heading">Overview</div>
                  <div className="description">{data.overview}</div>
                </div>
                <div className="info">
                  {
                    data.status && <div className="info-item">
                      <span className="text bold">Status:{" "}</span>
                      <span className="text">{data.status}</span>
                    </div>
                  }
                  {
                    data.release_date && <div className="info-item">
                      <span className="text bold">Release Date:{" "}</span>
                      <span className="text">{dayjs(data.release_date).format('MMM D, YYYY')}</span>
                    </div>
                  }
                  {
                    data.runtime && <div className="info-item">
                      <span className="text bold">Runtime:{" "}</span>
                      <span className="text">{toHoursAndMinutes(data.runtime)}</span>
                    </div>
                  }
                </div>
                {
                  director?.length > 0 &&
                  <div className="info">
                    <span className="text bold">Director:{" "}</span>
                    <span className="text">
                      {
                        director?.map((d: any, i: number) => (
                          <span key={i}>{d.name}{director.length - 1 !== i && ", "}</span>
                        ))}
                    </span>
                  </div>
                }

                {
                  writer?.length > 0 &&
                  <div className="info">
                    <span className="text bold">Writer:{" "}</span>
                    <span className="text">
                      {
                        writer?.map((d: any, i: number) => (
                          <span key={i}>{d.name}{writer.length - 1 !== i && ", "}</span>
                        ))}
                    </span>
                  </div>
                }

                {data.created_by?.length > 0 && (
                  <div className="info">
                    <span className="text bold">Creator:{" "}</span>
                    <span className="text">
                      {
                        data?.created_by?.map((d: any, i: number) => (
                          <span key={i}>{d.name}{data?.created_by.length - 1 !== i && ", "}</span>
                        ))}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <VideoPopup
            show={show}
            setShow={setShow}
            videoId={videoId}
            setVideoId={setVideoId}
            />
          </div>
        </>
      ) : (
        <div className="details-banner-skeleton">
          <div className='content-wrapper'>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default DetailsBanner
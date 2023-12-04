import React, { useState } from 'react'
import Img from '../../components/lazyLoadImg/Img';
import { Playbtn } from '../../components/playbtn/Playbtn';
import VideoPopup from '../../components/videoPopup/VideoPopup';

const Videos = ({ data, loading }: { data: any, loading: boolean }) => {

  const [show, setShow] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<number | null>(null);

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <section className="videos-section">
      <div className="content-wrapper">
        <div className="section-heading">Officials Videos</div>
        {
          !loading && data?.results ? (
            <div className="videos">
              {
                data.results.map((item: any) => (
                  <div className="video-item" key={item.id} onClick={() => {
                    setShow(true);
                    setVideoId(item.key);
                  }}>
                    <div className="video-thumbnail">
                      <Img src={`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`} />
                      <Playbtn />
                    </div>
                    <div className="video-title">{item.name}</div>
                  </div>
                ))
              }
            </div>
          ) : (
            <div className="video-skeleton">
              {loadingSkeleton()}
              {loadingSkeleton()}
              {loadingSkeleton()}
              {loadingSkeleton()}
              {loadingSkeleton()}
            </div>
          )
        }
      </div>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </section >
  )
}

export default Videos
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import avatar from "../../assets/avatar.png";
import Img from '../../components/lazyLoadImg/Img';

const Cast = ({ data, loading }: { data: any, loading: boolean }) => {
  const { urls } = useSelector((state: RootState) => state.home);

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <section className="cast-section">
      <div className="content-wrapper">
        <div className="section-heading">Top Cast</div>
        {
          !loading && data ? (
            <div className="list-items">
              {
                data.map((item: any) => (
                  <div className="list-item" key={item.cast_id}>
                    <Img className='profile-img' src={item.profile_path ? urls.profile + item.profile_path : avatar} />
                    <div className="name">{item.name}</div>
                    <div className="character">{item.character}</div>
                  </div>
                ))
              }
            </div>
          ) : (
            <div className="cast-skelton">
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
            </div>
          )
        }
      </div>
    </section>
  )
}

export default Cast
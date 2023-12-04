import React from 'react'
import Layout from '../../components/layout/Layout'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch';
import DetailsBanner from './DetailsBanner';
import Cast from './Cast';
import "./style.scss";
import Videos from './Videos';
import Carousels from './Carousels';

const Details = () => {
  const { type, id } = useParams();
  const { data, loading } = useFetch(`/${type}/${id}/credits`);
  const { data : video, loading: videoLoading } = useFetch(`/${type}/${id}/videos`);
  
  return (
    <Layout>
      <DetailsBanner video={video?.results[0]} crew={data?.crew} />
      <Cast data={data?.cast} loading={loading} />
      <Videos data={video} loading={videoLoading} />
      <section>
        <Carousels type={type} url={`/${type}/${id}/similar`} title={`Similar ${type==='tv'? "Tv Shows":"Movies"}`} />
      </section>
      <section>
        <Carousels type={type} url={`/${type}/${id}/recommendations`} title="Recommendations" />
      </section>
    </Layout>
  )
}

export default Details
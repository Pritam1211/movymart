import React from 'react'
import useFetch from '../../hooks/useFetch';
import Carousel from '../../components/carousel/Carousel';

const Carousels = ({ type, title, url }: any) => {
  const { data, loading } = useFetch(url);

  return (
    <Carousel
      title={title}
      data={data?.results}
      loading={loading}
      type={type}
    />
  )
}

export default Carousels
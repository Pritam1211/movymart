import React from 'react'
import Layout from '../../components/layout/Layout'
import HeroBanner from '../../components/heroBanner/HeroBanner'
import Trending from './Trending'
import Popular from './Popular'
import TopRated from './TopRated'
import './style.scss'

const Home = () => {

  return (
    <Layout>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </Layout>
  )
}

export default Home
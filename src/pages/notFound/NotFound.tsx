import React from 'react'
import Layout from '../../components/layout/Layout'
import "./style.scss";
const NotFound = () => {
  return (
    <Layout>
      <div className="page-not-found">
        <div className='content-wrapper'>
          <span className="big-text">404</span>
          <span className="small-text">Page not found!</span>
        </div>
      </div>
    </Layout>
  )
}

export default NotFound
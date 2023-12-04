import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import { useParams } from 'react-router-dom';
import { fetchData } from '../../utils/api';
import { MediaDetails } from '../../../models';
import Spinner from '../../components/spinner/Spinner';
import MovieCard from '../../components/movieCard/MovieCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import "./style.scss";
type SearchData = {
  page: number,
  results: MediaDetails[],
  total_results: number,
  total_pages: number
}

const Search = () => {
  const [data, setData] = useState<SearchData | null>(null);
  const [pageNum, setPageNum] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchData(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res: SearchData) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchData(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res: SearchData) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <Layout>
      <div className="search-results-page">
        {loading && <Spinner initial={true} />}
        <div className="content-wrapper">
          {
            !loading && data?.results?.length ? (
              <>
                <div className="page-title">
                  {`Search ${data?.total_results > 1 ? "results" : "result"} of '${query}'`}
                </div>
                <InfiniteScroll
                  className="content"
                  dataLength={data?.results.length || 0}
                  next={fetchNextPageData}
                  hasMore={pageNum <= data?.total_pages}
                  loader={<Spinner />}
                >
                  {data?.results.map((item, index) => {
                    if (item.media_type === "person") return;
                    return (
                      <MovieCard
                        key={index}
                        data={item}
                        fromSearch={true}
                      />
                    )
                  })}
                </InfiniteScroll>
              </>
            ) : (
              <span className="result-not-found">
                Sorry, Results not found!
              </span>
            )
          }
        </div>
      </div>
    </Layout>
  )
}

export default Search
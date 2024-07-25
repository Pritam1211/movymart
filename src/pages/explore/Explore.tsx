import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { fetchData } from '../../utils/api';
import Select from "react-select";
import MovieCard from '../../components/movieCard/MovieCard';
import Spinner from '../../components/spinner/Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import { MediaDetails } from '../../../models';
import "./style.scss";


let filters: any = {};

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  { value: "primary_release_date.desc", label: "Release Date Descending" },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

type SearchData = {
  page: number,
  results: MediaDetails[],
  total_results: number,
  total_pages: number
}

const Explore = () => {
  const [data, setData] = useState<SearchData | null>(null);
  const [pageNum, setPageNum] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null);
  const { type } = useParams();
  const navigate = useNavigate();

  if(!["tv", "movie"].includes(String(type))) navigate('/not-found');

  const { data: genresData } = useFetch(`/genre/${type}/list`);

  const fetchInitialData = () => {
    setLoading(true);
    fetchData(`/discover/${type}`, filters).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchData(
      `/discover/${type}?page=${pageNum}`,
      filters
    ).then((res) => {
      if (data?.results) {
        setData({
          ...data,
          results: [...data?.results, ...res.results],
        });
      } else {
        setData(res);
      }
      setPageNum((prev) => prev + 1);
    });
  };

  useEffect(() => {
    filters = {};
    setData(null);
    setPageNum(1);
    setSortby(null);
    setGenre(null);
    fetchInitialData();
  }, [type]);

  const onChange = (selectedItems: any, action: any) => {
    if (action.name === "sortby") {
      setSortby(selectedItems);
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value;
      } else {
        delete filters.sort_by;
      }
    }

    if (action.name === "genres") {
      setGenre(selectedItems);
      if (action.action !== "clear") {
        let genreId = selectedItems.map((g: any) => g.id);
        genreId = JSON.stringify(genreId).slice(1, -1);
        filters.with_genres = genreId;
      } else {
        delete filters.with_genres;
      }
    }

    setPageNum(1);
    fetchInitialData();
  };

  return (
    <Layout>
      <div className="explore-page">
        <div className='content-wrapper'>
          <div className="page-header">
            <div className="page-title">
              {type === "tv" ? "Explore TV Shows" : "Explore Movies"}
            </div>
            <div className="filters">
              <Select
                isMulti
                name="genres"
                value={genre}
                closeMenuOnSelect={false}
                options={genresData?.genres}
                getOptionLabel={(option: any) => option?.name}
                getOptionValue={(option: any) => option?.id}
                onChange={onChange}
                placeholder="Select genres"
                className="react-select-container genresDD"
                classNamePrefix="react-select"
              />
              <Select
                name="sortby"
                value={sortby}
                options={sortbyData}
                onChange={onChange}
                isClearable={true}
                placeholder="Sort by"
                className="react-select-container sortbyDD"
                classNamePrefix="react-select"
              />
            </div>
          </div>
          {loading && <Spinner initial={true} />}
          {
            !loading && data?.results.length ? (
              <InfiniteScroll
                className="content"
                dataLength={data?.results.length || 0}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard
                      key={index}
                      data={item}
                      type={type}
                    />
                  );
                })}
              </InfiniteScroll>
            ) : (
              <span className="resultNotFound">
                Sorry, Results not found!
              </span>
            )}
        </div>
      </div>
    </Layout>
  );
}

export default Explore
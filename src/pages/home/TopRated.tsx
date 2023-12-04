import React, { useState } from "react";
import Carousel from "../../components/carousel/Carousel";
import SwitchTabs from "../../components/switchBox/SwitchBox";
import useFetch from "../../hooks/useFetch";

const TopRated = () => {
  const [endpoint, setEndpoint] = useState("movie");

  const { data, loading } = useFetch(`/${endpoint}/top_rated`);

  const onTabChange = (tab: string) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <section className="carousel-section">
      <div className="content-wrapper">
        <span className="carousel-title">Top Rated</span>
        <SwitchTabs
          data={["Movies", "TV Shows"]}
          onTabChange={onTabChange}
        />
      </div>
      <Carousel
        data={data?.results}
        loading={loading}
        endpoint={endpoint}
      />
    </section>
  );
};

export default TopRated;
import React, { useState } from "react";
import Carousel from "../../components/carousel/Carousel";
import SwitchTabs from "../../components/switchBox/SwitchBox";
import useFetch from "../../hooks/useFetch";

const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");

    const { data, loading } = useFetch(`/trending/movie/${endpoint}`);

    const onTabChange = (tab: string) => {
        setEndpoint(tab === "Day" ? "day" : "week");
    };

  return (
    <section className="carousel-section">
      <div className="content-wrapper">
        <span className="carousel-title">Trending</span>
        <SwitchTabs
          data={["Day", "Week"]}
          onTabChange={onTabChange}
        />
      </div>
      <Carousel data={data?.results} type="movie"  loading={loading} />
    </section>
  );
};

export default Trending;
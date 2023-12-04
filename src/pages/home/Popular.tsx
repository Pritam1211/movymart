import React, { useState } from "react";
import Carousel from "../../components/carousel/Carousel";
import SwitchTabs from "../../components/switchBox/SwitchBox";
import useFetch from "../../hooks/useFetch";

const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie");

  const { data, loading } = useFetch(`/${endpoint}/popular`);

  const onTabChange = (tab: string) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <section className="carousel-section">
      <div className="content-wrapper">
        <span className="carousel-title">What's Popular</span>
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

export default Popular;
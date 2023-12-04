import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import "./style.scss";
import { MediaDetails } from "../../../models";
import MovieCard from "../movieCard/MovieCard";

type Params = {
  data: MediaDetails[],
  loading?: boolean | null,
  endpoint?: string,
  title?: string
}

const Carousel = ({ data, loading, endpoint, title }: Params) => {
  const carouselContainer = useRef<HTMLDivElement>(null);

  const navigation = (dir: string) => {
    const container = carouselContainer.current;

    if (container) {
      const scrollAmount =
        dir === "left"
          ? container.scrollLeft - (container.offsetWidth + 20)
          : container.scrollLeft + (container.offsetWidth + 20);

      container.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }

  };

  const skItem = () => {
    return (
      <div className="skeleton-item">
        <div className="poster-block skeleton"></div>
        <div className="text-block">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <div className="content-wrapper">
        {title && <div className="carousel-title">{title}</div>}
        <div className="box">
          <BsFillArrowLeftCircleFill
            className="carousel-left-nav arrow"
            onClick={() => navigation("left")}
          />
          <BsFillArrowRightCircleFill
            className="carousel-right-nav arrow"
            onClick={() => navigation("right")}
          />
          {!loading ? (
            <div className="carousel-items" ref={carouselContainer}>
              {data?.map((item) => (
                  <MovieCard key={item.id} data={item} />
                )
              )}
              <div className="left-opacity"></div>
              <div className="right-opacity"></div>
            </div>
          ) : (
            <div className="loading-skeleton">
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
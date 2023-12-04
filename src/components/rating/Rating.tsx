import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./style.scss";

const Rating = ({ rating }: { rating: string }) => {
  return (
    <div className="circle-rating">
      <CircularProgressbar
        value={+rating}
        maxValue={10}
        text={String(rating)}
        styles={buildStyles({
          pathColor:
            +rating < 5 ? "red" : +rating < 7 ? "orange" : "green",
        })}
      />
    </div>
  );
};

export default Rating;
import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";
import { RootState } from "../../store/store";


const Genres = ({ data }: { data: any}) => {
  const { genres } = useSelector((state: RootState) => state.home);

  return (
    <div className="genres">
      {data?.map((g: number) => (
        <div key={g}>
          {
            genres[g] && <div className="genre">{genres[g]}</div>
          }
        </div>
        )
      )}
    </div>
  );
};

export default Genres;
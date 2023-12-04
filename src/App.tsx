import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import NotFound from "./pages/notFound/NotFound";
import Search from "./pages/search/Search";
import { fetchData } from "./utils/api";
import { setApiConfiguration, setGenres } from "./store/homeSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchConfiguration();
    getGenres();
  }, []);

  const fetchConfiguration = () => {
    fetchData('/configuration')
      .then((res) => {
        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        };
        dispatch(setApiConfiguration(url));
      });
  }

  const getGenres = async () => {
    let promises: any = [];
    let endPoints = ["tv", "movie"];
    let allGenres: any = {};

    endPoints.forEach((url) => {
      promises.push(fetchData(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    data.map(({ genres }) => genres.map(({id, name}: any) => (allGenres[id] = name)));

    dispatch(setGenres(allGenres));
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:type/:id" element={<Details />} />
      <Route path="/explore/:type" element={<Explore />} />
      <Route path="/search/:query" element={<Search />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

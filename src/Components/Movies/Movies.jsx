import React, { useEffect, useState } from 'react';
import axios from "axios";
import MediaItem from '../MediaItem/MediaItem';
import { Helmet } from 'react-helmet';

export default function Movies() {

  const [trendingMovies, setTrendingMovies] = useState([]);

  async function getTrending(mediaType) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=c1d5e3da863c5c7aa3658b7cebeab375`);
    setTrendingMovies(data.results);
  }

  useEffect(() => {
    getTrending("movie");
  }, []);

  return <>

    <Helmet>
      <title>Trending Movies</title>
    </Helmet>
    <div className="row py-5">
      {trendingMovies.map((item, index) => <MediaItem key={index} item={item} />)}
    </div>
  </>
}

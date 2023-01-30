import React, { useEffect, useState } from 'react';
import axios from "axios";
import MediaItem from '../MediaItem/MediaItem';
import { Helmet } from 'react-helmet';

export default function Tv() {

  const [trendingTV, setTrendingTV] = useState([])

  async function getTrending(mediaType) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=c1d5e3da863c5c7aa3658b7cebeab375`);
    setTrendingTV(data.results);
  }

  useEffect(() => {
    getTrending("tv");
  }, []);

  return<>

  <Helmet>
    <title>Trending Tv</title>
  </Helmet>
  <div className="row py-5">
  {trendingTV.map((item, index) => <MediaItem key={index} item={item} />)}
  </div>
</>
}

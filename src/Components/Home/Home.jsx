import React, { useEffect, useState } from 'react';
import axios from "axios";
import MediaItem from '../MediaItem/MediaItem';
import { Helmet } from 'react-helmet';


export default function Home() {


  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingPeople, setTrendingPeople] = useState([]);
  const [trendingTV, setTrendingTV] = useState([])

  async function getTrending(mediaType, callback) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=c1d5e3da863c5c7aa3658b7cebeab375`)
    callback(data.results);
    
  }

  useEffect(() => {
    getTrending("movie", setTrendingMovies);
    getTrending("person", setTrendingPeople);
    getTrending("tv", setTrendingTV);
  }, []);

  
  return <>

    <Helmet>
      <title>Home Page</title>
    </Helmet>

    <div className="row py-5">
      <div className="col-md-4">
        <div>
          <div className="brdr w-25 mb-3"></div>
          <h2 className=' h4'>Trending Movies <br /> To Watch Right Now</h2>
          <p className=' py-2 text-muted'>Most Watched Movies By Days</p>
          <div className="brdr w-100 mt-3"></div>
        </div>
      </div>

      {trendingMovies.map((item, index) => <MediaItem key={index} item={item} />).splice(0,10)};
    </div>

    <div className="row py-5">
      <div className="col-md-4">
        <div>
          <div className="brdr w-25 mb-3"></div>
          <h2 className=' h4'>Trending TV <br /> To Watch Right Now</h2>
          <p className=' py-2 text-muted'>Most Watched TV By Days</p>
          <div className="brdr w-100 mt-3"></div>
        </div>
      </div>

      {trendingTV.map((item, index) => <MediaItem key={index} item={item} />).splice(0,10)}
    </div>

    <div className="row py-5">
      <div className="col-md-4">
        <div>
          <div className="brdr w-25 mb-3"></div>
          <h2 className=' h4'>Trending People <br /> To Watch Right Now</h2>
          <p className=' py-2 text-muted'>Most Watched People By Days</p>
          <div className="brdr w-100 mt-3"></div>
        </div>
      </div>

      {trendingPeople.filter((person) => person.profile_path !== null).map((item, index) => <MediaItem key={index} item={item} />).splice(0,10)}
    </div>


  </>
}

import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from 'react-helmet'



export default function ItemDetails() {

    const [itemDetails, setItemDetails] = useState({})

    let { id, media_type } = useParams();

    async function getDetials(id, media_type) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=c1d5e3da863c5c7aa3658b7cebeab375&language=en-US`)
        setItemDetails(data);
    }

    useEffect(() => {
        getDetials(id, media_type);
    }, []);

    return <>

        <Helmet>
            <title>{itemDetails.title}</title>
        </Helmet>

        <div className="row">
            <div className="col-md-3">
                <img className='w-100' src={"https://image.tmdb.org/t/p/w500/" + itemDetails.poster_path} alt="" />
            </div>
            <div className="col-md-9">
                <h2>{itemDetails.title}</h2>
                <p className='py-2 text-muted'>{itemDetails.tagline}</p>
                <h5 className='d-flex my-4 '>Rating : {itemDetails.vote_average ? <div className="mx-3 ">{itemDetails.vote_average?.toFixed(1)}</div> : ""}</h5>
                <h5 className='d-flex my-4 '>Release Date : {itemDetails.vote_average ? <div className="mx-3 ">{itemDetails.release_date}</div> : ""}</h5>
                <h5 className='d-flex my-4 '>Duration : {itemDetails.vote_average ? <div className="mx-3 ">{itemDetails.runtime} minute</div> : ""}</h5>
                <p className='py-2 text-muted'>{itemDetails.overview}</p>
                <a href={itemDetails.homepage} className="link-hover" target={"_blank"} rel="noreferrer"><div className="btn btn-success">Watch Now</div></a>
            </div>
        </div>


    </>
}

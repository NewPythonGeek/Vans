import { useState, useEffect } from "react";
import React from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";


export default function HostVansDetail(props){
    let {id} = useParams()
    let [currentVan, setCurrentVan] = useState(null)
    useEffect(()=>{
    fetch(`/api/vans/${id}`)
        .then(res => res.json())
        .then(data => setCurrentVan(data.vans))
    },[id])
    if (!currentVan) {
        return <h1>Loading...</h1>
    }
    let navStyle = {
        fontWeight : "bold",
        textDecoration: "underline",
        color: "#161616"
    }
  return (
    <section className="van-detail-container">
        <Link
        to=".."
        relative="path"
        className="back-button"
        >&larr; <span>Back to all vans</span>
        </Link>

        <div className="host-van-detail-layout-container">
            <div className="host-van-detail">
                <img src={currentVan.imageUrl} alt="van"/>
                <div className="host-van-detail-info-text">
                    <i
                        className={`van-type van-type-${currentVan.type}`}
                    >
                        {currentVan.type}
                    </i>
                    <h3>{currentVan.name}</h3>
                    <h4>${currentVan.price}/day</h4>
                </div>
            </div>
        </div>
        <nav className="host-van-detail-nav">
            <NavLink to="." end style= {({isActive}) => isActive ? navStyle : null}>Details</NavLink>
            <NavLink to="pricing" style= {({isActive}) => isActive ? navStyle : null}>Pricing</NavLink>
            <NavLink to="photos" style= {({isActive}) => isActive ? navStyle : null}>Photos</NavLink>
        </nav>
        <Outlet context={{currentVan}}/>
    </section>
  )
};

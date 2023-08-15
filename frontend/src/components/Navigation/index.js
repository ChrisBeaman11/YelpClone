import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Navigation({ isLoaded }) {
  let {pathname} = useLocation();
  const [changeStyle, setChangeStyle] = useState(!isNaN(pathname[pathname.length-1]));
  let history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  useEffect(()=>{
    if(!isNaN(pathname[pathname.length-1])){
      setChangeStyle(true)
    }
    else{
      setChangeStyle(false)
    }

  }, [pathname])
  return (
    <div className="navContainer">
    <div className={changeStyle? 'squishedNavCont': 'squishedNavCont'}>

      <h1 onClick = {() => history.push('/')}className = "logo">Yelp</h1>
    <div className="SubNav">

      {

          isLoaded && (

              <ProfileButton user={sessionUser} />


          )
      }
      </div>
    </div>
    </div>
  );
}

export default Navigation;

import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import OpenModalMenuItem from "./OpenModalMenuItem";
function Navigation({ isLoaded }) {
  const ulRef = useRef();
  const [showMenu, setShowMenu] = useState(false);
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
    <>

    <div className="loginSignupNav">
    {!sessionUser && (

            <OpenModalMenuItem
              itemText="Log In"
              modalComponent={<LoginFormModal />}
            />
    )}
    {!sessionUser && (
            <OpenModalMenuItem
              itemText="Sign Up"
              modalComponent={<SignupFormModal />}
            />
            )}

</div>
          </>

      {sessionUser &&  (

              <ProfileButton user={sessionUser} />


          )

    }
      </div>
    </div>
    </div>
  );
}

export default Navigation;

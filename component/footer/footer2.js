import React, { useEffect, useState } from 'react';
import style from "../../styles/moduleCss/footer.module.css"
import { AiFillFacebook , AiFillTwitterSquare
 } from "react-icons/ai";
import Link from 'next/link';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode"

const Footer = () => {

    const [user, setUser] = useState();
  
    const usersStringfy = Cookies.get("token");
    useEffect(() => {
      if (usersStringfy) {
        const user = jwt_decode(usersStringfy);
        setUser(user);
      }
   
    }, []);


    return (
        <div  className={` mt-0 pt-0 mb-10 `}>
              <ul  className={style.footer}>
                <li  className={style.item}>
                   <Link href="/"  className="link text-uppercase" title="Home">
                        Home
                    </Link>
                </li>
                <li  className={style.item}>
                    <Link href="/about-us"  className="link text-uppercase" title="About us">
                        About Us
                    </Link>
                </li>
               
                {
                    user?._id &&    <li  className={style.item}>
                    <Link href={`/recharge-credits/${user?._id}`}  className="link text-uppercase" title="Buy Credit">
                        Buy Credit
                    </Link>
                </li>
                }
                <li  className={style.item}>
                    <Link href="/contact-us"  className="link text-uppercase" title="Contact">
                        Contact Us
                    </Link>
                </li>
                <li  className={style.item}>
                    <Link href="/privacy-policy" className="link text-uppercase" title="Privacy">
                        Privacy
                    </Link>
                </li>
                <li  className={style.item}>
                    <Link href="/terms"  className="link text-uppercase" title="Terms">
                        Terms
                    </Link>
                </li>
       
            </ul>
        </div>
    );
};

export default Footer;
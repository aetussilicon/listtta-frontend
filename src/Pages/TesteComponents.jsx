import { useState } from "react";
import { Pagination } from 'swiper/modules'; 
import { Swiper, SwiperSlide } from 'swiper/react';

import Login from "../Components/Signup/Login";
// import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import '../Styles/TestePage.css'
import HomePostCard from "../Components/Blog/PostCards/HomePostCard";

export default function TesteComponente() {
    const [loginPopUp, setLoginPopUp] = useState(false);

    // const swiper = new Swiper('.swiper', {
    //     modules: [Pagination],

    //     direction: 'horizontal',
    //     loop: true,

    //     pagination: {
    //         el: 'swiper-pagination',
    //     },

    //     scrollbar: {
    //         el: '.swiper-scrollbar'
    //     }
    // })

    return (
        <>
         
            <button onClick={() => setLoginPopUp(true)}>Login</button>
            <Login trigger={loginPopUp} setTrigger={setLoginPopUp} />
        
        </>

    );
}
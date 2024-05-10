import React from 'react';
import Navbar from './../../components/navbar/Navbar';
import Banner from '../../components/banner/Banner';
import NewsLetter from '../newsletter/NewsLetter';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;
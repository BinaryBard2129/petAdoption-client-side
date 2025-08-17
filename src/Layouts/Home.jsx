import React from 'react';
import Banner from './Banner';
import PetCategories from './PetCategories';
import CallToAction from './CallToAction';
import SuccessStories from './SuccessStories';
import AdoptionSteps from './AdoptionSteps';
import AboutUs from './AboutUs';
import Events from './Events';
import Blog from './Blog';
import Promotion from './Promotion';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <PetCategories></PetCategories>
          <CallToAction></CallToAction>
          <SuccessStories></SuccessStories>
          <AdoptionSteps></AdoptionSteps>
          
          <Blog></Blog>
          <Promotion></Promotion>
          <AboutUs></AboutUs>
        </div>
    );
};

export default Home;
import React from 'react';
import Banner from './Banner';
import PetCategories from './PetCategories';
import CallToAction from './CallToAction';
import SuccessStories from './SuccessStories';
import AdoptionSteps from './AdoptionSteps';
import AboutUs from './AboutUs';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <PetCategories></PetCategories>
          <CallToAction></CallToAction>
          <SuccessStories></SuccessStories>
          <AdoptionSteps></AdoptionSteps>
          <AboutUs></AboutUs>
        </div>
    );
};

export default Home;
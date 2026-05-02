import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BrandStrip from '../components/BrandStrip';
import Categories from '../components/Categories';
import ProductSection from '../components/ProductSection';
import PromoBanner from '../components/PromoBanner';
import Features from '../components/Features';
import BlogSection from '../components/BlogSection';
import Footer from '../components/Footer';
// import Header from '../components/Header';

const Home = () => {
  return (
    <>
      {/* <Header /> */}
      <Hero />
      <BrandStrip />
      <Categories />
      <ProductSection title="Best Sellers" />
      <PromoBanner />
      <ProductSection title="New Arrivals" />
      <Features />
      <BlogSection />
      {/* <Footer /> */}
    </>
  );
};

export default Home;
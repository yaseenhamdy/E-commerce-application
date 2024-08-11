import React from 'react'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import Products from '../Products/Products'
import SliderHome from '../SliderHome/SliderHome'
import Footer from '../Footer/Footer'


export default function Home() {
    return (
        <>
            <SliderHome />
            <CategoriesSlider />
            <Products />
        </>
    )
}

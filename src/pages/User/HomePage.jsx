import React from 'react'
import HeroCarousel from '../../components/Home/HeroCarousel'
import LaptopSearchFilter from '../../components/Home/Favourite'

const HomePage = () => {
  return (
    <div>
      {/* the main hero carosol component */}
      <LaptopSearchFilter/>
      <HeroCarousel/>
    </div>
  )
}

export default HomePage

import { useState } from 'react'
// import GsapAnimations from './AnimationDeep/GSAPAnimations'
import MoreGsapAnimations from './AnimationDeep/MoreGsapAnimations'
import SmoothGsapAnimations from './AnimationDeep/SmoothGsapAnimations'
import PremiumAnimations from './AnimationDeep/PremiumAnimations'
import NextGenAnimations from './AnimationDeep/NextGenAnimations'
import UltraAnimations from './AnimationDeep/UltraAnimations'
import TextDragAnimation from './Components/TextDragAnimation'
import HorizontalGallery from './Components/HorizontalGallery'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <GsapAnimations/>
    <MoreGsapAnimations/>
   
    <SmoothGsapAnimations/>
    <PremiumAnimations/>
    <NextGenAnimations/> */}
    {/* <UltraAnimations/> */}
    {/* <TextDragAnimation /> */}
    <HorizontalGallery/>
   
    
    </>
  )
}

export default App

import { useState } from 'react'
// import GsapAnimations from './AnimationDeep/GSAPAnimations'
import MoreGsapAnimations from './AnimationDeep/MoreGsapAnimations'
import SmoothGsapAnimations from './AnimationDeep/SmoothGsapAnimations'
import PremiumAnimations from './AnimationDeep/PremiumAnimations'
import NextGenAnimations from './AnimationDeep/NextGenAnimations'
import UltraAnimations from './AnimationDeep/UltraAnimations'
import TextDragAnimation from './Components/TextDragAnimation'
import HorizontalGallery from './Components/HorizontalGallery'
import ScrollAnimation from './Components/ScrollAnimation'
import BouncyFooter from './Components/BouncyFooter'
import MouseMoving from './Components/MouseMoving'
// import BeeScrollAnimation from './Components/BeeScrollAnimations'
import ScrollTriggerDemo from './Components/ScrollTriggerDemo'
import DraggableFollowers from './DragableComponents/DraggableFollowers'
import FoldEffect from './Components/FoldEffect'
import KeyholeAnimation from './DragableComponents/KeyholeAnimation'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <GsapAnimations/>
    <MoreGsapAnimations/>
    <SmoothGsapAnimations/>
    <PremiumAnimations/>
    <NextGenAnimations/>
    <UltraAnimations/> */}
    {/* <HorizontalGallery/> */}
    {/* <ScrollAnimation/> */}
    {/* <TextDragAnimation /> */}
    {/* <BeeScrollAnimation/> */}
    {/* <MouseMoving/> */}
    {/* <BouncyFooter/> */}
    {/* <ScrollTriggerDemo/> */}

    {/* <DraggableFollowers/> */}
    {/* <FoldEffect/> */}
    <KeyholeAnimation/>
    
    </>
  )
}

export default App

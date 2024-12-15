import React from 'react'
import dynamic from 'next/dynamic'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

interface DynamicLottieProps {
  animationData: any;
  height?: number | string;
  width?: number | string;
}

const DynamicLottie: React.FC<DynamicLottieProps> = ({ animationData, height, width }) => {
  return <Lottie animationData={animationData} style={{ height, width }} />
}

export default DynamicLottie
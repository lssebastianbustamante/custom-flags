import type React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useRuntime } from 'vtex.render-runtime'
import type {TypeFlag } from '../../typings/interfaces'
import { usePromotionData } from './hook/hook'
import { promotionComponentMap } from './utils/promotionComponentMap'
import { CSS_HANDLES } from '../../typings/constanst'


const CustomDataPromotion: React.FC<{ selectedFlag: TypeFlag }> = ({ selectedFlag }) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { page } = useRuntime()


  const limitPromotionData = usePromotionData(selectedFlag)

  const PromotionComponent = promotionComponentMap[selectedFlag?.type]

  if (!PromotionComponent) return null
  
  return (
    <PromotionComponent
    {...selectedFlag}
    limitPromotionData={limitPromotionData}
    handles={handles}
    page={page}
    />
  )
}



export default CustomDataPromotion
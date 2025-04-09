import { useState, useEffect } from 'react'
import type { TypeFlag, GiftInfo } from '../../../typings/interfaces'


const GIFT_INFO_STATE_DEFAULT = [
    {
      names: [],
      productName: '',
      minimumQuantity: '',
      quantitySelectable: '',
      maxUsagePerClient: 0,
      maxUsage: 0,
      maxNumberOfAffectedItems: 0,
      quantityToAffectBuyTogether: 0
    }
  ]

export const usePromotionData = (selectedFlag: TypeFlag) => {
  const [limitPromotionData, setLimitPromotionData] = useState<GiftInfo[]>(GIFT_INFO_STATE_DEFAULT)

  useEffect(() => {
    if (!selectedFlag?.idCalculatorConfiguration || !selectedFlag?.booleanProps?.showLimitPromotions) return
    if (selectedFlag.giftInfo) {
      setLimitPromotionData([selectedFlag.giftInfo])
    }
  }, [selectedFlag])

  return limitPromotionData
}
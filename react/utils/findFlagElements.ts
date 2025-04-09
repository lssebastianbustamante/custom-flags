import { useRef } from "react"

import { dataForFlags } from "./ChargeDataFlags"
import { FLAG_TYPES } from "../typings/constanst"
import type { RateAndBenefitsIdentifier, Teaser } from "../typings/interfaces"




export const findFlagElements = (teaser: Teaser[], rateAndBenefitsIdentifiers: RateAndBenefitsIdentifier[]) => {

  const flags = dataForFlags(teaser, rateAndBenefitsIdentifiers)
  const refPromotion = useRef<(HTMLDivElement | null)[]>([])

  const blockPromotion = refPromotion.current as HTMLElement[] | null
  const flagToUse = flags[0]
  const cleanFlags = flags?.filter((flag) => flag?.type !== FLAG_TYPES.COLLECTION)

  if (!flagToUse) {
    return { refElement: null, hashFlag: null }
  }

  const { idCalculatorConfiguration } = flagToUse
  const refElement = blockPromotion?.find(
    (promotion) => promotion?.id === `${idCalculatorConfiguration}`
  )
  const promotion = cleanFlags?.find(
    (flag) => refElement?.id === `${flag.idCalculatorConfiguration}`
  )
  const hashFlag = cleanFlags?.find(
    (flag) => flag.idCalculatorConfiguration === promotion?.idCalculatorConfiguration
  )

  return { refElement, hashFlag, flags, refPromotion }
}

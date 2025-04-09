
import type React from 'react'

import { usePixelEventCallback } from 'vtex.pixel-manager'
import type { EventName } from 'vtex.pixel-manager/react/PixelEventTypes'

import { useCallback, useState } from 'react'

import type {
  EnumTypePromotion,
  Teaser,
  RateAndBenefitsIdentifier,
  ItemSimulation,
  ConditionPromotion
} from './typings/interfaces'
import type { PixelEventFlags } from './typings/events'

interface CustomConditionPromotionProps {
  typePromotion: EnumTypePromotion
  children?: React.ReactNode
}

interface ConditionPromotionState {
  items: ItemSimulation[]
  teaser: Teaser[]
  rateAndBenefitsIdentifiers: RateAndBenefitsIdentifier[]
  loading?: boolean
}

const DEFAULT_STATE: ConditionPromotionState = {
  items: [],
  teaser: [],
  rateAndBenefitsIdentifiers: [],
  loading: false
}

const CustomConditionPromotion = ({
  children,
  typePromotion = 'teaser'
}: CustomConditionPromotionProps) => {
  const [state, setState] = useState<ConditionPromotionState>(DEFAULT_STATE)

  const listenerConditionsEvent = useCallback((e?: PixelEventFlags) => {
    if (!e?.data) return

    setState((prevState) => ({
      ...prevState,
      ...e.data,
      loading: false
    }))
  }, [])

  usePixelEventCallback({
    eventName: 'conditionEvent' as EventName,
    handler: (e?: PixelEventFlags) => {
      if (!e?.data) return

      setState((prevState) => ({
        ...prevState,
        loading: true
      }))

      listenerConditionsEvent(e)
    }
  })

  // Extract items and ratesAndBenefitsData from simulation

  const { items, rateAndBenefitsIdentifiers, teaser, loading } = state

  // Determine which promotions to use based on typePromotion

  const promotions =
    typePromotion === 'teaser'
      ? (teaser ?? [])
      : typePromotion === 'rateAndBenefitsIdentifiers'
        ? (rateAndBenefitsIdentifiers ?? [])
        : ([] as ConditionPromotion[])

  // Extract priceTags from items
  const priceTags =
    items?.find((item) => item.priceTags.length > 0)?.priceTags ?? []
  // Calculate conditionPromotion based on promotions and priceTags length
  const conditionPromotion = promotions?.length + priceTags?.length

  if (loading) return null

  return <>{conditionPromotion > 1 ? children : null}</>
}

CustomConditionPromotion.displayName = 'CustomConditionPromotion'

export default CustomConditionPromotion

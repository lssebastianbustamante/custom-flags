import { useState, useCallback, memo, useEffect } from "react"
import Skeleton from "react-loading-skeleton"
import { useCssHandles } from "vtex.css-handles"
import { usePixelEventCallback } from "vtex.pixel-manager"
import type { EventName } from "vtex.pixel-manager/react/PixelEventTypes"
import { CSS_HANDLES } from "../../typings/constanst"
import type { PixelEventFlags } from "../../typings/events"
import type { TypeFlag } from "../../typings/interfaces"
import { PromotionContent } from "./utils/PromotionContent"

interface DynamicPromotionState {
  selectectFlag: TypeFlag | null
  showFlag: boolean
  loading: boolean
  error: boolean
}

const DEFAULT_STATE: DynamicPromotionState = {
  selectectFlag: null,
  showFlag: false,
  loading: true,
  error: false
}

const DynamicPromotion: React.FC = memo(() => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const [state, setState] = useState<DynamicPromotionState>(DEFAULT_STATE)

  const listenerFlagsEvent = useCallback((e?: PixelEventFlags) => {
    if (!e?.data?.event) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: true
      }))
      return
    }

    setState(prev => ({
      ...prev,
      ...e.data,
      loading: false,
      error: false
    }))
  }, [])

  usePixelEventCallback({
    eventName: 'flagsEvent' as EventName,
    handler: listenerFlagsEvent
  })
  
  useEffect(() => {
    return () => {
      setState(DEFAULT_STATE)
    }
  }, [])
  
  const { loading, selectectFlag, error } = state
  console.log(error)
  if (error) return null
  
  if (loading) {

    if (!error) return null

    return (
      <div className={`${handles['content-loading']} db w-100 mv1`}>
        <Skeleton height={100} />
      </div>
    )
  }
  
  if (!selectectFlag) {
    return (
      <PromotionContent handles={handles} selectedPromotion={null}      
      />
    )
  }
  if (selectectFlag) {
    
  return (
    <PromotionContent
      handles={handles}
      selectedPromotion={selectectFlag}
    />
  )
  }

  return null
})

DynamicPromotion.displayName = 'DynamicPromotion'

export default DynamicPromotion

import { useState, useEffect, useCallback } from "react"
import Skeleton from "react-loading-skeleton"
import { useCssHandles } from "vtex.css-handles"
import { usePixel } from "vtex.pixel-manager"
import { useRuntime } from "vtex.render-runtime"
import { CSS_HANDLES } from "../typings/constanst"
import type { CustomFlagsProps, TypeFlag } from "../typings/interfaces"
import { useFlags } from "../utils/CustomFlagsContex"
import { findFlagElements } from "../utils/findFlagElements"
import { handleFlagEvent, handleConditionsEvent } from "../utils/handleFlagsEvent"
import CustomModal from "./CustomModal/CustomModal"
import { FlagList } from "./FlagItem/FlagList"
import "./styles.css"

const ItemFlagPromotion: React.FC = () => {
  const {
    configProp,
    simulation,
    isLoadingData,
    teaser,
    loadingSimulation,
    rateAndBenefitsIdentifiers
  } = useFlags()

  const { handles } = useCssHandles(CSS_HANDLES)
  const { page } = useRuntime()
  const { push } = usePixel()

  const { enableFlagsModal = false, enableInfoPdp = false } =
    configProp as CustomFlagsProps

  const enableCursor =
    enableInfoPdp && page === 'store.product' ? 'auto' : 'auto'

  const [initialRender, setInitialRender] = useState(true)

  const [showData, setShowData] = useState<boolean>(false)

  const [selectedFlag, setSelectedFlag] = useState<TypeFlag | null>(null)

  const [refCurrent, setRefCurrent] = useState<HTMLElement[] | null>(null)

  const [loadingFlags, setLoadingFlags] = useState(false)

  const { flags, refPromotion } = findFlagElements(
    teaser,
    rateAndBenefitsIdentifiers
  )

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!flags || loadingSimulation || isLoadingData) return

    // Si es el renderizado inicial y hay más de un flag, marcarlo
    if (initialRender && !enableFlagsModal) {
      setRefCurrent(refPromotion?.current[0] as HTMLElement[] | null)

      setInitialRender(false)
      setLoadingFlags(true)
      return
    }

    if (flags.length >= 2 && !enableFlagsModal) {
      handleFlagEvent(null, false, push)

      handleConditionsEvent(
        simulation.items,
        simulation.ratesAndBenefitsData.teaser,
        simulation.ratesAndBenefitsData.rateAndBenefitsIdentifiers,
        push
      )
      setInitialRender(false)
      setLoadingFlags(true)
      return
    }

    // Si hay un solo flag y no es modal
    if (flags.length === 1 && !enableFlagsModal) {
      handleFlagEvent(flags[0], showData, push)

      setInitialRender(false)
      setLoadingFlags(true)
      return
    }
  }, [flags, loadingSimulation, isLoadingData, push, refCurrent])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()

      const target = e.target as HTMLElement
      const flagClickSelected = flags?.find(
        (flag) => flag?.idCalculatorConfiguration === target.id
      )

      if (!flagClickSelected) return

      // Si no es modal y hay un flag seleccionado
      if (!flagClickSelected.booleanProps?.enableFlagsModal) {
        handleFlagEvent(flagClickSelected, false, push)
        return
      }
      if (flagClickSelected.booleanProps?.enableFlagsModal) {
        setShowData(true)
        setSelectedFlag(flagClickSelected)
        return
      }
    },
    [push, initialRender, flags, showData, enableFlagsModal, selectedFlag]
  )

  return (
    <>
      {isLoadingData && !loadingFlags ? (
        <div className={`${handles['content-loading']} db w-100 mv1`}>
          <Skeleton count={12} width={100} height={10} delay={3} />
        </div>
      ) : (
        <FlagList
          flags={flags as TypeFlag[]}
          handleClick={handleClick}
          enableCursor={enableCursor}
          refPromotion={refPromotion as React.RefObject<HTMLElement[]>}
          handles={handles}
          setFlagState={
            setSelectedFlag as React.Dispatch<React.SetStateAction<TypeFlag>>
          }
        />
      )}

      {showData && enableFlagsModal && (
        <CustomModal
          selectedFlag={selectedFlag as TypeFlag}
          stateVisible={showData}
          setStateVisible={setShowData}
          handles={handles}
        />
      )}
    </>
  )
}

export default ItemFlagPromotion

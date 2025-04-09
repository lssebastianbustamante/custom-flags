import { memo } from "react"
import { FLAG_TYPES } from "../../../typings/constanst"
import type { TypeFlag } from "../../../typings/interfaces"


interface FlagItemProps {
  flag: TypeFlag
  idx: number
  handleClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  enableCursor?: string
  refPromotion: React.RefObject<HTMLElement[]>
  handles: { [key: string]: string }
  setSelectedFlag?: (flag: TypeFlag) => void
}

export const FlagItem = memo(
  ({
    flag,
    idx,
    handleClick,
    enableCursor,
    refPromotion,
    handles,
    setSelectedFlag
  }: FlagItemProps) => {
    return (
      <div
        style={{
          pointerEvents: enableCursor ? 'auto' : 'auto',
          backgroundColor: flag.color
        }}
        ref={(element) => {
          if (refPromotion?.current) {
            if (element) {
              refPromotion.current[idx] = element
            }
          }
        }}
        id={
          flag?.type === FLAG_TYPES.COLLECTION
            ? `collection-prom-${flag.idCalculatorConfiguration}`
            : `${flag.idCalculatorConfiguration}`
        }
        onClick={handleClick}
        key={flag.idCalculatorConfiguration + idx}
        onKeyUp={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            if (setSelectedFlag) {
              setSelectedFlag(flag)
            }
          }
        }}
        className={`${handles['custom-flags__tag']} ${
          flag?.type === FLAG_TYPES.COLLECTION
            ? `${handles['custom-flags__floating']} ${
                handles[`custom-flags__${flag?.color}`]
              }`
            : ''
        }`}
      >
        {flag?.name}
      </div>
    )
  }
)

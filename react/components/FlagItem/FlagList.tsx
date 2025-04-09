import { memo } from "react"
import type { TypeFlag } from "../../typings/interfaces"
import { FlagItem } from "./utils/FlagItem"


interface FlagListProps {
  flags: TypeFlag[]
  handleClick: (e: React.MouseEvent<HTMLDivElement>) => void
  enableCursor: string
  refPromotion: React.RefObject<HTMLElement[]>
  handles: Record<string, string>
  setFlagState: React.Dispatch<React.SetStateAction<TypeFlag>>
}
// Componente FlagList Memoizado
export const FlagList = memo(
  ({
    flags,
    handleClick,
    enableCursor,
    refPromotion,
    handles,
    setFlagState
  }: FlagListProps) => (
    <div className={handles['custom-flags__container']}>
      {flags?.map((flag, idx) => (
        <FlagItem
          key={`${flag.idCalculatorConfiguration}-${idx}`}
          flag={flag}
          idx={idx}
          handleClick={handleClick}
          enableCursor={enableCursor ? 'auto' : 'auto'}
          refPromotion={refPromotion}
          handles={handles}
          setSelectedFlag={setFlagState}
        />
      ))}
    </div>
  )
)

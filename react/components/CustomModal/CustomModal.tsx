import { useRef, useEffect } from "react"
import ReactDOM from "react-dom"
import type { TypeFlag, CustomFlagsProps } from "../../typings/interfaces"
import { useFlags } from "../../utils/CustomFlagsContex"
import TypeFlags from "../TypeFlags"
import CloseIconModal from "./CloseIconModal"



interface CustomModalProps {
  selectedFlag: TypeFlag
  stateVisible: boolean
  setStateVisible: React.Dispatch<React.SetStateAction<boolean>>
  handles: Record<string, string>
}

const CustomModal = ({
  selectedFlag,
  stateVisible,
  setStateVisible,
  handles
}: CustomModalProps) => {

  const modalRef = useRef<HTMLDivElement | null>(null)
  const { configProp } = useFlags()

  const { timeAutoClose = 5000, clickOverlay = false } =
    configProp as CustomFlagsProps

  useEffect(() => {
    if (!stateVisible) return

    const timeout = setTimeout(() => {
      setStateVisible(false)
    }, timeAutoClose)

    return () => {
      clearTimeout(timeout)
    }
  }, [timeAutoClose, stateVisible, setStateVisible])

  const refuseRedirect = (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const closeModal = () => {
    setStateVisible(false)
  }

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (!clickOverlay) return
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal()
    }
  }

  if (!stateVisible) return <></>

  return ReactDOM.createPortal(
    <div
      className={handles['custom-flags__container-modal']}
      onMouseDown={handleMouseDown}
      onClick={refuseRedirect}
      onKeyDown={refuseRedirect}
    >
      <div className={handles['custom-flags__body-modal']} ref={modalRef}>
        <button
          type="button"
          onClick={closeModal}
          className={handles['custom-flags__close-button-modal']}
        >
          <CloseIconModal handles={handles} colorIcon="#4f2170"/>
        </button>
        {
          <div
            className={`
              ${handles['custom-flags__container-modal-info']}
              ${handles[`custom-flags__container-modal-info-${selectedFlag?.type?.toLowerCase()}`]}
            `.trim()}
          >
            <TypeFlags flags={selectedFlag as TypeFlag} />
          </div>
        }
      </div>
    </div>,
    document.body
  )
}

export default CustomModal

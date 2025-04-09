
import '../styles.css'

interface CloseIconModalProps {
  colorIcon?: string,
  handles: Record<string, string>
}

const CloseIconModal: React.FC<CloseIconModalProps> = ({
  colorIcon,
  handles
}) => {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      id="Layer_1"
      width="20px"
      height="20px"
      viewBox="0 0 60.963 60.842"
      xmlSpace="preserve"
      className={handles['custom-flags__close-button-modal-icon']}
    >
      <title>Close Icon</title>
      <path
        style={{ fill: colorIcon }}
        d="M59.595,52.861L37.094,30.359L59.473,7.98c1.825-1.826,1.825-4.786,0-6.611c-1.826-1.825-4.785-1.825-6.611,0L30.483,23.748L8.105,1.369c-1.826-1.825-4.785-1.825-6.611,0c-1.826,1.826-1.826,4.786,0,6.611l22.378,22.379L1.369,52.861c-1.826,1.826-1.826,4.785,0,6.611c0.913,0.913,2.109,1.369,3.306,1.369s2.393-0.456,3.306-1.369l22.502-22.502l22.501,22.502c0.913,0.913,2.109,1.369,3.306,1.369s2.393-0.456,3.306-1.369C61.42,57.647,61.42,54.687,59.595,52.861z"
      />
    </svg>
  )
}

export default CloseIconModal

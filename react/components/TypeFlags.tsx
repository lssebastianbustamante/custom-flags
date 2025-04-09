import { useCssHandles } from "vtex.css-handles"
import { CSS_HANDLES } from "../typings/constanst"
import type { ComponentTypeFlags } from "../typings/interfaces"
import CustomDataPromotion from "./CustomPromotion/CustomDataPromotion"



const TypeFlags: React.FC<ComponentTypeFlags> = ({ flags }) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  const { type, name, color, booleanProps } = flags || {}

  return (
    <>
      {booleanProps?.enableFlagsModal && (
        <>
          <div
            className={handles['custom-flags__tag-modal']}
            style={{ backgroundColor: color }}
          >
            {name}
          </div>

          <div className={handles['custom-flags__container-data-flag']}>
            <CustomDataPromotion selectedFlag={flags} />
          </div>
        </>
      )}

      {!booleanProps?.enableFlagsModal && (
        <div className={handles['custom-flags__container-data-flag']}>
          <CustomDataPromotion selectedFlag={flags} />
        </div>
      )}

      {!booleanProps?.enableFlagsModal &&
        (type === 'collection' || type === 'combo') && (
          <div className={handles['custom-flags__container-data-flag']}>
            <CustomDataPromotion selectedFlag={flags} />
          </div>
        )}
    </>
  )
}

export default TypeFlags

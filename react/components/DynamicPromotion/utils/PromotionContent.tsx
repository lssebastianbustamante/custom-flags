import { memo, useMemo } from "react"
import { FormattedMessage } from "react-intl"
import type { TypeFlag } from "../../../typings/interfaces"
import { messages } from "../../messages"
import TypeFlags from "../../TypeFlags"

export const PromotionContent: React.FC<{
  handles: Record<string, string>
  selectedPromotion: TypeFlag | null
}> = memo(({ handles, selectedPromotion }) => {

  const disclaimerContent = useMemo(() => (
    <p className={handles['custom-flags__container-info-promotion-title-disclaimer']}>
      <FormattedMessage id={messages.titleDisclaimerInfo.id} />
    </p>
  ), [handles])

  const promotionContent = useMemo(() => (
    <div id="container-promo-info">
      <div className={handles['custom-flags__container-dynamic-promotion']}>
        <TypeFlags
          flags={selectedPromotion as TypeFlag}
          isPdP={selectedPromotion?.booleanProps?.showLimitPromotions}
        />
      </div>
    </div>
  ), [handles, selectedPromotion])

  return (
    <div className={handles['custom-flags__container-info-promotion-pdp']}>
      <div className={handles['custom-flags__container-info-promotion-container-disclaimer']}>
        {(selectedPromotion === null || selectedPromotion?.booleanProps?.enableFlagsModal) ? (
          <>
            {disclaimerContent}
            <p className={handles['custom-flags__container-info-promotion-text-disclaimer']}>
              <FormattedMessage id={messages.textDisclaimerInfo.id} />
            </p>
          </>
        ) : (
          <>
            {selectedPromotion.name.length > 0 ? disclaimerContent : null}
          </>
        )}
        {promotionContent}
      </div>
    </div>
  )
})

PromotionContent.displayName = 'PromotionContent'
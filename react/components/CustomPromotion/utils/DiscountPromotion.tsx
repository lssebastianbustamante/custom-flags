import { FormattedMessage } from 'react-intl'
import type { PromotionProps } from '../../../typings/interfaces'
import MessageInfoLimits from './MessageInfoLimits'
import { messages } from '../../messages'

export const DiscountPromotion: React.FC<PromotionProps> = ({
  color,
  name,
  limitPromotionData,
  handles
}) => (
  <article
    className={handles['custom-flags__floating-container-for-discount']}
    style={{ color: color }}
  >
    <p className={handles['custom-flags__promotion-data-title']}>
      <FormattedMessage id={messages.discountTitle.id} />
    </p>
    <p className={handles['custom-flags__promotion-data-subtitle']}>
      <FormattedMessage
        id={messages.discountSubtitle.id}
        values={{ value: name }}
      />
    </p>
    {limitPromotionData?.length > 0 && (
      <MessageInfoLimits
        giftInfo={limitPromotionData}
        styleBlock="custom-flags__custom-text-info-limits-modal"
      />
    )}
  </article>
)

DiscountPromotion.displayName = 'DiscountPromotion'

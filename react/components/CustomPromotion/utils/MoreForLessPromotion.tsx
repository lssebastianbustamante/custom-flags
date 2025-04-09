import type React from 'react'
import { FormattedMessage } from 'react-intl'
import MessageInfoLimits from './MessageInfoLimits'
import { messages } from '../../messages'
import type { PromotionProps } from '../../../typings/interfaces'


export const MoreForLessPromotion: React.FC<PromotionProps> = ({
  color,
  limitPromotionData,
  handles,
  giftInfo
}) => (
  
  <article
    className={handles['custom-flags__floating-container-for-moreless']}
    style={{ color: color }}
  >
    <p className={handles['custom-flags__promotion-data-title']}>
      <FormattedMessage id={messages.morelessTitle.id} />
    </p>
    <p className={handles['custom-flags__promotion-data-subtitle']}>
      <FormattedMessage
      id={messages.morelessSubtitle.id}
      values={{
        value: giftInfo?.minimumQuantity,
        value2: <strong>{giftInfo?.productName}</strong>,
        value3: Number(giftInfo?.minimumQuantity) - Number(giftInfo?.quantityToAffectBuyTogether),
      }}
      />
    </p>
    {limitPromotionData.length > 0 && (
      <MessageInfoLimits
        giftInfo={limitPromotionData}
        styleBlock="custom-flags__custom-text-info-limits-modal"
      />
    )}
  </article>
)

MoreForLessPromotion.displayName = 'MoreForLessPromotion'

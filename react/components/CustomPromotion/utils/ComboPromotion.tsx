import { FormattedMessage } from 'react-intl'
import type { PromotionProps } from '../../../typings/interfaces'
import { messages } from '../../messages'

export const ComboPromotion: React.FC<PromotionProps> = ({
  color,
  giftInfo,
  handles
}) => (
  <article
    className={handles['custom-flags__floating-container-for-combo']}
    style={{ color: color }}
  >
    <p className={handles['custom-flags__promotion-data-title']}>
      <FormattedMessage id={messages.comboTitle.id} />
    </p>
    {giftInfo?.productName && <p>{giftInfo?.productName}</p>}
    <p className={handles['custom-flags__promotion-data-subtitle']}>
      <FormattedMessage id={messages.comboSubtitle.id} />
    </p>
  </article>
  
)

ComboPromotion.displayName = 'ComboPromotion'

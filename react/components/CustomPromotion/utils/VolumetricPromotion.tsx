import { FormattedMessage } from 'react-intl'
import type { PromotionProps } from '../../../typings/interfaces'

import MessageInfoLimits from './MessageInfoLimits'
import { messages } from '../../messages'

export const VolumetricPromotion: React.FC<PromotionProps> = ({
  color,
  limitPromotionData,
  handles
}) => (
  <article
    className={handles['custom-flags__floating-container-for-volumetric']}
    style={{ color }}
  >
    <p className={handles['custom-flags__promotion-data-title']}>
      <FormattedMessage id={messages.volumetricTitle.id} />
    </p>
    <p className={handles['custom-flags__promotion-data-subtitle']}>
      <FormattedMessage id={messages.volumetricSubtitle.id} />
    </p>
    <div className={handles['custom-flags__container-table-volumetric']}>
      <CustomDescTable />
    </div>
    {limitPromotionData?.length > 0 && (
      <MessageInfoLimits
        giftInfo={limitPromotionData}
        styleBlock="custom-flags__custom-text-info-limits-modal"
      />
    )}
  </article>
)

VolumetricPromotion.displayName = 'VolumetricPromotion'

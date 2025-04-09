import type React from 'react'
import { useState, useCallback, memo } from 'react'
import { FormattedMessage } from 'react-intl'
import type { PromotionProps } from '../../../typings/interfaces'
import MessageInfoLimits from './MessageInfoLimits'
import { messages } from '../../messages'
import CustomCollapsible from './CustomCollapsible'

const INITIAL_VISIBLE_GIFTS = 2

export const GiftPromotion: React.FC<PromotionProps> = memo(
  ({ color, limitPromotionData, giftInfo, page, handles }) => {
    const [isCollapsed, setIsCollapsed] = useState(false)

    const renderGiftList = useCallback(
      (gifts: string[]) => (
        <ul className={handles['custom-flags__custom-list-info-gifts-pdp']}>
          {gifts.map((gift, index) => (
            <li
              key={`${gift}-${index.toString()}`}
              className={handles['custom-flags__list-title-productgift']}
            >
              {gift}
            </li>
          ))}
        </ul>
      ),
      [handles]
    )

    const renderProductGiftContent = useCallback(() => {
      if (!giftInfo?.names?.length) return null

      return (
        <>
          <ul>
            {giftInfo.names.map((gift: string, index) => (
              <li
                key={`${gift}-${index.toString()}`}
                className={handles['custom-flags__list-title-productgift']}
              >
                {gift}
              </li>
            ))}
          </ul>
          {limitPromotionData?.length > 0 && (
            <MessageInfoLimits
              giftInfo={limitPromotionData}
              styleBlock="custom-flags__custom-text-info-limits-modal"
            />
          )}
        </>
      )
    }, [giftInfo, limitPromotionData, handles])

    const renderBlockGifts = useCallback(() => {
      if (!limitPromotionData?.length) return null

      const gifts = limitPromotionData.flatMap((gift) => gift.names)
      const hasMoreGifts = gifts.length >= INITIAL_VISIBLE_GIFTS
      const visibleGifts = hasMoreGifts
        ? gifts.slice(0, INITIAL_VISIBLE_GIFTS)
        : gifts
      const remainingGifts = hasMoreGifts
        ? gifts.slice(INITIAL_VISIBLE_GIFTS)
        : []

      return (
        <>
          {renderGiftList(visibleGifts)}
          {hasMoreGifts && (
            <CustomCollapsible
              handles={handles}
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            >
              {renderGiftList(remainingGifts)}
              <MessageInfoLimits
                giftInfo={limitPromotionData}
                styleBlock="custom-flags__custom-text-info-limits-modal"
              />
            </CustomCollapsible>
          )}
          {!hasMoreGifts && limitPromotionData.length > 0 && (
            <MessageInfoLimits
              giftInfo={limitPromotionData}
              styleBlock="custom-flags__custom-text-info-limits-modal"
            />
          )}
        </>
      )
    }, [limitPromotionData, isCollapsed, renderGiftList, handles])

    return (
      <article
        className={handles['custom-flags__floating-container-for-productGif']}
        style={{ color }}
      >
        <p className={handles['custom-flags__promotion-data-title']}>
          <FormattedMessage id={messages.productgiftTitle.id} />
        </p>
        <p className={handles['custom-flags__promotion-data-subtitle']}>
          <FormattedMessage
            id={messages.productgiftSubtitle.id}
            values={{
              value: giftInfo?.minimumQuantity ?? '',
              value2: giftInfo?.productName ?? '',
              value3: giftInfo?.quantitySelectable ?? ''
            }}
          />
        </p>

        <div className={handles['custom-flags__container-list-gifts-product']}>
          <p className={handles['custom-flags__promotion-data-message']}>
            <FormattedMessage id={messages.productgiftListTitle.id} />
          </p>
          {page === 'store.product'
            ? renderBlockGifts()
            : renderProductGiftContent()}
        </div>
      </article>
    )
  }
)

GiftPromotion.displayName = 'GiftPromotion'

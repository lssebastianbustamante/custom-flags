import { FormattedMessage } from "react-intl"
import { useCssHandles } from "vtex.css-handles"
import { CSS_HANDLES } from "../../../typings/constanst"
import type { GiftInfo, Teaser } from "../../../typings/interfaces"
import { messages } from "../../messages"


interface MessageInfoLimitsProps {
  teaser?: Teaser[]
  giftInfo?: GiftInfo[]
  styleBlock: string
}

const MessageInfoLimits = ({ styleBlock, giftInfo }: MessageInfoLimitsProps) => {

  const { handles } = useCssHandles(CSS_HANDLES)
  const styleText = styleBlock ?? 'custom-flags__custom-text-info-limits'
  const validteaser = giftInfo?.filter((teaser) => {
    const { maxUsage, maxUsagePerClient, maxNumberOfAffectedItems } = teaser
    return maxUsage > 0 || maxUsagePerClient > 0 || maxNumberOfAffectedItems > 0
  })

  const teaserMessages = validteaser?.flatMap((teaser, index) => {
    const { maxUsage, maxUsagePerClient, maxNumberOfAffectedItems } = teaser
    const messageArray = []
    const keyString = index.toString()
    if (maxUsage > 0) {
      messageArray.push(
        <FormattedMessage
          key={messages.usageLimitStore.id + keyString}
          id={messages.usageLimitStore.id}
          values={{ value: maxUsage }}
        />
      )
    }

    if (maxUsagePerClient > 0) {
      messageArray.push(
        <FormattedMessage
          key={messages.usageLimitClient.id + keyString}
          id={messages.usageLimitClient.id}
          values={{ value: maxUsagePerClient }}
        />
      )
    }

    if (maxNumberOfAffectedItems > 0) {
      messageArray.push(
        <FormattedMessage
          key={messages.usageLimitCart.id + keyString}
          id={messages.usageLimitCart.id}
          values={{ value: maxNumberOfAffectedItems }}
        />
      )
    }

    return messageArray
  })

  const hasMessages = teaserMessages && teaserMessages?.length > 0
  return (
    <div>
      {hasMessages && (
        <p className={handles[`${styleText}`]}>
          <FormattedMessage id={messages.termsAndConditionsLimitStore.id} />{' '}
          {teaserMessages}
        </p>
      )}
    </div>
  )
}

export default MessageInfoLimits

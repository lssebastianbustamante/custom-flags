import type { ItemSimulation, RateAndBenefitsIdentifier, Teaser, TypeFlag } from "./interfaces";



export interface EventData {
  event?: string;
  eventName?: string;
}

export interface ProductFlagsData extends EventData {
  event?: 'flagsEvent';
  eventName?: 'flagsEvent';
  selectectFlag: TypeFlag | null
  giftInfo: {
    names: string[],
    nameProduct: string,
    maxUsagePerClient: number,
    maxUsage: number,
    maxNumberOfAffectedItems: number
},
  selectedColor: string
  showFlag: boolean
  messageLimit: boolean
  enableFlagsModal: boolean
}

export interface ConditionPromotionData extends EventData {
  event?: 'conditionEvent';
  eventName?: 'conditionEvent';
  items: ItemSimulation[]
  teaser: Teaser[]
  rateAndBenefitsIdentifiers: RateAndBenefitsIdentifier[]
}


export interface PixelEventFlags extends MessageEvent {
  data:  ProductFlagsData | ConditionPromotionData;
}

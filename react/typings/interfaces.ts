import type { ReactNode } from "react";

export type EnumTypePromotion = 'teaser' | 'rateAndBenefitsIdentifiers'

export interface TypeFlag {
  name: string;
  type: string;
  idCalculatorConfiguration: string;
  color?: string;
  featured?: boolean;
  booleanProps?: {
    enableFlagsModal?: boolean
    showLimitPromotions?: boolean
  }
  giftInfo?: GiftInfo
};

export interface PromotionProps {
  color?: string
  name?: string
  limitPromotionData: GiftInfo[]
  handles: Record<string, string>
  page?: string
  giftInfo?: GiftInfo
}

export type TypeProductName = string

export interface Product {
  productId: string
  productName: TypeProductName
};

export type GeneralValues = object

export interface Parameter {
  name: string
  value: string
}

export interface Conditions {
  parameters: Parameter[]
  minimumQuantity: number
}



export interface Effects {
  parameters: Parameter[]
}



export interface AdditionalInfo {
  [key: string]: string
}

export interface MatchedParameters {
  'Seller@CatalogSystem': string
  'progressiveDiscount@Marketing': string
}

export interface Total {
  id: string
  name: string
  value: number
}

export interface Teaser {
  featured: boolean
  id: string
  name: string
  generalValues: GeneralValues
  conditions: Conditions
  effects: Effects
  teaserType: string
  type: string
  maxUsage: number
  maxUsagePerClient: number
  maxNumberOfAffectedItems: number
  quantityToAffectBuyTogether: number,
  loadingFetchData: boolean
  skusGift: SkuGift
  clusterHighlights: Array<{
    id: string;
    name: string;
  }>;
}

export interface ConditionPromotion { 
  conditions: Conditions
  effects: Effects
  featured: boolean
  generalValues: GeneralValues
  id: string
  name: string
  teaserType: string
}
  


export  interface SkuGift {
  quantitySelectable: number;
  gifts: Gift[];
  quantity: number;
}

export interface Gift {
  id: string;
  name: string;
}

export interface GiftInfo {
  productName: string,
  minimumQuantity: string,
  quantitySelectable: string,
  names: string[],
  maxUsagePerClient: number,
  maxUsage: number,
  maxNumberOfAffectedItems: number,
  quantityToAffectBuyTogether: number,
}

export interface ComponentTypeFlags {
  flags: TypeFlag
  selectedColor?: string
  isPdP?: boolean
}

export interface RateAndBenefitsIdentifier {
  id: string,
  name: string,
  featured: boolean,
  description: string,
  matchedParameters: {
    "Seller@CatalogSystem": string,
    "buyAndWin@Marketing": string,
    'progressiveDiscount@Marketing': string
    'combo@Marketing': string
    'forThePriceOf@Marketing': string
  },
  additionalInfo: {
    minimumQuantity: number
    percentage: number
  },
  triggeredBy: null
  type: string
}

export interface RatesAndBenefitsData {
  rateAndBenefitsIdentifiers: RateAndBenefitsIdentifier[]
  teaser: Teaser[]
}


export interface ItemSimulation {
  id: string
  productCategories: Record<string, string> | null
  productCategoryIds?: string
  brand: string
  ean: string
  category: string
  detailUrl: string
  imageUrl: string
  name: string
  skuName: string
  price: number
  priceIsInt?: boolean
  sellingPrice: number
  productId: string
  productRefId: string
  quantity: number
  skuId: string
  referenceId: string // SKU reference id
  variant: string
  priceTags: PriceTag[]
  availability: string
}



export interface PriceTag {
  name: string
  value: number
  rawValue: number
  isPercentual: boolean
  identifier: string
}

export interface AvailableGift {
  isSelected: boolean
  uniqueId: string
  id: string
  productId: string
  productRefId: string
  refId: string
  ean: string
  name: string
  skuName: string
  modalType: string | null
  parentItemIndex: string | null
  parentAssemblyBinding: string | null
  priceValidUntil: string | null
  tax: number
  price: number
  listPrice: number | null
  manualPrice: number | null
  manualPriceAppliedBy: string | null
  sellingPrice: number
  rewardValue: number
  isGift: boolean
  additionalInfo: AdditionalInfo
  preSaleDate: string | null
  productCategoryIds: string
  productCategories: { [key: string]: string }
  quantity: number
  seller: string
  sellerChain: string[]
  priceTags: PriceTag[]
  availability: string
  measurementUnit: string
  unitMultiplier: number
  manufacturerCode: string | null
  priceDefinition: string | null
  taxCode: string
}

export interface SelectableGift {
  availableGifts: AvailableGift[]
  availableQuantity: number
  id: string
}

export interface SimulationData {
  items: ItemSimulation[]
  ratesAndBenefitsData: RatesAndBenefitsData
  selectableGifts: SelectableGift[]
}

export interface SimulationCtx {
  simulation: SimulationData
  loading: boolean
}


export interface PromotionByIdResponse extends TypeFlag {
  maxUsage: number;
  maxUsagePerClient: number;
  maxNumberOfAffectedItems: number;
  quantityToAffectBuyTogether: number,
  promotionType: string
  skusGift: Gift[]
  priceTags: PriceTag
  clusterHighlights: Array<{
    id: string;
    name: string;
  }>;
  items: ItemSimulation[]
  teaserType: string
  type: string
}





export type DynamicPromotionProps = {
  selectectFlag?: TypeFlag
  giftNames?: string[]
  showFlag?: boolean
  enableFlagsModal?: boolean
  promoCount?: number
}



export interface Context {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  customOrderForm: any
  loading: boolean
}

export interface ColorsColeccion {
  nameSeleccion: string
  colorSeleccion: string
  typeSeleccionFlag: string
}

export interface ColorProp {
  colorsColeccions: ColorsColeccion[]
  comboColor: string
  productGiftColor: string
  collectionColor: string
  moreForLessColor: string
  volumetricColor: string
  discountColor: string
}

export interface GetColorTypes {
  name: string
  type: string
  colorProps: ColorProp
}






export interface ConfigProps {
  colorsColeccions: ColorsColeccion;
  enableFlagsModal: boolean
  activateAutoClose: boolean
  clickOverlay: boolean
  timeAutoClose: number
  showLimitPromotions: boolean
  colorProps: ColorProp
}
export interface DataPromotion {
  featured: boolean,
  name: string,
  type: string,
  idCalculatorConfiguration: string
}


export interface CustomFlagsProps {
  children?: ReactNode;
  enableFlagsModal?: boolean
  enableInfoPdp?: boolean
  showLimitPromotions?: boolean
  activateAutoClose?: boolean
  clickOverlay?: boolean
  timeAutoClose?: number
  isPdp: boolean
  colorsColeccions: ColorsColeccion[]
  discountColor: string
  volumetricColor: string
  moreForLessColor: string
  collectionColor: string
  productGiftColor: string
  comboColor: string
}

export interface FlagsContextData {
  configProp?: CustomFlagsProps
  teaser: Teaser[]
  rateAndBenefitsIdentifiers: RateAndBenefitsIdentifier[]
  clusterHighlights:Array<{
    id: string;
    name: string;
  }>;
  dataProduct: Product
  loadingSimulation: boolean
  simulation: SimulationData
  isLoadingData: boolean
}

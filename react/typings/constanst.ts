export const APP_NAME = 'mdlzargentina.custom-flags'
export const VERSION = '1.x'


export const IDENTIFIERS = {
  id: 'id',
  slug: 'slug',
  ean: 'ean',
  reference: 'reference',
  sku: 'sku'
}

export const FLAG_TYPES = {
  COMBO: 'combo',
  TEASER: 'teaser',
  PRODUCTGIFT: 'productgift',
  DISCOUNT: 'discount',
  COLLECTION: 'collection',
  VOLUMETRIC: 'volumetric',
  MORELESS: 'moreless'
}

export const ORDER_FORM = {
  KEY: 'customOrderForm'
}

//variables for retries

export const MAX_RETRIES = 3
export const RETRY_DELAY = 2000




export const DEFAULT_STATE = {
  selectectFlag: {
    color: '',
    idCalculatorConfiguration: '',
    name: '',
    type: '',
    booleanProps: {
      enableFlagsModal: false,
      showLimitPromotions: false
    },
    giftInfo: {
      names: [],
      nameProduct: '',
      maxUsagePerClient: 0,
      maxUsage: 0,
      maxNumberOfAffectedItems: 0,
      quantityToAffectBuyTogether: 0,
      productName: '',
      minimumQuantity: '',
      quantitySelectable: ''
    },
  },
  showFlag: false,
  loading: true
}

export const CSS_HANDLES = [
  'custom-flags__container-dynamic-promotion',
  'custom-flags__container',
  'custom-flags__container-flag',
  'custom-flags__tag',
  'custom-flags__tag-modal',
  'custom-flags__tag-combo',
  'container-loading',
  'custom-flags__container',
  'custom-flags__tag',
  'custom-flags__floating',
  'custom-flags__floating-container-for-collection',
  'custom-flags__floating-container-for-discount',
  'custom-flags__floating-container-for-moreless',
  'custom-flags__floating-container-for-combo',
  'custom-flags__floating-container-for-productGif',
  'custom-flags__floating-container-for-volumetric',
  'custom-flags__promotion-data-title',
  'custom-flags__promotion-data-subtitle',
  'custom-flags__promotion-data-message',
  'custom-flags__container-table-volumetric',
  'custom-flags__container-list-gifts-product',
  'custom-flags__list-title-productgift',
  'custom-flags__custom-text-info-limits-modal',
  'custom-flags__custom-list-info-gifts-pdp',
  'custom-flags__collapsible-list-container-productgift',
  'custom-flags__collapsible-list-container-text-productgift',
  'custom-flags__collapsible-list-container-block-text-productgift',
  'custom-flags__collapsible-list-title-productgift',
  'custom-flags__collapsiblelist-productgift',
  'custom-flags__close-button-modal',
  'custom-flags__body-modal',
  'custom-flags__container-modal-info',
  'custom-flags__container-modal-info-volumetric',
  'custom-flags__container-modal-info-productgift',
  'custom-flags__container-modal-info-moreless',
  'custom-flags__container-modal-info-combo',
  'custom-flags__container-modal-info-discount',
  'custom-flags__floating',
  'custom-flags__container-modal',
  'custom-flags__estilo-1',
  'custom-flags__normal',
  'content-loading',
  'custom-flags__container-data-flag',
  'custom-flags__custom-text-info-limits',
  'custom-flags__custom-text-info-limits-pdp',
  'custom-flags__container-info-promotion-pdp',
  'custom-flags__container-info-promotion-container-disclaimer',
  'custom-flags__container-info-promotion-title-disclaimer',
  'custom-flags__container-info-promotion-text-disclaimer',
  'custom-flags__close-button-modal-icon'
]

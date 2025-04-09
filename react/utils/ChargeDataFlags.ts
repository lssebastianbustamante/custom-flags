import type { ColorProp, RateAndBenefitsIdentifier, Teaser, TypeFlag } from '../typings/interfaces'
import { FLAG_TYPES } from '../typings/constanst'
import { useFlags } from './CustomFlagsContex'
import { createFlagWithColor,    FLAG_TYPE_MAPPING,  } from './helpers'


export const dataForFlags = (teaser: Teaser[], rateAndBenefitsIdentifiers: RateAndBenefitsIdentifier[]) => {

  const { configProp, dataProduct } = useFlags();
  const colors = {
    volumetricColor: configProp?.volumetricColor || '',
    productGiftColor: configProp?.productGiftColor || '',
    moreForLessColor: configProp?.moreForLessColor || '',
    discountColor: configProp?.discountColor || '',
    collectionColor: configProp?.collectionColor || '',
    comboColor: configProp?.comboColor || '',
    colorsColeccions: configProp?.colorsColeccions || []
  } as ColorProp;

  const booleanProps = {
    enableFlagsModal: configProp?.enableFlagsModal || false,
    showLimitPromotions: configProp?.showLimitPromotions || false
  };



  const flagMap = new Map<string, TypeFlag>()

  // Procesar teaser
  const processTeaser = () => {
    for (const item of teaser || []) {
      if (!item.featured) continue ;

      const flagType = FLAG_TYPE_MAPPING[item?.type]?.type

      flagMap.set(
        item.name,
        createFlagWithColor(item, flagType, colors, booleanProps, dataProduct?.productName)
      );
    }
  };

  // Procesamiento de identificadores
  const processIdentifiers = (identifiers: RateAndBenefitsIdentifier[]) => {
    for (const item of identifiers || []) {
      if (!item.featured ) continue;

      const flagType = item.matchedParameters['progressiveDiscount@Marketing'] === dataProduct?.productId ? FLAG_TYPES.VOLUMETRIC : FLAG_TYPES.DISCOUNT

        
        flagMap.set(
          item.name,
          createFlagWithColor(item, flagType, colors, booleanProps, dataProduct?.productName)
        );
      
    }
  };

  processTeaser()
  processIdentifiers(rateAndBenefitsIdentifiers)

  return Array.from(flagMap.values())
}

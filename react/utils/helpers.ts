import type { ColorProp, Gift, ItemSimulation, RateAndBenefitsIdentifier, Teaser, TypeFlag } from "../typings/interfaces";
import { FLAG_TYPES } from "../typings/constanst";

export const removeParentheses = (str: string): string => {
    return str?.replace(/\s*\([^)]*\)\s*$/, '').trim()
}

export const getUniqueNames = (gifts: Gift[]): string[] => {
    return [...new Set(gifts?.map(gift => removeParentheses(gift.name)))];
};

export const FLAG_COLOR_MAPPING = {
    [FLAG_TYPES.VOLUMETRIC]: (colors: ColorProp) => colors.volumetricColor,
    [FLAG_TYPES.PRODUCTGIFT]: (colors: ColorProp) => colors.productGiftColor,
    [FLAG_TYPES.MORELESS]: (colors: ColorProp) => colors.moreForLessColor,
    [FLAG_TYPES.DISCOUNT]: (colors: ColorProp) => colors.discountColor,
    [FLAG_TYPES.COMBO]: (colors: ColorProp) => colors.comboColor,
    [FLAG_TYPES.COLLECTION]: (colors: ColorProp, name: string) => {
        const colorCollection = colors.colorsColeccions?.find(
            collection => collection.nameSeleccion === name
        );
        return colorCollection?.colorSeleccion || colors.collectionColor;
    }
};


interface FlagConfig {
    type: string
    condition?: (item: TypeFlag) => boolean
}

// Mapeo de tipos de flags
export const FLAG_TYPE_MAPPING: Record<string, FlagConfig> = {
    progressive: {
        type: FLAG_TYPES.VOLUMETRIC
    },
    buyAndWin: {
        type: FLAG_TYPES.PRODUCTGIFT
    },
    forThePriceOf: {
        type: FLAG_TYPES.MORELESS
    },
    regular: {
        type: FLAG_TYPES.DISCOUNT
    }
}

interface FlagWithColor extends TypeFlag {
    color: string;

}


// Función optimizada para crear flags
export const createFlagWithColor = (
    item: Teaser | RateAndBenefitsIdentifier,
    type: string,
    colors: ColorProp,
    booleanProps?: {
        enableFlagsModal?: boolean,
        showLimitPromotions?: boolean
    },
    productName?: string
): FlagWithColor => {
    const getColorForType = FLAG_COLOR_MAPPING[type] || FLAG_COLOR_MAPPING[FLAG_TYPES.DISCOUNT];

    if (type === FLAG_TYPES.PRODUCTGIFT || type === FLAG_TYPES.MORELESS) {
        const { skusGift, maxNumberOfAffectedItems, maxUsage, maxUsagePerClient, conditions, effects, quantityToAffectBuyTogether } = item as Teaser

        return {
            name: item.name,
            type: type,
            idCalculatorConfiguration: item.id,
            color: getColorForType(colors, item.name),
            booleanProps,
            giftInfo: {
                productName: productName || '',
                minimumQuantity: conditions?.minimumQuantity.toString(),
                quantitySelectable: effects?.parameters?.find((parameter) => parameter?.name?.includes("QuantitySelectable"))?.value || '',
                names: getUniqueNames(skusGift.gifts),
                maxUsagePerClient: maxUsagePerClient,
                maxUsage: maxUsage,
                maxNumberOfAffectedItems: maxNumberOfAffectedItems,
                quantityToAffectBuyTogether: quantityToAffectBuyTogether
            }
        }
    }
    return {
        name: item.name,
        type: type,
        idCalculatorConfiguration: item.id,
        color: getColorForType(colors, item.name),
        booleanProps
    };
};


// Función para procesar efectos
export const processEffects = (item: Teaser): string => {
    if (!item.effects?.parameters?.length) return FLAG_TYPES.COMBO

    const hasGifts = item.effects.parameters.some(param => param.name === 'GiftsIds')
    if (hasGifts) return FLAG_TYPES.PRODUCTGIFT

    const hasDiscount = item.effects.parameters.some(param => param.name === 'PercentualDiscount')
    if (hasDiscount) {
        return item.conditions?.minimumQuantity === 0 ? FLAG_TYPES.DISCOUNT : FLAG_TYPES.TEASER
    }

    return FLAG_TYPES.COMBO
}

// Helper para obtener tipo desde parámetros
export const getTypeFromParameters = (paramKey: string): string => {
    const typeMapping = {
        'buyAndWin@Marketing': FLAG_TYPES.PRODUCTGIFT,
        'progressiveDiscount@Marketing': FLAG_TYPES.VOLUMETRIC,
        'combo@Marketing': FLAG_TYPES.COMBO,
        'forThePriceOf@Marketing': FLAG_TYPES.MORELESS
    };
    return typeMapping[paramKey as keyof typeof typeMapping] || FLAG_TYPES.DISCOUNT;
};


export const createFlagsEventData = (
    selectectFlag: TypeFlag,
    showFlag?: boolean,
) => {
    return {
        selectectFlag,
        showFlag
    }
}

export const createConditionEventData = (
    items: ItemSimulation[],
    teaser: Teaser[],
    rateAndBenefitsIdentifiers: RateAndBenefitsIdentifier[]
) => {
    return {
        items,
        teaser,
        rateAndBenefitsIdentifiers
    }
}
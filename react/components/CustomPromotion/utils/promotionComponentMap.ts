import { FLAG_TYPES } from "../../../typings/constanst";
import { ComboPromotion } from "./ComboPromotion";
import { DiscountPromotion } from "./DiscountPromotion";
import { GiftPromotion } from "./GiftPromotion";
import { MoreForLessPromotion } from "./MoreForLessPromotion";
import { VolumetricPromotion } from "./VolumetricPromotion";

export const promotionComponentMap = {
    [FLAG_TYPES.DISCOUNT]: DiscountPromotion,
    [FLAG_TYPES.VOLUMETRIC]: VolumetricPromotion,
    [FLAG_TYPES.MORELESS]: MoreForLessPromotion,
    [FLAG_TYPES.COMBO]: ComboPromotion,
    [FLAG_TYPES.PRODUCTGIFT]: GiftPromotion,
}
import type { ItemSimulation, RateAndBenefitsIdentifier, Teaser, TypeFlag } from "../typings/interfaces"
import { createFlagsEventData, createConditionEventData } from "./helpers"




export const handleFlagEvent = (
    selectectFlag: TypeFlag | null,
    showFlag: boolean,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    push: (event: any) => void
) => {
    const flagsEventData = createFlagsEventData(
        selectectFlag as TypeFlag,
        showFlag,
    )

    push({
        event: 'flagsEvent',
        ...flagsEventData,
    })
}

export const handleConditionsEvent = (
    items: ItemSimulation[],
    teaser: Teaser[],
    rateAndBenefitsIdentifiers: RateAndBenefitsIdentifier[],
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    push: (event: any) => void
) => {
    const conditionEventData = createConditionEventData(
        items,
        teaser,
        rateAndBenefitsIdentifiers
    )

    push({
        event: 'conditionEvent',
        ...conditionEventData,
    })
}

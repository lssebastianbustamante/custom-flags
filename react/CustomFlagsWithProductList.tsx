import { useCallback, useEffect, useMemo, useState } from 'react'
import { useApolloClient } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'
import { OrderForm } from 'vtex.order-manager'
import { useItemContext } from 'vtex.product-list/ItemContext'
import Skeleton from 'react-loading-skeleton'

import queryPromotionById from '../react/graphql/queryPromotionById.gql'
import { schema } from './schema'
import { LoggerProvider } from './utils/LoggerContext'
import type { CustomFlagsProps } from './typings/interfaces'
import { FLAG_TYPES } from './typings/constanst'

export type ProductType =
  | 'buyAndWin'
  | 'progressive'
  | 'regular'
  | 'forThePriceOf'

export interface GetColorTypes {
  type?: ProductType
  name?: string
  colorProps: {
    volumetricColor?: string
    productGiftColor?: string
    moreForLessColor?: string
    discountColor?: string
    colorsColeccions?: { nameSeleccion: string; colorSeleccion: string }[]
    collectionColor?: string
    comboColor?: string
  }
  rateBenefits?: {
    featured: boolean
    idCalculatorConfiguration: string
    name: string
    type: string
  }[]
}

const getColor = ({ type, name, colorProps, rateBenefits }: GetColorTypes) => {
  const {
    volumetricColor = '#2d6eaa',
    productGiftColor = '#623e23',
    moreForLessColor = '#e18719',
    discountColor = '#a52323',
    colorsColeccions,
    collectionColor = '#4f2170',
    comboColor = '#e6af23'
  } = colorProps

  switch (type) {
    case 'buyAndWin':
      return productGiftColor
    case 'progressive':
      return volumetricColor
    case 'regular':
      return discountColor
    case 'forThePriceOf':
      return moreForLessColor
    case FLAG_TYPES.COLLECTION: {
      const colorColeccion = colorsColeccions?.find(
        (coleccion: { nameSeleccion: string; colorSeleccion: string }) =>
          coleccion.nameSeleccion === name
      )
      return colorColeccion?.colorSeleccion || collectionColor
    }
    case FLAG_TYPES.TEASER:
      if (!rateBenefits) return
      return rateBenefits?.filter((benefits) => benefits?.name === name)
        ?.length > 1
        ? volumetricColor
        : moreForLessColor
    case FLAG_TYPES.COMBO:
      return comboColor
    default:
      return discountColor
  }
}

const CSS_HANDLES = [
  'container-loading',
  'custom-flags__container',
  'custom-flags__tag',
  'custom-flags__floating'
]

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const promotionCache = new Map<string, Promise<any>>()

const Content = (customFlagsProps: CustomFlagsProps) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { item, loading: loadingItem } = useItemContext()
  const { orderForm } = OrderForm.useOrderForm()
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [rateBenefits, setRatesBenefits] = useState<any[]>([])
  const [isUnmounted, setIsUnmounted] = useState(false)
  const { query } = useApolloClient()

  const {
    collectionColor,
    colorsColeccions,
    comboColor,
    discountColor,
    moreForLessColor,
    volumetricColor,
    productGiftColor
  } = customFlagsProps

  const colorProps = {
    collectionColor,
    colorsColeccions,
    comboColor,
    discountColor,
    moreForLessColor,
    volumetricColor,
    productGiftColor
  }

  useEffect(() => {
    const clearCacheInterval = setInterval(
      () => {
        const now = Date.now()

        promotionCache.forEach((promise, id) => {
          promise.then((data) => {
            if (data?.timestamp && now - data.timestamp > 1000 * 60 * 30) {
              promotionCache.delete(id)
            }
          })
        })
      },
      1000 * 60 * 5
    ) // Limpiar cada 5 minutos

    return () => clearInterval(clearCacheInterval)
  }, [])

  const fetchPromotions = useCallback(
    async (benefitIds: string[]) => {
      const uniqueIds = [...new Set(benefitIds)]
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const results: any[] = []
      const batchSize = 5 // Tamaño óptimo para batch

      // Procesar IDs en batches
      for (let i = 0; i < uniqueIds.length; i += batchSize) {
        const batchIds = uniqueIds.slice(i, i + batchSize)
        const batchPromises = batchIds.map((id) => {
          if (promotionCache.has(id)) {
            return promotionCache.get(id)
          }

          const promotionPromise = query({
            query: queryPromotionById,
            variables: { promotionId: id },
            fetchPolicy: 'cache-first'
          })
            .then(({ data }) => ({
              featured: data?.listPromotionById?.isFeatured ?? false,
              name: data?.listPromotionById?.name,
              type: data?.listPromotionById?.type,
              idCalculatorConfiguration:
                data?.listPromotionById?.idCalculatorConfiguration ?? id
            }))
            .catch((err) => {
              console.error(
                `[CustomFlags] Error fetching promotion ${id}:`,
                err
              )
              return null
            })

          promotionCache.set(id, promotionPromise)
          return promotionPromise
        })

        const batchResults = await Promise.all(batchPromises)
        results.push(...batchResults.filter(Boolean))
      }

      return results
    },
    [query]
  )
  const priceTags = useMemo(() => {
    if (!orderForm || !item) return []
    return (
      orderForm?.items.find(
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        (_item: any, index: string) =>
          _item.id === item.id && index === item?.index
      )?.priceTags ?? []
    )
  }, [item, orderForm])

  useEffect(() => {
    if (!priceTags?.length) return

    let mounted = true
    const benefitIds = priceTags.map(
      (tag: { identifier: string }) => tag.identifier
    )

    fetchPromotions(benefitIds)
      .then((promotions) => {
        if (mounted) {
          setRatesBenefits(promotions)
        }
      })
      .catch((err) => {
        console.error('[CustomFlags] Error processing promotions:', err)
      })

    return () => {
      mounted = false
    }
  }, [priceTags, fetchPromotions])

  useEffect(() => {
    if (rateBenefits.length > 0) {
      setIsUnmounted(true)
    }
  }, [rateBenefits])

  return (
    <>
      {loadingItem && isUnmounted ? (
        <div className={`${handles['container-loading']} ml3 mw3`}>
          <Skeleton count={1} height={16} />
        </div>
      ) : (
        <div className={handles['custom-flags__container']}>
          {rateBenefits.length > 0 &&
            rateBenefits
              .filter((flag) => flag.name)
              .map((flag) => (
                <div
                  key={flag.idCalculatorConfiguration}
                  className={`${handles['custom-flags__tag']} ${
                    flag?.type === FLAG_TYPES?.COLLECTION
                      ? `${handles['custom-flags__floating']} ${handles[`custom-flags__${colorsColeccions?.[0].typeSeleccionFlag}`]}`
                      : ''
                  }`}
                  data-name={flag.name}
                  style={{
                    backgroundColor: `${getColor({
                      type: flag?.type as ProductType,
                      name: flag?.name,
                      colorProps,
                      rateBenefits
                    })}`
                  }}
                >
                  {flag?.name}
                </div>
              ))}
        </div>
      )}
    </>
  )
}

const CustomFlagsWithProductList = (
  props: React.PropsWithChildren<CustomFlagsProps>
) => (
  <LoggerProvider>
    <Content {...props} />
  </LoggerProvider>
)

CustomFlagsWithProductList.schema = schema
export default CustomFlagsWithProductList

import type React from 'react'
import { createContext, useContext } from 'react'
import type { FlagsContextData } from '../typings/interfaces'
const defaultValues: FlagsContextData = {
  configProp: {
    isPdp: false,
    colorsColeccions: [],
    discountColor: '',
    volumetricColor: '',
    moreForLessColor: '',
    collectionColor: '',
    productGiftColor: '',
    comboColor: '',
  },
  rateAndBenefitsIdentifiers: [],
  isLoadingData: false,
  teaser: [],
  simulation: {
    items: [],
    ratesAndBenefitsData: {
      rateAndBenefitsIdentifiers: [],
      teaser: []
    },
    selectableGifts: []
  },
  dataProduct: {
    productName: '',
    productId: '',
  },
  loadingSimulation: false,
  clusterHighlights: [],
}

const FlagsContext = createContext<FlagsContextData>(defaultValues)

export const FlagsProvider: React.FC<{ children: React.ReactNode } & FlagsContextData> = ({
  children,
  ...props
}) => {
  return <FlagsContext.Provider value={props}>{children}</FlagsContext.Provider>
}

export const useFlags = () => {
  const context = useContext(FlagsContext)
  if (!context) {
    throw new Error('useFlags debe usarse dentro de FlagsProvider')
  }
  return context
}

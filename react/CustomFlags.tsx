import { useCallback, useEffect, useMemo, useState } from 'react'
import { useApolloClient } from 'react-apollo'
import { useProduct } from 'vtex.product-context'
import { useSimulationContext } from 'mdlzargentina.custom-simulation-product/simulationContext'

import FallbackComponent from './components/FallbackComponent';
import ItemFlagPromotion from './components/ItemFlagPromotion';
import type { CustomFlagsProps, Teaser, SimulationCtx } from './typings/interfaces';
import { FlagsProvider } from './utils/CustomFlagsContex';
import ErrorBoundary from './ErrorBoundary';
import queryPromotionById from './graphql/queryPromotionById.gql';
import { schema } from './schema';


const promotionCache = new Map<string, { listPromotionById: string }>();

const CustomFlags = (props: CustomFlagsProps) => {
  const { query } = useApolloClient();
  const productContext = useProduct();
  const { product } = productContext || {};
  const { clusterHighlights } = product || {};
  const [teaser, setTeaser] = useState<Teaser[]>([]);
  const [isLoadingData, setIsLoading] = useState<boolean>(true);
  const { simulation, loading: loadingSimulation } = useSimulationContext() as SimulationCtx

  // Función optimizada para fetch de promociones
  const fetchPromotion = useCallback(async (promotionId: string) => {
    // Verificar cache
    if (promotionCache.has(promotionId)) {
      return promotionCache.get(promotionId);
    }

    try {
      const { data } = await query({
        query: queryPromotionById,
        variables: { promotionId },
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
      });

      // Guardar en cache
      promotionCache.set(promotionId, data.listPromotionById);
      return data.listPromotionById;
    } catch (err) {
      console.error(`[CustomFlags] Error fetching promotion ${promotionId}:`, err);
      return null;
    }
  }, [query]);

  // Procesamiento de teasers optimizado

    const processTeaser = useCallback(async (teaserData: Teaser) => {
    const promotion = await fetchPromotion(teaserData.id);
    
    if (!promotion) return null;

    return {
      ...teaserData,
      type: promotion.type,
      id: promotion.idCalculatorConfiguration,
      name: promotion.name,
      maxUsage: promotion.maxUsage,
      maxUsagePerClient: promotion.maxUsagePerClient,
      quantityToAffectBuyTogether: promotion.quantityToAffectBuyTogether,
      maxNumberOfAffectedItems: promotion.maxNumberOfAffectedItems,
      skusGift: promotion.skusGift,
    };
  }, [fetchPromotion]);

  // Effect para limpiar cache
  useEffect(() => {
    const cacheCleanupInterval = setInterval(() => {
      promotionCache.clear();
    }, 1000 * 60 * 30); // Limpiar cada 30 minutos

    return () => clearInterval(cacheCleanupInterval);
  }, []);

  // Lógica principal mejorada
  useMemo(() => {
    const ratesAndBenefitsData = simulation?.ratesAndBenefitsData ?? {};
    
    if (!ratesAndBenefitsData.teaser?.length) {
      setTeaser([]);
      setIsLoading(false);
      return;
    }

    const processTeasers = async () => {
      try {
        const processedTeasers = await Promise.all(
          ratesAndBenefitsData.teaser.map(processTeaser)
        );

        const validTeasers = processedTeasers.filter(Boolean);
        setTeaser(validTeasers as Teaser[]);
      } catch (error) {
        console.error('[CustomFlags] Error processing teasers:', error);
        setTeaser([]);
      } finally {
        setIsLoading(false);
      }
    };

    processTeasers();
  }, [simulation, processTeaser]);

  const flagsContextValue = useMemo(() => ({
    configProp: props,
    teaser,
    rateAndBenefitsIdentifiers: simulation?.ratesAndBenefitsData?.rateAndBenefitsIdentifiers,
    clusterHighlights,
    dataProduct: product,
    loadingSimulation,
    simulation,
    isLoadingData,
  }), [
    props,
    teaser,
    simulation,
    clusterHighlights,
    product,
    loadingSimulation,
    isLoadingData
  ]);

  return (
    <ErrorBoundary fallback={<FallbackComponent />}>
      <FlagsProvider {...flagsContextValue}>
        {!isLoadingData && !loadingSimulation && <ItemFlagPromotion />}
      </FlagsProvider>
    </ErrorBoundary>
  );
};

CustomFlags.schema = schema;

export default CustomFlags;
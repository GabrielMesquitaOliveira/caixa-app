import { ChartLegend } from '@/components/ChartLegend';
import { ContractsList } from '@/components/ContractsList';
import { ErrorScreen } from '@/components/ErrorScreen';
import { FinancialSummaryCard } from '@/components/FinancialSummaryCard';
import { LoadingScreen } from '@/components/LoadingScreen';
import { StatsCards } from '@/components/StatsCards';
import { WelcomeHeader } from '@/components/WelcomeHeader';
import { useHomeData } from '@/hooks/useHomeData';
import React from 'react';
import { ScrollView } from 'react-native';

export default function Index() {
  const { usuario, contratos, parcelas, estatisticas, loading, error } = useHomeData(1);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} />;
  if (!usuario || !estatisticas) return <ErrorScreen error="Dados não encontrados" />;

  const totalParcelasPendentes = parcelas.filter(p => p.situacao === 'pendente').length;

  return (
    <ScrollView className="h-full w-full bg-neutral-200">
      <WelcomeHeader usuario={usuario} />
      <FinancialSummaryCard estatisticas={estatisticas} />
      <StatsCards 
        estatisticas={estatisticas} 
        totalParcelasPendentes={totalParcelasPendentes} 
      />
      <ContractsList contratos={contratos} parcelas={parcelas} />
      <ChartLegend estatisticas={estatisticas} />
    </ScrollView>
  );
}
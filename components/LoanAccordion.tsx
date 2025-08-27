import {
  Accordion,
  AccordionContent,
  AccordionContentText,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger
} from '@/components/ui/accordion';
import { ChevronDownIcon } from '@/components/ui/icon';
import { formatarMoeda, formatarPorcentagem } from '@/utils/formatters';
import React from 'react';
import { View } from 'react-native';

interface LoanAccordionProps {
  contrato: {
    valorContratado: number;
    dataContratacao: string;
    sistemaAmortizacao: string;
    taxaJurosMensal: number;
    taxaJurosAnual: number;
    prazoContratado: number;
    parcelasPagas: number;
    saldoDevedor: number;
    dataUltimoVencimento: string;
    cetMensal?: number;
    cetAnual?: number;
  };
}

const LoanAccordion: React.FC<LoanAccordionProps> = ({ contrato }) => {
  const prazoRemanescente = contrato.prazoContratado - contrato.parcelasPagas;
  
  return (
    <Accordion variant="filled" size="md" className="mb-3">
      <AccordionItem value="details">
        <AccordionHeader>
          <AccordionTrigger>
            <AccordionTitleText>Detalhes do Empréstimo</AccordionTitleText>
            <AccordionIcon as={ChevronDownIcon} />
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <View className="space-y-2">
            <View className="flex-row justify-between">
              <AccordionContentText className="text-gray-600">Valor Contratado:</AccordionContentText>
              <AccordionContentText className="font-semibold">{formatarMoeda(contrato.valorContratado)}</AccordionContentText>
            </View>
            
            <View className="flex-row justify-between">
              <AccordionContentText className="text-gray-600">Data de Contratação:</AccordionContentText>
              <AccordionContentText className="font-semibold">
                {new Date(contrato.dataContratacao).toLocaleDateString('pt-BR')}
              </AccordionContentText>
            </View>
            
            <View className="flex-row justify-between">
              <AccordionContentText className="text-gray-600">Sistema de Amortização:</AccordionContentText>
              <AccordionContentText className="font-semibold">{contrato.sistemaAmortizacao}</AccordionContentText>
            </View>
            
            <View className="flex-row justify-between">
              <AccordionContentText className="text-gray-600">Taxa de Juros Mensal:</AccordionContentText>
              <AccordionContentText className="font-semibold">{formatarPorcentagem(contrato.taxaJurosMensal)}</AccordionContentText>
            </View>
            
            <View className="flex-row justify-between">
              <AccordionContentText className="text-gray-600">Taxa de Juros Anual:</AccordionContentText>
              <AccordionContentText className="font-semibold">{formatarPorcentagem(contrato.taxaJurosAnual)}</AccordionContentText>
            </View>
            
            <View className="flex-row justify-between">
              <AccordionContentText className="text-gray-600">Prazo Total (Meses):</AccordionContentText>
              <AccordionContentText className="font-semibold">{contrato.prazoContratado}</AccordionContentText>
            </View>
            
            <View className="flex-row justify-between">
              <AccordionContentText className="text-gray-600">Prazo Remanescente:</AccordionContentText>
              <AccordionContentText className="font-semibold">{prazoRemanescente} meses</AccordionContentText>
            </View>
            
            <View className="flex-row justify-between">
              <AccordionContentText className="text-gray-600">Saldo Devedor Atualizado:</AccordionContentText>
              <AccordionContentText className="font-semibold">{formatarMoeda(contrato.saldoDevedor)}</AccordionContentText>
            </View>
            
            <View className="flex-row justify-between">
              <AccordionContentText className="text-gray-600">Data Último Vencimento:</AccordionContentText>
                <AccordionContentText className="font-semibold">
                {new Date(contrato.dataUltimoVencimento).toLocaleDateString('pt-BR')}
                </AccordionContentText>
            </View>
            
            {contrato.cetMensal && (
              <View className="flex-row justify-between">
                <AccordionContentText className="text-gray-600">CET Mensal:</AccordionContentText>
                <AccordionContentText className="font-semibold">{formatarPorcentagem(contrato.cetMensal)}</AccordionContentText>
              </View>
            )}
            
            {contrato.cetAnual && (
              <View className="flex-row justify-between">
                <AccordionContentText className="text-gray-600">CET Anual:</AccordionContentText>
                <AccordionContentText className="font-semibold">{formatarPorcentagem(contrato.cetAnual)}</AccordionContentText>
              </View>
            )}
          </View>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default LoanAccordion;

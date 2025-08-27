import { FormData } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import * as yup from 'yup';
import StepOne from './StepOne';
import StepThree from './StepThree';
import StepTwo from './StepTwo';

interface MultiStepFormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

// Schema de validação para cada passo
const validationSchemas = {
  stepOne: yup.object().shape({
    valorContratado: yup
      .number()
      .required('Valor é obrigatório')
      .min(1000, 'Valor mínimo é R$ 1.000')
      .max(1000000, 'Valor máximo é R$ 1.000.000'),
    prazoContratado: yup
      .number()
      .required('Prazo é obrigatório')
      .min(1, 'Prazo mínimo é 1 mês')
      .max(360, 'Prazo máximo é 360 meses'),
  }),
  stepTwo: yup.object().shape({
    sistemaAmortizacao: yup
      .string()
      .required('Sistema de amortização é obrigatório')
      .oneOf(['PRICE', 'SAC'], 'Selecione um sistema válido'),
    dataVencimento: yup
      .string()
      .required('Data de vencimento é obrigatória'),
  }),
  stepThree: yup.object().shape({
    nomePersonalizado: yup
      .string()
      .required('Nome personalizado é obrigatório')
      .min(3, 'Mínimo 3 caracteres')
      .max(50, 'Máximo 50 caracteres'),
    observacoes: yup
      .string()
      .max(500, 'Máximo 500 caracteres'),
  }),
};

const MultiStepForm: React.FC<MultiStepFormProps> = ({ onSubmit, onCancel }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});

  // Hook forms separados para cada passo
  const stepOneForm = useForm({
    resolver: yupResolver(validationSchemas.stepOne),
  });

  const stepTwoForm = useForm({
    resolver: yupResolver(validationSchemas.stepTwo),
  });

  const stepThreeForm = useForm({
    resolver: yupResolver(validationSchemas.stepThree),
  });

  const onNextStep = (data: Partial<FormData>) => {
    setFormData({ ...formData, ...data });
    if (step < 3) {
      setStep(step + 1);
    } else {
      onSubmit({ ...formData, ...data } as FormData);
    }
  };

  const onPrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <View className="p-4">
      {/* Indicador de progresso */}
      <View className="flex-row justify-center mb-6">
        {[1, 2, 3].map((stepNumber) => (
          <View
            key={stepNumber}
            className={`w-8 h-8 rounded-full mx-2 flex items-center justify-center ${
              stepNumber <= step ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          >
            <Text className="text-white font-bold">{stepNumber}</Text>
          </View>
        ))}
      </View>

      {/* Formulário atual */}
      {step === 1 && (
        <StepOne
          control={stepOneForm.control as any}
          errors={stepOneForm.formState.errors}
          handleSubmit={stepOneForm.handleSubmit}
          onNextStep={onNextStep}
          onCancel={onCancel}
        />
      )}
      {step === 2 && (
        <StepTwo
          control={stepTwoForm.control as any}
          errors={stepTwoForm.formState.errors}
          handleSubmit={stepTwoForm.handleSubmit}
          onNextStep={onNextStep}
          onPrevious={onPrevious}
          onCancel={onCancel}
          formData={formData}
        />
      )}
      {step === 3 && (
        <StepThree
          control={stepThreeForm.control as any}
          errors={stepThreeForm.formState.errors}
          handleSubmit={stepThreeForm.handleSubmit}
          onNextStep={onNextStep}
          onPrevious={onPrevious}
          onCancel={onCancel}
          formData={formData}
        />
      )}
    </View>
  );
};

export default MultiStepForm;

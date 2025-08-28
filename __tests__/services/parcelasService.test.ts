import { getApiInstance } from '../../services/api/config';
import { parcelasService } from '../../services/parcelasService';

jest.mock('../../services/api/config');

describe('parcelasService', () => {
  const apiMock = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(() => {
    (getApiInstance as jest.Mock).mockReturnValue(apiMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should list all parcels', async () => {
    const mockParcelas = [{ id: '1', numeroParcela: 1 }];
    apiMock.get.mockResolvedValueOnce({ data: mockParcelas });

    const parcelas = await parcelasService.listar();
    expect(parcelas).toEqual(mockParcelas);
    expect(apiMock.get).toHaveBeenCalledWith('/parcelas');
  });

  it('should fetch parcel by ID', async () => {
    const mockParcela = { id: '1', numeroParcela: 1 };
    apiMock.get.mockResolvedValueOnce({ data: mockParcela });

    const parcela = await parcelasService.buscarPorId('1');
    expect(parcela).toEqual(mockParcela);
    expect(apiMock.get).toHaveBeenCalledWith('/parcelas/1');
  });

  it('should fetch parcels by contract', async () => {
    const mockParcelas = [{ id: '1', numeroParcela: 1 }];
    apiMock.get.mockResolvedValueOnce({ data: mockParcelas });

    const parcelas = await parcelasService.buscarPorContrato('contrato-1');
    expect(parcelas).toEqual(mockParcelas);
    expect(apiMock.get).toHaveBeenCalledWith('/parcelas?contratoId=contrato-1');
  });

  it('should fetch parcels by situation', async () => {
    const mockParcelas = [{ id: '1', numeroParcela: 1 }];
    apiMock.get.mockResolvedValueOnce({ data: mockParcelas });

    const parcelas = await parcelasService.buscarPorSituacao('pendente');
    expect(parcelas).toEqual(mockParcelas);
    expect(apiMock.get).toHaveBeenCalledWith('/parcelas?situacao=pendente');
  });

  it('should fetch paid parcels by contract', async () => {
    const mockParcelas = [{ id: '1', numeroParcela: 1 }];
    apiMock.get.mockResolvedValueOnce({ data: mockParcelas });

    const parcelas = await parcelasService.buscarParclasPagasContrato('contrato-1');
    expect(parcelas).toEqual(mockParcelas);
    expect(apiMock.get).toHaveBeenCalledWith('/parcelas?contratoId=contrato-1&situacao=paga');
  });

  it('should fetch pending parcels by contract', async () => {
    const mockParcelas = [{ id: '1', numeroParcela: 1 }];
    apiMock.get.mockResolvedValueOnce({ data: mockParcelas });

    const parcelas = await parcelasService.buscarParcelasPendentesContrato('contrato-1');
    expect(parcelas).toEqual(mockParcelas);
    expect(apiMock.get).toHaveBeenCalledWith('/parcelas?contratoId=contrato-1&situacao=pendente');
  });

  it('should create a new parcel', async () => {
    const newParcela = {
      contratoId: 'contrato-1',
      numeroParcela: 1,
      dataVencimento: '2023-01-01',
      valorParcela: 1000,
      valorJuros: 100,
      valorAmortizacao: 900,
      saldoDevedor: 9000,
      situacao: 'pendente' as const,
      diasAtraso: 0 as const,
    };
    const mockParcela = { id: '1', ...newParcela };
    apiMock.post.mockResolvedValueOnce({ data: mockParcela });

    const parcela = await parcelasService.criar(newParcela);
    expect(parcela).toEqual(mockParcela);
    expect(apiMock.post).toHaveBeenCalledWith('/parcelas', newParcela);
  });

  it('should update a parcel', async () => {
    const updatedParcela = { valorParcela: 1100 };
    const mockParcela = { id: '1', ...updatedParcela };
    apiMock.put.mockResolvedValueOnce({ data: mockParcela });

    const parcela = await parcelasService.atualizar('1', updatedParcela);
    expect(parcela).toEqual(mockParcela);
    expect(apiMock.put).toHaveBeenCalledWith('/parcelas/1', updatedParcela);
  });

  it('should pay a parcel', async () => {
    const dadosPagamento = {
      valorPago: 1000,
      dataPagamento: '2023-01-01',
      situacao: 'paga' as const,
    };
    const mockParcela = { id: '1', ...dadosPagamento };
    apiMock.put.mockResolvedValueOnce({ data: mockParcela });

    const parcela = await parcelasService.pagar('1', dadosPagamento);
    expect(parcela).toEqual(mockParcela);
    expect(apiMock.put).toHaveBeenCalledWith('/parcelas/1', dadosPagamento);
  });

  it('should cancel a parcel', async () => {
    const mockParcela = { id: '1', situacao: 'cancelada' };
    apiMock.put.mockResolvedValueOnce({ data: mockParcela });

    const parcela = await parcelasService.cancelar('1');
    expect(parcela).toEqual(mockParcela);
    expect(apiMock.put).toHaveBeenCalledWith('/parcelas/1', { situacao: 'cancelada' });
  });

  it('should delete a parcel', async () => {
    await parcelasService.deletar('1');
    expect(apiMock.delete).toHaveBeenCalledWith('/parcelas/1');
  });

  it('should search parcels with multiple filters', async () => {
    const mockParcelas = [{ id: '1', numeroParcela: 1 }];
    apiMock.get.mockResolvedValueOnce({ data: mockParcelas });

    const filtros = {
      contratoId: 'contrato-1',
      situacao: 'pendente' as const,
    };
    const parcelas = await parcelasService.buscarComFiltros(filtros);
    expect(parcelas).toEqual(mockParcelas);
    expect(apiMock.get).toHaveBeenCalledWith('/parcelas?contratoId=contrato-1&situacao=pendente');
  });

  it('should get contract statistics', async () => {
    const mockParcelas = [
      { 
        id: '1', 
        contratoId: 'contrato-1',
        numeroParcela: 1,
        dataVencimento: '2025-01-01',
        valorParcela: 1000,
        valorJuros: 100,
        valorAmortizacao: 900,
        saldoDevedor: 9000,
        dataPagamento: '2025-01-01',
        valorPago: 1000,
        situacao: 'paga' as const,
        diasAtraso: 0
      },
      { 
        id: '2', 
        contratoId: 'contrato-1',
        numeroParcela: 2,
        dataVencimento: '2025-02-01',
        valorParcela: 1000,
        valorJuros: 90,
        valorAmortizacao: 910,
        saldoDevedor: 8090,
        situacao: 'pendente' as const,
        diasAtraso: 0
      },
      { 
        id: '3', 
        contratoId: 'contrato-1',
        numeroParcela: 3,
        dataVencimento: '2025-03-01',
        valorParcela: 1000,
        valorJuros: 80,
        valorAmortizacao: 920,
        saldoDevedor: 7170,
        situacao: 'pendente' as const,
        diasAtraso: 0
      },
    ];
    
    // Mock the buscarPorContrato method
    const buscarPorContratoSpy = jest.spyOn(parcelasService, 'buscarPorContrato')
      .mockResolvedValue(mockParcelas);

    const estatisticas = await parcelasService.obterEstatisticasContrato('contrato-1');
    
    // Only check the basic statistics that don't depend on date logic
    expect(estatisticas.total).toBe(3);
    expect(estatisticas.pagas).toBe(1);
    expect(estatisticas.pendentes).toBe(2);
    expect(estatisticas.canceladas).toBe(0);
    expect(estatisticas.valorTotalPago).toBe(1000);
    expect(estatisticas.valorTotalPendente).toBe(2000);
    expect(estatisticas.saldoAtual).toBe(7170);
    
    expect(buscarPorContratoSpy).toHaveBeenCalledWith('contrato-1');
    buscarPorContratoSpy.mockRestore();
  });

  it('should find parcels due in the next 30 days', async () => {
    const hoje = new Date();
    const proximoMes = new Date(hoje.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    const mockParcelas = [
      { 
        id: '1', 
        dataVencimento: hoje.toISOString(),
        situacao: 'pendente' as const
      },
      { 
        id: '2', 
        dataVencimento: proximoMes.toISOString(),
        situacao: 'pendente' as const
      },
      { 
        id: '3', 
        dataVencimento: new Date(hoje.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        situacao: 'pendente' as const
      },
      { 
        id: '4', 
        dataVencimento: new Date(proximoMes.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        situacao: 'pendente' as const
      },
    ];

    apiMock.get.mockResolvedValueOnce({ data: mockParcelas });

    const parcelas = await parcelasService.buscarProximasVencer();
    
    // Should only include parcels with due date between today and next month
    expect(parcelas).toHaveLength(2);
    expect(parcelas.map(p => p.id)).toEqual(['1', '2']);
    expect(apiMock.get).toHaveBeenCalledWith('/parcelas?situacao=pendente');
  });

  it('should find overdue parcels', async () => {
    const hoje = new Date();
    const ontem = new Date(hoje.getTime() - 1 * 24 * 60 * 60 * 1000);
    const amanha = new Date(hoje.getTime() + 1 * 24 * 60 * 60 * 1000);
    
    const mockParcelas = [
      { 
        id: '1', 
        dataVencimento: ontem.toISOString(),
        situacao: 'pendente' as const
      },
      { 
        id: '2', 
        dataVencimento: hoje.toISOString(),
        situacao: 'pendente' as const
      },
      { 
        id: '3', 
        dataVencimento: amanha.toISOString(),
        situacao: 'pendente' as const
      },
    ];

    apiMock.get.mockResolvedValueOnce({ data: mockParcelas });

    const parcelas = await parcelasService.buscarVencidas();
    
    // Should only include overdue parcels (before today)
    expect(parcelas).toHaveLength(1);
    expect(parcelas[0].id).toBe('1');
    expect(parcelas[0].diasAtraso).toBe(1); // 1 day overdue
    expect(apiMock.get).toHaveBeenCalledWith('/parcelas?situacao=pendente');
  });

  it('should find parcels due this month', async () => {
    const hoje = new Date();
    const primeiroDiaMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const ultimoDiaMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
    
    const mockParcelas = [
      { 
        id: '1', 
        dataVencimento: primeiroDiaMes.toISOString(),
        situacao: 'pendente' as const
      },
      { 
        id: '2', 
        dataVencimento: ultimoDiaMes.toISOString(),
        situacao: 'pendente' as const
      },
      { 
        id: '3', 
        dataVencimento: new Date(primeiroDiaMes.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        situacao: 'pendente' as const
      },
      { 
        id: '4', 
        dataVencimento: new Date(ultimoDiaMes.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        situacao: 'pendente' as const
      },
    ];

    apiMock.get.mockResolvedValueOnce({ data: mockParcelas });

    const parcelas = await parcelasService.buscarVencendoEsteMes();
    
    // Should only include parcels due this month
    expect(parcelas).toHaveLength(2);
    expect(parcelas.map(p => p.id)).toEqual(['1', '2']);
    expect(apiMock.get).toHaveBeenCalledWith('/parcelas?situacao=pendente');
  });

  it('should generate parcels for a contract using PRICE system', async () => {
    const mockParcela = { 
      id: '1', 
      contratoId: 'contrato-1',
      numeroParcela: 1,
      dataVencimento: new Date().toISOString(),
      valorParcela: 1000,
      valorJuros: 100,
      valorAmortizacao: 900,
      saldoDevedor: 9000,
      situacao: 'pendente' as const,
      diasAtraso: 0
    };

    // Mock the criar method to return mock parcels
    const criarSpy = jest.spyOn(parcelasService, 'criar')
      .mockResolvedValue(mockParcela);

    const parcelas = await parcelasService.gerarParcelas('contrato-1', 10000, 12, 12, 'PRICE');
    
    // Should create 12 parcels
    expect(parcelas).toHaveLength(12);
    expect(criarSpy).toHaveBeenCalledTimes(12);
    
    // Check that each call has the correct contract ID
    criarSpy.mock.calls.forEach(call => {
      expect(call[0].contratoId).toBe('contrato-1');
    });

    criarSpy.mockRestore();
  });

  it('should generate parcels for a contract using SAC system', async () => {
    const mockParcela = { 
      id: '1', 
      contratoId: 'contrato-1',
      numeroParcela: 1,
      dataVencimento: new Date().toISOString(),
      valorParcela: 1000,
      valorJuros: 100,
      valorAmortizacao: 900,
      saldoDevedor: 9000,
      situacao: 'pendente' as const,
      diasAtraso: 0
    };

    // Mock the criar method to return mock parcels
    const criarSpy = jest.spyOn(parcelasService, 'criar')
      .mockResolvedValue(mockParcela);

    const parcelas = await parcelasService.gerarParcelas('contrato-1', 10000, 12, 12, 'SAC');
    
    // Should create 12 parcels
    expect(parcelas).toHaveLength(12);
    expect(criarSpy).toHaveBeenCalledTimes(12);
    
    // Check that each call has the correct contract ID
    criarSpy.mock.calls.forEach(call => {
      expect(call[0].contratoId).toBe('contrato-1');
    });

    criarSpy.mockRestore();
  });

  it('should handle error when generating parcels', async () => {
    // Mock the criar method to throw an error
    const criarSpy = jest.spyOn(parcelasService, 'criar')
      .mockRejectedValue(new Error('API Error'));

    await expect(parcelasService.gerarParcelas('contrato-1', 10000, 12, 12, 'PRICE'))
      .rejects.toThrow('API Error');

    criarSpy.mockRestore();
  });
});

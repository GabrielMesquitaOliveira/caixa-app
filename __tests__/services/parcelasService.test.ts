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
});

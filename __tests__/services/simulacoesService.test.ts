import { getApiInstance } from '../../services/api/config';
import { simulacoesService } from '../../services/simulacoesService';

jest.mock('../../services/api/config');

describe('simulacoesService', () => {
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

  it('should list all simulations', async () => {
    const mockSimulacoes = [{ id: '1', valorSimulado: 10000 }];
    apiMock.get.mockResolvedValueOnce({ data: mockSimulacoes });

    const simulacoes = await simulacoesService.listar();
    expect(simulacoes).toEqual(mockSimulacoes);
    expect(apiMock.get).toHaveBeenCalledWith('/simulacoes');
  });

  it('should fetch simulation by ID', async () => {
    const mockSimulacao = { id: '1', valorSimulado: 10000 };
    apiMock.get.mockResolvedValueOnce({ data: mockSimulacao });

    const simulacao = await simulacoesService.buscarPorId('1');
    expect(simulacao).toEqual(mockSimulacao);
    expect(apiMock.get).toHaveBeenCalledWith('/simulacoes/1');
  });

  it('should filter simulations by contract', async () => {
    const mockSimulacoes = [{ id: '1', valorSimulado: 10000 }];
    apiMock.get.mockResolvedValueOnce({ data: mockSimulacoes });

    const simulacoes = await simulacoesService.filtrarPorContrato(1);
    expect(simulacoes).toEqual(mockSimulacoes);
    expect(apiMock.get).toHaveBeenCalledWith('/simulacoes?contratadoId=1');
  });

  it('should filter simulations by client', async () => {
    const mockSimulacoes = [{ id: '1', valorSimulado: 10000 }];
    apiMock.get.mockResolvedValueOnce({ data: mockSimulacoes });

    const simulacoes = await simulacoesService.filtrarPorCliente('cliente-1');
    expect(simulacoes).toEqual(mockSimulacoes);
    expect(apiMock.get).toHaveBeenCalledWith('/simulacoes?clienteId=cliente-1');
  });

  it('should create a new simulation', async () => {
    const newSimulacao = {
      contratadoId: null,
      contrato: { 
        id: '1', 
        nomePersonalizado: 'Contrato 1', 
        taxaJurosAnual: 12,
        prazoMaximo: 60,
        sistemaAmortizacao: 'PRICE' as const,
        valorContratado: 10000,
        parcelasPagas: 0,
        totalParcelas: 12
      },
      valorSimulado: 10000,
      prazoSimulado: 12,
      taxaJurosMensal: 1,
      valorParcelaMensal: 1000,
      valorTotalComJuros: 12000,
      sistemaAmortizacao: 'PRICE' as const,
      memoriaCalculo: [],
      criadoEm: new Date().toISOString(),
      clienteId: 'cliente-1',
    };
    const mockSimulacao = { id: '1', ...newSimulacao };
    apiMock.post.mockResolvedValueOnce({ data: mockSimulacao });

    const simulacao = await simulacoesService.criar(newSimulacao);
    expect(simulacao).toEqual(mockSimulacao);
    expect(apiMock.post).toHaveBeenCalledWith('/simulacoes', newSimulacao);
  });

  it('should update a simulation', async () => {
    const updatedSimulacao = { valorSimulado: 12000 };
    const mockSimulacao = { id: '1', ...updatedSimulacao };
    apiMock.put.mockResolvedValueOnce({ data: mockSimulacao });

    const simulacao = await simulacoesService.atualizar(1, updatedSimulacao);
    expect(simulacao).toEqual(mockSimulacao);
    expect(apiMock.put).toHaveBeenCalledWith('/simulacoes/1', updatedSimulacao);
  });

  it('should delete a simulation', async () => {
    await simulacoesService.deletar(1);
    expect(apiMock.delete).toHaveBeenCalledWith('/simulacoes/1');
  });
});

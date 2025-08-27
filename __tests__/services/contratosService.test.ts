import { getApiInstance } from '../../services/api/config';
import { contratosService } from '../../services/contratosService';

jest.mock('../../services/api/config');

describe('contratosService', () => {
  const apiMock = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(() => {
    (getApiInstance as jest.Mock).mockReturnValue(apiMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should list all contracts', async () => {
    const mockContracts = [{ id: '1', nomePersonalizado: 'Contrato 1' }];
    apiMock.get.mockResolvedValueOnce({ data: mockContracts });

    const contracts = await contratosService.listar();
    expect(contracts).toEqual(mockContracts);
    expect(apiMock.get).toHaveBeenCalledWith('/contratados');
  });

  it('should fetch contract by ID', async () => {
    const mockContract = { id: '1', nomePersonalizado: 'Contrato 1' };
    apiMock.get.mockResolvedValueOnce({ data: mockContract });

    const contract = await contratosService.buscarPorId(1);
    expect(contract).toEqual(mockContract);
    expect(apiMock.get).toHaveBeenCalledWith('/contratados/1');
  });

  it('should filter contracts by client ID', async () => {
    const mockContracts = [{ id: '1', nomePersonalizado: 'Contrato 1' }];
    apiMock.get.mockResolvedValueOnce({ data: mockContracts });

    const contracts = await contratosService.filtrarPorCliente('clientId');
    expect(contracts).toEqual(mockContracts);
    expect(apiMock.get).toHaveBeenCalledWith('/contratados?clienteId=clientId');
  });

  it('should filter contracts by status', async () => {
    const mockContracts = [{ id: '1', nomePersonalizado: 'Contrato 1' }];
    apiMock.get.mockResolvedValueOnce({ data: mockContracts });

    const contracts = await contratosService.filtrarPorStatus('ativo');
    expect(contracts).toEqual(mockContracts);
    expect(apiMock.get).toHaveBeenCalledWith('/contratados?status=ativo');
  });

  it('should create a new contract', async () => {
    const newContract = {
      produtoId: '1',
      produto: { id: '1', nome: 'Produto 1', taxaJurosAnual: 12 },
      nomePersonalizado: 'Novo Contrato',
      valorContratado: 10000,
      prazoContratado: 12,
      dataContratacao: '2023-01-01',
      numeroContrato: 'CONTR123',
      status: 'ativo' as const,
      observacoes: 'Observações do contrato',
      clienteId: '456',
    };
    const mockContract = { id: '1', ...newContract };
    apiMock.post.mockResolvedValueOnce({ data: mockContract });

    const contract = await contratosService.criar(newContract);
    expect(contract).toEqual(mockContract);
    expect(apiMock.post).toHaveBeenCalledWith('/contratados', newContract);
  });

  it('should update a contract', async () => {
    const updatedContract = { nomePersonalizado: 'Contrato Atualizado' };
    const mockContract = { id: '1', ...updatedContract };
    apiMock.put.mockResolvedValueOnce({ data: mockContract });

    const contract = await contratosService.atualizar(1, updatedContract);
    expect(contract).toEqual(mockContract);
    expect(apiMock.put).toHaveBeenCalledWith('/contratados/1', updatedContract);
  });

  it('should cancel a contract', async () => {
    const mockContract = { id: '1', status: 'cancelado' };
    apiMock.patch.mockResolvedValueOnce({ data: mockContract });

    const contract = await contratosService.cancelar(1);
    expect(contract).toEqual(mockContract);
    expect(apiMock.patch).toHaveBeenCalledWith('/contratados/1', { status: 'cancelado' });
  });

  it('should delete a contract', async () => {
    await contratosService.deletar(1);
    expect(apiMock.delete).toHaveBeenCalledWith('/contratados/1');
  });
});

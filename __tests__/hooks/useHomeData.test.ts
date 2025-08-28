import { renderHook } from '@testing-library/react-hooks';
import { useHomeData } from '../../hooks/useHomeData';
import { contratosService, parcelasService, usuariosService } from '../../services';
import { Contrato, Parcela, Usuario } from '../../types';

// Mock the services
jest.mock('../../services', () => ({
  usuariosService: {
    buscarPorId: jest.fn(),
  },
  contratosService: {
    filtrarPorCliente: jest.fn(),
    buscarPorId: jest.fn(),
  },
  parcelasService: {
    buscarPorContrato: jest.fn(),
    buscarVencendoEsteMes: jest.fn(),
  },
}));

describe('useHomeData', () => {
  const mockUsuario: Usuario = { id: '1', nome: 'Usuario Teste', email: 'usuario@test.com', telefone: '123456789', profissao: 'Desenvolvedor', criadoEm: '2023-01-01' };
  const mockContratos: Contrato[] = [
    {
      id: '1',
      produtoId: '1',
      produto: {
        id: '1',
        nome: 'Produto 1',
        taxaJurosAnual: 12,
      },
      nomePersonalizado: 'Contrato 1',
      valorContratado: 10000,
      prazoContratado: 12,
      sistemaAmortizacao: 'PRICE',
      taxaJurosMensal: 1,
      valorParcelaMensal: 1000,
      dataVencimentoPrimeiraParcela: '2023-02-01',
      parcelasPagas: 0,
      totalParcelas: 12,
      dataContratacao: '2023-01-01',
      numeroContrato: 'CONTR123',
      status: 'ativo',
      observacoes: 'Observações do contrato',
      clienteId: '1',
    },
  ];
  const mockParcelas: Parcela[] = [
    {
      id: '1',
      contratoId: '1',
      numeroParcela: 1,
      dataVencimento: '2023-02-01',
      valorParcela: 1000,
      valorJuros: 100,
      valorAmortizacao: 900,
      saldoDevedor: 9100,
      situacao: 'pendente',
      valorPago: 0,
      dataPagamento: null,
      diasAtraso: 0,
    },
  ];

  beforeEach(() => {
    (usuariosService.buscarPorId as jest.Mock).mockClear();
    (contratosService.filtrarPorCliente as jest.Mock).mockClear();
    (parcelasService.buscarPorContrato as jest.Mock).mockClear();
    (parcelasService.buscarVencendoEsteMes as jest.Mock).mockClear();
  });

  it('should load user and contracts data successfully', async () => {
    (usuariosService.buscarPorId as jest.Mock).mockResolvedValue(mockUsuario);
    (contratosService.filtrarPorCliente as jest.Mock).mockResolvedValue(mockContratos);
    (parcelasService.buscarPorContrato as jest.Mock).mockResolvedValue(mockParcelas);

    const { result, waitForNextUpdate } = renderHook(() => useHomeData(1));

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.usuario).toEqual(mockUsuario);
    expect(result.current.contratos).toEqual(mockContratos);
    expect(result.current.parcelas).toEqual(mockParcelas);
  });

  it('should handle error when loading data fails', async () => {
    const error = new Error('Failed to load data');
    (usuariosService.buscarPorId as jest.Mock).mockRejectedValue(error);

    const { result, waitForNextUpdate } = renderHook(() => useHomeData(1));

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Erro ao carregar dados da aplicação');
  });
});

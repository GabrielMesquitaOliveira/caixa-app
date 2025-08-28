import { act, renderHook } from '@testing-library/react-hooks';
import { useProdutoPorId, useProdutos, useProdutosPorCategoria } from '../../hooks/useProdutos';
import { produtosService } from '../../services';
import { Produto } from '../../types/produto';

// Mock the produtosService
jest.mock('../../services', () => ({
  produtosService: {
    listar: jest.fn(),
  },
}));

describe('useProdutos', () => {
  const mockProdutos: Produto[] = [
    {
      id: '1',
      nome: 'Produto 1',
      taxaJurosAnual: 12.5,
      prazoMinimo: 6,
      prazoMaximo: 36,
      valorMinimo: 1000,
      valorMaximo: 50000,
      descricao: 'Descrição do produto 1',
      categoria: 'pessoa_fisica',
    },
    {
      id: '2',
      nome: 'Produto 2',
      taxaJurosAnual: 8.5,
      prazoMinimo: 12,
      prazoMaximo: 60,
      valorMinimo: 5000,
      valorMaximo: 200000,
      descricao: 'Descrição do produto 2',
      categoria: 'pessoa_juridica',
    },
    {
      id: '3',
      nome: 'Produto 3',
      taxaJurosAnual: 10.5,
      prazoMinimo: 6,
      prazoMaximo: 48,
      valorMinimo: 2000,
      valorMaximo: 100000,
      descricao: 'Descrição do produto 3',
      categoria: 'pessoa_fisica',
    },
  ];

  beforeEach(() => {
    (produtosService.listar as jest.Mock).mockClear();
  });

  it('should load produtos successfully', async () => {
    (produtosService.listar as jest.Mock).mockResolvedValue(mockProdutos);

    const { result, waitForNextUpdate } = renderHook(() => useProdutos());

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.produtos).toEqual(mockProdutos);
    expect(result.current.produtosPorCategoria).toEqual({
      pessoa_fisica: [mockProdutos[0], mockProdutos[2]],
      pessoa_juridica: [mockProdutos[1]],
    });
  });

  it('should handle error when loading produtos fails', async () => {
    const error = new Error('Failed to load produtos');
    (produtosService.listar as jest.Mock).mockRejectedValue(error);

    const { result, waitForNextUpdate } = renderHook(() => useProdutos());

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Erro ao carregar produtos. Tente novamente.');
    expect(result.current.produtos).toEqual([]);
  });

  it('should filter produtos by category', async () => {
    (produtosService.listar as jest.Mock).mockResolvedValue(mockProdutos);

    const { result, waitForNextUpdate } = renderHook(() => useProdutos());

    await waitForNextUpdate();

    const pessoaFisicaProdutos = result.current.buscarPorCategoria('pessoa_fisica');
    expect(pessoaFisicaProdutos).toEqual([mockProdutos[0], mockProdutos[2]]);

    const pessoaJuridicaProdutos = result.current.buscarPorCategoria('pessoa_juridica');
    expect(pessoaJuridicaProdutos).toEqual([mockProdutos[1]]);
  });

  it('should find produto by id', async () => {
    (produtosService.listar as jest.Mock).mockResolvedValue(mockProdutos);

    const { result, waitForNextUpdate } = renderHook(() => useProdutos());

    await waitForNextUpdate();

    const produto = result.current.buscarPorId('2');
    expect(produto).toEqual(mockProdutos[1]);

    const produtoNaoEncontrado = result.current.buscarPorId('999');
    expect(produtoNaoEncontrado).toBeUndefined();
  });

  it('should refetch produtos', async () => {
    (produtosService.listar as jest.Mock).mockResolvedValue(mockProdutos);

    const { result, waitForNextUpdate } = renderHook(() => useProdutos());

    await waitForNextUpdate();

    // Reset mock and call refetch
    (produtosService.listar as jest.Mock).mockClear();
    (produtosService.listar as jest.Mock).mockResolvedValue([mockProdutos[0]]);

    await act(async () => {
      await result.current.refetch();
    });

    expect(produtosService.listar).toHaveBeenCalledTimes(1);
    expect(result.current.produtos).toEqual([mockProdutos[0]]);
  });
});

describe('useProdutosPorCategoria', () => {
  const mockProdutos: Produto[] = [
    {
      id: '1',
      nome: 'Produto 1',
      taxaJurosAnual: 12.5,
      prazoMinimo: 6,
      prazoMaximo: 36,
      valorMinimo: 1000,
      valorMaximo: 50000,
      descricao: 'Descrição do produto 1',
      categoria: 'pessoa_fisica',
    },
    {
      id: '2',
      nome: 'Produto 2',
      taxaJurosAnual: 8.5,
      prazoMinimo: 12,
      prazoMaximo: 60,
      valorMinimo: 5000,
      valorMaximo: 200000,
      descricao: 'Descrição do produto 2',
      categoria: 'pessoa_juridica',
    },
  ];

  beforeEach(() => {
    (produtosService.listar as jest.Mock).mockClear();
  });

  it('should filter produtos by specific category', async () => {
    (produtosService.listar as jest.Mock).mockResolvedValue(mockProdutos);

    const { result, waitForNextUpdate } = renderHook(() => useProdutosPorCategoria('pessoa_fisica'));

    await waitForNextUpdate();

    expect(result.current.produtos).toEqual([mockProdutos[0]]);
    expect(result.current.produtosPorCategoria).toEqual({ pessoa_fisica: [mockProdutos[0]] });
  });
});

describe('useProdutoPorId', () => {
  const mockProdutos: Produto[] = [
    {
      id: '1',
      nome: 'Produto 1',
      taxaJurosAnual: 12.5,
      prazoMinimo: 6,
      prazoMaximo: 36,
      valorMinimo: 1000,
      valorMaximo: 50000,
      descricao: 'Descrição do produto 1',
      categoria: 'pessoa_fisica',
    },
  ];

  beforeEach(() => {
    (produtosService.listar as jest.Mock).mockClear();
  });

  it('should find specific produto by id', async () => {
    (produtosService.listar as jest.Mock).mockResolvedValue(mockProdutos);

    const { result, waitForNextUpdate } = renderHook(() => useProdutoPorId('1'));

    await waitForNextUpdate();

    expect(result.current.produto).toEqual(mockProdutos[0]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should return undefined for non-existent produto', async () => {
    (produtosService.listar as jest.Mock).mockResolvedValue(mockProdutos);

    const { result, waitForNextUpdate } = renderHook(() => useProdutoPorId('999'));

    await waitForNextUpdate();

    expect(result.current.produto).toBeUndefined();
  });
});

import { getApiInstance } from '../../services/api/config';
import { produtosService } from '../../services/produtosService';

jest.mock('../../services/api/config');

describe('produtosService', () => {
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

  it('should list all products', async () => {
    const mockProdutos = [{ id: '1', nome: 'Produto 1', taxaJurosAnual: 12 }];
    apiMock.get.mockResolvedValueOnce({ data: mockProdutos });

    const produtos = await produtosService.listar();
    expect(produtos).toEqual(mockProdutos);
    expect(apiMock.get).toHaveBeenCalledWith('/produtos');
  });

  it('should fetch product by ID', async () => {
    const mockProduto = { id: '1', nome: 'Produto 1', taxaJurosAnual: 12 };
    apiMock.get.mockResolvedValueOnce({ data: mockProduto });

    const produto = await produtosService.buscarPorId('1');
    expect(produto).toEqual(mockProduto);
    expect(apiMock.get).toHaveBeenCalledWith('/produtos/1');
  });

  it('should filter products by category', async () => {
    const mockProdutos = [{ id: '1', nome: 'Produto 1', taxaJurosAnual: 12 }];
    apiMock.get.mockResolvedValueOnce({ data: mockProdutos });

    const produtos = await produtosService.filtrarPorCategoria('pessoa_fisica');
    expect(produtos).toEqual(mockProdutos);
    expect(apiMock.get).toHaveBeenCalledWith('/produtos?categoria=pessoa_fisica');
  });

  it('should create a new product', async () => {
    const newProduto = {
      nome: 'Novo Produto',
      taxaJurosAnual: 10,
      prazoMinimo: 12,
      prazoMaximo: 60,
      valorMinimo: 1000,
      valorMaximo: 50000,
      descricao: 'Descrição do novo produto',
      categoria: 'pessoa_fisica' as const,
    };
    const mockProduto = { id: '1', ...newProduto };
    apiMock.post.mockResolvedValueOnce({ data: mockProduto });

    const produto = await produtosService.criar(newProduto);
    expect(produto).toEqual(mockProduto);
    expect(apiMock.post).toHaveBeenCalledWith('/produtos', newProduto);
  });

  it('should update a product', async () => {
    const updatedProduto = { nome: 'Produto Atualizado' };
    const mockProduto = { id: '1', ...updatedProduto };
    apiMock.put.mockResolvedValueOnce({ data: mockProduto });

    const produto = await produtosService.atualizar('1', updatedProduto);
    expect(produto).toEqual(mockProduto);
    expect(apiMock.put).toHaveBeenCalledWith('/produtos/1', updatedProduto);
  });

  it('should delete a product', async () => {
    await produtosService.deletar('1');
    expect(apiMock.delete).toHaveBeenCalledWith('/produtos/1');
  });
});

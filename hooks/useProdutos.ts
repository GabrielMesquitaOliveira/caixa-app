import { Produto, produtosService } from '@/services';
import { useEffect, useState } from 'react';

export interface UseProdutosReturn {
  produtos: Produto[];
  produtosPorCategoria: Record<string, Produto[]>;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  buscarPorCategoria: (categoria: string) => Produto[];
  buscarPorId: (id: string) => Produto | undefined;
}

export const useProdutos = (): UseProdutosReturn => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Agrupar produtos por categoria
  const produtosPorCategoria = produtos.reduce((acc, produto) => {
    const categoria = produto.categoria || 'outros';
    if (!acc[categoria]) {
      acc[categoria] = [];
    }
    acc[categoria].push(produto);
    return acc;
  }, {} as Record<string, Produto[]>);

  const carregarProdutos = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const produtosData = await produtosService.listar();
      setProdutos(produtosData);
      
    } catch (err) {
      console.error('Erro ao carregar produtos:', err);
      setError('Erro ao carregar produtos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const buscarPorCategoria = (categoria: string): Produto[] => {
    return produtos.filter(produto => produto.categoria === categoria);
  };

  const buscarPorId = (id: string): Produto | undefined => {
    return produtos.find(produto => produto.id === id);
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  return {
    produtos,
    produtosPorCategoria,
    loading,
    error,
    refetch: carregarProdutos,
    buscarPorCategoria,
    buscarPorId
  };
};

// Hook específico para buscar produtos por categoria
export const useProdutosPorCategoria = (categoria: string): UseProdutosReturn => {
  const { produtos, loading, error, refetch, buscarPorId } = useProdutos();
  
  const produtosFiltrados = produtos.filter(produto => produto.categoria === categoria);

  return {
    produtos: produtosFiltrados,
    produtosPorCategoria: { [categoria]: produtosFiltrados },
    loading,
    error,
    refetch,
    buscarPorCategoria: () => produtosFiltrados,
    buscarPorId
  };
};

// Hook para buscar um produto específico por ID
export const useProdutoPorId = (id: string) => {
  const { produtos, loading, error, refetch } = useProdutos();
  
  const produto = produtos.find(p => p.id === id);

  return {
    produto,
    loading,
    error,
    refetch
  };
};

export default useProdutos;

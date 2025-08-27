import { getApiInstance } from '../../services/api/config';
import { usuariosService } from '../../services/usuariosService';

jest.mock('../../services/api/config');

describe('usuariosService', () => {
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

  it('should list all users', async () => {
    const mockUsuarios = [{ id: '1', nome: 'João Silva', email: 'joao@email.com' }];
    apiMock.get.mockResolvedValueOnce({ data: mockUsuarios });

    const usuarios = await usuariosService.listar();
    expect(usuarios).toEqual(mockUsuarios);
    expect(apiMock.get).toHaveBeenCalledWith('/usuarios');
  });

  it('should fetch user by ID', async () => {
    const mockUsuario = { id: '1', nome: 'João Silva', email: 'joao@email.com' };
    apiMock.get.mockResolvedValueOnce({ data: mockUsuario });

    const usuario = await usuariosService.buscarPorId(1);
    expect(usuario).toEqual(mockUsuario);
    expect(apiMock.get).toHaveBeenCalledWith('/usuarios/1');
  });

  it('should search users by email', async () => {
    const mockUsuarios = [{ id: '1', nome: 'João Silva', email: 'joao@email.com' }];
    apiMock.get.mockResolvedValueOnce({ data: mockUsuarios });

    const usuarios = await usuariosService.buscarPorEmail('joao@email.com');
    expect(usuarios).toEqual(mockUsuarios);
    expect(apiMock.get).toHaveBeenCalledWith('/usuarios?email=joao@email.com');
  });

  it('should create a new user', async () => {
    const newUsuario = {
      nome: 'Maria Santos',
      email: 'maria@email.com',
      telefone: '(11) 99999-9999',
      profissao: 'Engenheira',
      criadoEm: new Date().toISOString(),
    };
    const mockUsuario = { id: '1', ...newUsuario };
    apiMock.post.mockResolvedValueOnce({ data: mockUsuario });

    const usuario = await usuariosService.criar(newUsuario);
    expect(usuario).toEqual(mockUsuario);
    expect(apiMock.post).toHaveBeenCalledWith('/usuarios', newUsuario);
  });

  it('should update a user', async () => {
    const updatedUsuario = { nome: 'Maria Santos Atualizada' };
    const mockUsuario = { id: '1', ...updatedUsuario };
    apiMock.put.mockResolvedValueOnce({ data: mockUsuario });

    const usuario = await usuariosService.atualizar(1, updatedUsuario);
    expect(usuario).toEqual(mockUsuario);
    expect(apiMock.put).toHaveBeenCalledWith('/usuarios/1', updatedUsuario);
  });

  it('should delete a user', async () => {
    await usuariosService.deletar(1);
    expect(apiMock.delete).toHaveBeenCalledWith('/usuarios/1');
  });
});

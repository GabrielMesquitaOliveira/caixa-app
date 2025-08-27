import { tratarErroApi } from '../../../services/api/errorHandler';
import { ErroApi } from '../../../types/common';

describe('errorHandler', () => {
  it('should handle response error with status and message', () => {
    const error = {
      response: {
        status: 404,
        data: {
          message: 'Not found'
        }
      }
    };

    const result = tratarErroApi(error);

    expect(result).toEqual({
      tipo: 'response',
      status: 404,
      mensagem: 'Not found',
      dados: { message: 'Not found' }
    } as ErroApi);
  });

  it('should handle response error with status but no message', () => {
    const error = {
      response: {
        status: 500,
        data: {}
      }
    };

    const result = tratarErroApi(error);

    expect(result).toEqual({
      tipo: 'response',
      status: 500,
      mensagem: 'Erro do servidor',
      dados: {}
    } as ErroApi);
  });

  it('should handle network error', () => {
    const error = {
      request: {}
    };

    const result = tratarErroApi(error);

    expect(result).toEqual({
      tipo: 'network',
      mensagem: 'Erro de conexão com o servidor'
    } as ErroApi);
  });

  it('should handle configuration error', () => {
    const error = {
      message: 'Configuration error'
    };

    const result = tratarErroApi(error);

    expect(result).toEqual({
      tipo: 'config',
      mensagem: 'Configuration error'
    } as ErroApi);
  });

  it('should handle unknown error type', () => {
    const error = {};

    const result = tratarErroApi(error);

    expect(result).toEqual({
      tipo: 'config',
      mensagem: undefined
    } as unknown as ErroApi);
  });

  it('should handle error with response but no data', () => {
    const error = {
      response: {
        status: 400
      }
    };

    const result = tratarErroApi(error);

    expect(result).toEqual({
      tipo: 'response',
      status: 400,
      mensagem: 'Erro do servidor',
      dados: undefined
    } as ErroApi);
  });
});

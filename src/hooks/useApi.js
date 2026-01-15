import { useCallback, useEffect, useMemo, useState } from 'react';
import { pacientesService, usuariosService, logsService } from './dataServices';

/**
 * Hook para carregar dados com loading, error e cache simples
 */
function useDataFetch(asyncFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    asyncFn()
      .then((result) => {
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err?.message || 'Erro ao carregar dados');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, deps);

  return { data, loading, error };
}

/**
 * Hook para carregar todos os usuários
 */
export function useUsuarios() {
  return useDataFetch(() => usuariosService.getAll(), []);
}

/**
 * Hook para carregar apenas médicos ativos
 */
export function useMedicos() {
  return useDataFetch(() => usuariosService.getMedicos(), []);
}

/**
 * Hook para carregar todos os pacientes
 */
export function usePacientes() {
  return useDataFetch(() => pacientesService.getAll(), []);
}

/**
 * Hook para carregar todos os logs
 */
export function useLogs() {
  return useDataFetch(() => logsService.getAll(), []);
}

/**
 * Hook para filtrar pacientes por busca (nome ou CPF)
 */
export function usePacientesFilterados(pacientes, busca) {
  return useMemo(() => {
    if (!pacientes || !busca) return pacientes || [];
    const termo = busca.toLowerCase();
    return pacientes.filter(
      (p) =>
        p.nome?.toLowerCase().includes(termo) ||
        p.cpf?.includes(termo)
    );
  }, [pacientes, busca]);
}

/**
 * Hook para debounce de valores (ex: search input)
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook para gerenciar uma ação assíncrona (CREATE, UPDATE, DELETE)
 */
export function useAsyncAction() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (asyncFn) => {
    setLoading(true);
    setError(null);
    try {
      const result = await asyncFn();
      setLoading(false);
      return result;
    } catch (err) {
      const errMsg = err?.message || 'Erro ao executar ação';
      setError(errMsg);
      setLoading(false);
      throw err;
    }
  }, []);

  return { loading, error, execute };
}

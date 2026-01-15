import api from './api';

/**
 * Serviços de dados reutilizáveis para usuários
 */
export const usuariosService = {
  async getAll() {
    return api.get('/usuarios');
  },

  async getById(id) {
    const todos = await this.getAll();
    return todos.find(u => u.id === id);
  },

  async getMedicos() {
    const usuarios = await this.getAll();
    return usuarios.filter(u => u.status === 'Ativo' && (u.perfil === 'medico' || u.cargo?.includes('Médico')));
  },

  async update(id, data) {
    return api.put(`/usuarios/${id}`, data);
  },

  async create(data) {
    return api.post('/usuarios', data);
  },

  async delete(id) {
    return api.delete(`/usuarios/${id}`);
  },
};

/**
 * Serviços de dados reutilizáveis para pacientes
 */
export const pacientesService = {
  async getAll() {
    return api.get('/pacientes');
  },

  async getById(id) {
    const todos = await this.getAll();
    return todos.find(p => p.id === id);
  },

  async update(id, data) {
    return api.put(`/pacientes/${id}`, data);
  },

  async create(data) {
    return api.post('/pacientes', data);
  },

  async delete(id) {
    return api.delete(`/pacientes/${id}`);
  },
};

/**
 * Serviços de dados reutilizáveis para logs de auditoria
 */
export const logsService = {
  async getAll() {
    return api.get('/LogsAuditoria');
  },

  async create(usuario, acao, tipo = 'INFO', detalhes = null) {
    const log = {
      usuario,
      acao,
      tipo,
      detalhes,
      data: new Date().toISOString(),
      ip: '127.0.0.1',
    };
    return api.post('/LogsAuditoria', log);
  },
};

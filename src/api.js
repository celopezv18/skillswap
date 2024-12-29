import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
  baseURL: 'http://localhost:5000', // Cambia esto según sea necesario
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token de autorización
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Funciones reutilizables para cada endpoint

// Registro de usuario
export const registerUser = async (userData) => {
  return api.post('/auth/register', userData);
};

// Inicio de sesión
export const loginUser = async (credentials) => {
  return api.post('/auth/login', credentials);
};

// Obtener habilidades del usuario
export const getUserSkills = async (userId) => {
  return api.get(`/skills/${userId}`);
};

// Agregar una nueva habilidad
export const addSkill = async (skillData) => {
  return api.post('/skills', skillData);
};

// Eliminar una habilidad
export const deleteSkill = async (skillId) => {
  return api.delete(`/skills/${skillId}`);
};

// Obtener matches para el usuario
export const getMatches = async (userId) => {
  return api.get('/matches', { params: { userId } });
};

// Enviar mensaje en el chat
export const sendMessage = async (matchId, content) => {
    try {
      const token = localStorage.getItem('authToken'); // Recuperar el token del localStorage
      const response = await axios.post(
        `http://localhost:5000/messages`,
        { content, userId: localStorage.getItem('idu'), matchId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pasar el token para la autenticación
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Error sending message');
    }
  };

// Obtener mensajes de un chat
export const getMessages = async (matchId, userId) => {
  try {
    const token = localStorage.getItem('authToken');

    if (!token) {
      throw new Error('No token found.');
    }

    const response = await axios.get(`http://localhost:5000/messages`, {
      params: { matchId, userId, token },
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the header
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error.message);
    throw error;
  }
};

// Exportar API por defecto
export default api;
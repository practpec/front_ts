import axios from 'axios';
import { AnalysisResult, AnalysisRequest } from '../types/AnalysisTypes';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const analyzeCode = async (code: string): Promise<AnalysisResult> => {
  try {
    const request: AnalysisRequest = { code };
    const response = await api.post<AnalysisResult>('/analyze', request);
    return response.data;
  } catch (error) {
    console.error('Error al conectar con el servidor:', error);
    throw new Error('No se pudo conectar con el servidor de análisis');
  }
};

export default api;
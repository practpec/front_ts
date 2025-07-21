import axios from 'axios';
import { AnalysisResult, AnalysisRequest, AnalysisWithMetrics } from '../types/AnalysisTypes';

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

export const analyzeCodeOptimized = async (code: string): Promise<AnalysisWithMetrics> => {
  try {
    const request: AnalysisRequest = { code };
    const response = await api.post<AnalysisWithMetrics>('/analyze-optimized', request);
    return response.data;
  } catch (error) {
    console.error('Error al conectar con el servidor optimizado:', error);
    throw new Error('No se pudo conectar con el servidor de análisis optimizado');
  }
};

export const analyzeCodeUnoptimized = async (code: string): Promise<AnalysisWithMetrics> => {
  try {
    const request: AnalysisRequest = { code };
    const response = await api.post<AnalysisWithMetrics>('/analyze-unoptimized', request);
    return response.data;
  } catch (error) {
    console.error('Error al conectar con el servidor no optimizado:', error);
    throw new Error('No se pudo conectar con el servidor de análisis no optimizado');
  }
};

export default api;
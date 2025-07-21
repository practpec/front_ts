import React from 'react';
import { PerformanceMetrics as MetricsType } from '../types/AnalysisTypes';

interface PerformanceMetricsProps {
  metrics: MetricsType;
  title: string;
  optimized?: boolean;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ 
  metrics, 
  title, 
  optimized = true 
}) => {
  const getPerformanceColor = (optimized: boolean) => {
    return optimized 
      ? 'bg-green-50 border-green-200' 
      : 'bg-red-50 border-red-200';
  };

  const getIconColor = (optimized: boolean) => {
    return optimized ? 'text-green-600' : 'text-red-600';
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (timeStr: string): string => {
    // Convertir string de tiempo a número para comparación
    const timeMatch = timeStr.match(/(\d+\.?\d*)(µs|ms|s)/);
    if (!timeMatch) return timeStr;
    
    const value = parseFloat(timeMatch[1]);
    const unit = timeMatch[2];
    
    if (unit === 'µs' && value < 1000) {
      return `${value.toFixed(2)} µs`;
    } else if (unit === 'µs' && value >= 1000) {
      return `${(value / 1000).toFixed(2)} ms`;
    } else if (unit === 'ms' && value >= 1000) {
      return `${(value / 1000).toFixed(2)} s`;
    }
    
    return timeStr;
  };

  return (
    <div className={`rounded-lg p-6 border-2 ${getPerformanceColor(optimized)}`}>
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <span className={`text-2xl mr-2 ${getIconColor(optimized)}`}>
          {optimized ? '🚀' : '🐌'}
        </span>
        {title}
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Tiempo de ejecución */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Tiempo de Ejecución</span>
            <span className="text-lg">⏱️</span>
          </div>
          <div className="text-lg font-bold text-gray-800">
            {formatTime(metrics.executionTime)}
          </div>
        </div>

        {/* Uso de memoria */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Memoria Usada</span>
            <span className="text-lg">💾</span>
          </div>
          <div className="text-lg font-bold text-gray-800">
            {metrics.memoryUsage}
          </div>
          <div className="text-xs text-gray-500">
            {formatBytes(metrics.allocatedBytes)}
          </div>
        </div>

        {/* Asignaciones totales */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Asignaciones</span>
            <span className="text-lg">📊</span>
          </div>
          <div className="text-lg font-bold text-gray-800">
            {metrics.totalAllocs.toLocaleString()}
          </div>
        </div>

        {/* Ciclos de GC */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Ciclos GC</span>
            <span className="text-lg">🔄</span>
          </div>
          <div className="text-lg font-bold text-gray-800">
            {metrics.gcCycles}
          </div>
        </div>

        {/* Uso de CPU */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Tiempo CPU</span>
            <span className="text-lg">⚡</span>
          </div>
          <div className="text-lg font-bold text-gray-800">
            {metrics.cpuUsage.toFixed(6)}s
          </div>
        </div>

        {/* Bytes por asignación */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Eficiencia</span>
            <span className="text-lg">📈</span>
          </div>
          <div className="text-lg font-bold text-gray-800">
            {metrics.totalAllocs > 0 
              ? `${(metrics.allocatedBytes / metrics.totalAllocs).toFixed(1)} B/alloc`
              : '0 B/alloc'
            }
          </div>
        </div>
      </div>

      {/* Indicadores de rendimiento */}
      <div className="mt-4 p-3 bg-white rounded-lg border">
        <h4 className="font-medium text-gray-700 mb-2">Indicadores de Rendimiento:</h4>
        <div className="flex flex-wrap gap-2">
          {metrics.allocatedBytes < 10000 && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              ✅ Bajo uso de memoria
            </span>
          )}
          {metrics.allocatedBytes >= 10000 && (
            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
              ⚠️ Alto uso de memoria
            </span>
          )}
          
          {parseFloat(metrics.executionTime.replace(/[^\d.]/g, '')) < 1 && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              ⚡ Ejecución rápida
            </span>
          )}
          {parseFloat(metrics.executionTime.replace(/[^\d.]/g, '')) >= 1 && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
              🐌 Ejecución lenta
            </span>
          )}
          
          {metrics.gcCycles === 0 && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              🎯 Sin recolección de basura
            </span>
          )}
          {metrics.gcCycles > 0 && (
            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
              🔄 Recolección de basura activa
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
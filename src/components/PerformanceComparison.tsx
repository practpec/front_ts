import React from 'react';
import { PerformanceMetrics } from '../types/AnalysisTypes';

interface PerformanceComparisonProps {
  optimizedMetrics: PerformanceMetrics | null;
  unoptimizedMetrics: PerformanceMetrics | null;
}

const PerformanceComparison: React.FC<PerformanceComparisonProps> = ({
  optimizedMetrics,
  unoptimizedMetrics,
}) => {
  if (!optimizedMetrics || !unoptimizedMetrics) {
    return null;
  }

  const calculateImprovement = (optimized: number, unoptimized: number): string => {
    if (unoptimized === 0) return 'N/A';
    const improvement = ((unoptimized - optimized) / unoptimized) * 100;
    return improvement > 0 ? `${improvement.toFixed(1)}%` : `${Math.abs(improvement).toFixed(1)}% worse`;
  };

  const parseTimeToMs = (timeStr: string): number => {
    const timeMatch = timeStr.match(/(\d+\.?\d*)(µs|ms|s)/);
    if (!timeMatch) return 0;
    
    const value = parseFloat(timeMatch[1]);
    const unit = timeMatch[2];
    
    switch (unit) {
      case 'µs': return value / 1000;
      case 'ms': return value;
      case 's': return value * 1000;
      default: return 0;
    }
  };

  const optimizedTimeMs = parseTimeToMs(optimizedMetrics.executionTime);
  const unoptimizedTimeMs = parseTimeToMs(unoptimizedMetrics.executionTime);
  
  const timeImprovement = calculateImprovement(optimizedTimeMs, unoptimizedTimeMs);
  const memoryImprovement = calculateImprovement(optimizedMetrics.allocatedBytes, unoptimizedMetrics.allocatedBytes);
  const allocImprovement = calculateImprovement(optimizedMetrics.totalAllocs, unoptimizedMetrics.totalAllocs);

  const getImprovementColor = (improvement: string): string => {
    if (improvement === 'N/A') return 'text-gray-600';
    if (improvement.includes('worse')) return 'text-red-600';
    const value = parseFloat(improvement);
    if (value > 50) return 'text-green-600';
    if (value > 25) return 'text-green-500';
    if (value > 0) return 'text-green-400';
    return 'text-red-600';
  };

  const getImprovementBg = (improvement: string): string => {
    if (improvement === 'N/A') return 'bg-gray-100';
    if (improvement.includes('worse')) return 'bg-red-100';
    const value = parseFloat(improvement);
    if (value > 50) return 'bg-green-100';
    if (value > 25) return 'bg-green-50';
    if (value > 0) return 'bg-green-25';
    return 'bg-red-100';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700 flex items-center">
        ⚖️ Comparación de Rendimiento
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Comparación de tiempo */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
            <div className="text-3xl mb-2">⏱️</div>
            <h3 className="font-semibold text-blue-800 mb-2">Tiempo de Ejecución</h3>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-green-600 font-medium">Optimizado: </span>
                <span className="font-mono">{optimizedMetrics.executionTime}</span>
              </div>
              <div className="text-sm">
                <span className="text-red-600 font-medium">No optimizado: </span>
                <span className="font-mono">{unoptimizedMetrics.executionTime}</span>
              </div>
            </div>
            <div className={`mt-3 px-3 py-2 rounded-full text-sm font-semibold ${getImprovementBg(timeImprovement)}`}>
              <span className={getImprovementColor(timeImprovement)}>
                {timeImprovement.includes('worse') ? '🔻' : '🚀'} {timeImprovement} mejora
              </span>
            </div>
          </div>
        </div>

        {/* Comparación de memoria */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
            <div className="text-3xl mb-2">💾</div>
            <h3 className="font-semibold text-purple-800 mb-2">Uso de Memoria</h3>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-green-600 font-medium">Optimizado: </span>
                <span className="font-mono">{optimizedMetrics.memoryUsage}</span>
              </div>
              <div className="text-sm">
                <span className="text-red-600 font-medium">No optimizado: </span>
                <span className="font-mono">{unoptimizedMetrics.memoryUsage}</span>
              </div>
            </div>
            <div className={`mt-3 px-3 py-2 rounded-full text-sm font-semibold ${getImprovementBg(memoryImprovement)}`}>
              <span className={getImprovementColor(memoryImprovement)}>
                {memoryImprovement.includes('worse') ? '🔻' : '💪'} {memoryImprovement} mejora
              </span>
            </div>
          </div>
        </div>

        {/* Comparación de asignaciones */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-orange-800 mb-2">Asignaciones</h3>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-green-600 font-medium">Optimizado: </span>
                <span className="font-mono">{optimizedMetrics.totalAllocs.toLocaleString()}</span>
              </div>
              <div className="text-sm">
                <span className="text-red-600 font-medium">No optimizado: </span>
                <span className="font-mono">{unoptimizedMetrics.totalAllocs.toLocaleString()}</span>
              </div>
            </div>
            <div className={`mt-3 px-3 py-2 rounded-full text-sm font-semibold ${getImprovementBg(allocImprovement)}`}>
              <span className={getImprovementColor(allocImprovement)}>
                {allocImprovement.includes('worse') ? '🔻' : '✨'} {allocImprovement} mejora
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Resumen de optimización */}
      <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
          🎯 Resumen de Optimización:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Problemas identificados en la versión no optimizada:</span>
            <ul className="mt-2 space-y-1 text-gray-600">
              <li>• Concatenación excesiva de strings</li>
              <li>• Creación innecesaria de objetos temporales</li>
              <li>• Comparaciones de strings ineficientes</li>
              <li>• Conversiones de tipo repetitivas</li>
            </ul>
          </div>
          <div>
            <span className="font-medium text-gray-700">Optimizaciones aplicadas:</span>
            <ul className="mt-2 space-y-1 text-gray-600">
              <li>• Uso de slicing en lugar de concatenación</li>
              <li>• Maps pre-construidos para palabras clave</li>
              <li>• Comparaciones directas de tipos</li>
              <li>• Reutilización de objetos cuando es posible</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Gráfico visual simple */}
      <div className="mt-6 p-4 bg-white border rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-3">Comparación Visual de Rendimiento:</h3>
        <div className="space-y-3">
          {/* Barra de tiempo */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Tiempo de Ejecución</span>
              <span>{timeImprovement} mejora</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-1000" 
                style={{ 
                  width: `${Math.min(100, Math.max(10, 100 - (optimizedTimeMs / unoptimizedTimeMs) * 100))}%` 
                }}
              ></div>
            </div>
          </div>

          {/* Barra de memoria */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Eficiencia de Memoria</span>
              <span>{memoryImprovement} mejora</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-1000" 
                style={{ 
                  width: `${Math.min(100, Math.max(10, 100 - (optimizedMetrics.allocatedBytes / unoptimizedMetrics.allocatedBytes) * 100))}%` 
                }}
              ></div>
            </div>
          </div>

          {/* Barra de asignaciones */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Eficiencia de Asignaciones</span>
              <span>{allocImprovement} mejora</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all duration-1000" 
                style={{ 
                  width: `${Math.min(100, Math.max(10, 100 - (optimizedMetrics.totalAllocs / unoptimizedMetrics.totalAllocs) * 100))}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceComparison;
import React from 'react';
import { AnalysisWithMetrics } from '../types/AnalysisTypes';

interface PerformanceMetricsProps {
  optimizedResult: AnalysisWithMetrics | null;
  unoptimizedResult: AnalysisWithMetrics | null;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ 
  optimizedResult, 
  unoptimizedResult 
}) => {
  const formatTime = (timeStr: string): number => {
    // Convertir strings como "1.234567ms" a número en milisegundos
    const match = timeStr.match(/(\d+\.?\d*)(ms|µs|ns|s)/);
    if (!match) return 0;
    
    const value = parseFloat(match[1]);
    const unit = match[2];
    
    switch (unit) {
      case 'ns':
        return value / 1000000; // nanosegundos a milisegundos
      case 'µs':
        return value / 1000; // microsegundos a milisegundos
      case 'ms':
        return value;
      case 's':
        return value * 1000; // segundos a milisegundos
      default:
        return value;
    }
  };

  const formatMemory = (memoryStr: string): number => {
    // Convertir strings como "1.23 KB" a número en KB
    const match = memoryStr.match(/(\d+\.?\d*)\s*(KB|MB|B)/);
    if (!match) return 0;
    
    const value = parseFloat(match[1]);
    const unit = match[2];
    
    switch (unit) {
      case 'B':
        return value / 1024; // bytes a KB
      case 'KB':
        return value;
      case 'MB':
        return value * 1024; // MB a KB
      default:
        return value;
    }
  };

  const getPerformanceComparison = () => {
    if (!optimizedResult || !unoptimizedResult) return null;

    const optimizedTime = formatTime(optimizedResult.metrics.executionTime);
    const unoptimizedTime = formatTime(unoptimizedResult.metrics.executionTime);
    const optimizedMemory = formatMemory(optimizedResult.metrics.memoryUsage);
    const unoptimizedMemory = formatMemory(unoptimizedResult.metrics.memoryUsage);

    const timeImprovement = unoptimizedTime > 0 ? 
      ((unoptimizedTime - optimizedTime) / unoptimizedTime * 100) : 0;
    const memoryImprovement = unoptimizedMemory > 0 ? 
      ((unoptimizedMemory - optimizedMemory) / unoptimizedMemory * 100) : 0;

    return {
      timeImprovement: Math.max(0, timeImprovement),
      memoryImprovement: Math.max(0, memoryImprovement),
      timeDifference: unoptimizedTime - optimizedTime,
      memoryDifference: unoptimizedMemory - optimizedMemory
    };
  };

  const comparison = getPerformanceComparison();

  if (!optimizedResult && !unoptimizedResult) {
    return null;
  }

  return (
    <div className="mb-8">
      {/* Comparación de Rendimiento */}
      {comparison && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            📊 Comparación de Rendimiento
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200 text-center">
              <h3 className="font-semibold text-green-800 mb-2">Mejora en Tiempo</h3>
              <div className="text-2xl font-bold text-green-700">
                {comparison.timeImprovement.toFixed(1)}%
              </div>
              <div className="text-sm text-green-600">
                {comparison.timeDifference.toFixed(3)}ms más rápido
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200 text-center">
              <h3 className="font-semibold text-blue-800 mb-2">Mejora en Memoria</h3>
              <div className="text-2xl font-bold text-blue-700">
                {comparison.memoryImprovement.toFixed(1)}%
              </div>
              <div className="text-sm text-blue-600">
                {comparison.memoryDifference.toFixed(2)}KB menos
              </div>
            </div>

            {optimizedResult && (
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200 text-center">
                <h3 className="font-semibold text-green-800 mb-2">Optimizado</h3>
                <div className="text-lg font-bold text-green-700">
                  {optimizedResult.metrics.executionTime}
                </div>
                <div className="text-sm text-green-600">
                  {optimizedResult.metrics.memoryUsage}
                </div>
              </div>
            )}

            {unoptimizedResult && (
              <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg border border-red-200 text-center">
                <h3 className="font-semibold text-red-800 mb-2">No Optimizado</h3>
                <div className="text-lg font-bold text-red-700">
                  {unoptimizedResult.metrics.executionTime}
                </div>
                <div className="text-sm text-red-600">
                  {unoptimizedResult.metrics.memoryUsage}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceMetrics;
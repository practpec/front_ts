import React, { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import LexicalTable from './components/LexicalTable';
import TokenDisplay from './components/TokenDisplay';
import ErrorDisplay from './components/ErrorDisplay';
import SemanticInfo from './components/SemanticInfo';
import PerformanceMetrics from './components/PerformanceMetrics';
import PerformanceComparison from './components/PerformanceComparison';
import { analyzeCode, analyzeCodeOptimized, analyzeCodeUnoptimized } from './services/analyzerService';
import { AnalysisResult, AnalysisWithMetrics } from './types/AnalysisTypes';
import './App.css';

const App: React.FC = () => {
  const [code, setCode] = useState(`let a: number = 0;
let b: number = 10;
let c: number = 0;
let x: number = 2;
do {
    a = 3 * b;
    c = 2 + a;
} while (x === 2);`);
  
  // Estados para los diferentes tipos de análisis
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [unoptimizedResult, setUnoptimizedResult] = useState<AnalysisWithMetrics | null>(null);
  const [comparisonResults, setComparisonResults] = useState<{
    optimized: AnalysisWithMetrics | null;
    unoptimized: AnalysisWithMetrics | null;
  }>({ optimized: null, unoptimized: null });
  
  // Estados de carga
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUnoptimized, setIsLoadingUnoptimized] = useState(false);
  const [isLoadingComparison, setIsLoadingComparison] = useState(false);

  const handleAnalyze = async () => {
    setIsLoading(true);
    try {
      const result = await analyzeCode(code);
      setAnalysisResult(result);
      // Limpiar otros resultados cuando se hace análisis normal
      setUnoptimizedResult(null);
      setComparisonResults({ optimized: null, unoptimized: null });
    } catch (error) {
      console.error('Error al analizar código:', error);
      setAnalysisResult({
        isValid: false,
        tokens: [],
        syntaxErrors: ['Error de conexión con el servidor'],
        semanticInfo: []
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeUnoptimized = async () => {
    setIsLoadingUnoptimized(true);
    try {
      const result = await analyzeCodeUnoptimized(code);
      setUnoptimizedResult(result);
      // Limpiar otros resultados
      setAnalysisResult(null);
      setComparisonResults({ optimized: null, unoptimized: null });
    } catch (error) {
      console.error('Error al analizar código no optimizado:', error);
      setUnoptimizedResult({
        isValid: false,
        tokens: [],
        syntaxErrors: ['Error de conexión con el servidor no optimizado'],
        semanticInfo: [],
        metrics: {
          executionTime: '0ms',
          memoryUsage: '0 KB',
          allocatedBytes: 0,
          totalAllocs: 0,
          gcCycles: 0,
          cpuUsage: 0
        }
      });
    } finally {
      setIsLoadingUnoptimized(false);
    }
  };

  const handleComparePerformance = async () => {
    setIsLoadingComparison(true);
    try {
      // Ejecutar ambos análisis en paralelo
      const [optimizedResult, unoptimizedResult] = await Promise.all([
        analyzeCodeOptimized(code),
        analyzeCodeUnoptimized(code)
      ]);
      
      setComparisonResults({
        optimized: optimizedResult,
        unoptimized: unoptimizedResult
      });
      
      // Limpiar otros resultados
      setAnalysisResult(null);
      setUnoptimizedResult(null);
    } catch (error) {
      console.error('Error al comparar rendimiento:', error);
      setComparisonResults({
        optimized: null,
        unoptimized: null
      });
    } finally {
      setIsLoadingComparison(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          Analizador Sintáctico/Semántico TypeScript
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Comparación de rendimiento: Código optimizado vs No optimizado
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Panel de entrada */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Editor de Código</h2>
            <CodeEditor 
              code={code} 
              onChange={setCode} 
              onAnalyze={handleAnalyze}
              onAnalyzeUnoptimized={handleAnalyzeUnoptimized}
              onComparePerformance={handleComparePerformance}
              isLoading={isLoading}
              isLoadingUnoptimized={isLoadingUnoptimized}
              isLoadingComparison={isLoadingComparison}
            />
          </div>

          {/* Panel de resultados */}
          <div className="space-y-6">
            {/* Análisis Normal */}
            {analysisResult && (
              <>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                    📊 Análisis Normal (Sin métricas)
                  </h2>
                  <div className={`p-4 rounded-lg ${
                    analysisResult.isValid 
                      ? 'bg-green-100 text-green-800 border-l-4 border-green-500' 
                      : 'bg-red-100 text-red-800 border-l-4 border-red-500'
                  }`}>
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">
                        {analysisResult.isValid ? '✅' : '❌'}
                      </span>
                      <span className="font-semibold">
                        {analysisResult.isValid 
                          ? 'Código válido - Sin errores sintácticos ni semánticos' 
                          : 'Código con errores sintácticos o semánticos'}
                      </span>
                    </div>
                  </div>
                </div>

                {analysisResult.syntaxErrors.length > 0 && (
                  <ErrorDisplay errors={analysisResult.syntaxErrors} />
                )}

                <LexicalTable tokens={analysisResult.tokens} />
                <TokenDisplay tokens={analysisResult.tokens} />
                
                {analysisResult.semanticInfo.length > 0 && (
                  <SemanticInfo info={analysisResult.semanticInfo} />
                )}
              </>
            )}

            {/* Análisis No Optimizado */}
            {unoptimizedResult && (
              <>
                <PerformanceMetrics 
                  metrics={unoptimizedResult.metrics}
                  title="📊 Análisis No Optimizado - Métricas de Rendimiento"
                  optimized={false}
                />

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                    Estado del Análisis No Optimizado
                  </h2>
                  <div className={`p-4 rounded-lg ${
                    unoptimizedResult.isValid 
                      ? 'bg-green-100 text-green-800 border-l-4 border-green-500' 
                      : 'bg-red-100 text-red-800 border-l-4 border-red-500'
                  }`}>
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">
                        {unoptimizedResult.isValid ? '✅' : '❌'}
                      </span>
                      <span className="font-semibold">
                        {unoptimizedResult.isValid 
                          ? 'Código válido - Sin errores sintácticos ni semánticos' 
                          : 'Código con errores sintácticos o semánticos'}
                      </span>
                    </div>
                  </div>
                </div>

                {unoptimizedResult.syntaxErrors.length > 0 && (
                  <ErrorDisplay errors={unoptimizedResult.syntaxErrors} />
                )}
              </>
            )}

            {/* Comparación de Rendimiento */}
            {comparisonResults.optimized && comparisonResults.unoptimized && (
              <>
                <PerformanceComparison 
                  optimizedMetrics={comparisonResults.optimized.metrics}
                  unoptimizedMetrics={comparisonResults.unoptimized.metrics}
                />
                
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <PerformanceMetrics 
                    metrics={comparisonResults.optimized.metrics}
                    title="Versión Optimizada"
                    optimized={true}
                  />
                  
                  <PerformanceMetrics 
                    metrics={comparisonResults.unoptimized.metrics}
                    title="Versión No Optimizada"
                    optimized={false}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
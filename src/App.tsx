import React, { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import LexicalTable from './components/LexicalTable';
import TokenDisplay from './components/TokenDisplay';
import ErrorDisplay from './components/ErrorDisplay';
import SemanticInfo from './components/SemanticInfo';
import { analyzeCode } from './services/analyzerService';
import { AnalysisResult } from './types/AnalysisTypes';
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
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    setIsLoading(true);
    try {
      const result = await analyzeCode(code);
      setAnalysisResult(result);
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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Analizador Sintáctico/Semántico TypeScript
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Panel de entrada */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Editor de Código</h2>
            <CodeEditor 
              code={code} 
              onChange={setCode} 
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
            />
          </div>

          {/* Panel de resultados */}
          <div className="space-y-6">
            {analysisResult && (
              <>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                    Estado del Análisis
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
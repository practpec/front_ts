import React from 'react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  onAnalyze: () => void;
  onAnalyzeUnoptimized: () => void;
  onComparePerformance: () => void;
  isLoading: boolean;
  isLoadingUnoptimized: boolean;
  isLoadingComparison: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  code, 
  onChange, 
  onAnalyze,
  onAnalyzeUnoptimized, 
  onComparePerformance,
  isLoading,
  isLoadingUnoptimized,
  isLoadingComparison
}) => {
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };



  const isAnyLoading = isLoading || isLoadingUnoptimized || isLoadingComparison;

  return (
    <div className="space-y-4">
    <div className="space-y-4">
      {/* Editor de código */}
      <div>
        <label htmlFor="code-editor" className="block text-lg font-medium mb-2 text-gray-700">
          Código TypeScript:
        </label>
        <textarea
          id="code-editor"
          value={code}
          onChange={handleCodeChange}
          disabled={isAnyLoading}
          className="w-full h-64 p-4 border border-gray-300 rounded-lg 
                     font-mono text-sm bg-gray-50 focus:ring-2 
                     focus:ring-blue-500 focus:border-transparent
                     resize-none disabled:opacity-50"
          placeholder="Escribe tu código de bucle aquí..."
          spellCheck={false}
        />
      </div>

      {/* Líneas numeradas */}
      <div className="text-sm text-gray-500">
        Líneas: {code.split('\n').length} | Caracteres: {code.length}
      </div>

      {/* Modo de comparación indicator
      {comparisonMode && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-blue-800 font-medium">
              🔬 Modo Comparación de Rendimiento Activo
            </span>
            <button
              onClick={onResetComparison}
              className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 
                         text-blue-800 rounded border border-blue-300
                         transition-colors duration-200"
            >
              ❌ Salir del modo comparación
            </button>
          </div>
        </div>
      )} */}

      {/* Botones de análisis - Solo 3 botones */}
      <div className="space-y-3">
        {/* Botón de análisis normal */}
        <button
          onClick={onAnalyze}
          disabled={isLoading || !code.trim()}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-white
                     transition-all duration-200 transform hover:scale-105
                     ${isLoading || !code.trim()
                       ? 'bg-gray-400 cursor-not-allowed' 
                       : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
                     }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                   xmlns="http://www.w3.org/2000/svg" 
                   fill="none" 
                   viewBox="0 0 24 24">
                <circle className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"></circle>
                <path className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analizando...
            </div>
          ) : (
            '🔍 Análisis Normal'
          )}
        </button>

        {/* Botón de análisis no optimizado */}
        <button
          onClick={onAnalyzeUnoptimized}
          disabled={isLoadingUnoptimized || !code.trim()}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-white
                     transition-all duration-200 transform hover:scale-105
                     ${isLoadingUnoptimized || !code.trim()
                       ? 'bg-gray-400 cursor-not-allowed' 
                       : 'bg-red-600 hover:bg-red-700 active:scale-95'
                     }`}
        >
          {isLoadingUnoptimized ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                   xmlns="http://www.w3.org/2000/svg" 
                   fill="none" 
                   viewBox="0 0 24 24">
                <circle className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"></circle>
                <path className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analizando...
            </div>
          ) : (
            '🐌 Análisis No Optimizado (con métricas)'
          )}
        </button>

        {/* Botón de comparación */}
        <button
          onClick={onComparePerformance}
          disabled={isAnyLoading || !code.trim()}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-white
                     transition-all duration-200 transform hover:scale-105
                     ${isAnyLoading || !code.trim()
                       ? 'bg-gray-400 cursor-not-allowed' 
                       : 'bg-purple-600 hover:bg-purple-700 active:scale-95'
                     }`}
        >
          {(isLoadingUnoptimized || isLoadingUnoptimized) ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                   xmlns="http://www.w3.org/2000/svg" 
                   fill="none" 
                   viewBox="0 0 24 24">
                <circle className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"></circle>
                <path className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Comparando...
            </div>
          ) : (
            '⚖️ Comparar Rendimiento (Optimizado vs No Optimizado)'
          )}
        </button>
      </div>

      {/* Información adicional */}
      <div className="p-3 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600">
        <div className="space-y-1">
          <div><span className="font-semibold">🔍 Análisis Normal:</span> Análisis estándar sin métricas de rendimiento.</div>
          <div><span className="font-semibold">🐌 No Optimizado:</span> Análisis con código ineficiente que muestra métricas de consumo.</div>
          <div><span className="font-semibold">⚖️ Comparación:</span> Ejecuta ambas versiones y compara el rendimiento.</div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CodeEditor;
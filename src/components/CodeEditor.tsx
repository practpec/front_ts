import React from 'react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  onAnalyzeOptimized: () => void;
  onAnalyzeUnoptimized: () => void;
  isLoadingOptimized: boolean;
  isLoadingUnoptimized: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  code, 
  onChange, 
  onAnalyzeOptimized,
  onAnalyzeUnoptimized,
  isLoadingOptimized,
  isLoadingUnoptimized
}) => {
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };


  return (
    <div className="space-y-4">
      {/* Ejemplos predefinidos */}

      {/* Editor de código */}
      <div>
        <label htmlFor="code-editor" className="block text-lg font-medium mb-2 text-gray-700">
          Código TypeScript:
        </label>
        <textarea
          id="code-editor"
          value={code}
          onChange={handleCodeChange}
          className="w-full h-64 p-4 border border-gray-300 rounded-lg 
                     font-mono text-sm bg-gray-50 focus:ring-2 
                     focus:ring-blue-500 focus:border-transparent
                     resize-none"
          placeholder="Escribe tu código aquí..."
          spellCheck={false}
        />
      </div>

      {/* Estadísticas del código */}
      <div className="text-sm text-gray-500">
        Líneas: {code.split('\n').length} | Caracteres: {code.length}
      </div>

      {/* Botones de análisis - SOLO 2 BOTONES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Botón Optimizado (código original) */}
        <button
          onClick={onAnalyzeOptimized}
          disabled={isLoadingOptimized || !code.trim()}
          className={`py-3 px-6 rounded-lg font-semibold text-white
                     transition-all duration-200 transform hover:scale-105
                     ${isLoadingOptimized || !code.trim()
                       ? 'bg-gray-400 cursor-not-allowed' 
                       : 'bg-green-600 hover:bg-green-700 active:scale-95'
                     }`}
        >
          {isLoadingOptimized ? (
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
            '🚀 Código Original'
          )}
        </button>

        {/* Botón No Optimizado */}
        <button
          onClick={onAnalyzeUnoptimized}
          disabled={isLoadingUnoptimized || !code.trim()}
          className={`py-3 px-6 rounded-lg font-semibold text-white
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
            '🐌 No Optimizado'
          )}
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;
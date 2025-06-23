import React from 'react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  code, 
  onChange, 
  onAnalyze, 
  isLoading 
}) => {
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const predefinedExamples = [
    {
      name: "For básico",
      code: `for (let i = 1; i <= 10; i++) {
  console.log("Numero: " + i);
}`
    },
    {
      name: "For con error semántico",
      code: `for (let i = 1; a <= 10; i++) {
  console.log("Numero: " + i);
}`
    },
    {
      name: "Do-While válido",
      code: `let a: number = 0;
let b: number = 10;
let c: number = 0;
let x: number = 2;
do {
    a = 3 * b;
    c = 2 + a;
} while (x === 2);`
    },
    {
      name: "Do-While con error",
      code: `let a: number = 0;
let b: number = 10;
let c: number = 0;
do {
    a = 3 * b;
    c = 2 + a;
} while (x === 2);`
    },
    {
      name: "For sin incremento",
      code: `for (let i = 1; i <= 10;) {
  console.log("Numero: " + i);
}`
    },
    {
      name: "Múltiples declaraciones",
      code: `int x = 5;
int y = 10;
int z = x + y;
for (int i = 0; i < z; i++) {
    console.log(i);
}`
    }
  ];

  return (
    <div className="space-y-4">
      {/* Ejemplos predefinidos */}
      <div>
        <h3 className="text-lg font-medium mb-2 text-gray-700">Ejemplos:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {predefinedExamples.map((example, index) => (
            <button
              key={index}
              onClick={() => onChange(example.code)}
              className="px-3 py-2 text-sm bg-blue-100 hover:bg-blue-200 
                         text-blue-800 rounded-lg transition-colors duration-200
                         border border-blue-300 text-left"
            >
              {example.name}
            </button>
          ))}
        </div>
      </div>

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
          placeholder="Escribe tu código de bucle for aquí..."
          spellCheck={false}
        />
      </div>

      {/* Líneas numeradas */}
      <div className="text-sm text-gray-500">
        Líneas: {code.split('\n').length} | Caracteres: {code.length}
      </div>

      {/* Botón de análisis */}
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
          '🔍 Analizar Código'
        )}
      </button>
    </div>
  );
};

export default CodeEditor;
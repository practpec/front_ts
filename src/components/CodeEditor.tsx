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
      name: "For básico C",
      code: `for (int i = 1; i <= 10; i++) {
    printf("Numero: %d\\n", i);
}`
    },
    {
      name: "For con error semántico",
      code: `for (int i = 1; a <= 10; i++) {
    printf("Numero: %d\\n", i);
}`
    },
    {
      name: "Do-While válido",
      code: `int a = 0;
int b = 10;
int c = 0;
int x = 2;
do {
    a = 3 * b;
    c = 2 + a;
} while (x == 2);`
    },
    {
      name: "Do-While con error",
      code: `int a = 0;
int b = 10;
int c = 0;
do {
    a = 3 * b;
    c = 2 + a;
} while (x == 2);`
    },
    {
      name: "For sin incremento",
      code: `for (int i = 1; i <= 10;) {
    printf("Numero: %d\\n", i);
}`
    },
    {
      name: "Múltiples declaraciones",
      code: `int x = 5;
int y = 10;
int z = x + y;
for (int i = 0; i < z; i++) {
    printf("%d\\n", i);
}`
    },
    {
      name: "While básico",
      code: `int i = 0;
while (i < 5) {
    printf("Iteración: %d\\n", i);
    i++;
}`
    },
    {
      name: "Declaraciones con errores",
      code: `int a = 5abc;
int b = 10;
int c = a + d;`
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
          Código C/C++:
        </label>
        <textarea
          id="code-editor"
          value={code}
          onChange={handleCodeChange}
          className="w-full h-64 p-4 border border-gray-300 rounded-lg 
                     font-mono text-sm bg-gray-50 focus:ring-2 
                     focus:ring-blue-500 focus:border-transparent
                     resize-none"
          placeholder="Escribe tu código C/C++ aquí..."
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

      {/* Información de ayuda */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-800 mb-1">💡 Consejos:</h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Las variables deben declararse con tipo explícito (int, float, etc.)</li>
          <li>• Cada declaración debe terminar con punto y coma (;)</li>
          <li>• Los bucles for requieren: for(inicialización; condición; incremento)</li>
          <li>• Los bucles do-while deben terminar con ; después del while</li>
        </ul>
      </div>
    </div>
  );
};

export default CodeEditor;
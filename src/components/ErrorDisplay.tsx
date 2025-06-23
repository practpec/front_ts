import React from 'react';

interface ErrorDisplayProps {
  errors: string[];
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ errors }) => {
  if (errors.length === 0) {
    return null;
  }

  const getErrorType = (error: string): { type: string; icon: string; color: string } => {
    const errorLower = error.toLowerCase();
    
    if (errorLower.includes('se esperaba')) {
      return {
        type: 'Error Sintáctico',
        icon: '⚠️',
        color: 'bg-red-50 border-red-200 text-red-800'
      };
    } else if (errorLower.includes('se llegó al final')) {
      return {
        type: 'Error EOF',
        icon: '🔚',
        color: 'bg-orange-50 border-orange-200 text-orange-800'
      };
    } else if (errorLower.includes('conexión') || errorLower.includes('servidor')) {
      return {
        type: 'Error de Conexión',
        icon: '🔌',
        color: 'bg-purple-50 border-purple-200 text-purple-800'
      };
    } else if (errorLower.includes('mal formado') || errorLower.includes('número')) {
      return {
        type: 'Error Léxico',
        icon: '🔤',
        color: 'bg-yellow-50 border-yellow-200 text-yellow-800'
      };
    } else {
      return {
        type: 'Error General',
        icon: '❌',
        color: 'bg-red-50 border-red-200 text-red-800'
      };
    }
  };

  const parseErrorDetails = (error: string) => {
    // Extraer información de línea y columna si está presente
    const lineMatch = error.match(/línea (\d+)/);
    const columnMatch = error.match(/columna (\d+)/);
    
    return {
      line: lineMatch ? parseInt(lineMatch[1]) : null,
      column: columnMatch ? parseInt(columnMatch[1]) : null,
      message: error
    };
  };

  const getSuggestionForError = (error: string): string[] => {
    const errorLower = error.toLowerCase();
    
    if (errorLower.includes('se esperaba') && errorLower.includes('semicolon')) {
      return ['Agrega un punto y coma (;) al final de la declaración'];
    } else if (errorLower.includes('se esperaba') && errorLower.includes('identifier')) {
      return ['Verifica que el nombre de la variable sea válido', 'Los identificadores deben comenzar con letra o _'];
    } else if (errorLower.includes('se esperaba') && errorLower.includes('assignment')) {
      return ['Agrega el operador de asignación (=) en la declaración'];
    } else if (errorLower.includes('mal formado')) {
      return ['Verifica que el número no contenga letras', 'Los números deben ser solo dígitos y opcionalmente un punto decimal'];
    } else if (errorLower.includes('tipo')) {
      return ['Declara la variable con un tipo válido (int, float, double, char)'];
    } else {
      return ['Revisa la sintaxis del código C/C++'];
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-red-700 flex items-center">
        ❌ Errores Encontrados
        <span className="ml-2 text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full">
          {errors.length} error{errors.length !== 1 ? 'es' : ''}
        </span>
      </h2>
      
      <div className="space-y-3">
        {errors.map((error, index) => {
          const errorInfo = getErrorType(error);
          const details = parseErrorDetails(error);
          const suggestions = getSuggestionForError(error);
          
          return (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 ${errorInfo.color}`}
            >
              <div className="flex items-start">
                <span className="text-2xl mr-3 mt-1">{errorInfo.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm uppercase tracking-wide">
                      {errorInfo.type}
                    </span>
                    {(details.line || details.column) && (
                      <span className="text-xs bg-white bg-opacity-50 px-2 py-1 rounded">
                        {details.line && `Línea ${details.line}`}
                        {details.line && details.column && ' - '}
                        {details.column && `Columna ${details.column}`}
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed mb-2">
                    {details.message}
                  </p>
                  
                  {/* Sugerencias específicas para cada error */}
                  {suggestions.length > 0 && (
                    <div className="mt-2 p-2 bg-white bg-opacity-30 rounded text-xs">
                      <span className="font-semibold">💡 Sugerencia:</span>
                      <ul className="mt-1 ml-2">
                        {suggestions.map((suggestion, idx) => (
                          <li key={idx}>• {suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sugerencias generales de corrección para C/C++ */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
          💡 Guía de Sintaxis C/C++:
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <span className="font-semibold">Declaraciones:</span> tipo variable = valor; (ejemplo: int a = 5;)</li>
          <li>• <span className="font-semibold">Bucle for:</span> for (tipo var = inicio; condición; incremento)</li>
          <li>• <span className="font-semibold">Bucle do-while:</span> do {'{...}'} while (condición);</li>
          <li>• <span className="font-semibold">Tipos válidos:</span> int, float, double, char, void</li>
          <li>• <span className="font-semibold">Operadores:</span> +, -, *, /, =, ==, !=, {'<'}=, {'>'}=, ++, --</li>
          <li>• <span className="font-semibold">Punto y coma:</span> Obligatorio al final de cada declaración</li>
        </ul>
      </div>

      {/* Ejemplos de código correcto */}
      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="font-semibold text-green-800 mb-2">✅ Ejemplos de Código Correcto:</h3>
        <div className="text-sm text-green-700 space-y-2">
          <div>
            <span className="font-semibold">Declaración:</span>
            <code className="ml-2 bg-white px-2 py-1 rounded font-mono">int numero = 10;</code>
          </div>
          <div>
            <span className="font-semibold">Bucle for:</span>
            <code className="ml-2 bg-white px-2 py-1 rounded font-mono">for (int i = 0; i &lt; 10; i++)</code>
          </div>
          <div>
            <span className="font-semibold">Do-while:</span>
            <code className="ml-2 bg-white px-2 py-1 rounded font-mono">do {'{...}'} while (x &lt; 5);</code>
          </div>
        </div>
      </div>

      {/* Información adicional */}
      <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600">
        <span className="font-semibold">Nota:</span> Los errores se detectan durante el análisis sintáctico y se muestran 
        en el orden en que aparecen en el código. Corregir el primer error puede resolver automáticamente algunos de los siguientes.
      </div>
    </div>
  );
};

export default ErrorDisplay;
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

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-red-700 flex items-center">
        ❌ Errores Sintácticos Encontrados
        <span className="ml-2 text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full">
          {errors.length} error{errors.length !== 1 ? 'es' : ''}
        </span>
      </h2>
      
      <div className="space-y-3">
        {errors.map((error, index) => {
          const errorInfo = getErrorType(error);
          const details = parseErrorDetails(error);
          
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
                  <p className="text-sm leading-relaxed">
                    {details.message}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sugerencias de corrección */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
          💡 Sugerencias de Corrección:
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Verifica que todos los paréntesis y llaves estén balanceados</li>
          <li>• Asegúrate de que el bucle for tenga la estructura: for (inicialización; condición; incremento)</li>
          <li>• Revisa que todos los puntos y comas estén en su lugar</li>
          <li>• Confirma que los identificadores estén correctamente escritos</li>
          <li>• Verifica que los operadores de comparación sean válidos ({'<=, >=, ==, !=, <, >'})</li>
        </ul>
      </div>

      {/* Información adicional */}
      <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600">
        <span className="font-semibold">Nota:</span> Los errores se muestran en el orden en que fueron detectados durante el análisis sintáctico.
        Corrigiendo el primer error puede resolver automáticamente algunos de los siguientes.
      </div>
    </div>
  );
};

export default ErrorDisplay;
import React from 'react';

interface SemanticInfoProps {
  info: string[];
}

const SemanticInfo: React.FC<SemanticInfoProps> = ({ info }) => {
  if (info.length === 0) {
    return null;
  }

  const categorizeInfo = (infoItem: string) => {
    const item = infoItem.toLowerCase();
    
    if (item.includes('⚠️') || item.includes('advertencia') || item.includes('posible')) {
      return {
        type: 'warning',
        icon: '⚠️',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        textColor: 'text-yellow-800'
      };
    } else if (item.includes('✓') || item.includes('válida') || item.includes('correctamente')) {
      return {
        type: 'success',
        icon: '✅',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-800'
      };
    } else if (item.includes('❌') || item.includes('error')) {
      return {
        type: 'error',
        icon: '❌',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-800'
      };
    } else if (item.includes('variable') && item.includes('declarada')) {
      return {
        type: 'info',
        icon: '📝',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-800'
      };
    } else if (item.includes('bucle') || item.includes('for') || item.includes('do-while')) {
      return {
        type: 'analysis',
        icon: '🔄',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200',
        textColor: 'text-purple-800'
      };
    } else if (item.includes('incremento') || item.includes('condición')) {
      return {
        type: 'structure',
        icon: '🏗️',
        bgColor: 'bg-indigo-50',
        borderColor: 'border-indigo-200',
        textColor: 'text-indigo-800'
      };
    } else {
      return {
        type: 'general',
        icon: 'ℹ️',
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-200',
        textColor: 'text-gray-800'
      };
    }
  };

  const getStatsFromInfo = () => {
    const errors = info.filter(item => item.includes('❌')).length;
    const warnings = info.filter(item => item.includes('⚠️')).length;
    const successes = info.filter(item => item.includes('✓')).length;
    const variables = info.filter(item => item.toLowerCase().includes('variable')).length;
    const iterations = info.find(item => item.includes('iteraciones'));
    
    return { errors, warnings, successes, variables, iterations };
  };

  const stats = getStatsFromInfo();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
        🧠 Análisis Semántico
        <span className="ml-2 text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
          {info.length} análisis
        </span>
      </h2>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-red-50 p-3 rounded-lg border border-red-200 text-center">
          <div className="text-2xl font-bold text-red-700">{stats.errors}</div>
          <div className="text-xs text-red-600">Errores</div>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 text-center">
          <div className="text-2xl font-bold text-yellow-700">{stats.warnings}</div>
          <div className="text-xs text-yellow-600">Advertencias</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg border border-green-200 text-center">
          <div className="text-2xl font-bold text-green-700">{stats.successes}</div>
          <div className="text-xs text-green-600">Válidos</div>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-center">
          <div className="text-2xl font-bold text-blue-700">{stats.variables}</div>
          <div className="text-xs text-blue-600">Variables</div>
        </div>
      </div>

      {/* Lista de información semántica */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {info.map((infoItem, index) => {
          const category = categorizeInfo(infoItem);
          
          return (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 ${category.bgColor} ${category.borderColor}`}
            >
              <div className="flex items-start">
                <span className="text-xl mr-3 mt-1">{category.icon}</span>
                <div className="flex-1">
                  <p className={`text-sm leading-relaxed ${category.textColor}`}>
                    {infoItem}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Información adicional sobre iteraciones si existe */}
      {stats.iterations && (
        <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h3 className="font-semibold text-indigo-800 mb-2 flex items-center">
            🔢 Análisis de Iteraciones:
          </h3>
          <p className="text-sm text-indigo-700">{stats.iterations}</p>
        </div>
      )}

      {/* Resumen de análisis */}
      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">📋 Resumen del Análisis:</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <div>• Se analizaron {stats.variables} elementos relacionados con variables</div>
          <div>• Se detectaron {stats.errors} errores semánticos</div>
          <div>• Se generaron {stats.warnings} advertencias</div>
          <div>• Se confirmaron {stats.successes} elementos válidos</div>
        </div>
      </div>

      {/* Sugerencias según el tipo de errores */}
      {stats.errors > 0 && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="font-semibold text-red-800 mb-2 flex items-center">
            💡 Sugerencias de Corrección:
          </h3>
          <ul className="text-sm text-red-700 space-y-1">
            <li>• Asegúrate de que todas las variables estén declaradas antes de usarlas</li>
            <li>• Verifica que las variables en condiciones sean del tipo correcto</li>
            <li>• Usa .equals() para comparar Strings, no el operador ==</li>
            <li>• Confirma que los tipos de datos sean consistentes (int, String, boolean, double)</li>
            <li>• Verifica que la estructura de clase Java sea correcta (public class)</li>
            <li>• Asegúrate de que el método main tenga la firma correcta</li>
          </ul>
        </div>
      )}

      {/* Información sobre análisis específicos de C/C++ */}
      {stats.warnings > 0 && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2 flex items-center">
            ⚠️ Consideraciones Importantes:
          </h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Las advertencias no impiden la compilación pero pueden indicar problemas lógicos</li>
            <li>• Variables no utilizadas ocupan memoria innecesariamente</li>
            <li>• Usar == para comparar Strings puede dar resultados inesperados</li>
            <li>• Verifica que las condiciones de if sean lógicamente correctas</li>
            <li>• Considera usar métodos apropiados para cada tipo de dato</li>
          </ul>
        </div>
      )}

      {/* Información técnica específica para Java */}
      <div className="mt-4 p-3 bg-cyan-50 border border-cyan-200 rounded text-xs text-cyan-700">
        <span className="font-semibold">Análisis Java:</span> El análisis semántico verifica la coherencia lógica 
        específica del lenguaje Java, incluyendo estructura de clases, declaración de tipos, uso correcto de métodos 
        como .equals() para Strings, y detección de errores semánticos comunes en programación orientada a objetos.
      </div>

      {/* Métricas de calidad del código */}
      {stats.successes > 0 && stats.errors === 0 && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2 flex items-center">
            🏆 Calidad del Código:
          </h3>
          <div className="text-sm text-green-700">
            <div className="flex justify-between items-center">
              <span>Elementos válidos:</span>
              <span className="font-bold">{stats.successes}</span>
            </div>
            <div className="w-full bg-green-200 rounded-full h-2 mt-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${Math.min(100, (stats.successes / (stats.successes + stats.errors + stats.warnings)) * 100)}%` }}
              ></div>
            </div>
            <p className="mt-2 text-xs">
              {stats.errors === 0 ? '¡Excelente! Tu código no tiene errores semánticos.' : 'Buen trabajo, pero revisa los errores mencionados.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SemanticInfo;
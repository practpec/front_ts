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
    
    if (item.includes('❌') || item.includes('error')) {
      return {
        type: 'error',
        icon: '❌',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-800'
      };
    } else if (item.includes('⚠️') || item.includes('advertencia') || item.includes('posible')) {
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

      {/* Resumen de estadísticas */}
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
          <div className="text-xs text-green-600">Validaciones</div>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-center">
          <div className="text-2xl font-bold text-blue-700">{stats.variables}</div>
          <div className="text-xs text-blue-600">Variables</div>
        </div>
      </div>

      {/* Lista de información semántica */}
      <div className="space-y-3">
        {info.map((infoItem, index) => {
          const category = categorizeInfo(infoItem);
          
          return (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 ${category.bgColor} ${category.borderColor} ${category.textColor}`}
            >
              <div className="flex items-start">
                <span className="text-xl mr-3 mt-0.5">{category.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-xs uppercase tracking-wide">
                      {category.type}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">
                    {infoItem}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Información sobre iteraciones si está disponible */}
      {stats.iterations && (
        <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-semibold text-purple-800 mb-2 flex items-center">
            🔢 Análisis de Complejidad:
          </h3>
          <p className="text-sm text-purple-700">
            {stats.iterations}
          </p>
        </div>
      )}

      {/* Resumen del análisis */}
      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">📋 Resumen del Análisis Semántico:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Scope de Variables:</span>
            <span className="ml-2 text-gray-600">Verificación de declaración y uso</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Coherencia de Bucles:</span>
            <span className="ml-2 text-gray-600">Validación de estructura y lógica</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Tipos de Datos:</span>
            <span className="ml-2 text-gray-600">Compatibilidad y conversiones</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Flujo de Control:</span>
            <span className="ml-2 text-gray-600">Análisis de condiciones e incrementos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SemanticInfo;
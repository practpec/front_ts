

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
    } else if (item.includes('variable') && item.includes('declarada')) {
      return {
        type: 'info',
        icon: '📝',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-800'
      };
    } else if (item.includes('bucle') || item.includes('for')) {
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
    const warnings = info.filter(item => item.includes('⚠️')).length;
    const successes = info.filter(item => item.includes('✓')).length;
    const variables = info.filter(item => item.toLowerCase().includes('variable')).length;
    const iterations = info.find(item => item.includes('iteraciones'));
    
    return { warnings, successes, variables, iterations };
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
      </div>)};

export default SemanticInfo;
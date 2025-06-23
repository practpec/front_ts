import { Token } from '../types/AnalysisTypes';

interface TokenDisplayProps {
  tokens: Token[];
}

const TokenDisplay: React.FC<TokenDisplayProps> = ({ tokens }) => {
  const getTokenColor = (tokenType: string): string => {
    const colors: { [key: string]: string } = {
      'FOR': 'bg-purple-100 text-purple-800 border-purple-300',
      'DO': 'bg-purple-100 text-purple-800 border-purple-300',
      'WHILE': 'bg-purple-100 text-purple-800 border-purple-300',
      'IDENTIFIER': 'bg-blue-100 text-blue-800 border-blue-300',
      'NUMBER': 'bg-green-100 text-green-800 border-green-300',
      'OPERATOR': 'bg-orange-100 text-orange-800 border-orange-300',
      'COMPARISON': 'bg-red-100 text-red-800 border-red-300',
      'ASSIGNMENT': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'INCREMENT': 'bg-pink-100 text-pink-800 border-pink-300',
      'KEYWORD': 'bg-indigo-100 text-indigo-800 border-indigo-300',
      'TYPE': 'bg-cyan-100 text-cyan-800 border-cyan-300',
      'STRING': 'bg-emerald-100 text-emerald-800 border-emerald-300',
      'LPAREN': 'bg-gray-100 text-gray-800 border-gray-300',
      'RPAREN': 'bg-gray-100 text-gray-800 border-gray-300',
      'LBRACE': 'bg-gray-100 text-gray-800 border-gray-300',
      'RBRACE': 'bg-gray-100 text-gray-800 border-gray-300',
      'SEMICOLON': 'bg-gray-100 text-gray-800 border-gray-300',
      'COLON': 'bg-gray-100 text-gray-800 border-gray-300',
      'UNKNOWN': 'bg-red-200 text-red-900 border-red-400'
    };
    
    return colors[tokenType] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getTokenIcon = (tokenType: string): string => {
    const icons: { [key: string]: string } = {
      'FOR': '🔄',
      'DO': '🔄',
      'WHILE': '🔄',
      'IDENTIFIER': '🏷️',
      'NUMBER': '🔢',
      'OPERATOR': '➕',
      'COMPARISON': '⚖️',
      'ASSIGNMENT': '📝',
      'INCREMENT': '⬆️',
      'KEYWORD': '🔑',
      'TYPE': '📋',
      'STRING': '📄',
      'LPAREN': '(',
      'RPAREN': ')',
      'LBRACE': '{',
      'RBRACE': '}',
      'SEMICOLON': ';',
      'COLON': ':',
      'UNKNOWN': '❓'
    };
    
    return icons[tokenType] || '❓';
  };

  if (tokens.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
        🔍 Análisis Léxico - Tokens Encontrados
        <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          {tokens.length} tokens
        </span>
      </h2>
      
      <div className="space-y-4">
        {/* Vista de tokens como etiquetas */}
        <div>
          <h3 className="text-lg font-medium mb-2 text-gray-600">Vista Visual:</h3>
          <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg border">
            {tokens.map((token, index) => (
              <span
                key={index}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getTokenColor(token.type)}`}
                title={`Tipo: ${token.type} | Línea: ${token.line} | Columna: ${token.column}`}
              >
                <span className="mr-1">{getTokenIcon(token.type)}</span>
                {token.value}
              </span>
            ))}
          </div>
        </div>

        {/* Tabla detallada */}
        <div>
          <h3 className="text-lg font-medium mb-2 text-gray-600">Detalles de Tokens:</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    #
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Valor
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Tipo
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Posición
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Línea:Columna
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tokens.map((token, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 text-sm font-mono bg-gray-100 rounded">
                      <span className="mr-1">{getTokenIcon(token.type)}</span>
                      "{token.value}"
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getTokenColor(token.type)}`}>
                        {token.type}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500 font-mono">
                      {token.position}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500 font-mono">
                      {token.line}:{token.column}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-lg font-medium mb-2 text-blue-800">📊 Estadísticas:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="font-semibold text-blue-700">Total Tokens</div>
              <div className="text-2xl font-bold text-blue-800">{tokens.length}</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-blue-700">Identificadores</div>
              <div className="text-2xl font-bold text-blue-800">
                {tokens.filter(t => t.type === 'IDENTIFIER').length}
              </div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-blue-700">Operadores</div>
              <div className="text-2xl font-bold text-blue-800">
                {tokens.filter(t => ['OPERATOR', 'COMPARISON', 'ASSIGNMENT', 'INCREMENT'].includes(t.type)).length}
              </div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-blue-700">Símbolos</div>
              <div className="text-2xl font-bold text-blue-800">
                {tokens.filter(t => ['LPAREN', 'RPAREN', 'LBRACE', 'RBRACE', 'SEMICOLON'].includes(t.type)).length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDisplay;
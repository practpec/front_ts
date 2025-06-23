import React from 'react';
import { Token } from '../types/AnalysisTypes';

interface LexicalTableProps {
  tokens: Token[];
}

interface TokenStats {
  palabrasReservadas: number;
  identificadores: number;
  numeros: number;
  simbolos: number;
  errores: number;
}

const LexicalTable: React.FC<LexicalTableProps> = ({ tokens }) => {
  const getTokenCategory = (tokenType: string): keyof TokenStats => {
    switch (tokenType) {
      case 'FOR':
      case 'DO':
      case 'WHILE':
      case 'KEYWORD':
      case 'TYPE':
        return 'palabrasReservadas';
      case 'IDENTIFIER':
        return 'identificadores';
      case 'NUMBER':
        return 'numeros';
      case 'LPAREN':
      case 'RPAREN':
      case 'LBRACE':
      case 'RBRACE':
      case 'SEMICOLON':
      case 'OPERATOR':
      case 'COMPARISON':
      case 'ASSIGNMENT':
      case 'INCREMENT':
        return 'simbolos';
      case 'UNKNOWN':
        return 'errores';
      default:
        return 'simbolos';
    }
  };

  const calculateStats = (): TokenStats => {
    const stats: TokenStats = {
      palabrasReservadas: 0,
      identificadores: 0,
      numeros: 0,
      simbolos: 0,
      errores: 0
    };

    tokens.forEach(token => {
      const category = getTokenCategory(token.type);
      stats[category]++;
    });

    return stats;
  };

  const stats = calculateStats();

  if (tokens.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700 flex items-center">
        📊 Analizador Léxico
      </h2>

      {/* Tabla principal como en la imagen */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Tokens</th>
              <th className="border border-gray-300 px-4 py-2 text-center font-semibold">PR</th>
              <th className="border border-gray-300 px-4 py-2 text-center font-semibold">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-center font-semibold">Números</th>
              <th className="border border-gray-300 px-4 py-2 text-center font-semibold">Símbolos</th>
              <th className="border border-gray-300 px-4 py-2 text-center font-semibold">Error</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token, index) => {
              const category = getTokenCategory(token.type);
              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-mono">
                    {token.value}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {category === 'palabrasReservadas' ? 'x' : ''}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {category === 'identificadores' ? 'x' : ''}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {category === 'numeros' ? 'x' : ''}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {category === 'simbolos' ? 'x' : ''}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {category === 'errores' ? 'x' : ''}
                  </td>
                </tr>
              );
            })}
            {/* Fila de totales */}
            <tr className="bg-gray-100 font-semibold">
              <td className="border border-gray-300 px-4 py-2">Total</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {stats.palabrasReservadas}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {stats.identificadores}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {stats.numeros}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {stats.simbolos}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {stats.errores}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Resumen estadístico */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-center">
          <div className="text-2xl font-bold text-blue-700">{stats.palabrasReservadas}</div>
          <div className="text-xs text-blue-600">Palabras Reservadas</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg border border-green-200 text-center">
          <div className="text-2xl font-bold text-green-700">{stats.identificadores}</div>
          <div className="text-xs text-green-600">Identificadores</div>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 text-center">
          <div className="text-2xl font-bold text-yellow-700">{stats.numeros}</div>
          <div className="text-xs text-yellow-600">Números</div>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg border border-purple-200 text-center">
          <div className="text-2xl font-bold text-purple-700">{stats.simbolos}</div>
          <div className="text-xs text-purple-600">Símbolos</div>
        </div>
        <div className="bg-red-50 p-3 rounded-lg border border-red-200 text-center">
          <div className="text-2xl font-bold text-red-700">{stats.errores}</div>
          <div className="text-xs text-red-600">Errores</div>
        </div>
      </div>

      {/* Clasificación detallada */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Clasificación de Tokens:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-blue-700">Palabras Reservadas:</span>
            <span className="ml-2 text-gray-600">for, do, while, let, const, var, int, string, number</span>
          </div>
          <div>
            <span className="font-medium text-green-700">Identificadores:</span>
            <span className="ml-2 text-gray-600">Variables y nombres definidos por el usuario</span>
          </div>
          <div>
            <span className="font-medium text-yellow-700">Números:</span>
            <span className="ml-2 text-gray-600">Valores numéricos enteros y decimales</span>
          </div>
          <div>
            <span className="font-medium text-purple-700">Símbolos:</span>
            <span className="ml-2 text-gray-600">Operadores, paréntesis, llaves, punto y coma</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LexicalTable;
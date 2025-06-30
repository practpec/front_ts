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
      name: "Clase básica Java",
      code: `public class ejercicio {
    public static void main(String[] args) {
        int edad = 22;
        String escuela = "upchiapas";
        if (edad > 18) {
            System.out.println("Mayor de edad");
        }
        if (escuela.equals("upchiapas")) {
            System.out.println("Bienvenido a UPChiapas");
        }
    }
}`
    },
    {
      name: "Variables con errores",
      code: `public class Test {
    public static void main(String[] args) {
        int edad = "veinte";
        String nombre = 25;
        if (edad > 18) {
            System.out.println("Mayor");
        }
    }
}`
    },
    {
      name: "If sin llaves",
      code: `public class Test {
    public static void main(String[] args) {
        int x = 10;
        if (x > 5)
            System.out.println("Mayor que 5");
    }
}`
    },
    {
      name: "Comparación incorrecta",
      code: `public class Test {
    public static void main(String[] args) {
        String nombre = "Juan";
        if (nombre == "Juan") {
            System.out.println("Hola Juan");
        }
    }
}`
    },
    {
      name: "Variable no declarada",
      code: `public class Test {
    public static void main(String[] args) {
        int edad = 20;
        if (altura > 170) {
            System.out.println("Alto");
        }
    }
}`
    },
    {
      name: "Múltiples variables",
      code: `public class Test {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;
        String mensaje = "Suma:";
        int suma = a + b;
        System.out.println(mensaje);
        System.out.println(suma);
    }
}`
    },
    {
      name: "Estructura completa",
      code: `public class Calculadora {
    public static void main(String[] args) {
        int num1 = 15;
        int num2 = 25;
        String operacion = "suma";
        if (num1 > 10) {
            System.out.println("Número válido");
        }
        if (operacion.equals("suma")) {
            System.out.println("Realizando suma");
        }
    }
}`
    },
    {
      name: "Errores múltiples",
      code: `public class Error {
    public static void main(String[] args) {
        int edad = 25abc;
        String nombre;
        if (peso > 70) {
            System.out.println("Pesado");
        }
    }
}`
    }
  ];

  return (
    <div className="space-y-4">

      {/* Editor de código */}
      <div>
        <label htmlFor="code-editor" className="block text-lg font-medium mb-2 text-gray-700">
          Código Java:
        </label>
        <textarea
          id="code-editor"
          value={code}
          onChange={handleCodeChange}
          className="w-full h-64 p-4 border border-gray-300 rounded-lg 
                     font-mono text-sm bg-gray-50 focus:ring-2 
                     focus:ring-blue-500 focus:border-transparent
                     resize-none"
          placeholder="Escribe tu código Java aquí..."
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
        <h4 className="text-sm font-semibold text-blue-800 mb-1">💡 Consejos Java:</h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Toda clase debe tener modificador 'public' y método main</li>
          <li>• Las variables deben declararse con tipo explícito (int, String, etc.)</li>
          <li>• Usar .equals() para comparar Strings, no ==</li>
          <li>• System.out.println() para imprimir mensajes</li>
          <li>• Cada declaración debe terminar con punto y coma (;)</li>
        </ul>
      </div>
    </div>
  );
};

export default CodeEditor;
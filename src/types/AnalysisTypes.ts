export interface Token {
  type: string;
  value: string;
  position: number;
  line: number;
  column: number;
}

export interface AnalysisResult {
  isValid: boolean;
  tokens: Token[];
  syntaxErrors: string[];
  semanticInfo: string[];
}

export interface PerformanceMetrics {
  executionTime: string;
  memoryUsage: string;
  allocatedBytes: number;
  totalAllocs: number;
  gcCycles: number;
  cpuUsage: number;
}

export interface AnalysisWithMetrics {
  isValid: boolean;
  tokens: Token[];
  syntaxErrors: string[];
  semanticInfo: string[];
  metrics: PerformanceMetrics;
}

export interface AnalysisRequest {
  code: string;
}
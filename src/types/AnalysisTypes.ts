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

export interface AnalysisRequest {
  code: string;
}
/**
 * @fileoverview Configuração do Jest para Next.js 16
 * @description Define as configurações de teste para o ambiente de testes unitários
 * 
 * Recursos utilizados:
 * - ts-jest: Suporte a TypeScript
 * - jsdom: Ambiente de DOM para testes de componentes React
 * - moduleNameMapper: Mapeamento de aliases de importação
 */

const nextJest = require('next/jest');

// Cria a configuração base do Jest com suporte ao Next.js
const createJestConfig = nextJest({
  // Caminho para o diretório do Next.js para carregar next.config.js e .env
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  // Ambiente de teste para simular o DOM do navegador
  testEnvironment: 'jsdom',
  
  // Arquivo de setup para configurações globais (como matchers do Testing Library)
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  
  // Mapeamento de módulos para resolver aliases do TypeScript
  moduleNameMapper: {
    // Suporte ao alias @ para imports
    '^@/(.*)$': '<rootDir>/$1',
    
    // Mock para CSS Modules - retorna um objeto vazio para evitar erros
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  
  // Padrões de arquivos de teste
  testMatch: [
    '**/__tests__/**/*.(test|spec).(ts|tsx)',
    '**/*.(test|spec).(ts|tsx)',
  ],
  
  // Arquivos a serem ignorados nos testes
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
  ],
  
  // Transformações de arquivo
  transform: {
    // Usa ts-jest para arquivos TypeScript
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.json',
    }],
  },
  
  // Cobertura de código
  collectCoverageFrom: [
    'lib/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'app/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
  ],
  
  // Diretório de saída para relatórios de cobertura
  coverageDirectory: '<rootDir>/coverage',
  
  // Formatos de relatório de cobertura
  coverageReporters: ['text', 'lcov', 'html'],
  
  // Limiares mínimos de cobertura
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  
  // Extensões de módulo reconhecidas
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // Modo verboso para output detalhado
  verbose: true,
};

// Exporta a configuração combinada
module.exports = createJestConfig(customJestConfig);

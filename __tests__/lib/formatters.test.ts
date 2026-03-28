/**
 * @fileoverview Testes unitários para funções de formatação
 * @description Valida todas as funções de formatação de dados
 * 
 * Princípios aplicados:
 * - SRP (Single Responsibility): Cada teste valida uma única funcionalidade
 * - AAA (Arrange-Act-Assert): Estrutura clara para cada caso de teste
 * - DRY: Uso de describe blocks para agrupar testes relacionados
 */

import {
  formatCurrency,
  formatDate,
  formatDateRelative,
  formatDistance,
  formatWeight,
  formatPhone,
  formatCPF,
  formatCNPJ,
  slugify,
  truncate,
  capitalizeWords,
  getInitials,
} from '@/lib/formatters';

// =============================================================================
// TESTES DE FORMATAÇÃO DE MOEDA
// =============================================================================

describe('formatCurrency', () => {
  /**
   * Testa formatação básica de valores monetários
   * Deve seguir o padrão brasileiro (R$ X.XXX,XX)
   */
  it('deve formatar valores inteiros corretamente', () => {
    // Arrange
    const value = 1000;
    
    // Act
    const result = formatCurrency(value);
    
    // Assert
    expect(result).toBe('R$ 1.000,00');
  });

  it('deve formatar valores com centavos', () => {
    expect(formatCurrency(1234.56)).toBe('R$ 1.234,56');
  });

  it('deve formatar valores negativos', () => {
    expect(formatCurrency(-500)).toBe('-R$ 500,00');
  });

  it('deve formatar zero corretamente', () => {
    expect(formatCurrency(0)).toBe('R$ 0,00');
  });

  it('deve arredondar valores com mais de 2 casas decimais', () => {
    expect(formatCurrency(99.999)).toBe('R$ 100,00');
  });

  it('deve formatar valores grandes (milhões)', () => {
    expect(formatCurrency(1500000)).toBe('R$ 1.500.000,00');
  });
});

// =============================================================================
// TESTES DE FORMATAÇÃO DE DATA
// =============================================================================

describe('formatDate', () => {
  /**
   * Testa formatação de datas para o padrão brasileiro
   */
  it('deve formatar data no padrão brasileiro (DD/MM/YYYY)', () => {
    const date = new Date('2024-03-15');
    expect(formatDate(date)).toBe('15/03/2024');
  });

  it('deve aceitar string ISO como entrada', () => {
    expect(formatDate('2024-12-25')).toBe('25/12/2024');
  });

  it('deve lidar com primeiro dia do mês', () => {
    expect(formatDate('2024-01-01')).toBe('01/01/2024');
  });

  it('deve lidar com último dia do mês', () => {
    expect(formatDate('2024-02-29')).toBe('29/02/2024'); // Ano bissexto
  });
});

describe('formatDateRelative', () => {
  /**
   * Testa formatação de datas relativas (há X dias, há X horas, etc.)
   * Usa mocks para controlar o tempo atual
   */
  beforeEach(() => {
    // Mock da data atual para testes consistentes
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-03-15T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('deve mostrar "agora mesmo" para datas recentes', () => {
    const date = new Date('2024-03-15T11:59:30Z'); // 30 segundos atrás
    expect(formatDateRelative(date)).toContain('agora');
  });

  it('deve mostrar minutos para datas de até 1 hora', () => {
    const date = new Date('2024-03-15T11:30:00Z'); // 30 minutos atrás
    expect(formatDateRelative(date)).toContain('30');
  });

  it('deve mostrar horas para datas do mesmo dia', () => {
    const date = new Date('2024-03-15T09:00:00Z'); // 3 horas atrás
    expect(formatDateRelative(date)).toContain('3');
  });
});

// =============================================================================
// TESTES DE FORMATAÇÃO DE DISTÂNCIA
// =============================================================================

describe('formatDistance', () => {
  /**
   * Testa formatação de distância em quilômetros
   */
  it('deve formatar distância em km', () => {
    expect(formatDistance(150)).toBe('150 km');
  });

  it('deve formatar distância com uma casa decimal', () => {
    expect(formatDistance(150.5)).toBe('150,5 km');
  });

  it('deve usar separador de milhares', () => {
    expect(formatDistance(1500)).toBe('1.500 km');
  });

  it('deve lidar com zero', () => {
    expect(formatDistance(0)).toBe('0 km');
  });
});

// =============================================================================
// TESTES DE FORMATAÇÃO DE PESO
// =============================================================================

describe('formatWeight', () => {
  /**
   * Testa formatação de peso em quilogramas ou toneladas
   */
  it('deve formatar peso em kg para valores menores que 1000', () => {
    expect(formatWeight(500)).toBe('500 kg');
  });

  it('deve converter para toneladas valores >= 1000', () => {
    expect(formatWeight(1500)).toBe('1,5 t');
  });

  it('deve usar uma casa decimal para toneladas', () => {
    expect(formatWeight(2500)).toBe('2,5 t');
  });

  it('deve lidar com valores exatos em toneladas', () => {
    expect(formatWeight(3000)).toBe('3 t');
  });
});

// =============================================================================
// TESTES DE FORMATAÇÃO DE TELEFONE
// =============================================================================

describe('formatPhone', () => {
  /**
   * Testa formatação de números de telefone brasileiros
   */
  it('deve formatar telefone celular com 11 dígitos', () => {
    expect(formatPhone('11999887766')).toBe('(11) 99988-7766');
  });

  it('deve formatar telefone fixo com 10 dígitos', () => {
    expect(formatPhone('1133445566')).toBe('(11) 3344-5566');
  });

  it('deve remover caracteres não numéricos antes de formatar', () => {
    expect(formatPhone('(11) 99988-7766')).toBe('(11) 99988-7766');
  });

  it('deve retornar vazio para telefone inválido', () => {
    expect(formatPhone('123')).toBe('');
  });
});

// =============================================================================
// TESTES DE FORMATAÇÃO DE CPF
// =============================================================================

describe('formatCPF', () => {
  /**
   * Testa formatação de CPF no padrão XXX.XXX.XXX-XX
   */
  it('deve formatar CPF corretamente', () => {
    expect(formatCPF('12345678901')).toBe('123.456.789-01');
  });

  it('deve remover caracteres não numéricos antes de formatar', () => {
    expect(formatCPF('123.456.789-01')).toBe('123.456.789-01');
  });

  it('deve retornar vazio para CPF inválido', () => {
    expect(formatCPF('1234')).toBe('');
  });
});

// =============================================================================
// TESTES DE FORMATAÇÃO DE CNPJ
// =============================================================================

describe('formatCNPJ', () => {
  /**
   * Testa formatação de CNPJ no padrão XX.XXX.XXX/XXXX-XX
   */
  it('deve formatar CNPJ corretamente', () => {
    expect(formatCNPJ('12345678000199')).toBe('12.345.678/0001-99');
  });

  it('deve remover caracteres não numéricos antes de formatar', () => {
    expect(formatCNPJ('12.345.678/0001-99')).toBe('12.345.678/0001-99');
  });

  it('deve retornar vazio para CNPJ inválido', () => {
    expect(formatCNPJ('12345')).toBe('');
  });
});

// =============================================================================
// TESTES DE UTILITÁRIOS DE STRING
// =============================================================================

describe('slugify', () => {
  /**
   * Testa conversão de texto para URL-friendly slug
   */
  it('deve converter para minúsculas', () => {
    expect(slugify('TESTE')).toBe('teste');
  });

  it('deve substituir espaços por hífens', () => {
    expect(slugify('teste de slug')).toBe('teste-de-slug');
  });

  it('deve remover acentos', () => {
    expect(slugify('São Paulo')).toBe('sao-paulo');
  });

  it('deve remover caracteres especiais', () => {
    expect(slugify('teste@#$%especial')).toBe('testeespecial');
  });

  it('deve consolidar múltiplos hífens', () => {
    expect(slugify('teste   multiplos   espacos')).toBe('teste-multiplos-espacos');
  });

  it('deve remover hífens do início e fim', () => {
    expect(slugify(' teste ')).toBe('teste');
  });
});

describe('truncate', () => {
  /**
   * Testa truncamento de texto com reticências
   */
  it('não deve truncar texto menor que o limite', () => {
    expect(truncate('texto curto', 20)).toBe('texto curto');
  });

  it('deve truncar texto maior que o limite', () => {
    expect(truncate('texto muito longo para exibir', 10)).toBe('texto m...');
  });

  it('deve usar sufixo customizado', () => {
    expect(truncate('texto longo', 8, '→')).toBe('texto l→');
  });

  it('deve lidar com limite igual ao tamanho do texto', () => {
    expect(truncate('exato', 5)).toBe('exato');
  });
});

describe('capitalizeWords', () => {
  /**
   * Testa capitalização de palavras (primeira letra maiúscula)
   */
  it('deve capitalizar cada palavra', () => {
    expect(capitalizeWords('joão da silva')).toBe('João Da Silva');
  });

  it('deve lidar com texto em maiúsculas', () => {
    expect(capitalizeWords('JOÃO SILVA')).toBe('João Silva');
  });

  it('deve lidar com string vazia', () => {
    expect(capitalizeWords('')).toBe('');
  });
});

describe('getInitials', () => {
  /**
   * Testa extração de iniciais de um nome
   */
  it('deve retornar duas iniciais para nome completo', () => {
    expect(getInitials('João Silva')).toBe('JS');
  });

  it('deve retornar uma inicial para nome simples', () => {
    expect(getInitials('João')).toBe('J');
  });

  it('deve ignorar nomes do meio', () => {
    expect(getInitials('João Carlos Silva')).toBe('JS');
  });

  it('deve lidar com string vazia', () => {
    expect(getInitials('')).toBe('');
  });

  it('deve converter para maiúsculas', () => {
    expect(getInitials('joão silva')).toBe('JS');
  });
});

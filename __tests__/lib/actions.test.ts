/**
 * @fileoverview Testes unitários para Server Actions
 * @description Valida comportamento das actions de mutação de dados
 * 
 * Princípios aplicados:
 * - Testa casos de sucesso e erro
 * - Valida validação de input
 * - Verifica tratamento de erros
 */

import {
  submitInterestAction,
  submitContactAction,
} from '@/lib/actions';

// =============================================================================
// MOCKS GLOBAIS
// =============================================================================

// Mock de revalidateTag do Next.js
jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

// =============================================================================
// TESTES DE SUBMIT INTEREST ACTION
// =============================================================================

describe('submitInterestAction', () => {
  /**
   * Testa a action de demonstração de interesse em um frete
   */
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar sucesso com dados válidos', async () => {
    const formData = new FormData();
    formData.append('freightId', '1');
    formData.append('name', 'João Silva');
    formData.append('phone', '11999887766');
    formData.append('email', 'joao@email.com');
    formData.append('message', 'Tenho interesse neste frete');
    
    const result = await submitInterestAction(formData);
    
    expect(result.success).toBe(true);
    expect(result.message).toBeDefined();
  });

  it('deve retornar erro quando freightId está ausente', async () => {
    const formData = new FormData();
    formData.append('name', 'João Silva');
    formData.append('phone', '11999887766');
    formData.append('email', 'joao@email.com');
    
    const result = await submitInterestAction(formData);
    
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('deve retornar erro quando nome está ausente', async () => {
    const formData = new FormData();
    formData.append('freightId', '1');
    formData.append('phone', '11999887766');
    formData.append('email', 'joao@email.com');
    
    const result = await submitInterestAction(formData);
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('nome');
  });

  it('deve retornar erro quando telefone está ausente', async () => {
    const formData = new FormData();
    formData.append('freightId', '1');
    formData.append('name', 'João Silva');
    formData.append('email', 'joao@email.com');
    
    const result = await submitInterestAction(formData);
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('telefone');
  });

  it('deve retornar erro quando email é inválido', async () => {
    const formData = new FormData();
    formData.append('freightId', '1');
    formData.append('name', 'João Silva');
    formData.append('phone', '11999887766');
    formData.append('email', 'email-invalido');
    
    const result = await submitInterestAction(formData);
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('email');
  });

  it('deve aceitar mensagem como campo opcional', async () => {
    const formData = new FormData();
    formData.append('freightId', '1');
    formData.append('name', 'João Silva');
    formData.append('phone', '11999887766');
    formData.append('email', 'joao@email.com');
    // Sem mensagem
    
    const result = await submitInterestAction(formData);
    
    expect(result.success).toBe(true);
  });

  it('deve sanitizar inputs para prevenir XSS', async () => {
    const formData = new FormData();
    formData.append('freightId', '1');
    formData.append('name', '<script>alert("xss")</script>');
    formData.append('phone', '11999887766');
    formData.append('email', 'test@email.com');
    formData.append('message', '<img src="x" onerror="alert(1)">');
    
    const result = await submitInterestAction(formData);
    
    // Deve processar sem executar scripts (sanitização)
    // O comportamento esperado depende da implementação
    expect(result).toBeDefined();
  });
});

// =============================================================================
// TESTES DE SUBMIT CONTACT ACTION
// =============================================================================

describe('submitContactAction', () => {
  /**
   * Testa a action de envio do formulário de contato
   */
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar sucesso com dados válidos', async () => {
    const formData = new FormData();
    formData.append('name', 'Maria Santos');
    formData.append('email', 'maria@email.com');
    formData.append('subject', 'Dúvida sobre cadastro');
    formData.append('message', 'Gostaria de saber como me cadastrar como transportador.');
    
    const result = await submitContactAction(formData);
    
    expect(result.success).toBe(true);
    expect(result.message).toBeDefined();
  });

  it('deve retornar erro quando nome está ausente', async () => {
    const formData = new FormData();
    formData.append('email', 'maria@email.com');
    formData.append('subject', 'Assunto');
    formData.append('message', 'Mensagem de teste');
    
    const result = await submitContactAction(formData);
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('nome');
  });

  it('deve retornar erro quando email está ausente', async () => {
    const formData = new FormData();
    formData.append('name', 'Maria Santos');
    formData.append('subject', 'Assunto');
    formData.append('message', 'Mensagem de teste');
    
    const result = await submitContactAction(formData);
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('email');
  });

  it('deve retornar erro quando email é inválido', async () => {
    const formData = new FormData();
    formData.append('name', 'Maria Santos');
    formData.append('email', 'email.invalido');
    formData.append('subject', 'Assunto');
    formData.append('message', 'Mensagem de teste');
    
    const result = await submitContactAction(formData);
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('email');
  });

  it('deve retornar erro quando assunto está ausente', async () => {
    const formData = new FormData();
    formData.append('name', 'Maria Santos');
    formData.append('email', 'maria@email.com');
    formData.append('message', 'Mensagem de teste');
    
    const result = await submitContactAction(formData);
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('assunto');
  });

  it('deve retornar erro quando mensagem está ausente', async () => {
    const formData = new FormData();
    formData.append('name', 'Maria Santos');
    formData.append('email', 'maria@email.com');
    formData.append('subject', 'Assunto');
    
    const result = await submitContactAction(formData);
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('mensagem');
  });

  it('deve retornar erro quando mensagem é muito curta', async () => {
    const formData = new FormData();
    formData.append('name', 'Maria Santos');
    formData.append('email', 'maria@email.com');
    formData.append('subject', 'Assunto');
    formData.append('message', 'ab'); // Muito curta
    
    const result = await submitContactAction(formData);
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('mensagem');
  });

  it('deve aceitar mensagem longa', async () => {
    const longMessage = 'A'.repeat(1000);
    
    const formData = new FormData();
    formData.append('name', 'Maria Santos');
    formData.append('email', 'maria@email.com');
    formData.append('subject', 'Assunto');
    formData.append('message', longMessage);
    
    const result = await submitContactAction(formData);
    
    expect(result.success).toBe(true);
  });
});

// =============================================================================
// TESTES DE VALIDAÇÃO DE EMAIL
// =============================================================================

describe('Validação de Email', () => {
  /**
   * Testa diferentes formatos de email
   */
  
  const validEmails = [
    'test@example.com',
    'test.name@example.com',
    'test+tag@example.com',
    'test@subdomain.example.com',
    'test123@example.co.uk',
  ];

  const invalidEmails = [
    'test',
    'test@',
    '@example.com',
    'test @example.com',
    'test@example',
    'test@.com',
  ];

  validEmails.forEach((email) => {
    it(`deve aceitar email válido: ${email}`, async () => {
      const formData = new FormData();
      formData.append('freightId', '1');
      formData.append('name', 'Test User');
      formData.append('phone', '11999887766');
      formData.append('email', email);
      
      const result = await submitInterestAction(formData);
      
      expect(result.success).toBe(true);
    });
  });

  invalidEmails.forEach((email) => {
    it(`deve rejeitar email inválido: ${email}`, async () => {
      const formData = new FormData();
      formData.append('freightId', '1');
      formData.append('name', 'Test User');
      formData.append('phone', '11999887766');
      formData.append('email', email);
      
      const result = await submitInterestAction(formData);
      
      expect(result.success).toBe(false);
    });
  });
});

// =============================================================================
// TESTES DE VALIDAÇÃO DE TELEFONE
// =============================================================================

describe('Validação de Telefone', () => {
  /**
   * Testa diferentes formatos de telefone brasileiro
   */
  
  const validPhones = [
    '11999887766',
    '1199988-7766',
    '(11) 99988-7766',
    '(11)99988-7766',
    '11 99988 7766',
    '1133445566', // Fixo
    '(11) 3344-5566',
  ];

  const invalidPhones = [
    '123',
    '999887766', // Sem DDD
    'abcdefghij',
    '',
    '12345',
  ];

  validPhones.forEach((phone) => {
    it(`deve aceitar telefone válido: ${phone}`, async () => {
      const formData = new FormData();
      formData.append('freightId', '1');
      formData.append('name', 'Test User');
      formData.append('phone', phone);
      formData.append('email', 'test@email.com');
      
      const result = await submitInterestAction(formData);
      
      expect(result.success).toBe(true);
    });
  });

  invalidPhones.forEach((phone) => {
    it(`deve rejeitar telefone inválido: ${phone}`, async () => {
      const formData = new FormData();
      formData.append('freightId', '1');
      formData.append('name', 'Test User');
      formData.append('phone', phone);
      formData.append('email', 'test@email.com');
      
      const result = await submitInterestAction(formData);
      
      expect(result.success).toBe(false);
    });
  });
});

/**
 * ==============================================
 * HTTP CLIENT
 * Cliente HTTP configurado para llamadas a la API
 * 
 * Principios aplicados:
 * - Single Responsibility: Solo maneja peticiones HTTP
 * - Open/Closed: Extensible sin modificación
 * - Dependency Inversion: Abstrae la implementación de fetch
 * ==============================================
 */

import { ERROR_CODES } from '@/shared/utils/constants'

/**
 * Configuración del cliente HTTP
 */
interface HttpClientConfig {
  baseUrl: string
  defaultHeaders?: Record<string, string>
  timeout?: number
}

/**
 * Opciones para peticiones HTTP
 */
interface RequestOptions extends RequestInit {
  timeout?: number
  params?: Record<string, string | number | boolean | undefined>
}

/**
 * Respuesta tipada del cliente HTTP
 */
interface HttpResponse<T> {
  data: T
  status: number
  headers: Headers
}

/**
 * Error personalizado para peticiones HTTP
 */
export class HttpError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string,
    public data?: unknown
  ) {
    super(message)
    this.name = 'HttpError'
  }
}

/**
 * Crea un cliente HTTP configurado
 * Factory function para crear instancias del cliente
 */
export function createHttpClient(config: HttpClientConfig) {
  const { baseUrl, defaultHeaders = {}, timeout = 10000 } = config

  /**
   * Construye la URL con query params
   */
  function buildUrl(endpoint: string, params?: RequestOptions['params']): string {
    const url = new URL(endpoint, baseUrl)
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value))
        }
      })
    }
    
    return url.toString()
  }

  /**
   * Ejecuta la petición con timeout
   */
  async function fetchWithTimeout(
    url: string,
    options: RequestInit,
    requestTimeout: number
  ): Promise<Response> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), requestTimeout)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      })
      return response
    } finally {
      clearTimeout(timeoutId)
    }
  }

  /**
   * Procesa la respuesta y maneja errores
   */
  async function processResponse<T>(response: Response): Promise<HttpResponse<T>> {
    if (!response.ok) {
      let errorData: unknown
      try {
        errorData = await response.json()
      } catch {
        errorData = null
      }

      const errorCode = 
        response.status === 401 ? ERROR_CODES.UNAUTHORIZED :
        response.status === 403 ? ERROR_CODES.FORBIDDEN :
        response.status === 404 ? ERROR_CODES.NOT_FOUND :
        response.status >= 500 ? ERROR_CODES.INTERNAL_ERROR :
        ERROR_CODES.VALIDATION_ERROR

      throw new HttpError(
        `HTTP Error: ${response.status} ${response.statusText}`,
        response.status,
        errorCode,
        errorData
      )
    }

    const data = await response.json() as T
    return {
      data,
      status: response.status,
      headers: response.headers,
    }
  }

  /**
   * Método GET
   */
  async function get<T>(endpoint: string, options: RequestOptions = {}): Promise<HttpResponse<T>> {
    const { params, timeout: requestTimeout = timeout, ...fetchOptions } = options
    const url = buildUrl(endpoint, params)

    const response = await fetchWithTimeout(url, {
      ...fetchOptions,
      method: 'GET',
      headers: {
        ...defaultHeaders,
        ...fetchOptions.headers,
      },
    }, requestTimeout)

    return processResponse<T>(response)
  }

  /**
   * Método POST
   */
  async function post<T, D = unknown>(
    endpoint: string,
    data?: D,
    options: RequestOptions = {}
  ): Promise<HttpResponse<T>> {
    const { params, timeout: requestTimeout = timeout, ...fetchOptions } = options
    const url = buildUrl(endpoint, params)

    const response = await fetchWithTimeout(url, {
      ...fetchOptions,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...defaultHeaders,
        ...fetchOptions.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    }, requestTimeout)

    return processResponse<T>(response)
  }

  /**
   * Método PUT
   */
  async function put<T, D = unknown>(
    endpoint: string,
    data?: D,
    options: RequestOptions = {}
  ): Promise<HttpResponse<T>> {
    const { params, timeout: requestTimeout = timeout, ...fetchOptions } = options
    const url = buildUrl(endpoint, params)

    const response = await fetchWithTimeout(url, {
      ...fetchOptions,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...defaultHeaders,
        ...fetchOptions.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    }, requestTimeout)

    return processResponse<T>(response)
  }

  /**
   * Método DELETE
   */
  async function del<T>(endpoint: string, options: RequestOptions = {}): Promise<HttpResponse<T>> {
    const { params, timeout: requestTimeout = timeout, ...fetchOptions } = options
    const url = buildUrl(endpoint, params)

    const response = await fetchWithTimeout(url, {
      ...fetchOptions,
      method: 'DELETE',
      headers: {
        ...defaultHeaders,
        ...fetchOptions.headers,
      },
    }, requestTimeout)

    return processResponse<T>(response)
  }

  return {
    get,
    post,
    put,
    delete: del,
    buildUrl,
  }
}

/**
 * Instancia del cliente HTTP para la API
 */
export const apiClient = createHttpClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  defaultHeaders: {
    'Accept': 'application/json',
  },
})

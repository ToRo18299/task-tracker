// Función utilitaria para llamadas REST genéricas
// Utilidad para llamadas REST genéricas (no se usa en modo frontend-only)
// Última edición: septiembre 2025
export async function api<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, { headers: { "Content-Type": "application/json" }, ...init });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}
// Función genérica para hacer llamadas a una API REST
// Usa fetch y maneja errores HTTP
// Retorna la respuesta parseada como JSON del tipo genérico T
// Se pueden pasar opciones adicionales a fetch vía init
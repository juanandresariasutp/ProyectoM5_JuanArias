export function formatNumber(value: number | string | undefined | null) {
  if (value === undefined || value === null || value === '') return ''
  const n = Number(value)
  if (Number.isNaN(n)) return String(value)
  return n.toLocaleString('es-AR')
}

export function formatCurrency(value: number | string | undefined | null, decimals = 2) {
  if (value === undefined || value === null || value === '') return ''
  const n = Number(value)
  if (Number.isNaN(n)) return String(value)
  return n.toLocaleString('es-AR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

export default formatNumber

export const isEmpty = v => !v && v !== 0
export const render = v => (isEmpty(v) ? '-' : v)

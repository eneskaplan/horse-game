export function getRoundNumber(number) {
    const suffixes = ['', 'ST', 'ND', 'RD']
    const v = number % 100
    return number + (suffixes[(v - 20) % 10] || suffixes[v] || 'TH')
  }
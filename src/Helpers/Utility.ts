export default {
  hexadecimal: (color: string) => {
    return (percentage: number): string => {
      const decimal = `0${Math.round(255 * (percentage / 100)).toString(16)}`
        .slice(-2)
        .toUpperCase()
      return color + decimal
    }
  }
}

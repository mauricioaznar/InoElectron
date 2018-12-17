export default function cleanNumber (numberString) {
  if (typeof numberString !== 'string') {
    return 'error'
  }
  let numberStringCleaned = numberString.replace(/[^\d.-]/g, '')
  if (Number(numberStringCleaned) % 1 === 0) {
    return parseInt(numberStringCleaned)
  } else {
    return parseFloat(numberStringCleaned)
  }
}

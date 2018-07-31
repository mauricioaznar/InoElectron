import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import email from 'text-mask-addons/dist/emailMask'
const cellphone = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
const housephone = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
const regularNumber = createNumberMask({
  prefix: '',
  suffix: '',
  includeThousandsSeparator: false,
  allowNegative: false
})
const currencyNumber = createNumberMask({
  includeThousandsSeparator: true,
  allowNegative: false,
  allowDecimal: true,
  requiresDecimal: false
})
const floatNumber = createNumberMask({
  includeThousandsSeparator: true,
  allowNegative: false,
  prefix: '',
  suffix: '',
  allowDecimal: true
})
export default {
  email: email,
  housephone: housephone,
  cellphone: cellphone,
  regularNumber: regularNumber,
  currencyNumber: currencyNumber,
  floatNumber: floatNumber
}

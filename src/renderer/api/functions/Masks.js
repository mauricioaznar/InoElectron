import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import email from 'text-mask-addons/dist/emailMask'
const cellphone = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
const housephone = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
const regularNumber = createNumberMask({
  prefix: '',
  suffix: '',
  integerLimit: 6,
  includeThousandsSeparator: true,
  allowNegative: false
})
const regularNumberNegative = createNumberMask({
  prefix: '',
  suffix: '',
  integerLimit: 6,
  includeThousandsSeparator: true,
  allowNegative: true
})
const floatNumber = createNumberMask({
  includeThousandsSeparator: true,
  allowNegative: false,
  prefix: '',
  suffix: '',
  integerLimit: 6,
  allowDecimal: true
})
const floatNumberNegative = createNumberMask({
  includeThousandsSeparator: true,
  allowNegative: true,
  prefix: '',
  suffix: '',
  integerLimit: 6,
  allowDecimal: true
})
export default {
  email: email,
  housephone: housephone,
  cellphone: cellphone,
  regularNumber: regularNumber,
  regularNumberNegative: regularNumberNegative,
  floatNumber: floatNumber,
  floatNumberNegative: floatNumberNegative
}

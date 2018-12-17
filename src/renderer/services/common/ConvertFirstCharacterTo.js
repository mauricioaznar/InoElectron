function uppercaseFirstCharacter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function lowercaseFirstCharacter (string) {
  return string.charAt(0).toLowerCase() + string.slice(1)
}

export default {uppercase: uppercaseFirstCharacter, lowercase: lowercaseFirstCharacter}

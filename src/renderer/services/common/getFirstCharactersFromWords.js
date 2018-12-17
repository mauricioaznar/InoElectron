export default function (string) {
  let firstCharacters = ''
  let strings = string.split(' ')
  strings.forEach(word => {
    let firstCharacter = word.charAt(0)
    if (firstCharacter === firstCharacter.toUpperCase()) {
      firstCharacters += firstCharacter
    }
  })
  return firstCharacters
}

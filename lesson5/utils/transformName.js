import { transliterate } from './transliterate.js'

export const transformName = str => {

  if(!/[a-zA-Z\d\s-_\\\/&]+/.test(str)){
    str = transliterate(str);
  }

  if(str.indexOf('-') > 0){
    const arr = str.toLowerCase().split('-')
      .map(sub => sub.trim());

    return arr.join('')
  };

  if(str.indexOf(' ') > 0){
    const arr = str.toLowerCase().split(' ')
      .map(sub => sub.trim())
    return arr.join('')
  }

  if(str.indexOf('/') > 0){
    const arr = str.toLowerCase().split('/')
      .map(sub => sub.trim())
    return arr.join('')
  }

  if(str.indexOf('\\') > 0){
    const arr = str.toLowerCase().split('\\')
      .map(sub => sub.trim())
    return arr.join('')
  }

  if(str.indexOf('&') > 0){
    const arr = str.toLowerCase().split('&')
      .map(sub => sub.trim())
    return arr.join('And')
  }

  return str.toLowerCase()
}

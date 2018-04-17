const axios = require('axios')
const params = require('./api-key')
const convertMap = require('./convert')

function kana2roman (str) {
  const result = []
  let i = 0
  while (true) {
    const twochar = str.substr(i, 2)
    if (convertMap[twochar] != null) {
      result.push(convertMap[twochar])
      i += 2
      continue
    }
    
    const onechar = str.substr(i, 1)
    if (onechar == '') {
      break
    }
    if (convertMap[onechar] == null) {
      throw new Error(`Invalid character at ${i}: ${onechar}`)
    }
    result.push(convertMap[onechar])
    i += 1
  }
  return result
}

function kan2roman (str) {
  return new Promise((resolve, reject) => {
    try {
      const result = axios({
        url: params.url + '/api/7/kuromoji-ipadic-neologd/tokenize',
        method: 'POST',
        params: {
          access_token: params.access_token,
        },
        data: {
          texts: [str]
        }
      })
      resolve(result)
    } catch (err) {
      reject(err)
    }
  })
}

// test
kan2roman('わたしは；’：＊＆＿ー｜・＞＜＾％＄＃＠！、（Twitter）ちょっとできる。うぇい！？').then((result) => {
  console.log(result)
  result.data.tokens.forEach(token => {
    const str = token.map(t => {
      return t.pronunciation
    }).join('')
    console.log(str)
    const roman = kana2roman(str)
    console.log(roman.join(''))
  })
}).catch((err) => {
  console.log(err)
})

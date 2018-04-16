const axios = require('axios')
const params = require('./api-key')

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

kan2roman('わたしはTwitterちょっとできる').then((result) => {
  result.data.tokens.forEach(token => {
    const str = token.map(t => {
      return t.pronunciation
    }).join('')
    console.log(str)
  })
}).catch((err) => {
  console.log(err)
})

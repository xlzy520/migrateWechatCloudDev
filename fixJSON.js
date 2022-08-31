const fs = require('fs')

const databases = fs.readdirSync('./database')
databases.forEach(fileName => {
  const path = `./database/${fileName}`
  const text = fs.readFileSync(path).toString()
  const dataArr = text.split('\n')
  dataArr.pop()
  const fixData = dataArr.map(item => {
    return JSON.parse(item)
  })
  
  fs.writeFileSync(path, JSON.stringify(fixData))
})




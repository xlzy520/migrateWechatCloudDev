const fs = require('fs');
const https = require('https');


const baseUrl = 'https://6c78-lxx-1gg4sx24e0ca54d5-1305723620.tcb.qcloud.la/'


// 获取全部文件路径
const getAllFiles = () => {
  const cloudPaths = []
  const album = require('./database/album')
  album.forEach(item => {
    cloudPaths.push(item.cloudPath)
  })
  
  const blog = require('./database/blog')
  blog.forEach(item => {
    item.imgList.forEach(img => {
      cloudPaths.push(img.cloudPath)
    })
  })
  return cloudPaths
}

// 下载文件

const downloadFiles = () => {
  const cloudPaths = getAllFiles()
  cloudPaths.forEach(path=> {
    const fileName = path.split('/').pop()
    console.log(fileName);
    const url = baseUrl+fileName;
    https.get(url, (res) => {
      const file = fs.createWriteStream('./files/'+fileName);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`File downloaded!`);
      });
    }).on("error", (err) => {
      console.log("Error: ", err.message);
    });
  })
}


downloadFiles()




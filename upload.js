var remainChunks =  [] // 剩余切片
var isStop = false // 暂停上传控制
var percent =  0 // 上传百分比
var uploadedChunkSize=0 // 已完成上传的切片数
var chunkSize=2*1024*1024 // 切片大小


function uploadFinishCallback(file_name,file_key){
    console.log("file upload finish")

}   


function cutBlob(file) {
    
    const chunkArr = [] // 所有切片缓存数组
    const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice // 切割Api不同浏览器分割处理
    const spark = new SparkMD5.ArrayBuffer() // 文件hash处理
    const chunkNums = Math.ceil(file.size / this.chunkSize) // 切片总数

    console.log(">>> 文件大小",file.size,"切割后的文件数目",chunkNums)

    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.addEventListener('loadend', () => {
            const content = reader.result
            // 生成文件hash
            spark.append(content)
            const hash = spark.end()
            let startIndex = ''
            let endIndex = ''
            let contentItem = ''
        // 文件切割
            for(let i = 0; i < chunkNums; i++) {
                startIndex = i * this.chunkSize
                endIndex = startIndex + this.chunkSize
                endIndex > file.size && (endIndex = file.size)

                contentItem = blobSlice.call(file, startIndex, endIndex)

                chunkArr.push({
                index: i,
                hash,
                total: chunkNums,
                name: file.name,
                size: file.size,
                chunk: contentItem
        })
        }
        resolve({
            chunkArr,
            fileInfo: {
                hash,
                total: chunkNums,
                name: file.name,
                size: file.size
            }
        })
        })
        reader.addEventListener('error', function _error(err) {
        reject(err)
        })
    })
    }


function sendRequest(arr, max = 6, callback) {
    let i = 0 // 数组下标
    let fetchArr = [] // 正在执行的请求
    let toFetch = () => {
      // 如果异步任务都已开始执行，剩最后一组，则结束并发控制
    if (i === arr.length) {
        return Promise.resolve()
    }
      // 执行异步任务
    let it = fetch(arr[i++])
    // 添加异步事件的完成处理
    it.then(() => {
    fetchArr.splice(fetchArr.indexOf(it), 1)
    })
    fetchArr.push(it)

    let p = Promise.resolve()
      // 如果并发数达到最大数，则等其中一个异步任务完成再添加
    if (fetchArr.length >= max) {
        p = Promise.race(fetchArr)
    }

      // 执行递归
    return p.then(() => toFetch())
    }
    toFetch().then(() => 
      // 最后一组全部执行完再执行回调函数
    Promise.all(fetchArr).then(() => {
        callback()
    })
    )
}


file = "D:\Python中文书籍汇总\Head_First_Python（中文版）.pdf"
cutBlob(file)
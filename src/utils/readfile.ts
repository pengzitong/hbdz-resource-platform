// 读取文件
export const readFile = (selectedFile: any, callback: any) => {
  const reader = new FileReader() // 这是核心,读取操作就是由它完成.
  reader.readAsArrayBuffer(selectedFile) // 读取文件的内容
  reader.onload = async (event: any) => {
    const view = new Uint8Array(event.target.result) // 提取二进制字节数组，使用Uint8Array表示
    const base64Data = { data: binary2base64(view) }
    if (typeof callback === 'function') {
      callback(base64Data)
    }
  }
}

// 二进制字节数组转base64编码的字符串
const binary2base64 = (bi: any) => {
  let str = ''
  for (let i = 0, len = bi.length; i < len; i++) {
    str += String.fromCharCode(bi[i])
  }
  return btoa(str)
}

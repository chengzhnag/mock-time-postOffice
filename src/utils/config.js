var url = "http://192.168.0.226:3000";  // 开发时本地的接口地址

if (process.env.NODE_ENV === 'production') {
    url = '';
}

export { url };
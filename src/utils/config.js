var url = "http://192.168.0.106:3000";  // 开发时本地的接口地址

if (process.env.NODE_ENV === 'production') {
    url = '';
}

export { url };
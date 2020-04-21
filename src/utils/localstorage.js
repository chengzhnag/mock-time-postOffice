const storage = {
  /**
   * 数据写入
   * @param {*} key     键名
   * @param {*} value   键值
   */
  write(key, value) {
    let _value = "";
    if (value) {
      _value = JSON.stringify(value);
    }
    localStorage.setItem(key, _value);
  },
  read(key) {
    //web直接从store中获取数据
    let value = localStorage.getItem(key);
    if (value) {
      // console.log(value);
      value = JSON.parse(value);
    }
    return value;
  },
  remove(key) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
}
export default storage;
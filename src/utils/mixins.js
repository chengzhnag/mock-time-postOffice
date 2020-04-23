const mixins = {
    data() {
        return {

        }
    },
    filters: {

    },
    methods: {
        validEmail(rule, email, callback) {
            console.log(email);
            const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (!reg.test(email)) {
                callback(new Error('邮箱格式不正确'));
            }
            callback();
        }
    }
}
export { mixins };
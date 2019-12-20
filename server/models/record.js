var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var recordSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    receiptEmail: { // 收件邮箱
        type: String,
        required: true
    },
    sendTime: {  // 发送时间
        type: Date,
        required: true
    },
    isPublic: {  // 是否公开
        type: Boolean,
        default: false
    },
    content: {  // 内容
        type: String,
        required: true,
        default: "this is content"
    },
    extractCode: {  // 提取码+
        type: String,
    },
    createTime: {  // 创建时间
        type: Date,
        default: Date.now
    },
    status: {  // 状态
        type: Number,
        enum: [1, 2, 3],  // 1 尚未寄送 2 已寄送 3 寄送失败
        default: 1
    }
})

module.exports = mongoose.model('Record', recordSchema);
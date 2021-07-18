
import request from '@/utils/request'

export const sendEmail = data => {
    return request({
        url: '/send',
        method: 'post',
        data
    });
};

export const sendExtractEmail = data => {
    return request({
        url: '/extract',
        method: 'post',
        data
    });
};

export const getPublicLetter = query => {  // 获取公开信列表
    return request({
        url: '/getPublicLetter',
        method: 'get',
        params: query
    });
};

export const getAllLetter = query => {  // 获取所有邮件列表
    return request({
        url: '/getAllLetter',
        method: 'get',
        params: query
    });
};

// 提取邮件
export const byExtractGetEmail = data => {
    return request({
        url: '/byExtractGetEmail',
        method: 'post',
        data
    });
};

export const getQuestion = query => {  // 获取所有常见问题
    return request({
        url: '/getQuestion',
        method: 'get',
        params: query
    });
};

export const sendEmailTips = data => {
    return request({
        url: '/tips',
        method: 'post',
        data
    });
};

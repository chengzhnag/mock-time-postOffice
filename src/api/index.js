
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

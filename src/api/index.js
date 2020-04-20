
import request from '@/utils/request'

export const sendEmail = data => {
    return request({
        url: '/send',
        method: 'post',
        data
    });
};

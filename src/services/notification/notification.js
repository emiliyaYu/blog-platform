import {notification} from "antd";
import * as types from './norification-types'

const openNotification = (type, title, text) => {
    if(!type) throw new Error('Missing type');
    if(!text) throw Error('Missing text');
    /* eslint-disable no-param-reassign */
    if(type === types.errorType) title = types.errorTitle;
    if(type === types.warningType) title = types.warningTitle;
    if(type === types.successType) title = types.successTitle;

    notification[type]({
        message: title,
        description: text,
    });
};
export default openNotification;
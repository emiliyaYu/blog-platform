import {notification} from "antd";

const openNotification = (type, title, text) => {
    notification[type]({
        message: title,
        description: text,
    });
};
export default openNotification;
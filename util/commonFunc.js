import {exportFunc} from './service';
function formatDate(date) {
    const year = date.getFullYear();
    const mouth = date.getMonth() + 1;
    const day = date.getDate();
    const formatDate = year + '-' + mouth + '-' + day;
    return formatDate;
}

module.exports = formatDate
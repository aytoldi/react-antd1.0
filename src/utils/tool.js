// 时间格式化
function formatDate(date, fmt) {
    let o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return fmt
}


function getDownload(url) {
    let xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // 设置请求头，必须在open后添加
    xhr.responseType = 'blob'; // 返回类型blob  blob 存储着大量的二进制数据
    xhr.onload = function () {
        if (this.status === 200) {
            let blob = this.response;
            let reader = new FileReader();
            let getUrl = editUrl(this.responseURL);
            reader.readAsDataURL(blob); // 转换为base64，可以直接放入a标签href
            reader.onload = function (e) {
                let a = document.createElement('a'); // 转换完成，创建一个a标签用于下载
                a.download = getUrl;
                a.href = e.target.result;
                a.click();
            };
        }
    }
    xhr.send(); // 发送ajax请求
}

function editUrl(myUrl) {
    let arr = myUrl.split('/');
    let obj = arr[arr.length - 1];
    return obj;
}

/*
document.getElementById('btn').onclick = function () {
    const _url = 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf';
    getDownload(_url);
}
*/

export default {
    formatDate
}

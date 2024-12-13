let url = $request.url;

// 检查是否是 Google 搜索请求
if (/^https:\/\/www\.google\.cn\/search\?/.test(url)) {
    // 替换域名为 google.com
    url = url.replace('www.google.cn', 'www.google.com');
    
    // 强制语言为简体中文
    if (/hl=/.test(url)) {
        // 如果已经有 hl 参数，替换为中文
        url = url.replace(/hl=[^&]*/, 'hl=zh-hans');
    } else {
        // 如果没有 hl 参数，添加 hl=zh-hans
        url += '&hl=zh-hans';
    }
}

// 完成重定向
$done({ response: { status: 302, headers: { Location: url } } });

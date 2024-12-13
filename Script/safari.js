let url = $request.url;

// 检查是否是 Google 搜索请求
if (/^https:\/\/www\.google\.cn\/search\?/.test(url)) {
    // 替换域名
    url = url.replace('www.google.cn', 'www.google.com');
}

// 完成重定向
$done({ response: { status: 302, headers: { Location: url } } });

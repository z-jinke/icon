let url = $request.url;

if (/^https:\/\/www\.google\.cn\/search\?/.test(url)) {
    url = url.replace('www.google.cn', 'www.google.com');
    
    if (/hl=/.test(url)) {
        url = url.replace(/hl=[^&]*/, 'hl=zh-hans');
    } else {
        url += '&hl=zh-hans';
    }
}

$done({ response: { status: 302, headers: { Location: url } } });

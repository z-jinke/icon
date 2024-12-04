let url = $request.url;
let body = $response.body;

function processInChunks(data, chunkSize, processChunk) {
    let chunkIndex = 0;
    function processChunkAsync() {
        const start = chunkIndex * chunkSize;
        const end = Math.min((chunkIndex + 1) * chunkSize, data.length);
        const chunk = data.slice(start, end);
        processChunk(chunk);
        if (end < data.length) {
            chunkIndex++;
            setTimeout(processChunkAsync, 0);
        }
    }

    processChunkAsync();
}

if (/^https?:\/\/api\.coolapk\.com\/v6\/main\/init/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data) {
        processInChunks(obj.data, 100, (chunk) => {
            chunk.forEach(item => {
                if (item.extraDataArr) {
                    item.extraDataArr["SplashAd.timeout"] = "0";
                    item.extraDataArr["SplashAd.Expires"] = 9999999999;
                }
                if (item.entities) {
                    item.entities = item.entities.filter(entity =>
                        [420, 1635, 415, 2261, 1190, 1175].some(id => id === entity.entityId)
                    );
                }
            });
        });
    }
    $done({ body: JSON.stringify(obj) });
    return;
}

if (/^https?:\/\/api\.coolapk\.com\/v6\/main\/indexV8/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data) {
        processInChunks(obj.data, 100, (chunk) => {
            chunk = chunk.filter(item =>
                ![32557, 13635, 29349].some(id => id === item.entityId)
            );
            chunk.forEach(item => {
                delete item.extraDataArr;
            });
        });
    }
    $done({ body: JSON.stringify(obj) });
    return;
}

if (/^https?:\/\/api\.coolapk\.com\/v6\/search/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data) {
        processInChunks(obj.data, 100, (chunk) => {
            chunk = chunk.filter(item =>
                ![20252, 16977].some(id => id === item.entityId)
            );
        });
    }
    $done({ body: JSON.stringify(obj) });
    return;
}

if (/^https?:\/\/api\.coolapk\.com\/v6\/page/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data) {
        processInChunks(obj.data, 100, (chunk) => {
            chunk = chunk.filter(item =>
                ![12315, 8364, 14379, 24309, 35846, 35730, 12889, 20099].some(id => id === item.entityId)
            );
            chunk.forEach(item => {
                delete item.extraDataArr;
            });
        });
    }
    $done({ body: JSON.stringify(obj) });
    return;
}

if (/^https?:\/\/api\.coolapk\.com\/v6\/feed/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data) {
        processInChunks(obj.data, 100, (chunk) => {
            chunk.forEach(item => {
                delete item.extraDataArr;
                delete item.entityTemplate;
            });
        });
    }
    $done({ body: JSON.stringify(obj) });
    return;
}

if (/^https?:\/\/api\.coolapk\.com\/v6\/account\/loadConfig/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data) {
        processInChunks(obj.data, 100, (chunk) => {
            chunk = chunk.filter(item =>
                ![1002, 1005, 14809, 1004].some(id => id === item.entityId)
            );
        });
    }
    $done({ body: JSON.stringify(obj) });
    return;
}

// 默认结束
$done({});

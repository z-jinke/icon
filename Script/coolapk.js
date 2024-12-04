let url = $request.url;
let body = $response.body;

function processInChunks(data, chunkSize, processFn) {
    const processedData = [];
    for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        processFn(chunk, processedData);
    }
    return processedData;
}

if (/^https?:\/\/api\.coolapk\.com\/v6\/page/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data && obj.data.items) {
        obj.data.items = processInChunks(obj.data.items, 50, (chunk, processedData) => {
            const filteredChunk = chunk.filter(item =>
                ![12315, 8364, 14379, 24309, 35846, 35730, 12889, 20099].some(id => id === item.entityId)
            );
            filteredChunk.forEach(item => delete item.extraDataArr);
            processedData.push(...filteredChunk);
        });
    }
    $done({ body: JSON.stringify(obj) });
    return;
}

if (/^https?:\/\/api\.coolapk\.com\/v6\/feed/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data && obj.data.items) {
        obj.data.items = processInChunks(obj.data.items, 50, (chunk, processedData) => {
            chunk.forEach(item => {
                delete item.extraDataArr;
                delete item.entityTemplate;
            });
            processedData.push(...chunk);
        });
    }
    $done({ body: JSON.stringify(obj) });
    return;
}

if (/^https?:\/\/api\.coolapk\.com\/v6\/main\/init/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data) {
        obj.data = processInChunks(obj.data, 500, (chunk, processedData) => {
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
            processedData.push(...chunk);
        });
    }
    $done({ body: JSON.stringify(obj) });
    return;
}

if (/^https?:\/\/api\.coolapk\.com\/v6\/search/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data) {
        obj.data = processInChunks(obj.data, 500, (chunk, processedData) => {
            const filteredChunk = chunk.filter(item =>
                ![20252, 16977].some(id => id === item.entityId)
            );
            processedData.push(...filteredChunk);
        });
    }
    $done({ body: JSON.stringify(obj) });
    return;
}

if (/^https?:\/\/api\.coolapk\.com\/v6\/account\/loadConfig/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data) {
        obj.data = processInChunks(obj.data, 500, (chunk, processedData) => {
            const filteredChunk = chunk.filter(item =>
                ![1002, 1005, 14809, 1004].some(id => id === item.entityId)
            );
            processedData.push(...filteredChunk);
        });
    }
    $done({ body: JSON.stringify(obj) });
    return;
}

if (/^https?:\/\/api\.coolapk\.com\/v6\/main\/indexV8/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data) {
        const filteredData = processInChunks(obj.data, 50, (chunk, processedData) => {
            chunk.forEach(item => {
                if (![32557, 13635, 29349].includes(item.entityId)) {
                    delete item.extraDataArr;
                    delete item.entityTemplate;
                    if (item.items && Array.isArray(item.items)) {
                        item.items.forEach(subItem => {
                            delete subItem.extraDataArr;
                            delete subItem.entityTemplate;
                        });
                    }
                    processedData.push(item);
                }
            });
        });
        obj.data = filteredData;
    }
    $done({ body: JSON.stringify(obj) });
    return;
}

$done({});

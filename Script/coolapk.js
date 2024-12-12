let url = $request.url;
let body = $response.body;

if (/^https?:\/\/api\.coolapk\.com\/v6\/main\/init/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data) {
        obj.data.forEach(item => {
            if (item.extraDataArr) {
                for (let key in item.extraDataArr) {
                    if (item.extraDataArr.hasOwnProperty(key)) {
                        if (!Array.isArray(item.extraDataArr[key])) {
                            item.extraDataArr[key] = "0";
                        }
                    }
                }
            }     
            const filterEntityIds = new Set([1681, 1633, 1710, 1754, 1966, 1229, 2261, 417, 845, 2258, 1170, 2018, 2274, 944]);
            if (item.entities) {
                item.entities = item.entities.filter(entity => entity && !filterEntityIds.has(entity.entityId));
            }
        });
    }
    body = JSON.stringify(obj);
    $done({ body });
}

if (/^https?:\/\/api\.coolapk\.com\/v6\/main\/indexV8/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data) {
        const filterEntityIds = new Set([32557, 13635, 29349, 29519]);
        obj.data = obj.data.filter(item => !filterEntityIds.has(item.entityId));
    }
    body = JSON.stringify(obj);
    $done({ body });
}

if (/^https?:\/\/api\.coolapk\.com\/v6\/page\/dataList/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data) {
        const filterEntityIds = new Set([20099, 29213, 36278, 36279, 14379, 24309, 12889, 40133, 39940, 37755]);
        obj.data = obj.data.filter(item => !filterEntityIds.has(item.entityId));
    }
    body = JSON.stringify(obj);
    $done({ body });
}

if (/^https?:\/\/api\.coolapk\.com\/v6\/account\/loadConfig/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data) {
        const filterEntityIds = new Set([14809, 1002, 1005]);
        obj.data = obj.data.filter(item => !filterEntityIds.has(item.entityId));
    }
    body = JSON.stringify(obj);
    $done({ body });
}

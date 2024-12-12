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
            const filterEntityIds = new Set([1681, 1633, 1710, 1754, 1966, 2261, 413, 1229, 417, 845, 2258, 1170, 2018, 2274, 944]);
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
        obj.data = obj.data.filter(item => item.entityType === "feed");
    }
    body = JSON.stringify(obj);
    $done({ body });
}

if (/^https?:\/\/api\.coolapk\.com\/v6\/feed\/detail\?id/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data) {   
        obj.data.detailSponsorCard = ""
        obj.data.include_goods = ""
    }
    body = JSON.stringify(obj);
    $done({ body });
}

if (/^https?:\/\/api\.coolapk\.com\/v6\/page\/dataList/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data) { 
        obj.data = obj.data.filter(item => item.entityId!="24309" && item.entityId!="12889" && item.entityId!="36279"  && item.entityId!="36278" && item.entityId!="40133" && item.entityId!="37755" &&  item.entityId!="29213");
    }
    body = JSON.stringify(obj);
    $done({ body });
}

if (/^https?:\/\/api\.coolapk\.com\/v6\/account\/loadConfig/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data) {
        obj.data = obj.data.filter(item => item.entityId!="14809" && item.entityId!="1002" && item.entityId!="1005");
    }
    body = JSON.stringify(obj);
    $done({ body });
}

let url = $request.url;
let body = $response.body;

try {
    //：分支1
    if (/^https?:\/\/api\.coolapk\.com\/v6\/main\/init/.test(url)) {
        let obj = JSON.parse(body);
        if (obj.data && Array.isArray(obj.data)) {
            for (let i = 0; i < obj.data.length; i++) {
                let item = obj.data[i];
                if (item.extraDataArr) {
                    item.extraDataArr["SplashAd.timeout"] = "0";
                    item.extraDataArr["SplashAd.Expires"] = 9999999999;
                }
                if (item.entities && Array.isArray(item.entities)) {
                    const allowedEntityIds = new Set([420, 1635, 415, 2261, 1190, 1175]);
                    let filteredEntities = [];
                    for (let j = 0; j < item.entities.length; j++) {
                        if (allowedEntityIds.has(item.entities[j].entityId)) {filteredEntities.push(item.entities[j]);
                        }
                    }
                    item.entities = filteredEntities;
                }
            }
        }
        $done({ body: JSON.stringify(obj) });
        return;
    }
} catch (error) {
    console.log("分支1错误：" + error.message);
}

try {
    //：分支2
    if (/^https?:\/\/api\.coolapk\.com\/v6\/main\/indexV8/.test(url)) {
        let obj = JSON.parse(body);
        if (obj.data && Array.isArray(obj.data)) {
            const excludedEntityIds = new Set([32557, 13635, 29349]);
            let filteredData = [];
            for (let i = 0; i < obj.data.length; i++) {
                if (!excludedEntityIds.has(obj.data[i].entityId)) {filteredData.push(obj.data[i]);
                }
            }
            obj.data = filteredData;
            for (let i = 0; i < obj.data.length; i++) {
                delete obj.data[i].extraDataArr;
            }
        }
        $done({ body: JSON.stringify(obj) });
        return;
    }
} catch (error) {
    console.log("分支2错误：" + error.message);
}

try {
    //：分支3
    if (/^https?:\/\/api\.coolapk\.com\/v6\/search/.test(url)) {
        let obj = JSON.parse(body);
        if (obj.data && Array.isArray(obj.data)) {
            const excludedEntityIds = new Set([20252, 16977]);
            let filteredData = [];
            for (let i = 0; i < obj.data.length; i++) {
                if (!excludedEntityIds.has(obj.data[i].entityId)) {filteredData.push(obj.data[i]);
                }
            }
            obj.data = filteredData;
        }
        $done({ body: JSON.stringify(obj) });
        return;
    }
} catch (error) {
    console.log("分支3错误：" + error.message);
}

try {
    //分支4
    if (/^https?:\/\/api\.coolapk\.com\/v6\/page/.test(url)) {
        let obj = JSON.parse(body);
        if (obj.data && Array.isArray(obj.data)) {
            const excludedEntityIds = new Set([12315, 8364, 14379, 24309, 35846, 35730, 12889, 20099]);
            let filteredData = [];
            for (let i = 0; i < obj.data.length; i++) {
                if (!excludedEntityIds.has(obj.data[i].entityId)) {filteredData.push(obj.data[i]);
                }
            }
            obj.data = filteredData;
            for (let i = 0; i < obj.data.length; i++) {
                delete obj.data[i].extraDataArr;
            }
        }
        $done({ body: JSON.stringify(obj) });
        return;
    }
} catch (error) {
    console.log("分支4错误：" + error.message);
}

try {
    //：分支5
    if (/^https?:\/\/api\.coolapk\.com\/v6\/feed/.test(url)) {
        let obj = JSON.parse(body);
        if (obj.data && Array.isArray(obj.data)) {
            for (let i = 0; i < obj.data.length; i++) {
                delete obj.data[i].extraDataArr;
                delete obj.data[i].entityTemplate;
            }
        }
        $done({ body: JSON.stringify(obj) });
        return;
    }
} catch (error) {
    console.log("分支5错误：" + error.message);
}

try {
    //：分支6
    if (/^https?:\/\/api\.coolapk\.com\/v6\/account\/loadConfig/.test(url)) {
        let obj = JSON.parse(body);
        if (obj.data && Array.isArray(obj.data)) {
            const excludedEntityIds = new Set([1002, 1005, 14809, 1004]);
            let filteredData = [];
            for (let i = 0; i < obj.data.length; i++) {
                if (!excludedEntityIds.has(obj.data[i].entityId)) {filteredData.push(obj.data[i]);
                }
            }
            obj.data = filteredData;
        }
        $done({ body: JSON.stringify(obj) });
        return;
    }
} catch (error) {
    console.log("分支6错误：" + error.message);
}

// 默认结束
$done({});

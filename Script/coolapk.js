let url = $request.url;
let body = $response.body;

try {
    if (/^https?:\/\/api\.coolapk\.com\/v6\/main\/init/.test(url)) {
        let obj = JSON.parse(body);
        if (obj.data && Array.isArray(obj.data)) {
            obj.data.forEach(item => {
                if (item.extraDataArr) {
                    item.extraDataArr["SplashAd.timeout"] = "0";
                    item.extraDataArr["SplashAd.Expires"] = 9999999999;
                }
                if (item.entities && Array.isArray(item.entities)) {
                    const allowedEntityIds = new Set([420, 1635, 415, 2261, 1190, 1175]);
                    item.entities = item.entities.filter(entity => allowedEntityIds.has(entity.entityId)
                    );
                }
            });
        }
        $done({ body: JSON.stringify(obj) });
        return;
    }
} catch (error) {
    console.log("分支1错误：" + error.message);
}

try {
    if (/^https?:\/\/api\.coolapk\.com\/v6\/main\/indexV8/.test(url)) {
        let obj = JSON.parse(body);
        if (obj.data && Array.isArray(obj.data)) {
            const excludedEntityIds = new Set([32557, 13635, 29349]);
            obj.data = obj.data.filter(item => !excludedEntityIds.has(item.entityId));
            obj.data.forEach(item => {
                delete item.extraDataArr;
            });
        }
        $done({ body: JSON.stringify(obj) });
        return;
    }
} catch (error) {
    console.log("分支2错误：" + error.message);
}

try {
    if (/^https?:\/\/api\.coolapk\.com\/v6\/search/.test(url)) {
        let obj = JSON.parse(body);
        if (obj.data && Array.isArray(obj.data)) {
            const excludedEntityIds = new Set([20252, 16977]);
            obj.data = obj.data.filter(item => !excludedEntityIds.has(item.entityId));
        }
        $done({ body: JSON.stringify(obj) });
        return;
    }
} catch (error) {
    console.log("分支3错误：" + error.message);
}

try {
    if (/^https?:\/\/api\.coolapk\.com\/v6\/page/.test(url)) {
        let obj = JSON.parse(body);
        if (obj.data && Array.isArray(obj.data)) {
            const excludedEntityIds = new Set([12315, 8364, 14379, 24309, 35846, 35730, 12889, 20099]);
            obj.data = obj.data.filter(item => !excludedEntityIds.has(item.entityId));
            obj.data.forEach(item => {
                delete item.extraDataArr;
            });
        }
        $done({ body: JSON.stringify(obj) });
        return;
    }
} catch (error) {
    console.log("分支4错误：" + error.message);
}

try {
    if (/^https?:\/\/api\.coolapk\.com\/v6\/feed/.test(url)) {
        let obj = JSON.parse(body);
        if (obj.data && Array.isArray(obj.data)) {
            obj.data.forEach(item => {
                delete item.extraDataArr;
                delete item.entityTemplate;
            });
        }
        $done({ body: JSON.stringify(obj) });
        return;
    }
} catch (error) {
    console.log("分支5错误：" + error.message);
}

try {
    if (/^https?:\/\/api\.coolapk\.com\/v6\/account\/loadConfig/.test(url)) {
        let obj = JSON.parse(body);
        if (obj.data && Array.isArray(obj.data)) {
            const excludedEntityIds = new Set([1002, 1005, 14809, 1004]);
            obj.data = obj.data.filter(item => !excludedEntityIds.has(item.entityId));
        }
        $done({ body: JSON.stringify(obj) });
        return;
    }
} catch (error) {
    console.log("分支6错误：" + error.message);
}

// 默认结束
$done({});

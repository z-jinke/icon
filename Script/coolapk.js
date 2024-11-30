let url = $request.url;
let body = $response.body;

try {
    //分支1处理开屏广告和过滤Tab修改
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
                    item.entities = item.entities.filter(entity =>
                        allowedEntityIds.has(entity.entityId)
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
    //分支2处理首页修改
    if (/^https?:\/\/api\.coolapk\.com\/v6\/main\/indexV8/.test(url)) {
        console.log("分支2：首页精简匹配成功");
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
    // 分支3处理搜索栏修改
    if (/^https?:\/\/api\.coolapk\.com\/v6\/search/.test(url)) {
        console.log("分支3：搜索栏精简匹配成功");
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
    // 分支4处理评论区去广告
    if (/^https?:\/\/api\.coolapk\.com\/v6\/page/.test(url)) {
        console.log("分支4：评论区去广告匹配成功");
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
    // 分支5处理信息流去广告
    if (/^https?:\/\/api\.coolapk\.com\/v6\/feed/.test(url)) {
        console.log("分支5：信息流去广告匹配成功");
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
    // 分支6处理账户页面修改
    if (/^https?:\/\/api\.coolapk\.com\/v6\/account\/loadConfig/.test(url)) {
        console.log("分支6：账户页面精简匹配成功");
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

let url = $request.url;
let body = $response.body;

if (/^https?:\/\/api\.coolapk\.com\/v6\/main\/init/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data) {
        obj.data.forEach(item => {
            if (item.extraDataArr) {
                const adKeysToModify = new Set(["Ad.CHANGE_AFTER_SHOW", "Ad.ADLOAD_POS_ID", "Ad.KS_APP_ID", "Ad.DOWNLOAD_POPUP", "Ad.PRELOAD", "Ad.PRELOAD_AFTER_USE", "Ad.PRELOAD_THRESHOLD", "Ad.PRELOAD_THRESHOLD_IOS", "Ad.GDT_APP_ID", "Ad.TO_APP_ID", "Ad.TO_APP_KEY", "Ad.TT_APP_ID", "Ad.BZ_APP_ID", "Ad.SPLASH_DOWNLOAD_POPUP", "Ad.SPLASH_RETRY_PERIOD", "Ad.CLICK_BUTTON_AREA", "Ad.GROWTH_BACK_PRESS", "MainActivity.redPacketIconV2", "MainActivity.redPacketFloat", "MainActivity.redPacketFloatUrl"]);
                adKeysToModify.forEach(key => {
                    if (key in item.extraDataArr) {
                        item.extraDataArr[key] = "";
                    }
                });
                item.extraDataArr["SplashAd.timeout"] = 0;
                item.extraDataArr["SplashAd.Expires"] = 9999999999;
            }
            const filterEntityIds = new Set([1681, 1633, 1710, 1754, 1966, 1229, 413, 417, 845, 2258, 1170, 2018, 2274, 944]);
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
        const filterEntityIds = new Set([32557, 13635, 29349]);
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

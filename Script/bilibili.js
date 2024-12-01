let url = $request.url;
let body = $response.body;

// 分支1：处理开屏广告
try {
    if (/^https?:\/\/app\.bilibili\.com\/x\/v2\/splash\/list/.test(url)) {
        let obj = JSON.parse(body);
        if (obj.data && obj.data.list) {
            obj.data.list.forEach(item => {
                item.duration = 0;
                item.begin_time = 9999999999;
                item.end_time = 9999999999;
            });
        }
        $done({ body: JSON.stringify(obj) });
        return;
    }
} catch (error) {
    console.log("分支1错误：" + error.message);
}

// 分支2：修改主界面Tab栏
try {
    if (/^https?:\/\/app\.bilibili\.com\/x\/resource\/show\/tab/.test(url)) {
        let obj = JSON.parse(body);
        if (obj.data) {
            obj.data.tab = [
                { id: 40, name: "推荐", uri: "bilibili://pegasus/promo", tab_id: "推荐tab", pos: 2, default_selected: 1 },
                { id: 41, name: "热门", uri: "bilibili://pegasus/hottopic", tab_id: "hottopic", pos: 3 },
                { id: 2894, name: "番剧", uri: "bilibili://pgc/home", tab_id: "bangumi", pos: 4 },
                { id: 151, name: "影视", uri: "bilibili://pgc/cinema-tab", tab_id: "film", pos: 5 },
                { id: 39, name: "直播", uri: "bilibili://live/home", tab_id: "直播tab", pos: 1 }
            ];
            obj.data.top = [
                { id: 481, icon: "http://i0.hdslb.com/bfs/archive/d43047538e72c9ed8fd8e4e34415fbe3a4f632cb.png", name: "消息", uri: "bilibili://link/im_home", tab_id: "消息Top", pos: 1 }
            ];
            const excludedBottomIDs = new Set([103, 105, 107, 108]);
            if (obj.data.bottom) {
                obj.data.bottom = obj.data.bottom.filter(item => !excludedBottomIDs.has(item.id));
            }
        }
        $done({ body: JSON.stringify(obj) });
        return;
    }
} catch (error) {
    console.log("分支2错误：" + error.message);
}

// 分支3：去除首页Feed流广告
try {
    if (/^https?:\/\/app\.bilibili\.com\/x\/v2\/feed/.test(url)) {
        let obj = JSON.parse(body);
        if (obj.data && obj.data.items) {
            obj.data.items = obj.data.items.filter(item => item?.goto === "av" && item?.card_goto === "av");
        }
        $done({ body: JSON.stringify(obj) });
        return;
    }
} catch (error) {
    console.log("分支3错误：" + error.message);
}

// 分支4：修改番剧与影视页面
try {
    if (/^https?:\/\/api\.bilibili\.com\/pgc\/page\/(cinema|bangumi)/.test(url)) {
        let obj = JSON.parse(body);
        if (obj.result && obj.result.modules) {
            const excludedModuleIDs = new Set([1441, 248, 1455, 1633, 1639]);
            obj.result.modules = obj.result.modules.filter(module => !excludedModuleIDs.has(module.module_id));
        }
        $done({ body: JSON.stringify(obj) });
        return;
    }
} catch (error) {
    console.log("分支4错误：" + error.message);
}

// 分支5：修改直播页面
try {
    if (/^https?:\/\/api\.live\.bilibili\.com\/xlive\/app-interface\/v2\/index\/feed/.test(url)) {
        let obj = JSON.parse(body);
        if (obj.data && obj.data.card_list) {
            obj.data.card_list = obj.data.card_list.filter(card => card.card_type !== "banner_v1");
        }
        $done({ body: JSON.stringify(obj) });
        return;
    }
} catch (error) {
    console.log("分支5错误：" + error.message);
}

// 判断：URL 是否匹配我的页面
try {
    if (/^https?:\/\/app\.bilibili\.com\/x\/v2\/account\/mine/.test(url)) {
        let obj = JSON.parse(body);
        if (obj.data) {
            // 如果是 iPad 页面
            if (url.includes("/ipad")) {
                if (obj.data['ipad_more_sections']) {
                    obj.data['ipad_more_sections'] = obj.data['ipad_more_sections'].filter(section =>
                        section.title !== "青少年守护"
                    );
                }
                delete obj.data['ipad_recommend_sections'];
                delete obj.data['ipad_upper_sections'];
            } 
            // 如果是 iPhone 页面
            else {
                const excludedSectionTitles = new Set(['推荐服务', '创作中心', '其他服务']);
                obj.data.sections_v2 = obj.data.sections_v2.filter(section => !excludedSectionTitles.has(section.title));

                const excludedItemIDs = new Set([171, 172, 173, 174, 429, 430, 431, 432, 950]);
                obj.data.sections_v2.forEach(section => {
                    section.items = section.items.filter(item => !excludedItemIDs.has(item.id));
                });
            }
        }
        $done({ body: JSON.stringify(obj) });
        return;
    }
} catch (error) {
    console.log("处理错误：" + error.message);
}

// 默认结束
$done({});

let url = $request.url;
let body = $response.body;

try {
    if (/^https?:\/\/app\.bilibili\.com\/x\/v2\/splash\/list/.test(url)) {
        let obj = JSON.parse(body);
        if (obj.data && obj.data.list) {
            for (let i = 0; i < obj.data.list.length; i++) {
                let item = obj.data.list[i];
                item.duration = 0;
                item.begin_time = 9999999999;
                item.end_time = 9999999999;
            }
        }
        $done({ body: JSON.stringify(obj) });
        return;
    }
} catch (error) {
    console.log("错误：" + error.message);
}

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
                let filteredBottom = [];
                for (let i = 0; i < obj.data.bottom.length; i++) {
                    if (!excludedBottomIDs.has(obj.data.bottom[i].id)) {
                        filteredBottom.push(obj.data.bottom[i]);
                    }
                }
                obj.data.bottom = filteredBottom;
            }
        }
        $done({ body: JSON.stringify(obj) });
        return;
    }
} catch (error) {
    console.log("错误：" + error.message);
}

try {
    if (/^https?:\/\/app\.bilibili\.com\/x\/v2\/feed/.test(url)) {
        let obj = JSON.parse(body);
        if (obj.data?.items) {
            let items = obj.data.items;
            let filteredItems = [];
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                if (item?.goto === "av" && item?.card_goto === "av") {
                    filteredItems.push(item);
                }
            }
            obj.data.items = filteredItems;
        }
        $done({ body: JSON.stringify(obj) });
        return;
    }
} catch (error) {
    console.log("错误：" + error.message);
}

try {
    if (/^https?:\/\/api\.bilibili\.com\/pgc\/page\/(cinema|bangumi)/.test(url)) {
        let obj = JSON.parse(body);
        if (obj.result && obj.result.modules) {
            const excludedModuleIDs = new Set([1441, 248, 1455, 1633, 1639]);
            let filteredModules = [];
            for (let i = 0; i < obj.result.modules.length; i++) {
                if (!excludedModuleIDs.has(obj.result.modules[i].module_id)) {
                    filteredModules.push(obj.result.modules[i]);
                }
            }
            obj.result.modules = filteredModules;
        }
        $done({ body: JSON.stringify(obj) });
        return;
    }
} catch (error) {
    console.log("错误：" + error.message);
}

try {
    if (/^https?:\/\/api\.live\.bilibili\.com\/xlive\/app-interface\/v2\/index\/feed/.test(url)) {
        let obj = JSON.parse(body);
        if (obj.data && obj.data.card_list) {
            let filteredCards = [];
            for (let i = 0; i < obj.data.card_list.length; i++) {
                if (obj.data.card_list[i].card_type !== "banner_v1") {
                    filteredCards.push(obj.data.card_list[i]);
                }
            }
            obj.data.card_list = filteredCards;
        }
        $done({ body: JSON.stringify(obj) });
        return;
    }
} catch (error) {
    console.log("错误：" + error.message);
}

try {
    if (/^https?:\/\/app\.bilibili\.com\/x\/v2\/account\/mine/.test(url)) {
        let obj = JSON.parse(body);
        if (obj.data) {
            // 如果是 iPad 页面
            if (url.includes("/ipad")) {
                if (obj.data['ipad_more_sections']) {
                    let filteredSections = [];
                    for (let i = 0; i < obj.data['ipad_more_sections'].length; i++) {
                        if (obj.data['ipad_more_sections'][i].title !== "青少年守护") {
                            filteredSections.push(obj.data['ipad_more_sections'][i]);
                        }
                    }
                    obj.data['ipad_more_sections'] = filteredSections;
                }
                delete obj.data['ipad_recommend_sections'];
                delete obj.data['ipad_upper_sections'];
            }
            // 如果是 iPhone 页面
            else {
                const excludedSectionTitles = new Set(['推荐服务', '创作中心', '其他服务']);
                let filteredSections = [];
                for (let i = 0; i < obj.data.sections_v2.length; i++) {
                    if (!excludedSectionTitles.has(obj.data.sections_v2[i].title)) {
                        filteredSections.push(obj.data.sections_v2[i]);
                    }
                }
                obj.data.sections_v2 = filteredSections;

                const excludedItemIDs = new Set([171, 172, 173, 174, 429, 430, 431, 432, 950]);
                for (let i = 0; i < obj.data.sections_v2.length; i++) {
                    let section = obj.data.sections_v2[i];
                    let filteredItems = [];
                    for (let j = 0; j < section.items.length; j++) {
                        if (!excludedItemIDs.has(section.items[j].id)) {
                            filteredItems.push(section.items[j]);
                        }
                    }
                    section.items = filteredItems;
                }
            }
        }
        $done({ body: JSON.stringify(obj) });
        return;
    }
} catch (error) {
    console.log("错误：" + error.message);
}

// 默认结束
$done({});

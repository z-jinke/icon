let url = $request.url;
let body = $response.body;

// 开屏广告
if (/^https?:\/\/app\.bilibili\.com\/x\/v2\/splash\/list/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data.list) {
        obj.data.list.forEach(item => {
            item.duration = 0;
            item.begin_time = 9999999999;
            item.end_time = 9999999999;
        });
    }
    $done({ body: JSON.stringify(obj) });
    return;
}

// 主页Tab栏
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
        obj.data.bottom = obj.data.bottom?.filter(item => ![103, 105, 107, 108].includes(item.id));
    }
    $done({ body: JSON.stringify(obj) });
    return;
}

// 首页推荐
if (/^https?:\/\/app\.bilibili\.com\/x\/v2\/feed/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data.items) {
    const chunkSize = 10000;
    const items = obj.data.items;
    const filteredItems = [];
        
    for (let i = 0; i < items.length; i += chunkSize) {
        const chunk = items.slice(i, i + chunkSize);
        filteredItems.push(...chunk.filter(item => item?.goto === "av" && item?.card_goto === "av"));
    }
    obj.data.items = filteredItems;
    }
    $done({ body: JSON.stringify(obj) });
    return;
}

// 番剧和影视页面
if (/^https?:\/\/api\.bilibili\.com\/pgc\/page\/(cinema|bangumi)/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.result.modules) {
        obj.result.modules = obj.result.modules.filter(module => 
            ![1441, 248, 1455, 1633, 1639].includes(module.module_id)
        );
    }
    $done({ body: JSON.stringify(obj) });
    return;
}

// 直播页面
if (/^https?:\/\/api\.live\.bilibili\.com\/xlive\/app-interface\/v2\/index\/feed/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data.card_list) {
        obj.data.card_list = obj.data.card_list.filter(card => card.card_type !== "banner_v1");
    }
    $done({ body: JSON.stringify(obj) });
    return;
}

// 我的页面
if (/^https?:\/\/app\.bilibili\.com\/x\/v2\/account\/mine/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data) {
        if (url.includes("/ipad")) {
            obj.data['ipad_more_sections'] = obj.data['ipad_more_sections']?.filter(section => section.title !== "青少年守护");
            delete obj.data['ipad_recommend_sections'];
            delete obj.data['ipad_upper_sections'];
        } else {
            obj.data.sections_v2 = obj.data.sections_v2.filter(section => 
                !["推荐服务", "创作中心", "其他服务"].includes(section.title)
            );
            obj.data.sections_v2.forEach(section => {
                section.items = section.items.filter(item => 
                    ![171, 172, 173, 174, 429, 430, 431, 432, 950].includes(item.id)
                );
            });
        }
    }
    $done({ body: JSON.stringify(obj) });
    return;
}

// 默认结束
$done({});

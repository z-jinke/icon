let url = $request.url;
let body = $response.body;

// 开屏广告
if (/^https?:\/\/app\.bilibili\.com\/x\/v2\/splash\/list/.test(url)) {
    let obj = JSON.parse(body);    
    if (obj.data && obj.data.list) {
        obj.data.list.forEach(item => {
            if (item.is_ad) {
                item.duration = 0;
                item.end_time = 90000000;
            }
        });
    }
    body = JSON.stringify(obj);
    $done({ body });
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
        obj.data.bottom = obj.data.bottom.filter(item =>![103, 105, 107, 108].includes(item.id));
    }
    body = JSON.stringify(obj);
    $done({ body });
}

// 我的页面
if (/^https?:\/\/app\.bilibili\.com\/x\/v2\/account\/mine/.test(url)) {
    let obj = JSON.parse(body);
    // ipad 
    if (url.includes("/ipad")) {
        if (obj.data) {
            delete obj.data.ipad_upper_sections;
            if (obj.data.ipad_recommend_sections) {
                obj.data.ipad_recommend_sections = obj.data.ipad_recommend_sections.filter(item =>![791, 792, 793, 794, 2542].includes(item.id)
                );
            }
        }
    } else {
        // iPhone
        if (obj.data && obj.data.sections_v2) {
            obj.data.sections_v2 = obj.data.sections_v2.filter(section =>!["创作中心", "推荐服务", "其他服务"].includes(section.title));
            obj.data.sections_v2.forEach(section => {
                if (section.items) {
                    section.items = section.items.filter(item =>![171, 172, 173, 174, 429, 430, 431, 432, 950].includes(item.id)
                    );
                }
            });
        }
    }
    body = JSON.stringify(obj);
    $done({ body });
}

// 首页推荐
if (/^https?:\/\/app\.bilibili\.com\/x\/v2\/feed\/index/.test(url)) {
    let obj = JSON.parse(body);    
    if (obj.data && obj.data.items) {
        let items = obj.data.items;
        let newItems = [];
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            if (item.goto === "av" && item.card_goto === "av") {
                newItems.push(item);
            }
        }
        obj.data.items = newItems;
    }
    body = JSON.stringify(obj);
    $done({ body });
}

// 番剧于影视
if (/^https?:\/\/api\.bilibili\.com\/pgc\/page\/(cinema|bangumi)/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.result && obj.result.modules) {
        obj.result.modules = obj.result.modules.filter(module =>![1284, 248, 1633, 1639].includes(module.module_id)
        );
    }
    body = JSON.stringify(obj);
    $done({ body });
}

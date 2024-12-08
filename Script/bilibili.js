let url = $request.url;
let body = $response.body;

// 开屏广告
if (/^https?:\/\/app\.bilibili\.com\/x\/v2\/splash\/list/.test(url)) {
    let obj = JSON.parse(body);    
    if (obj.data && obj.data.list) {
        obj.data.list.forEach(item => {
            if (item.is_ad) {
                item.duration = 0;
                item.end_time = 999999999;
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
            { id: 40, name: "推荐", uri: "bilibili://pegasus/promo", tab_id: "推荐tab", pos: 1, default_selected: 1 },
            { id: 41, name: "热门", uri: "bilibili://pegasus/hottopic", tab_id: "hottopic", pos: 2 },
            { id: 2894, name: "番剧", uri: "bilibili://pgc/home", tab_id: "bangumi", pos: 3 },
            { id: 151, name: "影视", uri: "bilibili://pgc/cinema-tab", tab_id: "film", pos: 4 },
            { id: 39, name: "直播", uri: "bilibili://live/home", tab_id: "直播tab", pos: 5 }
        ];

        obj.data.top = [
            { id: 481, name: "消息", uri: "bilibili://link/im_home", tab_id: "消息Top", icon: "http://i0.hdslb.com/bfs/archive/d43047538e72c9ed8fd8e4e34415fbe3a4f632cb.png", pos: 1 }
        ];

        obj.data.bottom = [
            { id: 43, name: "首页", uri: "bilibili://main/home/", tab_id: "home", icon: "http://i0.hdslb.com/bfs/archive/1ab5459ccb18c7a996315327257375be3da19886.png", icon_selected: "http://i0.hdslb.com/bfs/archive/d6a45f06684562dd9cb6914007658c0cdb17bbff.png", pos: 1 },
            { id: 44, name: "频道", uri: "bilibili://pegasus/channel/", tab_id: "频道Bottom", icon: "http://i0.hdslb.com/bfs/archive/b4f621f268c1f9eda501805135f132aa9498b0ba.png", icon_selected: "http://i0.hdslb.com/bfs/archive/94539249e59621214f7dc1226cf38a2b8fe4c64f.png", pos: 2 },
            { id: 45, name: "动态", uri: "bilibili://following/home/", tab_id: "dynamic", icon: "http://i0.hdslb.com/bfs/archive/0f15d5f5be25af29eec6f002561d5000a77cc914.png", icon_selected: "http://i0.hdslb.com/bfs/archive/1d37925562cd3e7d2e5f0868f966b5b9a8b86cde.png", pos: 3 },
            { id: 49, name: "我的", uri: "bilibili://user_center/", tab_id: "我的Bottom", icon: "http://i0.hdslb.com/bfs/archive/aafe71f10eeb5086ac119e4dad769c5aad4d86a2.png", icon_selected: "http://i0.hdslb.com/bfs/archive/36e080bbd8ae858af664ef251741124e04241942.png", pos: 5 }
        ];
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
    if (obj.data.items) {
        const chunkSize = 100;
        const items = obj.data.items;
        let filteredItems = [];
        for (let i = 0; i < items.length; i += chunkSize) {
            const chunk = items.slice(i, i + chunkSize);
            const filteredChunk = chunk.filter(({ goto, card_goto }) => goto === "av" && card_goto === "av");
            filteredItems = filteredItems.concat(filteredChunk);
        }
        obj.data.items = filteredItems;
    }
    body = JSON.stringify(obj);
    $done({ body });
}

// 番剧与影视
if (/^https?:\/\/api\.bilibili\.com\/pgc\/page\/(cinema|bangumi)/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.result && obj.result.modules) {
        obj.result.modules = obj.result.modules.filter(module =>![1284, 248, 1633, 1639].includes(module.module_id)
        );
    }
    body = JSON.stringify(obj);
    $done({ body });
}

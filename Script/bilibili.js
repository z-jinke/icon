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

// 首页推荐
if (/^https?:\/\/app\.bilibili\.com\/x\/v2\/feed\/index/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data.items) {
        const chunkSize = 100;
        const items = obj.data.items;
        let filteredItems = [];
        for (let i = 0; i < items.length; i += chunkSize) {
            const chunk = items.slice(i, i + chunkSize);
            const filteredChunk = chunk.filter(({ goto }) => goto === "av");
            filteredItems = filteredItems.concat(filteredChunk);
        }
        obj.data.items = filteredItems;
    }
    body = JSON.stringify(obj);
    $done({ body });
}

// 主页 Tab 栏
if (/^https?:\/\/app\.bilibili\.com\/x\/resource\/show\/tab/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data) {
        obj.data.tab = [
            {
                id: 40,
                name: "推荐",
                uri: "bilibili://pegasus/promo",
                tab_id: "推荐tab",
                pos: 1,
                default_selected: 1
            },
            {
                id: 41,
                name: "热门",
                uri: "bilibili://pegasus/hottopic",
                tab_id: "hottopic",
                pos: 2
            },
            {
                id: 2894,
                name: "番剧",
                uri: "bilibili://pgc/home",
                tab_id: "bangumi",
                pos: 3
            },
            {
                id: 151,
                name: "影视",
                uri: "bilibili://pgc/cinema-tab",
                tab_id: "film",
                pos: 4
            },
            {
                id: 39,
                name: "直播",
                uri: "bilibili://live/home",
                tab_id: "直播tab",
                pos: 5
            }
        ];
        obj.data.top = [
            {
                id: 481,
                name: "消息",
                uri: "bilibili://link/im_home",
                tab_id: "消息Top",
                icon: "http://i0.hdslb.com/bfs/archive/d43047538e72c9ed8fd8e4e34415fbe3a4f632cb.png",
                pos: 1
            }
        ];
        obj.data.bottom = [
            {
                id: 43,
                name: "主页",
                uri: "bilibili://main/home/",
                tab_id: "home",
                icon: "http://i0.hdslb.com/bfs/archive/1ab5459ccb18c7a996315327257375be3da19886.png",
                icon_selected: "http://i0.hdslb.com/bfs/archive/d6a45f06684562dd9cb6914007658c0cdb17bbff.png",
                pos: 1
            },
            {
                id: 45,
                name: "动态",
                uri: "bilibili://following/home/",
                tab_id: "dynamic",
                icon: "http://i0.hdslb.com/bfs/archive/0f15d5f5be25af29eec6f002561d5000a77cc914.png",
                icon_selected: "http://i0.hdslb.com/bfs/archive/1d37925562cd3e7d2e5f0868f966b5b9a8b86cde.png",
                pos: 3
            },
            {
                id: 49,
                name: "我的",
                uri: "bilibili://user_center/",
                tab_id: "我的Bottom",
                icon: "http://i0.hdslb.com/bfs/archive/aafe71f10eeb5086ac119e4dad769c5aad4d86a2.png",
                icon_selected: "http://i0.hdslb.com/bfs/archive/36e080bbd8ae858af664ef251741124e04241942.png",
                pos: 5
            }
        ];
    }
    body = JSON.stringify(obj);
    $done({ body });
}

// 我的页面
if (/^https?:\/\/app\.bilibili\.com\/x\/v2\/account\/mine/.test(url)) {
    let obj = JSON.parse(body);
    if (url.includes("/ipad")) {
        if (obj.data) {
            obj.data.ipad_recommend_sections = [
                {
                    id: 789,
                    title: "关注列表",
                    uri: "bilibili://user_center/myfollows",
                    icon: "http://i0.hdslb.com/bfs/feed-admin/fdd7f676030c6996d36763a078442a210fc5a8c0.png",
                    mng_resource: {}
                },
                {
                    id: 790,
                    title: "消息列表",
                    uri: "bilibili://link/im_home",
                    icon: "http://i0.hdslb.com/bfs/feed-admin/e1471740130a08a48b02a4ab29ed9d5f2281e3bf.png",
                    mng_resource: {}
                }
            ];
            obj.data.ipad_more_sections = [
                {
                    id: 797,
                    title: "官方客服",
                    uri: "bilibili://user_center/feedback",
                    icon: "http://i0.hdslb.com/bfs/feed-admin/7801a6180fb67cf5f8ee05a66a4668e49fb38788.png",
                    mng_resource: {}
                },
                {
                    id: 798,
                    title: "我的设置",
                    uri: "bilibili://user_center/setting",
                    icon: "http://i0.hdslb.com/bfs/feed-admin/34e8faea00b3dd78977266b58d77398b0ac9410b.png",
                    mng_resource: {}
                }
            ];
            delete obj.data.ipad_upper_sections;
        }
    } else {
        if (obj.data) {
            obj.data.sections_v2 = [
                {
                    items: [
                        {
                            id: 425,
                            title: "离线缓存",
                            icon: "http://i0.hdslb.com/bfs/archive/5fc84565ab73e716d20cd2f65e0e1de9495d56f8.png",
                            common_op_item: {},
                            uri: "bilibili://user_center/download"
                        },
                        {
                            id: 426,
                            title: "历史记录",
                            icon: "http://i0.hdslb.com/bfs/archive/8385323c6acde52e9cd52514ae13c8b9481c1a16.png",
                            common_op_item: {},
                            uri: "bilibili://user_center/history"
                        },
                        {
                            id: 427,
                            title: "我的收藏",
                            icon: "http://i0.hdslb.com/bfs/archive/d79b19d983067a1b91614e830a7100c05204a821.png",
                            common_op_item: {},
                            uri: "bilibili://user_center/favourite"
                        },
                        {
                            id: 428,
                            title: "稍后再看",
                            icon: "http://i0.hdslb.com/bfs/archive/63bb768caa02a68cb566a838f6f2415f0d1d02d6.png",
                            common_op_item: {},
                            uri: "bilibili://user_center/watch_later"
                        }
                    ],
                    style: 1,
                    button: {}
                },
                {
                    items: [
                        {
                            id: 433,
                            title: "客服",
                            icon: "http://i0.hdslb.com/bfs/archive/7ca840cf1d887a45ee1ef441ab57845bf26ef5fa.png",
                            common_op_item: {},
                            uri: "bilibili://user_center/feedback"
                        },
                        {
                            id: 434,
                            title: "设置",
                            icon: "http://i0.hdslb.com/bfs/archive/e932404f2ee62e075a772920019e9fbdb4b5656a.png",
                            common_op_item: {},
                            uri: "bilibili://user_center/setting"
                        }
                    ],
                    style: 2,
                    button: {}
                }
            ];
        }
    }
    body = JSON.stringify(obj);
    $done({ body });
}

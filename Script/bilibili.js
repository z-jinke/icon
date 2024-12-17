let url = $request.url;
let body = $response.body;

if (/^https:\/\/app\.bilibili\.com\/x\/v2\/splash\/list/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data) {
    for (let i = 0; i < obj.data.list.length; i++) {
        obj.data.list[i].duration = 0;
        obj.data.list[i].end_time = 999999999;
        }
    }
    body = JSON.stringify(obj);
    $done({ body });
}

if (/^https:\/\/app\.bilibili\.com\/x\/v2\/feed\/index/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data) {
        obj.data.items = obj.data.items.filter(item => item.goto === "av");
        if (obj.data.config) {
            obj.data.config.column = 1;
        }
    }
    body = JSON.stringify(obj);
    $done({ body });
}

if (/^https:\/\/app\.bilibili\.com\/x\/resource\/show\/tab\/v2/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data) {
        obj.data.tab = [{"id":40,"tab_id":"推荐tab","default_selected":1,"name":"推荐","uri":"bilibili://pegasus/promo","pos":2},{"id":41,"tab_id":"hottopic","name":"热门","uri":"bilibili://pegasus/hottopic","pos":3},{"id":2894,"tab_id":"bangumi","name":"动画","uri":"bilibili://pgc/bangumi_v2","pos":4},{"id":2898,"tab_id":"bilibili://pgc/cinema-tab","name":"影视","uri":"bilibili://pgc/cinema_v2","pos":5},{"id":39,"tab_id":"直播tab","name":"直播","uri":"bilibili://live/home","pos":1}];
        obj.data.bottom = [{id:43,name:"主页",uri:"bilibili://main/home/",tab_id:"home",icon:"http://i0.hdslb.com/bfs/archive/1ab5459ccb18c7a996315327257375be3da19886.png",icon_selected:"http://i0.hdslb.com/bfs/archive/d6a45f06684562dd9cb6914007658c0cdb17bbff.png",pos:1},{id:45,name:"动态",uri:"bilibili://following/home/",tab_id:"dynamic",icon:"http://i0.hdslb.com/bfs/archive/0f15d5f5be25af29eec6f002561d5000a77cc914.png",icon_selected:"http://i0.hdslb.com/bfs/archive/1d37925562cd3e7d2e5f0868f966b5b9a8b86cde.png",pos:3},{id:49,name:"我的",uri:"bilibili://user_center/",tab_id:"我的Bottom",icon:"http://i0.hdslb.com/bfs/archive/aafe71f10eeb5086ac119e4dad769c5aad4d86a2.png",icon_selected:"http://i0.hdslb.com/bfs/archive/36e080bbd8ae858af664ef251741124e04241942.png",pos:5}];
        obj.data.top = [{"id":176,"icon":"http://i0.hdslb.com/bfs/archive/d43047538e72c9ed8fd8e4e34415fbe3a4f632cb.png","tab_id":"消息Top","name":"消息","uri":"bilibili://link/im_home","pos":2}];
        obj.data.top_more = [{"id":3194,"icon":"https://i0.hdslb.com/bfs/legacy/97ee284bf3565ddbc84bd776e11885700216a35d.png","name":"更多分区","uri":"bilibili://main/top_category","pos":1}];
    }
    body = JSON.stringify(obj);
    $done({ body });
}

if (/^https:\/\/app\.bilibili\.com\/x\/v2\/account\/mine/.test(url)) {
    let obj = JSON.parse(body);
    if (url.includes("/ipad")) {
        if (obj.data) {
            obj.data.ipad_upper_sections = ""
            obj.data.ipad_recommend_sections = [{id:789,title:"关注列表",uri:"bilibili://user_center/myfollows",icon:"http://i0.hdslb.com/bfs/feed-admin/fdd7f676030c6996d36763a078442a210fc5a8c0.png",mng_resource:{}},{id:790,title:"消息列表",uri:"bilibili://link/im_home",icon:"http://i0.hdslb.com/bfs/feed-admin/e1471740130a08a48b02a4ab29ed9d5f2281e3bf.png",mng_resource:{}}];obj.data.ipad_more_sections=[{id:797,title:"官方客服",uri:"bilibili://user_center/feedback",icon:"http://i0.hdslb.com/bfs/feed-admin/7801a6180fb67cf5f8ee05a66a4668e49fb38788.png",mng_resource:{}},{id:798,title:"我的设置",uri:"bilibili://user_center/setting",icon:"http://i0.hdslb.com/bfs/feed-admin/34e8faea00b3dd78977266b58d77398b0ac9410b.png",mng_resource:{}}];
        }
    } else {
        if (obj.data) {
            obj.data.sections_v2 = [{"items":[{"id":396,"title":"离线缓存","icon":"http://i0.hdslb.com/bfs/archive/5fc84565ab73e716d20cd2f65e0e1de9495d56f8.png","common_op_item":{},"uri":"bilibili://user_center/download"},{"id":397,"title":"历史记录","icon":"http://i0.hdslb.com/bfs/archive/8385323c6acde52e9cd52514ae13c8b9481c1a16.png","common_op_item":{},"uri":"bilibili://user_center/history"},{"id":3072,"title":"我的收藏","icon":"http://i0.hdslb.com/bfs/archive/d79b19d983067a1b91614e830a7100c05204a821.png","common_op_item":{},"uri":"bilibili://user_center/favourite?version=2"},{"id":2830,"title":"稍后再看","icon":"http://i0.hdslb.com/bfs/archive/63bb768caa02a68cb566a838f6f2415f0d1d02d6.png","need_login":1,"uri":"bilibili://user_center/watch_later_v2","common_op_item":{}}],"style":1,"button":{}},{"items":[{"id":407,"title":"客服","icon":"","common_op_item":{},"uri":"bilibili://user_center/feedback"},{"id":410,"title":"设置","icon":"","common_op_item":{},"uri":"bilibili://user_center/setting"}],"style":2,"button":{}}];
        }
    }
    body = JSON.stringify(obj);
    $done({ body });
}

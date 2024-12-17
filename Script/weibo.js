let url = $request.url;
let body = $response.body;

if (/^https:\/\/weibointl\.api\.weibo\.cn\/portal\.php\?a=user_center/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data) {
        obj.data.cards.forEach(card => {
            card.items = card.items.filter(item =>
                item.type !== "personal_wallpaper" &&
                item.type !== "personal_topic" &&
                item.type !== "personal_vip" &&
                item.type !== "ic_profile_wallpaper" &&
                item.type !== "personal_vip_setting"
            );
        });
    }
    body = JSON.stringify(obj);
    $done({ body });
}

if (/^https:\/\/api\.weibo\.cn\/2\/groups\/allgroups\?/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.groups) {
        obj.groups.forEach(group => {
					  group.group?.forEach(item => item.ad_scene = 0); 
        });
    }
    body = JSON.stringify(obj);
    $done({ body }); 
}

if (/^https:\/\/weibointl\.api\.weibo\.cn\/portal\.php\?a=discover_all/.test(url)) {
    let obj = JSON.parse(body);
    if (obj.data) {
        obj.data = [{"category_name":"超话","lang":"zh","type":"native_topic","category_url":""},{"category_name":"  热门  ","lang":"zh","type":"native_tl","category_url":""}];
    }
    body = JSON.stringify(obj);
    $done({ body });
}

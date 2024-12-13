var url = "http://ip-api.com/json/";
var nodeName = $environment.params.node;

$httpClient.get({ url, node: nodeName }, (error, response, data) => {
    let message = error ? 
        `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: bold;">🔴 查询超时</p>` : 
        formatResult(JSON.parse(data));
    $done({ "title": "", "htmlMessage": message });
});

function formatResult(data) {
    const paras = ["query", "as", "org", "isp", "countryCode", "city", "lon", "lat"];
    const paran = ["远端IP地址", "ASN", "ASN所属机构", "远端ISP", "远端IP地区", "远端IP城市", "远端经度", "远端纬度"];
    const flags = {
        "HK": "🇭🇰", "CN": "🇨🇳", "US": "🇺🇸", "JP": "🇯🇵", "KR": "🇰🇷", "SG": "🇸🇬",
        "DE": "🇩🇪", "FR": "🇫🇷", "IN": "🇮🇳", "RU": "🇷🇺", "UK": "🇬🇧", "AU": "🇦🇺",
        "CA": "🇨🇦", "IT": "🇮🇹", "ES": "🇪🇸", "BR": "🇧🇷", "ZA": "🇿🇦", "NL": "🇳🇱",
        "SE": "🇸🇪", "CH": "🇨🇭", "NO": "🇳🇴", "FI": "🇫🇮", "DK": "🇩🇰", "BE": "🇧🇪",
        "MX": "🇲🇽", "AR": "🇦🇷", "CL": "🇨🇱", "NZ": "🇳🇿", "TH": "🇹🇭", "MY": "🇲🇾",
        "ID": "🇮🇩", "PH": "🇵🇭", "VN": "🇻🇳", "AE": "🇦🇪", "IL": "🇮🇱", "TR": "🇹🇷"
    };

    let res = `<div style="font-family: -apple-system; font-size: large; text-align: left; line-height: 1.8;">
                <p style="text-align: center; font-size: x-large; font-weight: bold;">节点>${$environment.params.node}</p>
                <table style="width: 100%; border-collapse: collapse;">`;
    paras.forEach((param, i) => {
        let value = data[param] || "未知";
        if (param === "countryCode") value += flags[data[param].toUpperCase()] || "🏳️";
        res += `<tr><td style="padding: 2px; border: 1px solid #ddd; font-weight: bold;">${paran[i]}</td>
                <td style="padding: 2px; border: 1px solid #ddd;">${value}</td></tr>`;
    });
    return res + `</table></div>`;
}

function wfVerifyMobile(mobile){
	var telReg = !!mobile.match(/^\+?(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/);
	return telReg;
}

//课堂音频加载时间
function statKetangLoadAudioTime(type,time)
{
    _hmt.push(['_trackEvent','ketang_audio','load',type,time]);
}

//大咖讲百科分享页音频加载时间
function statWikiLoadAudioTime(time)
{
    _hmt.push(['_trackEvent','wiki_audio','load','audio',time]);
}

//百科下载按钮点击
function statWikiDownloadApp(type)
{
    _hmt.push(['_trackEvent','wiki_click_download_app',type]);
}

//百科查看全文点击
function statWikiShowAllPage()
{
    _hmt.push(['_trackEvent','wiki_click_show_all','page']);
}

//展示条目二维码
function stateWikiShowQrcode()
{
    _hmt.push(['_trackEvent','qrcode','qrcode_show']);
}

//二维码进入的访问
function stateWikiVisitQrcode()
{
    _hmt.push(['_trackEvent','qrcode','qrcode_visit']);
}

!function(p,e){var i=e.XCake=e.XCake||{};i.config=function(e){if(!e||!e.name||!e.base||"undefined"===e.combine)throw new Error("XCake.config options error");p.log("config Xcake"),p.log("xcake.base:"+e.base),p.log("xcake.name:"+e.name),p.log("xcake.combine:"+e.combine),p.config({combine:e.combine,packages:[{name:e.name,base:e.base,ignorePackageNameInUri:!0,debug:!0,combine:e.combine}]}),KISSY.config("modules",{"pmp/_0":{requires:["pmp/c/chinese-format/index.css"]},"pmp/_1":{requires:["node","xtemplate/runtime","io","kg/kscroll/3.0.1/index","pmp/c/comment/index.css"]},"pmp/_2":{requires:["node","xtemplate/runtime","overlay"]},"pmp/_8":{requires:["node"]},"pmp/_9":{requires:["pmp/c/hello-world/index.css","node","xtemplate/runtime"]},"pmp/_a":{requires:["node","tbc/pai-countdown/1.0.6/index","kg/datalazyload/2.0.2/index","tbc/xmpp/1.0.9/index","pmp/c/itemList/index.css"]},"pmp/_c":{requires:["cookie","uri","pmp/_b"]},"pmp/_e":{requires:["tbc/xmpp/1.0.9/index"]},"pmp/_f":{requires:["node","io"]},"pmp/_g":{requires:["pmp/c/pagination/index.css","node"]},"pmp/_h":{requires:["node","ua","xtemplate","kg/datalazyload/2.0.2/index","tbc/pai-countdown/1.0.6/index","tbc/xmpp/1.0.9/index","mvc","io","json"]},"pmp/_j":{requires:["node","xtemplate"]},"pmp/_k":{requires:["node","xtemplate","kg/datalazyload/2.0.2/index","tbc/pai-countdown/1.0.6/index"]},"pmp/_l":{requires:["node","gallery/slide/1.3/index","pmp/c/pai-slide/index.css"]},"pmp/_m":{requires:["node","base","pmp/c/pai-tip/index.css"]},"pmp/_n":{requires:["pmp/c/sku/bid.css"]},"pmp/_o":{requires:["pmp/c/sku/index.css","node","dom","io","event","overlay","tbc/xmpp/1.0.9/index","tbc/mini-login/2.2.5/index","kg/modal/1.5.2/index"]},"bid-module/init":{requires:["node","dom","ajax","event","overlay","tbc/xmpp/1.0.9/index","tbc/mini-login/2.2.5/index","kg/modal/1.5.2/index"]},"pmp/_q":{requires:["node","pmp/_c","pmp/_u","base","io"]},"pmp/_r":{requires:["pmp/c/sync-record-list/index.css","node","xtemplate/runtime"]},"pmp/_s":{requires:["pmp/c/sync-signal/index.css","base","pmp/_q","node","pmp/c/sync-signal/mods/tips.css"]},"pmp/_t":{requires:["ua"]},"pmp/_11":{requires:["node","kg/mini-login/6.3.5/index","pmp/_c","io"]},"pmp/_14":{requires:["pmp/p/album-list/index.css"]},"pmp/_15":{requires:["pmp/p/console-calendar/index.css","pmp/p/console-calendar/mods/overlay.css","pmp/_4","node","base","io","xtemplate","pmp/_2","tbc/mini-login/2.1.0/index","xtemplate/runtime","overlay"]},"pmp/_16":{requires:["pmp/p/console-edit-masterdocument/index.css","node","pmp/p/console-edit-masterdocument/mods/admin.css","io","kg/datetimepicker/2.0.4/index","kg/limiter/2.0.0/index","kg/uploader/3.0.2/index","kg/uploader/3.0.2/themes/singleImageUploader/index","kg/uploader/3.0.2/themes/singleImageUploader/style.css","xtemplate","pmp/_7","kg/auth/2.0.7/index","kg/auth/2.0.7/plugin/msgs/index","kg/auth/2.0.7/plugin/msgs/style.css"]},"pmp/_17":{requires:["pmp/p/console-partner-review/index.css"]},"pmp/_18":{requires:["pmp/_c","pmp/c/common/index.css","pmp/c/pai-slide/index.css","pmp/p/detail/mods/pm1212.css","pmp/p/detail/mods/browser.css","pmp/p/detail/index.css","node","pmp/_1","dom","event","kg/imagezoom/2.0.0/index","pmp/_0","tbc/pai-countdown/1.0.6/index","pmp/_m","pmp/_d","io","json","xtemplate/runtime","kg/mini-login/6.3.5/index","pmp/_e","kg/pm-convertunit/0.0.8/index","swf","kg/limitfixed/2.0.0/index","pmp/_l","cookie","kg/datalazyload/2.0.2/index","tbc/share/2.0.3/index","tbc/pai-notification/4.1.4/index","ua","pmp/p/detail/mods/pad.css","pmp/_i","kg/auth/2.0.7/index","kg/auth/2.0.7/plugin/msgs/index","kg/auth/2.0.7/plugin/msgs/style.css","overlay"]},"pmp/_19":{requires:["node","swf","pmp/c/common/index.css","pmp/p/master-document/index.css"]},"pmp/_1a":{requires:["node","base","ajax","template","kg/pagination/2.0.0/index","tbc/pai-countdown/1.0.6/index","ua"]},"pmp/_1b":{requires:["pmp/p/partner-review/index.css"]},"pmp/_1c":{requires:["pmp/p/partner/index.css","node","io"]},"pmp/_1d":{requires:["pmp/p/pre-calendar/index.css","pmp/p/pre-calendar/mods/overlay.css","uri","base","node","io","xtemplate","pmp/_4","pmp/_2","tbc/mini-login/2.1.0/index","xtemplate/runtime"]},"pmp/_1e":{requires:["pmp/p/seller-detail/index.css","pmp/p/seller-detail/mods/pai-list.css","pmp/p/seller-detail/mods/pai-special-list.css","pmp/p/seller-detail/mods/pai-news-list.css","node","tbc/pai-list-manager/2.0.1/index","pmp/_k","pmp/_j","kg/sticky/2.0.0/index","pmp/_g","overlay","ua","io","kg/storage/6.0.5/index"]},"pmp/_1f":{requires:["node","ajax","template"]},"pmp/_1g":{requires:["pmp/p/special-detail/index.css","pmp/_8","node","dom","ajax","json","kg/datalazyload/2.0.2/index","pmp/_a","tbc/pai-countdown/1.0.6/index","xtemplate/runtime","tbc/share/2.0.3/index","tbc/pai-notification/4.1.4/index","pmp/_g","pmp/p/special-detail/mods/hot-tags.css"]},"pmp/_1h":{requires:["pmp/c/common/index.css","pmp/p/sync-admin/index.css","pmp/_c","mvc","pmp/_v","pmp/_r","pmp/p/sync-admin/mods/auction-list.css","node","pmp/_11","xtemplate/runtime","pmp/_u","event","uri","pmp/_6","pmp/_13","kg/moment/2.1.0/index","button","kg/modal/1.4.0/index","base","kg/countdown/2.0.1/index","json","pmp/_t","pmp/_12","pmp/_s","pmp/_q","io","kg/offline/3.0.1/index","tbc/mini-login/2.1.0/index"]},"pmp/_1j":{requires:["node","event","pmp/_q","kg/xtemplate/4.1.4/index","kg/xtemplate/4.1.4/runtime","pmp/_1i","pmp/_13","pmp/_6","ua"]},"pmp/_1k":{requires:["pmp/p/sync-checklist/index.css","kg/slide/2.0.2/index","node","button","base","json"]},"pmp/_1l":{requires:["pmp/_c","pmp/c/common/index.css","pmp/c/pai-slide/index.css","pmp/p/sync-detail/mods/pm1212.css","pmp/p/sync-detail/mods/browser.css","pmp/p/sync-detail/index.css","node","event","pmp/_1","kg/mini-login/6.3.5/index","dom","kg/imagezoom/2.0.0/index","pmp/_0","tbc/pai-countdown/1.0.6/index","pmp/_m","pmp/_d","io","json","xtemplate/runtime","pmp/_e","swf","kg/limitfixed/2.0.0/index","pmp/_l","cookie","kg/datalazyload/2.0.2/index","tbc/share/2.0.3/index","tbc/pai-notification/4.1.4/index","ua","pmp/p/sync-detail/mods/pad.css","pmp/_i","kg/auth/2.0.7/index","kg/auth/2.0.7/plugin/msgs/index","kg/auth/2.0.7/plugin/msgs/style.css","overlay"]},"pmp/_1m":{requires:["pmp/p/sync-live/index.css","pmp/_c","node","pmp/_q","base","pmp/_6","pmp/_13","pmp/_11","pmp/_s","pmp/_u","kg/mini-login/6.3.5/index","xtemplate/runtime","pmp/_r","ua","pmp/p/sync-live/mods/auction-list.css","kg/paginations/1.0.1/index.css","kg/paginations/1.0.1/index","kg/datalazyload/2.0.2/index","pmp/p/sync-live/mods/star-auction-list.css","kg/slide/2.0.2/index","pmp/p/sync-live/mods/msg.css"]},"pmp/_1o":{requires:["node","event","pmp/_q","kg/xtemplate/4.1.4/index","kg/xtemplate/4.1.4/runtime","pmp/_1n","pmp/_13","pmp/_6","ua"]},"pmp/c/chinese-format/index":{alias:"pmp/_0"},"pmp/c/comment/index":{alias:"pmp/_1"},"pmp/c/console-alert-dialog/index":{alias:"pmp/_2"},"pmp/c/define-event/index":{alias:"pmp/_3"},"pmp/c/format/date":{alias:"pmp/_4"},"pmp/c/format/index":{alias:"pmp/_5"},"pmp/c/format/money":{alias:"pmp/_6"},"pmp/c/format/protocol":{alias:"pmp/_7"},"pmp/c/global/pad":{alias:"pmp/_8"},"pmp/c/hello-world/index":{alias:"pmp/_9"},"pmp/c/itemList/index":{alias:"pmp/_a"},"pmp/c/logger/config":{alias:"pmp/_b"},"pmp/c/logger/index":{alias:"pmp/_c"},"pmp/c/maidian/index":{alias:"pmp/_d"},"pmp/c/mpp-connect/index":{alias:"pmp/_e"},"pmp/c/offline/index":{alias:"pmp/_f"},"pmp/c/pagination/index":{alias:"pmp/_g"},"pmp/c/pai-list/index":{alias:"pmp/_h"},"pmp/c/pai-map/index":{alias:"pmp/_i"},"pmp/c/pai-news-list/index":{alias:"pmp/_j"},"pmp/c/pai-seller-special-list/index":{alias:"pmp/_k"},"pmp/c/pai-slide/index":{alias:"pmp/_l"},"pmp/c/pai-tip/index":{alias:"pmp/_m"},"pmp/c/sku/bid":{alias:"pmp/_n"},"pmp/c/sku/index":{alias:"pmp/_o"},"pmp/c/sku/tmall":{alias:"pmp/_p"},"pmp/c/sync-polling/index":{alias:"pmp/_q"},"pmp/c/sync-record-list/index":{alias:"pmp/_r"},"pmp/c/sync-signal/index":{alias:"pmp/_s"},"pmp/c/sync-util/dom":{alias:"pmp/_t"},"pmp/c/sync-util/env":{alias:"pmp/_u"},"pmp/c/sync-util/functions":{alias:"pmp/_v"},"pmp/c/sync-util/index":{alias:"pmp/_10"},"pmp/c/sync-util/io":{alias:"pmp/_11"},"pmp/c/sync-util/ladder":{alias:"pmp/_12"},"pmp/c/sync-util/status":{alias:"pmp/_13"},"pmp/p/album-list/index":{alias:"pmp/_14"},"pmp/p/console-calendar/index":{alias:"pmp/_15"},"pmp/p/console-edit-masterdocument/index":{alias:"pmp/_16"},"pmp/p/console-partner-review/index":{alias:"pmp/_17"},"pmp/p/detail/index":{alias:"pmp/_18"},"pmp/p/master-document/index":{alias:"pmp/_19"},"pmp/p/my/index":{alias:"pmp/_1a"},"pmp/p/partner-review/index":{alias:"pmp/_1b"},"pmp/p/partner/index":{alias:"pmp/_1c"},"pmp/p/pre-calendar/index":{alias:"pmp/_1d"},"pmp/p/seller-detail/index":{alias:"pmp/_1e"},"pmp/p/setting/index":{alias:"pmp/_1f"},"pmp/p/special-detail/index":{alias:"pmp/_1g"},"pmp/p/sync-admin/index":{alias:"pmp/_1h"},"pmp/p/sync-bigscreen/auction":{alias:"pmp/_1i"},"pmp/p/sync-bigscreen/index":{alias:"pmp/_1j"},"pmp/p/sync-checklist/index":{alias:"pmp/_1k"},"pmp/p/sync-detail/index":{alias:"pmp/_1l"},"pmp/p/sync-live/index":{alias:"pmp/_1m"},"pmp/p/sync-observer/auction":{alias:"pmp/_1n"},"pmp/p/sync-observer/index":{alias:"pmp/_1o"}})}}(KISSY,this);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[1],{1:function(s,e){},2:function(s,e){},"24f8":function(s,e,a){"use strict";a.r(e);var t=function(){var s=this,e=s.$createElement,a=s._self._c||e;return a("q-page",{staticClass:"window-height window-width row justify-center items-center"},[a("div",{staticClass:"column"},[a("div",{staticClass:"row"},[a("q-card",{staticClass:"q-pa-lg shadow-1",attrs:{square:"",bordered:""}},[a("q-card-section",[a("q-form",{staticClass:"q-gutter-md"},[a("q-input",{attrs:{square:"",filled:"",clearable:"",type:"email",label:s.$t("email")},model:{value:s.email,callback:function(e){s.email=e},expression:"email"}}),a("q-input",{attrs:{square:"",filled:"",clearable:"",type:"password",label:s.$t("password")},model:{value:s.password,callback:function(e){s.password=e},expression:"password"}}),a("q-input",{attrs:{square:"",filled:"",clearable:"",type:"text",label:s.$t("link")},model:{value:s.link,callback:function(e){s.link=e},expression:"link"}})],1)],1),a("q-card-actions",{staticClass:"q-px-md"},[a("q-btn",{staticClass:"full-width",attrs:{unelevated:"",color:"black",size:"lg",label:"Login"},on:{click:s.tryToLogin}})],1)],1)],1)])])},n=[],c=(a("9911"),a("96cf"),a("c973")),j=a.n(c),r=a("2ac8"),d={data:function(){return{email:"",password:"",link:""}},mounted:function(){window.localStorage&&window.localStorage.lastOpenBalenaUrl&&(this.link=window.localStorage.lastOpenBalenaUrl)},methods:{tryToLogin:function(){var s=this;return j()(regeneratorRuntime.mark((function e(){var a,t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=Object(r["getSdk"])({apiUrl:s.link}),e.next=3,a.auth.authenticate({email:s.email,password:s.password});case 3:return t=e.sent,e.next=6,a.auth.loginWithToken(t);case 6:s.$store.commit("main/setToken",t),s.$store.commit("main/setSDK",a),s.$router.push("home"),window.localStorage&&(window.localStorage.lastOpenBalenaUrl=s.link);case 10:case"end":return e.stop()}}),e)})))()}}},l=d,b=a("2877"),f=a("9989"),o=a("f09f"),i=a("a370"),u=a("0378"),m=a("27f9"),h=a("4b7e"),k=a("9c40"),p=a("eebe"),w=a.n(p),g=Object(b["a"])(l,t,n,!1,null,null,null);e["default"]=g.exports;w()(g,"components",{QPage:f["a"],QCard:o["a"],QCardSection:i["a"],QForm:u["a"],QInput:m["a"],QCardActions:h["a"],QBtn:k["a"]})},3:function(s,e){},4:function(s,e){},4678:function(s,e,a){var t={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn-bd":"9686","./bn-bd.js":"9686","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-mx":"b5b7","./es-mx.js":"b5b7","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df48","./fa.js":"8df48","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e493","./fr-ch.js":"0e493","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b46","./gd.js":"f6b46","./gl":"8840d","./gl.js":"8840d","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fbd","./ml.js":"02fbd","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function n(s){var e=c(s);return a(e)}function c(s){if(!a.o(t,s)){var e=new Error("Cannot find module '"+s+"'");throw e.code="MODULE_NOT_FOUND",e}return t[s]}n.keys=function(){return Object.keys(t)},n.resolve=c,s.exports=n,n.id="4678"}}]);
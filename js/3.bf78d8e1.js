(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"40f0":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("q-page",{attrs:{padding:""}},[n("q-dialog",{model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[n("q-card",{staticClass:"big"},[n("q-card-section",{staticClass:"row items-center q-pb-none"},[n("div",{staticClass:"text-h6"},[e._v("Logs")]),n("q-space"),n("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"close",flat:"",round:"",dense:""}})],1),n("q-card-section",[n("pre",[e._v(e._s(e.history))])])],1)],1),n("q-table",{attrs:{grid:"",title:"Devices",data:e.devices,columns:e.columns,"row-key":"device_name",selected:e.selected},on:{"update:selected":function(t){e.selected=t}},scopedSlots:e._u([{key:"item",fn:function(t){return[n("div",{staticClass:"q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"},[n("q-card",[n("q-card-section",[n("q-btn",{on:{click:function(n){return e.showLogs(t)}}},[e._v(e._s(e.$t("logs")))])],1),n("q-separator"),n("q-list",{attrs:{dense:""}},e._l(t.cols,(function(t){return n("q-item",{key:t.name},[n("q-item-section",[n("q-item-label",[e._v(e._s(t.label))])],1),n("q-item-section",{attrs:{side:""}},[n("q-item-label",{attrs:{caption:""}},[e._v(e._s(t.value))])],1)],1)})),1)],1)],1)]}}])})],1)},s=[],o=(n("96cf"),n("c973")),i=n.n(o),r={data:function(){return{devices:[],selected:null,history:this.$t("notloaded"),dialog:!1,currLogs:null,columns:[{name:"device_name",label:this.$t("name"),align:"left",field:function(e){return e.device_name},format:function(e){return"".concat(e)},sortable:!0},{name:"is_online",label:this.$t("online"),align:"left",field:function(e){return e.is_online+"/"+e.is_connected_to_vpn},format:function(e){return"".concat(e)},sortable:!0},{name:"ip_address",label:this.$t("ip"),align:"left",field:function(e){return e.ip_address},format:function(e){return"".concat(e)},sortable:!0},{name:"note",label:this.$t("note"),align:"left",field:function(e){return e.note},format:function(e){return"".concat(e)},sortable:!0},{name:"status",label:this.$t("overall"),align:"left",field:function(e){return e.overall_status+" "+e.overall_progress},format:function(e){return"".concat(e)},sortable:!0}]}},mounted:function(){this.loadApplicationDetails()},methods:{loadApplicationDetails:function(){var e=this;return i()(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$store.state.main.sdk.models.device.getAllByApplication(e.$route.params.id);case 2:e.devices=t.sent;case 3:case"end":return t.stop()}}),t)})))()},showLogs:function(e){var t=this;return i()(regeneratorRuntime.mark((function n(){var a,s,o,i,r,c;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.currLogs&&t.currLogs.unsubscribe(),t.history="Loading",t.dialog=!0,a=e.row.uuid,s="",n.next=7,t.$store.state.main.sdk.logs.history(a);case 7:for(o=n.sent,i=o.length-1;i>=0;i--)r=o[i],s=s+"\n"+new Date(r.timestamp).toISOString()+": "+r.message;return t.history=s,n.next=12,t.$store.state.main.sdk.logs.subscribe(a);case 12:c=n.sent,c.on("line",(function(e){t.history=new Date(e.timestamp).toISOString()+": "+e.message+"\n"+t.history})),t.currLogs=c;case 15:case"end":return n.stop()}}),n)})))()}}},c=r,l=(n("a922"),n("2877")),u=n("9989"),d=n("24e8"),m=n("f09f"),f=n("a370"),p=n("2c91"),g=n("9c40"),b=n("eaac"),v=n("eb85"),h=n("1c1c"),_=n("66e5"),q=n("4074"),w=n("0170"),k=n("7f67"),y=n("eebe"),Q=n.n(y),$=Object(l["a"])(c,a,s,!1,null,"42473d9c",null);t["default"]=$.exports;Q()($,"components",{QPage:u["a"],QDialog:d["a"],QCard:m["a"],QCardSection:f["a"],QSpace:p["a"],QBtn:g["a"],QTable:b["a"],QSeparator:v["a"],QList:h["a"],QItem:_["a"],QItemSection:q["a"],QItemLabel:w["a"]}),Q()($,"directives",{ClosePopup:k["a"]})},"66b3":function(e,t,n){},a922:function(e,t,n){"use strict";n("66b3")}}]);
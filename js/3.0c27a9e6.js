(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"110e":function(e,t,n){"use strict";n("a83c")},"40f0":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("q-page",{attrs:{padding:""}},[n("q-dialog",{model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[n("q-card",{staticClass:"big"},[n("q-card-section",{staticClass:"row items-center q-pb-none"},[n("div",{staticClass:"text-h6"},[e._v("Logs")]),n("q-space"),n("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"close",flat:"",round:"",dense:""}})],1),n("q-card-section",[n("pre",[e._v(e._s(e.history))])])],1)],1),n("q-table",{attrs:{loading:e.loading,grid:"",title:"Devices",data:e.devices,columns:e.columns,"row-key":"device_name",selected:e.selected},on:{"update:selected":function(t){e.selected=t}},scopedSlots:e._u([{key:"item",fn:function(t){return[n("div",{staticClass:"q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"},[n("q-card",[n("q-list",{attrs:{dense:""}},e._l(t.cols,(function(r){return n("q-item",{key:r.name},[n("q-item-section",[n("q-item-label",[e._v(e._s(r.label))])],1),n("q-item-section",{attrs:{side:""}},["is_online"==r.name?n("q-item-label",[t.row.is_online?n("Dot",{attrs:{color:"green"}}):n("Dot",{attrs:{color:"red"}}),e._v(" / \n                  "),t.row.is_connected_to_vpn?n("Dot",{attrs:{color:"green"}}):n("Dot",{attrs:{color:"red"}})],1):"device_name"==r.name?n("q-item-label",[e._v("\n                  "+e._s(r.value)+"\n                  "),n("q-popup-edit",{attrs:{buttons:"",title:e.$t("editname")},on:{save:function(n){return e.saveDeviceName(t)}},model:{value:t.row.device_name,callback:function(n){e.$set(t.row,"device_name",n)},expression:"props.row.device_name"}},[n("q-input",{attrs:{dense:"",autofocus:"",counter:""},model:{value:t.row.device_name,callback:function(n){e.$set(t.row,"device_name",n)},expression:"props.row.device_name"}})],1)],1):"note"==r.name?n("q-item-label",[null!==t.row.note?n("span",[e._v(" "+e._s(r.value))]):n("span",[e._v(e._s(e.$t("nonote")))]),n("q-popup-edit",{attrs:{buttons:"",title:e.$t("editname")},on:{save:function(n){return e.saveNote(t)}},model:{value:t.row.note,callback:function(n){e.$set(t.row,"note",n)},expression:"props.row.note"}},[n("q-input",{attrs:{dense:"",autofocus:"",counter:""},model:{value:t.row.note,callback:function(n){e.$set(t.row,"note",n)},expression:"props.row.note"}})],1)],1):n("q-item-label",[e._v(e._s(r.value))])],1)],1)})),1),n("q-separator"),n("q-card-section",[n("q-btn",{on:{click:function(n){return e.showLogs(t)}}},[e._v(e._s(e.$t("logs")))]),t.row.is_online?n("q-btn",{on:{click:function(n){return e.reboot(t)}}},[e._v(e._s(e.$t("reboot")))]):e._e(),t.row.is_online?n("q-btn",{on:{click:function(n){return e.restart(t)}}},[e._v(e._s(e.$t("restart")))]):e._e()],1),n("q-separator"),n("q-card-section",[n("q-btn",{on:{click:function(n){return e.refresh(t)}}},[e._v(e._s(e.$t("refresh")))])],1)],1)],1)]}}])})],1)},o=[],a=(n("a434"),n("96cf"),n("c973")),s=n.n(a),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",{staticClass:"dot",style:"background-color: "+e.color})},c=[],l={props:{color:{type:String}}},u=l,d=(n("d0db"),n("2877")),m=Object(d["a"])(u,i,c,!1,null,"02bb3690",null),p=m.exports,f={components:{Dot:p},data:function(){return{devices:[],loading:!1,selected:null,history:this.$t("notloaded"),dialog:!1,currLogs:null,specials:["is_online"],columns:[{name:"device_name",label:this.$t("name"),align:"left",field:function(e){return e.device_name},format:function(e){return"".concat(e)},sortable:!0},{name:"is_online",label:this.$t("online"),align:"left",field:function(e){return[e.is_online,e.is_connected_to_vpn]},format:function(e){return"".concat(e)},sortable:!0},{name:"ip_address",label:this.$t("ip"),align:"left",field:function(e){return e.ip_address},format:function(e){return"".concat(e)},sortable:!0},{name:"note",label:this.$t("note"),align:"left",field:function(e){return e.note},format:function(e){return"".concat(e)},sortable:!0},{name:"status",label:this.$t("overall"),align:"left",field:function(e){return e.overall_status+" "+(null==e.overall_progress?"":e.overall_progress)},format:function(e){return"".concat(e)},sortable:!0}]}},mounted:function(){this.loadApplicationDetails()},methods:{saveNote:function(e){var t=this;return s()(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.loading=!0,n.next=3,t.$store.state.main.sdk.models.device.note(e.row.uuid,e.row.note);case 3:t.loading=!1;case 4:case"end":return n.stop()}}),n)})))()},reboot:function(e){var t=this;return s()(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.loading=!0,n.next=3,t.$store.state.main.sdk.models.device.reboot(e.row.uuid);case 3:t.loading=!1;case 4:case"end":return n.stop()}}),n)})))()},saveDeviceName:function(e){var t=this;return s()(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.loading=!0,n.next=3,t.$store.state.main.sdk.models.device.rename(e.row.uuid,e.row.device_name);case 3:t.loading=!1;case 4:case"end":return n.stop()}}),n)})))()},restart:function(e){var t=this;return s()(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.loading=!0,n.next=3,t.$store.state.main.sdk.models.device.restartApplication(e.row.uuid);case 3:t.loading=!1;case 4:case"end":return n.stop()}}),n)})))()},loadApplicationDetails:function(){var e=this;return s()(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loading=!0,t.next=3,e.$store.state.main.sdk.models.device.getAllByApplication(e.$route.params.id);case 3:e.devices=t.sent,e.loading=!1;case 5:case"end":return t.stop()}}),t)})))()},refresh:function(e){var t=this;return s()(regeneratorRuntime.mark((function n(){var r,o,a,s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.loading=!0,n.next=3,t.$store.state.main.sdk.models.device.get(e.row.uuid);case 3:r=n.sent,o=null,a=0;case 6:if(!(a<t.devices.length)){n.next=14;break}if(s=t.devices[a],s.uuid!==e.row.uuid){n.next=11;break}return o=a,n.abrupt("break",14);case 11:a++,n.next=6;break;case 14:t.devices.splice(o,1,r),t.loading=!1;case 16:case"end":return n.stop()}}),n)})))()},showLogs:function(e){var t=this;return s()(regeneratorRuntime.mark((function n(){var r,o,a,s,i,c;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.currLogs&&t.currLogs.unsubscribe(),t.history="Loading",t.dialog=!0,r=e.row.uuid,o="",n.next=7,t.$store.state.main.sdk.logs.history(r);case 7:for(a=n.sent,s=a.length-1;s>=0;s--)i=a[s],o=o+"\n"+new Date(i.timestamp).toISOString()+": "+i.message;return t.history=o,n.next=12,t.$store.state.main.sdk.logs.subscribe(r);case 12:c=n.sent,c.on("line",(function(e){t.history=new Date(e.timestamp).toISOString()+": "+e.message+"\n"+t.history})),t.currLogs=c;case 15:case"end":return n.stop()}}),n)})))()}}},v=f,g=(n("110e"),n("9989")),w=n("24e8"),_=n("f09f"),b=n("a370"),h=n("2c91"),k=n("9c40"),q=n("eaac"),x=n("1c1c"),$=n("66e5"),y=n("4074"),Q=n("0170"),R=n("42a1"),D=n("27f9"),L=n("eb85"),S=n("7f67"),C=n("eebe"),I=n.n(C),A=Object(d["a"])(v,r,o,!1,null,"2f1fdb04",null);t["default"]=A.exports;I()(A,"components",{QPage:g["a"],QDialog:w["a"],QCard:_["a"],QCardSection:b["a"],QSpace:h["a"],QBtn:k["a"],QTable:q["a"],QList:x["a"],QItem:$["a"],QItemSection:y["a"],QItemLabel:Q["a"],QPopupEdit:R["a"],QInput:D["a"],QSeparator:L["a"]}),I()(A,"directives",{ClosePopup:S["a"]})},a83c:function(e,t,n){},d0db:function(e,t,n){"use strict";n("d604")},d604:function(e,t,n){}}]);
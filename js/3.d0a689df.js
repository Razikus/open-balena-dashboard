(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"12b1":function(e,t,n){},"40f0":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("q-page",{attrs:{padding:""}},[n("q-dialog",{model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[n("q-card",{staticClass:"big"},[n("q-card-section",{staticClass:"row items-center q-pb-none"},[n("div",{staticClass:"text-h6"},[e._v("Logs")]),n("q-space"),n("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"close",flat:"",round:"",dense:""}})],1),n("q-card-section",[n("pre",[e._v(e._s(e.history))])])],1)],1),n("q-table",{attrs:{loading:e.loading,grid:"",title:"Devices",data:e.devices,columns:e.columns,"row-key":"device_name",selected:e.selected,pagination:e.pagination},on:{"update:selected":function(t){e.selected=t},"update:pagination":function(t){e.pagination=t}},scopedSlots:e._u([{key:"item",fn:function(t){return[n("div",{staticClass:"q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"},[n("q-card",[n("q-list",{attrs:{dense:""}},e._l(t.cols,(function(r){return n("q-item",{key:r.name},[n("q-item-section",[n("q-item-label",[e._v(e._s(r.label))])],1),n("q-item-section",{attrs:{side:""}},["is_online"==r.name?n("q-item-label",[t.row.is_online?n("Dot",{attrs:{color:"green"}}):n("Dot",{attrs:{color:"red"}}),e._v(" /\n                  "),t.row.is_connected_to_vpn?n("Dot",{attrs:{color:"green"}}):n("Dot",{attrs:{color:"red"}})],1):"device_name"==r.name?n("q-item-label",[e._v("\n                  "+e._s(r.value)+"\n                  "),n("q-popup-edit",{attrs:{buttons:"",title:e.$t("editname")},on:{save:function(n){return e.saveDeviceName(t)}},model:{value:t.row.device_name,callback:function(n){e.$set(t.row,"device_name",n)},expression:"props.row.device_name"}},[n("q-input",{attrs:{dense:"",autofocus:"",counter:""},model:{value:t.row.device_name,callback:function(n){e.$set(t.row,"device_name",n)},expression:"props.row.device_name"}})],1)],1):"note"==r.name?n("q-item-label",[null!==t.row.note?n("span",[e._v(" "+e._s(r.value))]):n("span",[e._v(e._s(e.$t("nonote")))]),n("q-popup-edit",{attrs:{buttons:"",title:e.$t("editname")},on:{save:function(n){return e.saveNote(t)}},model:{value:t.row.note,callback:function(n){e.$set(t.row,"note",n)},expression:"props.row.note"}},[n("q-input",{attrs:{dense:"",autofocus:"",counter:""},model:{value:t.row.note,callback:function(n){e.$set(t.row,"note",n)},expression:"props.row.note"}})],1)],1):n("q-item-label",[e._v(e._s(r.value))])],1)],1)})),1),n("q-separator"),n("q-card-section",[n("q-btn",{on:{click:function(n){return e.showLogs(t)}}},[e._v(e._s(e.$t("logs")))]),t.row.is_online?n("q-btn",{on:{click:function(n){return e.reboot(t)}}},[e._v(e._s(e.$t("reboot")))]):e._e(),t.row.is_online?n("q-btn",{on:{click:function(n){return e.restart(t)}}},[e._v(e._s(e.$t("restart")))]):e._e(),n("q-btn",{attrs:{to:"/deviceenvs/"+e.$route.params.id+"/"+t.row.uuid}},[e._v(e._s(e.$t("editDeviceEnv")))])],1),n("q-separator"),e.$store.state.main.tunnelerUrl?n("q-card-section",[n("q-toggle",{staticStyle:{width:"200px"},attrs:{color:"green",label:e.$t("exposedssh"),"checked-icon":"check","unchecked-icon":"clear",disable:e.deviceLoadingState[t.row.uuid]},on:{input:function(n){return e.ssh(t)}},model:{value:t.row.sshExposed,callback:function(n){e.$set(t.row,"sshExposed",n)},expression:"props.row.sshExposed"}}),t.row.sshExposed?n("q-btn",{staticStyle:{"margin-left":"10px"},attrs:{disable:e.deviceLoadingState[t.row.uuid],color:"secondary"},on:{click:function(n){return e.openDomain(t.row.sshDetails)}}},[e._v(e._s(e.$t("open")))]):e._e()],1):e._e(),e.$store.state.main.tunnelerUrl?n("q-card-section",[n("q-toggle",{staticStyle:{width:"200px"},attrs:{color:"green",label:e.$t("exposed80"),"checked-icon":"check","unchecked-icon":"clear",disable:e.deviceLoadingState[t.row.uuid]},on:{input:function(n){return e.expose(t)}},model:{value:t.row.exposed,callback:function(n){e.$set(t.row,"exposed",n)},expression:"props.row.exposed"}}),t.row.exposed?n("q-btn",{staticStyle:{"margin-left":"10px"},attrs:{disable:e.deviceLoadingState[t.row.uuid],color:"secondary"},on:{click:function(n){return e.openDomain(t.row.exposedDetails)}}},[e._v(e._s(e.$t("open")))]):e._e()],1):e._e(),e.$store.state.main.tunnelerUrl&&e.$store.state.main.SSLSuffix?n("q-card-section",[n("q-toggle",{staticStyle:{width:"200px"},attrs:{color:"green",label:e.$t("exposedSSL"),"checked-icon":"check","unchecked-icon":"clear",disable:e.deviceLoadingState[t.row.uuid]},on:{input:function(n){return e.exposeSSL(t)}},model:{value:t.row.exposedSSL,callback:function(n){e.$set(t.row,"exposedSSL",n)},expression:"props.row.exposedSSL"}}),t.row.exposedSSL?n("q-btn",{staticStyle:{"margin-left":"10px"},attrs:{disable:e.deviceLoadingState[t.row.uuid],color:"secondary"},on:{click:function(n){return e.openDomain(t.row.exposedDetails)}}},[e._v(e._s(e.$t("open")))]):e._e()],1):e._e(),n("q-separator"),n("q-card-section",[n("q-btn",{on:{click:function(n){return e.refresh(t)}}},[e._v(e._s(e.$t("refresh")))])],1)],1)],1)]}}])})],1)},o=[],a=(n("a434"),n("d3b7"),n("e6cf"),n("96cf"),n("c973")),s=n.n(a),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",{staticClass:"dot",style:"background-color: "+e.color})},c=[],l={props:{color:{type:String}}},u=l,d=(n("d0db"),n("2877")),p=Object(d["a"])(u,i,c,!1,null,"02bb3690",null),m=p.exports,f={components:{Dot:m},data:function(){return{devices:[],loading:!1,sshExpose:!1,selected:null,history:this.$t("notloaded"),dialog:!1,currLogs:null,appEnvVars:[],appConfigVars:[],deviceLoadingState:{},pagination:{rowsPerPage:20},columns:[{name:"device_name",label:this.$t("name"),align:"left",field:function(e){return e.device_name},format:function(e){return"".concat(e)},sortable:!0},{name:"is_online",label:this.$t("online"),align:"left",field:function(e){return[e.is_online,e.is_connected_to_vpn]},format:function(e){return"".concat(e)},sortable:!0},{name:"ip_address",label:this.$t("ip"),align:"left",field:function(e){return e.ip_address},format:function(e){return"".concat(e)},sortable:!0},{name:"mac_address",label:this.$t("mac_address"),align:"left",field:function(e){return e.mac_address},format:function(e){return"".concat(e)},sortable:!0},{name:"note",label:this.$t("note"),align:"left",field:function(e){return e.note},format:function(e){return"".concat(e)},sortable:!0},{name:"status",label:this.$t("overall"),align:"left",field:function(e){return e.overall_status+" "+(null==e.overall_progress?"":e.overall_progress)},format:function(e){return"".concat(e)},sortable:!0},{name:"uuid",label:this.$t("uuid"),align:"left",field:function(e){return e.uuid},format:function(e){return"".concat(e)},sortable:!0},{name:"last_connectivity_event",label:this.$t("last_connectivity_event"),align:"left",field:function(e){return e.last_connectivity_event},format:function(e){return"".concat(e)},sortable:!0},{name:"created_at",label:this.$t("created_at"),align:"left",field:function(e){return e.created_at},format:function(e){return"".concat(e)},sortable:!0}]}},mounted:function(){this.loadApplicationDetails(),this.$store.commit("main/selectApplication",this.$route.params.id)},methods:{saveNote:function(e){var t=this;return s()(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.loading=!0,n.next=3,t.$store.state.main.sdk.models.device.note(e.row.uuid,e.row.note);case 3:t.loading=!1;case 4:case"end":return n.stop()}}),n)})))()},reboot:function(e){var t=this;return s()(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.loading=!0,n.next=3,t.$store.state.main.sdk.models.device.reboot(e.row.uuid);case 3:t.loading=!1;case 4:case"end":return n.stop()}}),n)})))()},saveDeviceName:function(e){var t=this;return s()(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.loading=!0,n.next=3,t.$store.state.main.sdk.models.device.rename(e.row.uuid,e.row.device_name);case 3:t.loading=!1;case 4:case"end":return n.stop()}}),n)})))()},restart:function(e){var t=this;return s()(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.loading=!0,n.next=3,t.$store.state.main.sdk.models.device.restartApplication(e.row.uuid);case 3:t.loading=!1;case 4:case"end":return n.stop()}}),n)})))()},loadApplicationDetails:function(){var e=this;return s()(regeneratorRuntime.mark((function t(){var n,r,o,a,s,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loading=!0,t.next=3,e.$store.state.main.sdk.models.device.getAllByApplication(e.$route.params.id);case 3:if(n=t.sent,console.log(n),!e.$store.state.main.tunnelerUrl){t.next=10;break}return t.next=8,e.$tunnelerClient.getConnectionsForApp(e.$route.params.id);case 8:for(r=t.sent,o=0;o<n.length;o++)for(a=n[o],void 0===a.sshExposed&&(a.sshExposed=!1),void 0===a.exposed&&(a.exposed=!1),void 0===a.exposedSSL&&(a.exposedSSL=!1),s=0;s<r.length;s++)i=r[s],a.uuid===i.deviceUUID&&("SSHTRAEFIK"===i.forwarderType?(a.sshExposed=!0,a.sshDetails=i):"TRAEFIK"===i.forwarderType?(a.exposed=!0,a.exposedDetails=i):"SSLTRAEFIK"===i.forwarderType&&(a.exposedSSL=!0,a.exposedDetails=i,a.exposedDetails.ssl=!0),a.tunneler?a.tunneler.push(i):a.tunneler=[i]);case 10:e.devices=n,e.loading=!1;case 12:case"end":return t.stop()}}),t)})))()},openDomain:function(e){return s()(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=e.ssl?"https://":"http://",window.open(n+e.domainName,"_blank");case 2:case"end":return t.stop()}}),t)})))()},refresh:function(e){var t=this;return s()(regeneratorRuntime.mark((function n(){var r,o,a,s,i,c,l;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.loading=!0,n.next=3,t.$store.state.main.sdk.models.device.get(e.row.uuid);case 3:r=n.sent,o=null,a=0;case 6:if(!(a<t.devices.length)){n.next=14;break}if(s=t.devices[a],s.uuid!==e.row.uuid){n.next=11;break}return o=a,n.abrupt("break",14);case 11:a++,n.next=6;break;case 14:if(!t.$store.state.main.tunnelerUrl){n.next=23;break}return n.next=17,t.$tunnelerClient.getConnectionsForDevice(e.row.uuid);case 17:for(i=n.sent,r.tunneler=i,r.exposedSSL=!1,r.exposed=!1,r.sshExposed=!1,c=0;c<r.tunneler.length;c++)l=r.tunneler[c],console.log(l),"SSHTRAEFIK"===l.forwarderType?(r.sshExposed=!0,r.sshDetails=l,r.exposedDetails.ssl=!1):"TRAEFIK"===l.forwarderType?(r.exposed=!0,r.exposedDetails=l,r.exposedDetails.ssl=!1):"SSLTRAEFIK"===l.forwarderType&&(r.exposedSSL=!0,r.exposedDetails=l,r.exposedDetails.ssl=!0);case 23:t.devices.splice(o,1,r),t.loading=!1;case 25:case"end":return n.stop()}}),n)})))()},showLogs:function(e){var t=this;return s()(regeneratorRuntime.mark((function n(){var r,o,a,s,i,c;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.currLogs&&t.currLogs.unsubscribe(),t.history="Loading",t.dialog=!0,r=e.row.uuid,o="",n.next=7,t.$store.state.main.sdk.logs.history(r);case 7:for(a=n.sent,s=a.length-1;s>=0;s--)i=a[s],o=o+"\n"+new Date(i.timestamp).toISOString()+": "+i.message;return t.history=o,n.next=12,t.$store.state.main.sdk.logs.subscribe(r);case 12:c=n.sent,c.on("line",(function(e){t.history=new Date(e.timestamp).toISOString()+": "+e.message+"\n"+t.history})),t.currLogs=c;case 15:case"end":return n.stop()}}),n)})))()},exposeSSL:function(e){var t=this;return s()(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(t.loading=!0,t.deviceLoadingState[e.row.uuid]=!0,r=e.row.uuid,e.row.exposedSSL){n.next=8;break}return n.next=6,t.$tunnelerClient.deleteConnections(r,void 0,void 0,"SSLTRAEFIK");case 6:n.next=15;break;case 8:return o=r.substr(0,10)+".s1.skryba.online",n.next=11,t.$tunnelerClient.openSSLDomainFor(r,o,80,t.$route.params.id);case 11:return e.row.exposedDetails={domainName:"https://"+o},n.next=14,new Promise((function(e){return setTimeout(e,500)}));case 14:window.open(e.row.exposedDetails.domainName,"_blank");case 15:t.deviceLoadingState[e.row.uuid]=!1,t.loading=!1;case 17:case"end":return n.stop()}}),n)})))()},expose:function(e){var t=this;return s()(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(t.loading=!0,t.deviceLoadingState[e.row.uuid]=!0,r=e.row.uuid,e.row.exposed){n.next=8;break}return n.next=6,t.$tunnelerClient.deleteConnections(r,void 0,void 0,"TRAEFIK");case 6:n.next=15;break;case 8:return n.next=10,t.$tunnelerClient.openDomainFor(r,r,80,!0,t.$route.params.id);case 10:return o=n.sent,e.row.exposedDetails={domainName:"http://"+r+"."+o.ip+".xip.io"},n.next=14,new Promise((function(e){return setTimeout(e,500)}));case 14:window.open(e.row.exposedDetails.domainName,"_blank");case 15:t.deviceLoadingState[e.row.uuid]=!1,t.loading=!1;case 17:case"end":return n.stop()}}),n)})))()},ssh:function(e){var t=this;return s()(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(t.loading=!0,t.deviceLoadingState[e.row.uuid]=!0,r=e.row.uuid,e.row.sshExposed){n.next=8;break}return n.next=6,t.$tunnelerClient.deleteConnections(r,void 0,void 0,"SSHTRAEFIK");case 6:n.next=15;break;case 8:return n.next=10,t.$tunnelerClient.openSSHTraefik(r,"ssh."+r,22222,!0,t.$route.params.id);case 10:return o=n.sent,e.row.sshDetails={domainName:"http://ssh."+r+"."+o.ip+".xip.io"},n.next=14,new Promise((function(e){return setTimeout(e,500)}));case 14:window.open(e.row.sshDetails.domainName,"_blank");case 15:t.loading=!1,t.deviceLoadingState[e.row.uuid]=!1;case 17:case"end":return n.stop()}}),n)})))()}}},v=f,w=(n("d7ff"),n("9989")),g=n("24e8"),x=n("f09f"),h=n("a370"),b=n("2c91"),_=n("9c40"),S=n("eaac"),k=n("1c1c"),$=n("66e5"),q=n("4074"),D=n("0170"),L=n("42a1"),y=n("27f9"),R=n("eb85"),E=n("9564"),C=n("7f67"),T=n("eebe"),A=n.n(T),I=Object(d["a"])(v,r,o,!1,null,"52827b0c",null);t["default"]=I.exports;A()(I,"components",{QPage:w["a"],QDialog:g["a"],QCard:x["a"],QCardSection:h["a"],QSpace:b["a"],QBtn:_["a"],QTable:S["a"],QList:k["a"],QItem:$["a"],QItemSection:q["a"],QItemLabel:D["a"],QPopupEdit:L["a"],QInput:y["a"],QSeparator:R["a"],QToggle:E["a"]}),A()(I,"directives",{ClosePopup:C["a"]})},d0db:function(e,t,n){"use strict";n("d604")},d604:function(e,t,n){},d7ff:function(e,t,n){"use strict";n("12b1")}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Admins"],{f32b:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("dashboard-layout",{staticClass:"admins"},[a("b-breadcrumb",{staticClass:"bg-white border rounded shadow-sm font-weight-600 mb-30px"},[a("b-breadcrumb-item",{attrs:{to:"/dashboard"}},[a("b-icon",{staticClass:"mr-1",attrs:{icon:"house-fill",scale:"1.25","shift-v":"1.25","aria-hidden":"true"}}),e._v(" Dashboard ")],1),a("b-breadcrumb-item",{attrs:{active:""}},[e._v(" Admins ")])],1),a("b-row",{staticClass:"mb-30px"},[a("b-col",{attrs:{cols:"4"}},[a("b-form-group",{staticClass:"mb-0"},[a("b-input-group",[a("b-form-input",{attrs:{placeholder:"Search in Admins"},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),a("b-input-group-append",[a("b-btn",{attrs:{variant:"blue"}},[a("i",{staticClass:"fas fa-filter"})])],1)],1)],1)],1),a("b-col",{staticClass:"text-right"},[a("b-btn",{staticClass:"d-inline-flex align-items-center",attrs:{variant:"primary"},on:{click:e.createAdmin}},[a("b-icon",{staticClass:"mr-1",attrs:{icon:"plus",scale:"1.3"}}),e._v(" Create ")],1)],1)],1),a("b-modal",{attrs:{id:"dropdownActionModal","hide-header":"","hide-footer":"","body-class":"p-0",centered:"",size:"sm"}},[a("ul",{staticClass:"m-0 p-0 list-unstyled"},[a("b-dropdown-item",{attrs:{"link-class":"py-2 d-flex align-items-center"},on:{click:e.editAdmin}},[a("b-icon",{attrs:{icon:"pencil-square",scale:"0.8"}}),a("span",{staticClass:"mx-2 text-muted"},[e._v("Edit Admin")])],1),a("hr",{staticClass:"m-0"}),a("b-dropdown-item",{directives:[{name:"b-modal",rawName:"v-b-modal.deleteAdminModal",modifiers:{deleteAdminModal:!0}}],attrs:{"link-class":"py-2 d-flex align-items-center text-danger"},on:{click:function(t){e.admin=e.row.item}}},[a("b-icon",{attrs:{icon:"trash",scale:"0.8"}}),a("span",{staticClass:"mx-2 text-muted"},[e._v("Delete Admin")])],1)],1)]),a("b-table",{staticClass:"bg-white shadow-sm mt-3 mb-0",attrs:{"show-empty":"",stacked:"lg",responsive:"",hover:"","sort-icon-left":"",busy:e.tableIsBusy,items:e.items,fields:e.fields,"current-page":1,"per-page":e.perPage,"sort-by":e.sortBy,"sort-desc":e.sortDesc,filter:e.search,"filter-function":function(){return e.items}},on:{"update:sortBy":function(t){e.sortBy=t},"update:sort-by":function(t){e.sortBy=t},"update:sortDesc":function(t){e.sortDesc=t},"update:sort-desc":function(t){e.sortDesc=t},"context-changed":e.contextChanged},scopedSlots:e._u([{key:"cell(actions)",fn:function(t){return[a("div",{staticClass:"d-flex align-items-center"},[a("b-form-checkbox",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip",value:t.item.isActive?"Deactivate":"Activate",expression:"row.item.isActive ? 'Deactivate' : 'Activate'"}],staticClass:"ml-2 c-pointer",attrs:{switch:""},on:{change:function(a){return e.changeStatus(t.item)}},model:{value:t.item.isActive,callback:function(a){e.$set(t.item,"isActive",a)},expression:"row.item.isActive"}}),a("b-icon",{staticClass:"c-pointer",attrs:{icon:"three-dots-vertical",scale:"1.5"},on:{click:function(a){return e.showActions(t.item)}}})],1)]}},{key:"cell(image)",fn:function(t){return[a("b-avatar",{staticClass:"shadow-sm",attrs:{src:e.API_URL+"/user-image/"+t.value,alt:t.value,rounded:"lg"}})]}}])}),a("b-row",{staticClass:"pt-3"},[a("b-col",{attrs:{sm:"6",md:"6",lg:"4"}},[a("div",{staticClass:"d-flex align-items-center"},[a("b-card",{staticClass:"rounded-pill",attrs:{"body-class":"d-flex align-items-center py-0 px-3"}},[a("span",{staticClass:"text-muted"},[e._v("Rows per page: ")]),a("b-form-group",{staticClass:"mb-0"},[a("b-form-select",{staticClass:"bg-transparent border-0 shadow-none",attrs:{options:e.perPageOptions},model:{value:e.perPage,callback:function(t){e.perPage=t},expression:"perPage"}})],1)],1)],1)]),a("b-col",{staticClass:"ml-auto",attrs:{sm:"6",md:"6",lg:"4"}},[a("b-pagination",{staticClass:"pagination",attrs:{"total-rows":e.docsCount,"per-page":e.perPage,align:"fill",size:"md",pills:""},model:{value:e.page,callback:function(t){e.page=t},expression:"page"}})],1)],1),a("DeleteFieldModal",{attrs:{msg:"Are you sure to delete this admin ?","modal-id":"deleteAdminModal"},on:{done:e.removeAdmin}}),a("AdminForm")],1)},s=[],i=a("1da1"),r=(a("99af"),a("96cf"),a("17cc")),o=a("2490"),l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-modal",{attrs:{"no-close-on-backdrop":e.isLoading,"no-close-on-esc":e.isLoading,id:"adminForm","hide-footer":"",size:"lg"},on:{hidden:e.resetModal,ok:e.handleSave,show:e.modalIsShown},scopedSlots:e._u([{key:"modal-header",fn:function(t){var n=t.close;return[a("div",{staticClass:"d-flex align-items-center justify-content-between w-100"},[a("div",{staticClass:"d-flex align-items-center"},[e.isUpdate?[a("h6",{staticClass:"mb-0"},[e._v("Update Admin")])]:[a("h6",{staticClass:"mb-0"},[e._v("Create Admin")])]],2),a("b-button",{attrs:{disabled:e.isLoading,size:"sm",variant:"outline-danger"},on:{click:function(e){return n()}}},[e._v(" Close ")])],1)]}},{key:"default",fn:function(t){var n=t.ok;return[a("b-form",{on:{submit:function(e){return n()}}},[a("b-form-group",{attrs:{label:"Fullname","label-for":"fullname"}},[a("b-form-input",{attrs:{disabled:e.isLoading,type:"text",id:"fullname"},model:{value:e.admin.fullname,callback:function(t){e.$set(e.admin,"fullname","string"===typeof t?t.trim():t)},expression:"admin.fullname"}}),a("input-error",{attrs:{vuelidate:e.$v.admin.fullname,field:"fullname",namespace:e.namespace}})],1),a("b-form-group",{attrs:{label:"Phone","label-for":"phone"}},[a("b-form-input",{attrs:{disabled:e.isLoading,type:"tel",id:"phone"},model:{value:e.admin.phone,callback:function(t){e.$set(e.admin,"phone","string"===typeof t?t.trim():t)},expression:"admin.phone"}}),a("input-error",{attrs:{vuelidate:e.$v.admin.phone,field:"phone",namespace:e.namespace}})],1),a("b-form-group",{attrs:{label:"Username","label-for":"username"}},[a("b-form-input",{attrs:{disabled:e.isLoading,type:"text",id:"username"},model:{value:e.admin.username,callback:function(t){e.$set(e.admin,"username","string"===typeof t?t.trim():t)},expression:"admin.username"}}),a("input-error",{attrs:{vuelidate:e.$v.admin.username,field:"username",namespace:e.namespace}})],1),a("b-form-group",{attrs:{label:"Email address","label-for":"email"}},[a("b-form-input",{attrs:{disabled:e.isLoading,type:"email",id:"email"},model:{value:e.admin.email,callback:function(t){e.$set(e.admin,"email","string"===typeof t?t.trim():t)},expression:"admin.email"}}),a("input-error",{attrs:{vuelidate:e.$v.admin.email,field:"email",namespace:e.namespace}})],1),e.isUpdate?e._e():a("b-form-group",{attrs:{label:"Password","label-for":"password"}},[a("b-form-input",{attrs:{disabled:e.isLoading,type:"password",id:"password"},model:{value:e.admin.password,callback:function(t){e.$set(e.admin,"password","string"===typeof t?t.trim():t)},expression:"admin.password"}}),a("input-error",{attrs:{vuelidate:e.$v.admin.password,field:"password",namespace:e.namespace}})],1),a("div",{staticClass:"text-right"},[a("b-overlay",{staticClass:"d-inline-block",attrs:{show:e.isLoading,rounded:"",opacity:"0.6","spinner-small":"","spinner-variant":"primary"}},[e.isUpdate?a("b-btn",{attrs:{disabled:e.isLoading,variant:"outline-success"},on:{click:function(e){return n()}}},[e._v("Update")]):a("b-btn",{attrs:{disabled:e.isLoading,variant:"outline-primary"},on:{click:function(e){return n()}}},[e._v("Save")])],1)],1)],1)]}}])})},d=[],c=a("5530"),m=a("b5ae"),u={data:function(){return{namespace:"Admin",admin:{username:null,fullname:null,phone:null,email:null,password:null}}},validations:function(){var e={fullname:{required:m["required"],minLength:Object(m["minLength"])(6),maxLength:Object(m["maxLength"])(54)},username:{required:m["required"],minLength:Object(m["minLength"])(3),maxLength:Object(m["maxLength"])(54)},phone:{required:m["required"],minLength:Object(m["minLength"])(4),maxLength:Object(m["maxLength"])(54)},email:{required:m["required"],email:m["email"]},password:{required:m["required"],minLength:Object(m["minLength"])(8),maxLength:Object(m["maxLength"])(54)}};return this.isUpdate&&delete e.password,{admin:e}},computed:{oldAdmin:function(){return this.$store.state.Admin.one},isUpdate:function(){return!!this.oldAdmin&&!!this.oldAdmin._id}},methods:{handleSave:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.preventDefault(),t.$v.$touch(),!t.$v.$invalid){a.next=4;break}return a.abrupt("return");case 4:if(a.prev=4,t.setLoading(!0),!t.isUpdate){a.next=12;break}return a.next=9,t.$store.dispatch("Admin/update",t.admin);case 9:n=a.sent,a.next=15;break;case 12:return a.next=14,t.$store.dispatch("Admin/create",t.admin);case 14:n=a.sent;case 15:return a.next=17,t.$store.dispatch("Admin/all");case 17:t.setGlobalSuccess(n.msg),t.$bvModal.hide("adminForm"),a.next=23;break;case 21:a.prev=21,a.t0=a["catch"](4);case 23:t.setLoading(!1);case 24:case"end":return a.stop()}}),a,null,[[4,21]])})))()},modalIsShown:function(){this.isUpdate&&(this.admin=Object(c["a"])({},this.oldAdmin))},resetModal:function(){this.$v.$reset(),this.removeAllErrors(),this.admin={username:null,fullname:null,phone:null,email:null,password:null}}}},p=u,b=a("2877"),f=Object(b["a"])(p,l,d,!1,null,null,null),h=f.exports,v=a("10b2"),g={mixins:[r["a"]],components:{DashboardLayout:v["a"],DeleteFieldModal:o["a"],AdminForm:h},data:function(){return{namespace:"Admin",admin:{},fields:[{key:"image",lable:"Image",sortable:!0},{key:"username",lable:"Username",sortable:!0},{key:"fullname",lable:"Fullname",sortable:!0},{key:"phone",lable:"Phone",sortable:!0},{key:"email",lable:"Email",sortable:!0},{key:"actions",lable:"Actions"}]}},computed:{},methods:{showActions:function(e){this.admin=e,this.$bvModal.show("dropdownActionModal")},createAdmin:function(){this.$store.commit("Admin/setOne",{}),this.$bvModal.show("adminForm")},editAdmin:function(){this.$store.commit("Admin/setOne",this.admin),this.$bvModal.show("adminForm")},removeAdmin:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$store.dispatch("Admin/remove",e.admin);case 3:a=t.sent,a&&a.msg&&e.setGlobalSuccess(a.msg),e.$nextTick((function(){e.$bvModal.hide("deleteAdminModal")})),t.next=10;break;case 8:t.prev=8,t.t0=t["catch"](0);case 10:case"end":return t.stop()}}),t,null,[[0,8]])})))()},changeStatus:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,t.$store.dispatch("Admin/changeStatus",e);case 3:n="".concat(e.username," has been ").concat(e.isActive?"activated":"deactivated"," sucessfully."),t.setGlobalSuccess(n),a.next=9;break;case 7:a.prev=7,a.t0=a["catch"](0);case 9:case"end":return a.stop()}}),a,null,[[0,7]])})))()}}},w=g,x=Object(b["a"])(w,n,s,!1,null,null,null);t["default"]=x.exports}}]);
//# sourceMappingURL=Admins.4e83e51e.js.map
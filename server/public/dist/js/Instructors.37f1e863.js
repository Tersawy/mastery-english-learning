(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Instructors"],{"166d":function(t,e,s){},"4c62":function(t,e,s){"use strict";s("166d")},c4ba:function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("dashboard-layout",{staticClass:"instructors"},[s("b-breadcrumb",{staticClass:"bg-white border rounded shadow-sm font-weight-600 mb-30px"},[s("b-breadcrumb-item",{attrs:{to:"/dashboard"}},[s("b-icon",{staticClass:"mr-1",attrs:{icon:"house-fill",scale:"1.25","shift-v":"1.25","aria-hidden":"true"}}),t._v(" Dashboard ")],1),s("b-breadcrumb-item",{attrs:{active:""}},[t._v(" Instructors ")])],1),s("b-row",{staticClass:"mb-30px"},[s("b-col",{attrs:{cols:"8",lg:"6"}},[s("b-form-group",{staticClass:"mb-0"},[s("b-input-group",[s("b-form-input",{attrs:{placeholder:"Search in Instructors"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),s("b-input-group-append",[s("b-btn",{attrs:{variant:"blue"}},[s("i",{staticClass:"fas fa-filter"})])],1)],1)],1)],1),s("b-col",{staticClass:"text-right"},[s("b-btn",{staticClass:"d-inline-flex align-items-center",attrs:{variant:"primary"},on:{click:t.createInstructor}},[s("b-icon",{staticClass:"mr-1",attrs:{icon:"plus",scale:"1.3"}}),t._v(" Create ")],1)],1)],1),s("b-table",{staticClass:"bg-white shadow-sm mt-3 mb-0",attrs:{"show-empty":"",stacked:"lg",hover:"","sort-icon-left":"",busy:t.tableIsBusy,items:t.items,fields:t.fields,"current-page":1,"per-page":t.perPage,"sort-by":t.sortBy,"sort-desc":t.sortDesc,filter:t.search,"filter-function":function(){return t.items}},on:{"update:sortBy":function(e){t.sortBy=e},"update:sort-by":function(e){t.sortBy=e},"update:sortDesc":function(e){t.sortDesc=e},"update:sort-desc":function(e){t.sortDesc=e},"context-changed":t.contextChanged},scopedSlots:t._u([{key:"cell(actions)",fn:function(e){return[s("div",{staticClass:"d-flex align-items-center"},[s("b-form-checkbox",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip",value:e.item.isActive?"Deactivate":"Activate",expression:"row.item.isActive ? 'Deactivate' : 'Activate'"}],staticClass:"ml-2 c-pointer",attrs:{switch:""},on:{change:function(s){return t.changeStatus(e.item)}},model:{value:e.item.isActive,callback:function(s){t.$set(e.item,"isActive",s)},expression:"row.item.isActive"}}),s("b-dropdown",{attrs:{"toggle-class":"p-0 bg-transparent text-dark border-0","toggle-tag":"div","no-caret":"",right:""},scopedSlots:t._u([{key:"button-content",fn:function(){return[s("b-icon",{staticClass:"c-pointer",attrs:{icon:"three-dots-vertical",scale:"1.5"}})]},proxy:!0}],null,!0)},[s("b-dropdown-item",{attrs:{"link-class":"py-2 d-flex align-items-center"},on:{click:function(s){return t.editInstructor(Object.assign({},e.item))}}},[s("b-icon",{attrs:{icon:"pencil-square",scale:"0.8"}}),s("span",{staticClass:"mx-2 text-muted"},[t._v("Edit Instructor")])],1),s("hr",{staticClass:"m-0"}),s("b-dropdown-item",{attrs:{"link-class":"py-2 d-flex align-items-center text-danger"},on:{click:function(s){return t.showDeleteInstructor(Object.assign({},e.item))}}},[s("b-icon",{attrs:{icon:"trash",scale:"0.8"}}),s("span",{staticClass:"mx-2 text-muted"},[t._v("Delete Instructor")])],1)],1)],1)]}},{key:"cell(image)",fn:function(e){return[s("b-avatar",{staticClass:"shadow-sm",attrs:{src:t.API_URL+"/user-image/"+e.value,alt:e.value,rounded:"lg"}})]}}])}),s("b-row",{staticClass:"pt-3"},[s("b-col",{attrs:{sm:"6",md:"6",lg:"4"}},[s("div",{staticClass:"d-flex align-items-center"},[s("b-card",{staticClass:"rounded-pill",attrs:{"body-class":"d-flex align-items-center py-0 px-3"}},[s("span",{staticClass:"text-muted"},[t._v("Rows per page: ")]),s("b-form-group",{staticClass:"mb-0"},[s("b-form-select",{staticClass:"bg-transparent border-0 shadow-none",attrs:{options:t.perPageOptions},model:{value:t.perPage,callback:function(e){t.perPage=e},expression:"perPage"}})],1)],1)],1)]),s("b-col",{staticClass:"ml-auto",attrs:{sm:"6",md:"6",lg:"4"}},[s("b-pagination",{staticClass:"pagination",attrs:{"total-rows":t.docsCount,"per-page":t.perPage,align:"fill",size:"md",pills:""},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}})],1)],1),s("DeleteModal",{ref:"deleteInstructorModal",attrs:{field:"Instructor"},on:{ok:t.removeInstructor}}),s("InstructorForm")],1)},n=[],a=s("1da1"),i=(s("99af"),s("96cf"),s("17cc")),o=s("ec05"),c=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-modal",{attrs:{"no-close-on-backdrop":t.isLoading,"no-close-on-esc":t.isLoading,id:"instructorForm","hide-footer":"",size:"lg"},on:{hidden:t.resetModal,ok:t.handleSave,show:t.modalIsShown},scopedSlots:t._u([{key:"modal-header",fn:function(e){var r=e.close;return[s("div",{staticClass:"d-flex align-items-center justify-content-between w-100"},[s("div",{staticClass:"d-flex align-items-center"},[t.isUpdate?[s("h6",{staticClass:"mb-0"},[t._v("Update Instructor")])]:[s("h6",{staticClass:"mb-0"},[t._v("Create Instructor")])]],2),s("b-button",{attrs:{disabled:t.isLoading,size:"sm",variant:"outline-danger"},on:{click:function(t){return r()}}},[t._v(" Close ")])],1)]}},{key:"default",fn:function(e){var r=e.ok;return[s("b-form",{on:{submit:function(t){return r()}}},[s("b-form-group",{attrs:{label:"Fullname","label-for":"fullname"}},[s("b-form-input",{attrs:{disabled:t.isLoading,type:"text",id:"fullname"},model:{value:t.instructor.fullname,callback:function(e){t.$set(t.instructor,"fullname","string"===typeof e?e.trim():e)},expression:"instructor.fullname"}}),s("input-error",{attrs:{vuelidate:t.$v.instructor.fullname,field:"fullname",namespace:t.namespace}})],1),s("b-form-group",{attrs:{label:"Phone","label-for":"phone"}},[s("b-form-input",{attrs:{disabled:t.isLoading,type:"tel",id:"phone"},model:{value:t.instructor.phone,callback:function(e){t.$set(t.instructor,"phone","string"===typeof e?e.trim():e)},expression:"instructor.phone"}}),s("input-error",{attrs:{vuelidate:t.$v.instructor.phone,field:"phone",namespace:t.namespace}})],1),s("b-form-group",{attrs:{label:"Username","label-for":"username"}},[s("b-form-input",{attrs:{disabled:t.isLoading,type:"text",id:"username"},model:{value:t.instructor.username,callback:function(e){t.$set(t.instructor,"username","string"===typeof e?e.trim():e)},expression:"instructor.username"}}),s("input-error",{attrs:{vuelidate:t.$v.instructor.username,field:"username",namespace:t.namespace}})],1),s("b-form-group",{attrs:{label:"Email address","label-for":"email"}},[s("b-form-input",{attrs:{disabled:t.isLoading,type:"email",id:"email"},model:{value:t.instructor.email,callback:function(e){t.$set(t.instructor,"email","string"===typeof e?e.trim():e)},expression:"instructor.email"}}),s("input-error",{attrs:{vuelidate:t.$v.instructor.email,field:"email",namespace:t.namespace}})],1),t.isUpdate?t._e():s("b-form-group",{attrs:{label:"Password","label-for":"password"}},[s("b-form-input",{attrs:{disabled:t.isLoading,type:"password",id:"password"},model:{value:t.instructor.password,callback:function(e){t.$set(t.instructor,"password","string"===typeof e?e.trim():e)},expression:"instructor.password"}}),s("input-error",{attrs:{vuelidate:t.$v.instructor.password,field:"password",namespace:t.namespace}})],1),s("div",{staticClass:"text-right"},[s("b-overlay",{staticClass:"d-inline-block",attrs:{show:t.isLoading,rounded:"",opacity:"0.6","spinner-small":"","spinner-variant":"primary"}},[t.isUpdate?s("b-btn",{attrs:{disabled:t.isLoading,variant:"outline-success"},on:{click:function(t){return r()}}},[t._v("Update")]):s("b-btn",{attrs:{disabled:t.isLoading,variant:"outline-primary"},on:{click:function(t){return r()}}},[t._v("Save")])],1)],1)],1)]}}])})},l=[],u=s("5530"),d=s("b5ae"),m={data:function(){return{namespace:"Instructor",instructor:{username:null,fullname:null,phone:null,email:null,password:null}}},validations:function(){var t={fullname:{required:d["required"],minLength:Object(d["minLength"])(6),maxLength:Object(d["maxLength"])(54)},username:{required:d["required"],minLength:Object(d["minLength"])(3),maxLength:Object(d["maxLength"])(54)},phone:{required:d["required"],minLength:Object(d["minLength"])(4),maxLength:Object(d["maxLength"])(54)},email:{required:d["required"],email:d["email"]},password:{minLength:Object(d["minLength"])(8),maxLength:Object(d["maxLength"])(54)}};return{instructor:t}},computed:{oldInstructor:function(){return this.$store.state.Instructor.one},isUpdate:function(){return!!this.oldInstructor&&!!this.oldInstructor._id}},methods:{handleSave:function(t){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function s(){var r;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:if(t.preventDefault(),e.$v.$touch(),!e.$v.$invalid){s.next=4;break}return s.abrupt("return");case 4:if(s.prev=4,e.setLoading(!0),!e.isUpdate){s.next=12;break}return s.next=9,e.$store.dispatch("Instructor/update",e.instructor);case 9:r=s.sent,s.next=15;break;case 12:return s.next=14,e.$store.dispatch("Instructor/create",e.instructor);case 14:r=s.sent;case 15:return s.next=17,e.$store.dispatch("Instructor/all");case 17:e.setGlobalSuccess(r.msg),e.$bvModal.hide("instructorForm"),e.$bvModal.hide("dropdownActionModal"),s.next=24;break;case 22:s.prev=22,s.t0=s["catch"](4);case 24:e.setLoading(!1);case 25:case"end":return s.stop()}}),s,null,[[4,22]])})))()},modalIsShown:function(){this.isUpdate&&(this.instructor=Object(u["a"])(Object(u["a"])({},this.oldInstructor),{},{password:null}))},resetModal:function(){this.$v.$reset(),this.removeAllErrors(),this.instructor={username:null,fullname:null,phone:null,email:null,password:null}}}},p=m,b=s("2877"),f=Object(b["a"])(p,c,l,!1,null,null,null),h=f.exports,g=s("10b2"),v={mixins:[i["a"]],components:{DashboardLayout:g["a"],DeleteModal:o["a"],InstructorForm:h},data:function(){return{namespace:"Instructor",fields:[{key:"image",lable:"Image",sortable:!0},{key:"username",lable:"Username",sortable:!0},{key:"fullname",lable:"Fullname",sortable:!0},{key:"phone",lable:"Phone",sortable:!0},{key:"email",lable:"Email",sortable:!0},{key:"actions",lable:"Actions"}]}},methods:{createInstructor:function(){this.$store.commit("Instructor/setOne",{}),this.$bvModal.show("instructorForm")},editInstructor:function(t){this.$store.commit("Instructor/setOne",t),this.$bvModal.show("instructorForm")},showDeleteInstructor:function(t){this.$refs.deleteInstructorModal.open(t)},removeInstructor:function(t){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function s(){var r;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.prev=0,e.$refs.deleteInstructorModal.setBusy(!0),s.next=4,e.$store.dispatch("Instructor/remove",t);case 4:r=s.sent,r&&r.msg&&e.setGlobalSuccess(r.msg),e.$nextTick(e.$refs.deleteInstructorModal.close),s.next=11;break;case 9:s.prev=9,s.t0=s["catch"](0);case 11:case"end":return s.stop()}}),s,null,[[0,9]])})))()},changeStatus:function(t){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function s(){var r;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,e.$store.dispatch("Instructor/changeStatus",t);case 3:r="".concat(t.username," has been ").concat(t.isActive?"activated":"deactivated"," sucessfully."),e.setGlobalSuccess(r),s.next=9;break;case 7:s.prev=7,s.t0=s["catch"](0);case 9:case"end":return s.stop()}}),s,null,[[0,7]])})))()}}},x=v,w=Object(b["a"])(x,r,n,!1,null,null,null);e["default"]=w.exports},ec05:function(t,e,s){"use strict";var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-modal",{ref:t.id,attrs:{id:t.id,"hide-footer":"","hide-header":"","no-fade":"","no-close-on-esc":t.isBusy,"no-close-on-backdrop":t.isBusy,size:"md",centered:""}},[s("div",{staticClass:"text-center py-4 px-2"},[s("span",{staticClass:"d-block text-danger p-5"},[s("b-icon",{attrs:{icon:"trash",scale:"8"}})],1),s("h2",{staticClass:"delete-msg text-blue my-3"},[t._v(" Are you sure you want to delete this "),s("strong",[t._v(t._s(t.field))])]),s("p",{staticClass:"text-muted mb-4"},[t._v("This action cannot be undone.")]),s("div",{staticClass:"d-flex text-center"},[s("b-btn",{ref:"cancelBtn",staticClass:"w-50 mr-3",attrs:{variant:"outline-blue",disabled:t.isBusy},on:{click:t.cancel}},[t._v(" No, Cancel ")]),s("b-btn",{staticClass:"w-50 d-flex align-items-center justify-content-center",attrs:{variant:"danger",disabled:t.isBusy},on:{click:t.ok}},[s("span",[t._v(" Yes, Delete ")]),t.isBusy?s("b-spinner",{staticClass:"ml-2",attrs:{small:""}}):t._e()],1)],1)])])},n=[],a=s("1da1"),i=(s("96cf"),s("d3b7"),function(t){return new Promise((function(e){return setTimeout(e,t)}))}),o={props:{id:{type:String,default:"deleteModal"},field:{type:String,default:"field"}},data:function(){return{isBusy:!1,bridge:null}},methods:{open:function(t){var e=this;this.bridge=t,this.$nextTick(Object(a["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.$bvModal.show(e.id),t.next=3,i(50);case 3:e.popUpAnimation(),e.$refs.cancelBtn.focus();case 5:case"end":return t.stop()}}),t)}))))},close:function(){var t=this;this.bridge=null,this.setBusy(!1),this.$nextTick((function(){t.$bvModal.hide(t.id)}))},cancel:function(){this.$emit("cancel",this.bridge),this.close()},setBusy:function(t){this.isBusy=!!t},ok:function(){this.$emit("ok",this.bridge)},popUpAnimation:function(t){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function s(){var r;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return t&&t.preventDefault(),r=e.$refs[e.id].$refs.content,r.style.transition="transform 0.2s ease",r.style.transform="scale(0.9)",s.next=6,i(100);case 6:return r.style.transform="none",s.next=9,i(100);case 9:return r.style.transform="scale(0.9)",s.next=12,i(100);case 12:r.style.transform="none";case 13:case"end":return s.stop()}}),s)})))()}}},c=o,l=(s("4c62"),s("2877")),u=Object(l["a"])(c,r,n,!1,null,null,null);e["a"]=u.exports}}]);
//# sourceMappingURL=Instructors.37f1e863.js.map
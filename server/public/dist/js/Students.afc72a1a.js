(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Students"],{"129f":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},"17cc":function(t,e,s){"use strict";var a=s("1da1");s("99af"),s("ac1f"),s("841c"),s("96cf");e["a"]={data:function(){return{perPageOptions:[{value:10,text:10},{value:20,text:20},{value:30,text:30},{value:40,text:40},{value:50,text:50}],tableIsBusy:!1,perPage:10,page:1,sortBy:"",sortDesc:!1,search:""}},mounted:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getItems(t.queries);case 2:t.$store.commit("setLoader",!1);case 3:case"end":return e.stop()}}),e)})))()},computed:{items:function(){return this.$store.state[this.namespace].all.docs},docsCount:function(){return this.$store.state[this.namespace].all.total},dirSort:function(){return this.sortDesc?"desc":"asc"},fieldSort:function(){return"image"==this.sortBy?"id":this.sortBy},queries:function(){var t="?page=".concat(this.page,"&per_page=").concat(this.perPage,"&search=").concat(this.search,"&sort_by=").concat(this.fieldSort,"&sort_dir=").concat(this.dirSort);for(var e in this.filterationFields)t+="&".concat(e,"=").concat(this.filterationFields[e]);return t}},watch:{search:function(){this.page=1,this.sortBy="id",this.sortDesc=!1},page:function(){this.finallData()},perPage:function(){this.page=1}},methods:{getItems:function(t){return this.$store.dispatch("".concat(this.namespace,"/all"),t)},moveToTrash:function(t){return this.$store.dispatch("".concat(this.namespace,"/moveToTrash"),t)},remove:function(t){return this.$store.dispatch("".concat(this.namespace,"/remove"),t)},setOne:function(t){this.$store.commit("".concat(this.namespace,"/one"),{data:t})},contextChanged:function(t){this.sortBy=t.sortBy,this.sortDesc=t.sortDesc,this.finallData()},finallData:function(){var t=this;this.tableIsBusy=!0,this.getItems(this.queries),this.$nextTick((function(){t.tableIsBusy=!1}))}}}},2490:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-modal",{staticClass:"delete-field-modal",attrs:{id:t.modalId,"body-class":"p-0","hide-footer":"","hide-header":"",centered:"","no-close-on-backdrop":t.btnLoading,"no-close-on-esc":t.btnLoading},on:{hide:function(e){t.btnLoading=!1}}},[s("div",{staticClass:"modal-delete"},[s("div",{staticClass:"modal-icon"},[s("i",{staticClass:"fa fa-times"})]),s("p",{staticClass:"modal-msg py-4"},[t._t("msg",(function(){return[t._v(t._s(t.msg))]}))],2),s("div",{staticClass:"modal-btn-action d-flex justify-content-center"},[t.btnLoading?s("b-btn",{staticClass:"mx-1",attrs:{disabled:"",size:"md",variant:"danger"}},[t._v(" Loading... "),s("b-spinner",{attrs:{type:"grow",small:""}})],1):s("b-btn",{staticClass:"mx-1",attrs:{size:"md",variant:"danger"},on:{click:t.done}},[t._v(" Ok ")]),s("b-btn",{staticClass:"mx-1",attrs:{size:"md",variant:"blue",disabled:t.btnLoading},on:{click:function(e){return t.$bvModal.hide(t.modalId)}}},[t._v(" No ")])],1)])])},n=[],i={props:["msg","modalId"],data:function(){return{btnLoading:!1}},methods:{done:function(){this.btnLoading=!0,this.$emit("done")}}},r=i,o=(s("35d6"),s("2877")),c=Object(o["a"])(r,a,n,!1,null,null,null);e["a"]=c.exports},"35d6":function(t,e,s){"use strict";s("78d1")},"78d1":function(t,e,s){},"841c":function(t,e,s){"use strict";var a=s("d784"),n=s("825a"),i=s("1d80"),r=s("129f"),o=s("577e"),c=s("14c3");a("search",(function(t,e,s){return[function(e){var s=i(this),a=void 0==e?void 0:e[t];return void 0!==a?a.call(e,s):new RegExp(e)[t](o(s))},function(t){var a=n(this),i=o(t),l=s(e,a,i);if(l.done)return l.value;var d=a.lastIndex;r(d,0)||(a.lastIndex=0);var u=c(a,i);return r(a.lastIndex,d)||(a.lastIndex=d),null===u?-1:u.index}]}))},"8db8":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"students"},[a("b-breadcrumb",{staticClass:"bg-white border rounded shadow-sm font-weight-600 mb-30px"},[a("b-breadcrumb-item",{attrs:{to:"/dashboard"}},[a("b-icon",{staticClass:"mr-1",attrs:{icon:"house-fill",scale:"1.25","shift-v":"1.25","aria-hidden":"true"}}),t._v(" Dashboard ")],1),a("b-breadcrumb-item",{attrs:{active:""}},[t._v(" Students ")])],1),a("b-row",{staticClass:"mb-30px"},[a("b-col",{attrs:{cols:"4"}},[a("b-form-group",{staticClass:"mb-0"},[a("b-input-group",[a("b-form-input",{attrs:{placeholder:"Search in Students"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),a("b-input-group-append",[a("b-btn",{attrs:{variant:"blue"}},[a("i",{staticClass:"fas fa-filter"})])],1)],1)],1)],1),a("b-col",{staticClass:"text-right"},[a("b-btn",{staticClass:"d-inline-flex align-items-center",attrs:{variant:"primary"},on:{click:t.createStudent}},[a("b-icon",{staticClass:"mr-1",attrs:{icon:"plus",scale:"1.3"}}),t._v(" Create ")],1)],1)],1),a("b-modal",{attrs:{id:"dropdownActionModal","hide-header":"","hide-footer":"","body-class":"p-0",centered:"",size:"sm"}},[a("ul",{staticClass:"m-0 p-0 list-unstyled"},[a("b-dropdown-item",{attrs:{"link-class":"py-2 d-flex align-items-center"},on:{click:t.showCourses}},[a("b-icon",{attrs:{icon:"eye",scale:"0.8"}}),a("span",{staticClass:"mx-2 text-muted"},[t._v("Show Courses")])],1),a("b-dropdown-item",{attrs:{"link-class":"py-2 d-flex align-items-center"},on:{click:t.editStudent}},[a("b-icon",{attrs:{icon:"pencil-square",scale:"0.8"}}),a("span",{staticClass:"mx-2 text-muted"},[t._v("Edit Student")])],1),a("hr",{staticClass:"m-0"}),a("b-dropdown-item",{directives:[{name:"b-modal",rawName:"v-b-modal.deleteStudentModal",modifiers:{deleteStudentModal:!0}}],attrs:{"link-class":"py-2 d-flex align-items-center text-danger"}},[a("b-icon",{attrs:{icon:"trash",scale:"0.8"}}),a("span",{staticClass:"mx-2 text-muted"},[t._v("Delete Student")])],1)],1)]),a("b-table",{staticClass:"bg-white shadow-sm mt-3 mb-0",attrs:{"show-empty":"",stacked:"lg",responsive:"",hover:"","sort-icon-left":"",busy:t.tableIsBusy,items:t.items,fields:t.fields,"current-page":1,"per-page":t.perPage,"sort-by":t.sortBy,"sort-desc":t.sortDesc,filter:t.search,"filter-function":function(){return t.items}},on:{"update:sortBy":function(e){t.sortBy=e},"update:sort-by":function(e){t.sortBy=e},"update:sortDesc":function(e){t.sortDesc=e},"update:sort-desc":function(e){t.sortDesc=e},"context-changed":t.contextChanged},scopedSlots:t._u([{key:"cell(actions)",fn:function(e){return[a("div",{staticClass:"d-flex align-items-center"},[a("b-form-checkbox",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip",value:e.item.isActive?"Deactivate":"Activate",expression:"row.item.isActive ? 'Deactivate' : 'Activate'"}],staticClass:"ml-2 c-pointer",attrs:{switch:""},on:{change:function(s){return t.changeStatus(e.item)}},model:{value:e.item.isActive,callback:function(s){t.$set(e.item,"isActive",s)},expression:"row.item.isActive"}}),a("b-icon",{staticClass:"c-pointer",attrs:{icon:"three-dots-vertical",scale:"1.5"},on:{click:function(s){return t.showActions(e.item)}}})],1)]}},{key:"cell(image)",fn:function(t){return[a("b-avatar",{staticClass:"shadow-sm",attrs:{src:s("9be5"),alt:t.value,rounded:"lg"}})]}}])}),a("b-row",{staticClass:"pt-3"},[a("b-col",{attrs:{sm:"6",md:"6",lg:"4"}},[a("div",{staticClass:"d-flex align-items-center"},[a("b-card",{staticClass:"rounded-pill",attrs:{"body-class":"d-flex align-items-center py-0 px-3"}},[a("span",{staticClass:"text-muted"},[t._v("Rows per page: ")]),a("b-form-group",{staticClass:"mb-0"},[a("b-form-select",{staticClass:"bg-transparent border-0 shadow-none",attrs:{options:t.perPageOptions},model:{value:t.perPage,callback:function(e){t.perPage=e},expression:"perPage"}})],1)],1)],1)]),a("b-col",{staticClass:"ml-auto",attrs:{sm:"6",md:"6",lg:"4"}},[a("b-pagination",{staticClass:"pagination",attrs:{"total-rows":t.docsCount,"per-page":t.perPage,align:"fill",size:"md",pills:""},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}})],1)],1),a("DeleteFieldModal",{attrs:{msg:"Are you sure to delete this student ?","modal-id":"deleteStudentModal"},on:{done:t.removeStudent}}),a("StudentForm")],1)},n=[],i=s("1da1"),r=(s("99af"),s("96cf"),s("17cc")),o=s("2490"),c=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-modal",{attrs:{"no-close-on-backdrop":t.isLoading,"no-close-on-esc":t.isLoading,id:"studentForm","hide-footer":"",size:"lg"},on:{hidden:t.resetModal,ok:t.handleSave,show:t.modalIsShown},scopedSlots:t._u([{key:"modal-header",fn:function(e){var a=e.close;return[s("div",{staticClass:"d-flex align-items-center justify-content-between w-100"},[s("div",{staticClass:"d-flex align-items-center"},[t.isUpdate?[s("h6",{staticClass:"mb-0"},[t._v("Update Student")])]:[s("h6",{staticClass:"mb-0"},[t._v("Create Student")])]],2),s("b-button",{attrs:{disabled:t.isLoading,size:"sm",variant:"outline-danger"},on:{click:function(t){return a()}}},[t._v(" Close ")])],1)]}},{key:"default",fn:function(e){var a=e.ok;return[s("b-form",{on:{submit:function(t){return a()}}},[s("b-form-group",{attrs:{label:"Fullname","label-for":"fullname"}},[s("b-form-input",{attrs:{disabled:t.isLoading,type:"text",id:"fullname"},model:{value:t.student.fullname,callback:function(e){t.$set(t.student,"fullname","string"===typeof e?e.trim():e)},expression:"student.fullname"}}),s("input-error",{attrs:{vuelidate:t.$v.student.fullname,field:"fullname",namespace:t.namespace}})],1),s("b-form-group",{attrs:{label:"Phone","label-for":"phone"}},[s("b-form-input",{attrs:{disabled:t.isLoading,type:"tel",id:"phone"},model:{value:t.student.phone,callback:function(e){t.$set(t.student,"phone","string"===typeof e?e.trim():e)},expression:"student.phone"}}),s("input-error",{attrs:{vuelidate:t.$v.student.phone,field:"phone",namespace:t.namespace}})],1),s("b-form-group",{attrs:{label:"Username","label-for":"username"}},[s("b-form-input",{attrs:{disabled:t.isLoading,type:"text",id:"username"},model:{value:t.student.username,callback:function(e){t.$set(t.student,"username","string"===typeof e?e.trim():e)},expression:"student.username"}}),s("input-error",{attrs:{vuelidate:t.$v.student.username,field:"username",namespace:t.namespace}})],1),s("b-form-group",{attrs:{label:"Email address","label-for":"email"}},[s("b-form-input",{attrs:{disabled:t.isLoading,type:"email",id:"email"},model:{value:t.student.email,callback:function(e){t.$set(t.student,"email","string"===typeof e?e.trim():e)},expression:"student.email"}}),s("input-error",{attrs:{vuelidate:t.$v.student.email,field:"email",namespace:t.namespace}})],1),t.isUpdate?t._e():s("b-form-group",{attrs:{label:"Password","label-for":"password"}},[s("b-form-input",{attrs:{disabled:t.isLoading,type:"password",id:"password"},model:{value:t.student.password,callback:function(e){t.$set(t.student,"password","string"===typeof e?e.trim():e)},expression:"student.password"}}),s("input-error",{attrs:{vuelidate:t.$v.student.password,field:"password",namespace:t.namespace}})],1),s("div",{staticClass:"text-right"},[s("b-overlay",{staticClass:"d-inline-block",attrs:{show:t.isLoading,rounded:"",opacity:"0.6","spinner-small":"","spinner-variant":"primary"}},[t.isUpdate?s("b-btn",{attrs:{disabled:t.isLoading,variant:"outline-success"},on:{click:function(t){return a()}}},[t._v("Update")]):s("b-btn",{attrs:{disabled:t.isLoading,variant:"outline-primary"},on:{click:function(t){return a()}}},[t._v("Save")])],1)],1)],1)]}}])})},l=[],d=s("5530"),u=s("b5ae"),m={data:function(){return{namespace:"Student",student:{username:null,fullname:null,phone:null,email:null,password:null}}},validations:function(){var t={fullname:{required:u["required"],minLength:Object(u["minLength"])(6),maxLength:Object(u["maxLength"])(54)},username:{required:u["required"],minLength:Object(u["minLength"])(3),maxLength:Object(u["maxLength"])(54)},phone:{required:u["required"],minLength:Object(u["minLength"])(4),maxLength:Object(u["maxLength"])(54)},email:{required:u["required"],email:u["email"]},password:{required:u["required"],minLength:Object(u["minLength"])(8),maxLength:Object(u["maxLength"])(54)}};return this.isUpdate&&delete t.password,{student:t}},computed:{oldStudent:function(){return this.$store.state.Student.one},isUpdate:function(){return!!this.oldStudent&&!!this.oldStudent._id}},methods:{handleSave:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function s(){var a;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:if(t.preventDefault(),e.$v.$touch(),!e.$v.$invalid){s.next=4;break}return s.abrupt("return");case 4:if(s.prev=4,e.setLoading(!0),!e.isUpdate){s.next=12;break}return s.next=9,e.$store.dispatch("Student/update",e.student);case 9:a=s.sent,s.next=15;break;case 12:return s.next=14,e.$store.dispatch("Student/create",e.student);case 14:a=s.sent;case 15:return s.next=17,e.$store.dispatch("Student/all");case 17:e.setGlobalSuccess(a.msg),e.$bvModal.hide("studentForm"),e.$bvModal.hide("dropdownActionModal"),s.next=24;break;case 22:s.prev=22,s.t0=s["catch"](4);case 24:e.setLoading(!1);case 25:case"end":return s.stop()}}),s,null,[[4,22]])})))()},modalIsShown:function(){this.isUpdate&&(this.student=Object(d["a"])({},this.oldStudent))},resetModal:function(){this.$v.$reset(),this.removeAllErrors(),this.student={username:null,fullname:null,phone:null,email:null,password:null}}}},p=m,b=s("2877"),h=Object(b["a"])(p,c,l,!1,null,null,null),f=h.exports,v={mixins:[r["a"]],components:{DeleteFieldModal:o["a"],StudentForm:f},data:function(){return{namespace:"Student",student:{},fields:[{key:"image",lable:"Image",sortable:!0},{key:"fullname",lable:"Fullname",sortable:!0},{key:"username",lable:"Username",sortable:!0},{key:"phone",lable:"Phone",sortable:!0},{key:"email",lable:"Email",sortable:!0},{key:"actions",lable:"Actions"}]}},computed:{},methods:{showCourses:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,t.$store.commit("Student/setOne",t.student),e.next=4,t.$store.dispatch("Student/courses");case 4:e.next=8;break;case 6:e.prev=6,e.t0=e["catch"](0);case 8:t.$nextTick((function(){t.$bvModal.show("studentCourses")}));case 9:case"end":return e.stop()}}),e,null,[[0,6]])})))()},createStudent:function(){this.$store.commit("Student/setOne",{}),this.$bvModal.show("studentForm")},editStudent:function(){this.$store.commit("Student/setOne",this.student),this.$bvModal.show("studentForm")},showActions:function(t){this.student=t,this.$bvModal.show("dropdownActionModal")},removeStudent:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$store.dispatch("Student/remove",t.student);case 3:s=e.sent,s&&s.msg&&t.setGlobalSuccess(s.msg),t.$nextTick((function(){t.$bvModal.hide("deleteStudentModal"),t.$bvModal.hide("dropdownActionModal")})),e.next=10;break;case 8:e.prev=8,e.t0=e["catch"](0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))()},changeStatus:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function s(){var a;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,e.$store.dispatch("Student/changeStatus",t);case 3:a="".concat(t.username," has been ").concat(t.isActive?"activated":"deactivated"," sucessfully."),e.setGlobalSuccess(a),s.next=9;break;case 7:s.prev=7,s.t0=s["catch"](0);case 9:case"end":return s.stop()}}),s,null,[[0,7]])})))()}}},g=v,x=Object(b["a"])(g,a,n,!1,null,"46fe3bc4",null);e["default"]=x.exports},"9be5":function(t,e,s){t.exports=s.p+"img/course.b7ab71fe.jpg"}}]);
//# sourceMappingURL=Students.afc72a1a.js.map
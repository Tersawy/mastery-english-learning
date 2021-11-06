(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Settings"],{"337d":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("dashboard-layout",[a("b-breadcrumb",{staticClass:"bg-white border rounded shadow-sm font-weight-600 mb-30px"},[a("b-breadcrumb-item",{attrs:{to:"/dashboard"}},[a("b-icon",{staticClass:"mr-1",attrs:{icon:"house-fill",scale:"1.25","shift-v":"1.25","aria-hidden":"true"}}),e._v(" Dashboard ")],1),a("b-breadcrumb-item",{attrs:{active:""}},[e._v(" Settings ")])],1),a("b-row",{attrs:{cols:"3"}},[a("b-col",[a("Levels")],1),a("b-col",[a("Categories")],1),a("b-col",[a("Languages")],1)],1)],1)},s=[],r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-card",{staticClass:"h-100",attrs:{"no-body":""},scopedSlots:e._u([{key:"header",fn:function(){return[a("div",{staticClass:"d-flex justify-content-between align-items-center"},[a("span",[e._v("Levels")]),a("b-btn",{attrs:{variant:"outline-primary",size:"sm"},on:{click:e.create}},[e._v("Create")])],1)]},proxy:!0}])},[a("b-table",{staticClass:"mb-0",attrs:{hover:"",responsive:"",items:e.items,fields:e.fields},scopedSlots:e._u([{key:"cell(actions)",fn:function(t){return[a("b-icon",{staticClass:"c-pointer",attrs:{icon:"pencil-square",scale:"1.2",variant:"success"},on:{click:function(a){return e.update(t.item)}}}),a("b-icon",{staticClass:"ml-3 c-pointer",attrs:{icon:"trash",scale:"1.2",variant:"danger"},on:{click:function(a){return e.remove(t.item)}}})]}}])}),a("LevelForm"),a("DeleteFieldModal",{attrs:{msg:"Are you sure to delete this level ?","modal-id":"deleteLevelModal"},on:{done:e.removeLevel}})],1)},o=[],i=a("1da1"),l=(a("96cf"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-modal",{attrs:{"no-close-on-backdrop":e.isLoading,"no-close-on-esc":e.isLoading,id:"levelForm","hide-footer":"",centered:""},on:{hidden:e.resetModal,ok:e.handleSave,show:e.modalIsShown},scopedSlots:e._u([{key:"modal-header",fn:function(t){var n=t.close;return[a("div",{staticClass:"d-flex align-items-center justify-content-between w-100"},[a("div",{staticClass:"d-flex align-items-center"},[e.isUpdate?[a("h6",{staticClass:"mb-0"},[e._v(" Update Level: "),a("b-badge",{attrs:{variant:"outline-success"}},[e._v(e._s(e.oldLevel.name))])],1)]:[a("h6",{staticClass:"mb-0"},[e._v("Create Level")])]],2),a("b-button",{attrs:{disabled:e.isLoading,size:"sm",variant:"outline-danger"},on:{click:function(e){return n()}}},[e._v(" Close ")])],1)]}},{key:"default",fn:function(t){var n=t.ok;return[a("b-form",{on:{submit:function(t){return t.preventDefault(),e.handleSave.apply(null,arguments)}}},[a("b-form-group",{attrs:{label:"Level Name","label-for":"name"}},[a("b-form-input",{ref:"nameInput",attrs:{disabled:e.isLoading,id:"name"},model:{value:e.level.name,callback:function(t){e.$set(e.level,"name",t)},expression:"level.name"}}),a("input-error",{attrs:{vuelidate:e.$v.level.name,field:"name",namespace:e.namespace}})],1),a("div",{staticClass:"text-right"},[a("b-overlay",{staticClass:"d-inline-block",attrs:{show:e.isLoading,rounded:"",opacity:"0.6","spinner-small":"","spinner-variant":"primary"}},[e.isUpdate?a("b-btn",{attrs:{disabled:e.isLoading,variant:"outline-success"},on:{click:function(e){return n()}}},[e._v("Update")]):a("b-btn",{attrs:{disabled:e.isLoading,variant:"outline-primary"},on:{click:function(e){return n()}}},[e._v("Save")])],1)],1)],1)]}}])})}),c=[],u=a("5530"),d=(a("b0c0"),a("b5ae")),m={data:function(){return{namespace:"Level",level:{name:null}}},validations:{level:{name:{required:d["required"],minLength:Object(d["minLength"])(3),maxLength:Object(d["maxLength"])(54)}}},computed:{oldLevel:function(){return this.$store.state.Level.one},isUpdate:function(){return!!this.oldLevel&&!!this.oldLevel._id}},methods:{handleSave:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.preventDefault(),t.$v.$touch(),!t.$v.$invalid){a.next=4;break}return a.abrupt("return");case 4:if(a.prev=4,t.setLoading(!0),!t.isUpdate){a.next=12;break}return a.next=9,t.$store.dispatch("Level/update",t.level);case 9:n=a.sent,a.next=15;break;case 12:return a.next=14,t.$store.dispatch("Level/create",t.level);case 14:n=a.sent;case 15:return a.next=17,t.$store.dispatch("Level/all");case 17:t.$bvModal.hide("levelForm"),t.setGlobalSuccess(n.msg),a.next=24;break;case 21:a.prev=21,a.t0=a["catch"](4),a.t0&&console.log(a.t0);case 24:t.setLoading(!1);case 25:case"end":return a.stop()}}),a,null,[[4,21]])})))()},modalIsShown:function(){var e=this;setTimeout((function(){var t;return null===(t=e.$refs.nameInput)||void 0===t?void 0:t.focus()}),400),this.isUpdate&&(this.level=Object(u["a"])({},this.oldLevel))},resetModal:function(){this.$v.$reset(),this.removeAllErrors(),this.level.name=null}}},v=m,g=a("2877"),b=Object(g["a"])(v,l,c,!1,null,"e25d3992",null),h=b.exports,f=a("17cc"),p=a("2490"),L={components:{LevelForm:h,DeleteFieldModal:p["a"]},mixins:[f["a"]],data:function(){return{namespace:"Level",fields:[{key:"name",label:"Name"},{key:"actions",label:"Actions"}]}},methods:{create:function(){this.$store.commit("Level/setOne",{}),this.$bvModal.show("levelForm")},update:function(e){this.$store.commit("Level/setOne",e),this.$bvModal.show("levelForm")},remove:function(e){this.$store.commit("Level/setOne",e),this.$bvModal.show("deleteLevelModal")},removeLevel:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$store.dispatch("Level/remove",e.$store.state.Level.one);case 3:a=t.sent,a&&a.msg&&e.setGlobalSuccess(a.msg),e.$nextTick((function(){e.$bvModal.hide("deleteLevelModal")})),t.next=10;break;case 8:t.prev=8,t.t0=t["catch"](0);case 10:case"end":return t.stop()}}),t,null,[[0,8]])})))()}}},y=L,$=Object(g["a"])(y,r,o,!1,null,"7b82280e",null),k=$.exports,C=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-card",{staticClass:"h-100",attrs:{"no-body":""},scopedSlots:e._u([{key:"header",fn:function(){return[a("div",{staticClass:"d-flex justify-content-between align-items-center"},[a("span",[e._v("Categories")]),a("b-btn",{attrs:{variant:"outline-primary",size:"sm"},on:{click:e.create}},[e._v("Create")])],1)]},proxy:!0}])},[a("b-table",{staticClass:"mb-0",attrs:{hover:"",responsive:"",items:e.items,fields:e.fields},scopedSlots:e._u([{key:"cell(actions)",fn:function(t){return[a("b-icon",{staticClass:"c-pointer",attrs:{icon:"pencil-square",scale:"1.2",variant:"success"},on:{click:function(a){return e.update(t.item)}}}),a("b-icon",{staticClass:"ml-3 c-pointer",attrs:{icon:"trash",scale:"1.2",variant:"danger"},on:{click:function(a){return e.remove(t.item)}}})]}}])}),a("CategoryForm"),a("DeleteFieldModal",{attrs:{msg:"Are you sure to delete this category ?","modal-id":"deleteCategoryModal"},on:{done:e.removeCategory}})],1)},x=[],w=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-modal",{attrs:{"no-close-on-backdrop":e.isLoading,"no-close-on-esc":e.isLoading,id:"categoryForm","hide-footer":"",centered:""},on:{hidden:e.resetModal,ok:e.handleSave,show:e.modalIsShown},scopedSlots:e._u([{key:"modal-header",fn:function(t){var n=t.close;return[a("div",{staticClass:"d-flex align-items-center justify-content-between w-100"},[a("div",{staticClass:"d-flex align-items-center"},[e.isUpdate?[a("h6",{staticClass:"mb-0"},[e._v(" Update Category: "),a("b-badge",{attrs:{variant:"outline-success"}},[e._v(e._s(e.oldCategory.name))])],1)]:[a("h6",{staticClass:"mb-0"},[e._v("Create Category")])]],2),a("b-button",{attrs:{disabled:e.isLoading,size:"sm",variant:"outline-danger"},on:{click:function(e){return n()}}},[e._v(" Close ")])],1)]}},{key:"default",fn:function(t){var n=t.ok;return[a("b-form",{on:{submit:function(t){return t.preventDefault(),e.handleSave.apply(null,arguments)}}},[a("b-form-group",{attrs:{label:"Category Name","label-for":"name"}},[a("b-form-input",{ref:"nameInput",attrs:{disabled:e.isLoading,id:"name"},model:{value:e.category.name,callback:function(t){e.$set(e.category,"name",t)},expression:"category.name"}}),a("input-error",{attrs:{vuelidate:e.$v.category.name,field:"name",namespace:e.namespace}})],1),a("div",{staticClass:"text-right"},[a("b-overlay",{staticClass:"d-inline-block",attrs:{show:e.isLoading,rounded:"",opacity:"0.6","spinner-small":"","spinner-variant":"primary"}},[e.isUpdate?a("b-btn",{attrs:{disabled:e.isLoading,variant:"outline-success"},on:{click:function(e){return n()}}},[e._v("Update")]):a("b-btn",{attrs:{disabled:e.isLoading,variant:"outline-primary"},on:{click:function(e){return n()}}},[e._v("Save")])],1)],1)],1)]}}])})},_=[],M={data:function(){return{namespace:"Category",category:{name:null}}},validations:{category:{name:{required:d["required"],minLength:Object(d["minLength"])(3),maxLength:Object(d["maxLength"])(54)}}},computed:{oldCategory:function(){return this.$store.state.Category.one},isUpdate:function(){return!!this.oldCategory&&!!this.oldCategory._id}},methods:{handleSave:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.preventDefault(),t.$v.$touch(),!t.$v.$invalid){a.next=4;break}return a.abrupt("return");case 4:if(a.prev=4,t.setLoading(!0),!t.isUpdate){a.next=12;break}return a.next=9,t.$store.dispatch("Category/update",t.category);case 9:n=a.sent,a.next=15;break;case 12:return a.next=14,t.$store.dispatch("Category/create",t.category);case 14:n=a.sent;case 15:return a.next=17,t.$store.dispatch("Category/all");case 17:t.$bvModal.hide("categoryForm"),t.setGlobalSuccess(n.msg),a.next=24;break;case 21:a.prev=21,a.t0=a["catch"](4),a.t0&&console.log(a.t0);case 24:t.setLoading(!1);case 25:case"end":return a.stop()}}),a,null,[[4,21]])})))()},modalIsShown:function(){var e=this;setTimeout((function(){var t;return null===(t=e.$refs.nameInput)||void 0===t?void 0:t.focus()}),400),this.isUpdate&&(this.category=Object(u["a"])({},this.oldCategory))},resetModal:function(){this.$v.$reset(),this.removeAllErrors(),this.category.name=null}}},S=M,O=Object(g["a"])(S,w,_,!1,null,"61e8da0e",null),j=O.exports,F={components:{CategoryForm:j,DeleteFieldModal:p["a"]},mixins:[f["a"]],data:function(){return{namespace:"Category",fields:[{key:"name",label:"Name"},{key:"actions",label:"Actions"}]}},methods:{create:function(){this.$store.commit("Category/setOne",{}),this.$bvModal.show("categoryForm")},update:function(e){this.$store.commit("Category/setOne",e),this.$bvModal.show("categoryForm")},remove:function(e){this.$store.commit("Category/setOne",e),this.$bvModal.show("deleteCategoryModal")},removeCategory:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$store.dispatch("Category/remove",e.$store.state.Category.one);case 3:a=t.sent,a&&a.msg&&e.setGlobalSuccess(a.msg),e.$nextTick((function(){e.$bvModal.hide("deleteCategoryModal")})),t.next=10;break;case 8:t.prev=8,t.t0=t["catch"](0);case 10:case"end":return t.stop()}}),t,null,[[0,8]])})))()}}},U=F,D=Object(g["a"])(U,C,x,!1,null,"9d230ff0",null),I=D.exports,R=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-card",{staticClass:"h-100",attrs:{"no-body":""},scopedSlots:e._u([{key:"header",fn:function(){return[a("div",{staticClass:"d-flex justify-content-between align-items-center"},[a("span",[e._v("Languages")]),a("b-btn",{attrs:{variant:"outline-primary",size:"sm"},on:{click:e.create}},[e._v("Create")])],1)]},proxy:!0}])},[a("b-table",{staticClass:"mb-0",attrs:{hover:"",responsive:"",items:e.items,fields:e.fields},scopedSlots:e._u([{key:"cell(actions)",fn:function(t){return[a("b-icon",{staticClass:"c-pointer",attrs:{icon:"pencil-square",scale:"1.2",variant:"success"},on:{click:function(a){return e.update(t.item)}}}),a("b-icon",{staticClass:"ml-3 c-pointer",attrs:{icon:"trash",scale:"1.2",variant:"danger"},on:{click:function(a){return e.remove(t.item)}}})]}}])}),a("LanguageForm"),a("DeleteFieldModal",{attrs:{msg:"Are you sure to delete this language ?","modal-id":"deleteLanguageModal"},on:{done:e.removeLanguage}})],1)},E=[],q=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-modal",{attrs:{"no-close-on-backdrop":e.isLoading,"no-close-on-esc":e.isLoading,id:"languageForm","hide-footer":"",centered:""},on:{hidden:e.resetModal,ok:e.handleSave,show:e.modalIsShown},scopedSlots:e._u([{key:"modal-header",fn:function(t){var n=t.close;return[a("div",{staticClass:"d-flex align-items-center justify-content-between w-100"},[a("div",{staticClass:"d-flex align-items-center"},[e.isUpdate?[a("h6",{staticClass:"mb-0"},[e._v(" Update Language: "),a("b-badge",{attrs:{variant:"outline-success"}},[e._v(e._s(e.oldLanguage.name))])],1)]:[a("h6",{staticClass:"mb-0"},[e._v("Create Language")])]],2),a("b-button",{attrs:{disabled:e.isLoading,size:"sm",variant:"outline-danger"},on:{click:function(e){return n()}}},[e._v(" Close ")])],1)]}},{key:"default",fn:function(t){var n=t.ok;return[a("b-form",{on:{submit:function(t){return t.preventDefault(),e.handleSave.apply(null,arguments)}}},[a("b-form-group",{attrs:{label:"Language Name","label-for":"name"}},[a("b-form-input",{ref:"nameInput",attrs:{disabled:e.isLoading,id:"name"},model:{value:e.language.name,callback:function(t){e.$set(e.language,"name",t)},expression:"language.name"}}),a("input-error",{attrs:{vuelidate:e.$v.language.name,field:"name",namespace:e.namespace}})],1),a("div",{staticClass:"text-right"},[a("b-overlay",{staticClass:"d-inline-block",attrs:{show:e.isLoading,rounded:"",opacity:"0.6","spinner-small":"","spinner-variant":"primary"}},[e.isUpdate?a("b-btn",{attrs:{disabled:e.isLoading,variant:"outline-success"},on:{click:function(e){return n()}}},[e._v("Update")]):a("b-btn",{attrs:{disabled:e.isLoading,variant:"outline-primary"},on:{click:function(e){return n()}}},[e._v("Save")])],1)],1)],1)]}}])})},A=[],z={data:function(){return{namespace:"Language",language:{name:null}}},validations:{language:{name:{required:d["required"],minLength:Object(d["minLength"])(3),maxLength:Object(d["maxLength"])(54)}}},computed:{oldLanguage:function(){return this.$store.state.Language.one},isUpdate:function(){return!!this.oldLanguage&&!!this.oldLanguage._id}},methods:{handleSave:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.preventDefault(),t.$v.$touch(),!t.$v.$invalid){a.next=4;break}return a.abrupt("return");case 4:if(a.prev=4,t.setLoading(!0),!t.isUpdate){a.next=12;break}return a.next=9,t.$store.dispatch("Language/update",t.language);case 9:n=a.sent,a.next=15;break;case 12:return a.next=14,t.$store.dispatch("Language/create",t.language);case 14:n=a.sent;case 15:return a.next=17,t.$store.dispatch("Language/all");case 17:t.$bvModal.hide("languageForm"),t.setGlobalSuccess(n.msg),a.next=24;break;case 21:a.prev=21,a.t0=a["catch"](4),a.t0&&console.log(a.t0);case 24:t.setLoading(!1);case 25:case"end":return a.stop()}}),a,null,[[4,21]])})))()},modalIsShown:function(){var e=this;setTimeout((function(){var t;return null===(t=e.$refs.nameInput)||void 0===t?void 0:t.focus()}),400),this.isUpdate&&(this.language=Object(u["a"])({},this.oldLanguage))},resetModal:function(){this.$v.$reset(),this.removeAllErrors(),this.language.name=null}}},G=z,N=Object(g["a"])(G,q,A,!1,null,"65abb09d",null),T=N.exports,J={components:{LanguageForm:T,DeleteFieldModal:p["a"]},mixins:[f["a"]],data:function(){return{namespace:"Language",fields:[{key:"name",label:"Name"},{key:"actions",label:"Actions"}]}},methods:{create:function(){this.$store.commit("Language/setOne",{}),this.$bvModal.show("languageForm")},update:function(e){this.$store.commit("Language/setOne",e),this.$bvModal.show("languageForm")},remove:function(e){this.$store.commit("Language/setOne",e),this.$bvModal.show("deleteLanguageModal")},removeLanguage:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$store.dispatch("Language/remove",e.$store.state.Language.one);case 3:a=t.sent,a&&a.msg&&e.setGlobalSuccess(a.msg),e.$nextTick((function(){e.$bvModal.hide("deleteLanguageModal")})),t.next=10;break;case 8:t.prev=8,t.t0=t["catch"](0);case 10:case"end":return t.stop()}}),t,null,[[0,8]])})))()}}},B=J,H=Object(g["a"])(B,R,E,!1,null,"78f67aee",null),K=H.exports,P=a("10b2"),Q={components:{DashboardLayout:P["a"],Levels:k,Categories:I,Languages:K}},V=Q,W=Object(g["a"])(V,n,s,!1,null,"4e13d62a",null);t["default"]=W.exports}}]);
//# sourceMappingURL=Settings.3f504162.js.map
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["CourseShow"],{"0ccb":function(t,e,s){var r=s("50c4"),n=s("577e"),a=s("1148"),i=s("1d80"),o=Math.ceil,c=function(t){return function(e,s,c){var l,u,d=n(i(e)),b=d.length,p=void 0===c?" ":n(c),f=r(s);return f<=b||""==p?d:(l=f-b,u=a.call(p,o(l/p.length)),u.length>l&&(u=u.slice(0,l)),t?d+u:u+d)}};t.exports={start:c(!1),end:c(!0)}},"10b2":function(t,e,s){"use strict";var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"dashboard-content"},[r("UploadList"),r("DashboardNavbar",{on:{toggleSidebar:function(e){t.sidebar=!t.sidebar}}}),r("b-container",{staticClass:"px-xl-4",attrs:{fluid:""}},[r("div",{staticClass:"py-5"},[r("b-row",[r("b-col",{staticClass:"d-none d-lg-block",attrs:{lg:"3"}},[r("DashboardSidebar")],1),r("b-col",{attrs:{lg:"9"}},[t._t("default")],2)],1)],1)]),r("b-sidebar",{attrs:{"bg-variant":"light","backdrop-variant":"dark",backdrop:"",shadow:"","header-class":"border-bottom"},scopedSlots:t._u([{key:"header",fn:function(e){var n=e.hide;return[r("div",{staticClass:"d-flex align-items-center justify-content-between w-100"},[r("img",{staticClass:"d-inline-block align-top",attrs:{src:s("59da"),alt:"Academy",height:"35"}}),r("span",{staticClass:"p-2 c-pointer",on:{click:n}},[t._v("×")])])]}}]),model:{value:t.sidebar,callback:function(e){t.sidebar=e},expression:"sidebar"}},[r("DashboardLinks")],1)],1)},n=[],a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"topbar px-2 shadow-sm"},[r("div",{staticClass:"d-flex align-items-center pl-3"},[r("b-navbar-brand",{attrs:{to:"/"}},[r("img",{staticClass:"d-inline-block align-top",attrs:{src:s("59da"),alt:"Academy",height:"35"}})])],1),r("div",{staticClass:"d-flex content"},[r("b-dropdown",{attrs:{variant:"link","toggle-class":"text-decoration-none px-0","no-caret":"",right:"",size:"lg",lazy:"","menu-class":"py-0"},scopedSlots:t._u([{key:"button-content",fn:function(){return[r("div",{staticClass:"user"},[r("img",{attrs:{src:t.userImageURL+"/"+t.me.image,alt:""}})])]},proxy:!0}])},[r("b-dd-header",[t._v(" "+t._s(t.me.username)+" ")]),r("b-dropdown-item",{directives:[{name:"b-toggle",rawName:"v-b-toggle.userProfile",modifiers:{userProfile:!0}}],attrs:{"link-class":"py-2"}},[t._v("Profile")]),r("hr",{staticClass:"m-0"}),r("b-dropdown-item-btn",{attrs:{variant:"danger","button-class":"py-2"},on:{click:function(e){return t.$store.commit("Auth/logout")}}},[r("span",{staticClass:"pr-2"},[r("b-icon",{attrs:{icon:"box-arrow-in-left",scale:"1.5"}})],1),t._v(" Logout ")])],1),r("div",{staticClass:"toggle d-flex d-lg-none",on:{click:t.toggleMenu}},[r("b-icon",{attrs:{icon:"menu-button-wide",scale:"1.8"}})],1)],1)])},i=[],o={methods:{toggleMenu:function(){this.$emit("toggleSidebar")}}},c=o,l=(s("9f51"),s("2877")),u=Object(l["a"])(c,a,i,!1,null,"6ea612b3",null),d=u.exports,b=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-collapse",{attrs:{is_nav:"",visible:""}},[s("div",{staticClass:"sidebar-dashboard"},[s("b-card",{staticClass:"shadow-sm d-none d-lg-flex"},[s("div",{staticClass:"d-flex flex-column align-items-center"},[s("b-avatar",{attrs:{src:t.userImageURL+"/"+t.me.image,size:"6rem"}}),s("span",{staticClass:"mt-3 font-weight-600 text-muted"},[t._v(t._s(t.me.username))])],1)]),s("b-card",{staticClass:"mt-30px shadow-sm",attrs:{"body-class":"p-0"}},[s("Dashboard-links")],1)],1)])},p=[],f=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ul",{staticClass:"sidebar-list list-unstyled mb-0"},t._l(t.items,(function(e,r){return s("li",{key:r,staticClass:"sidebar-item"},[s("router-link",{staticClass:"p-3 d-flex align-items-center text-decoration-none",attrs:{to:e.path,exact:0==r}},[s("h4",{staticClass:"mb-0 mr-3"},[s("b-icon",{attrs:{icon:e.icon}})],1),s("span",{},[t._v(t._s(e.text))])])],1)})),0)},m=[],v={data:function(){return{items:[{text:"Dashboard",icon:"grid",path:"/dashboard"},{text:"Courses",icon:"collection",path:"/dashboard/courses"},{text:"Students",icon:"people",path:"/dashboard/students"},{text:"Instructors",icon:"person-plus",path:"/dashboard/instructors"},{text:"Admins",icon:"diagram3",path:"/dashboard/admins"},{text:"Settings",icon:"gear",path:"/dashboard/settings"}]}}},h=v,g=(s("60b9"),Object(l["a"])(h,f,m,!1,null,"45eb850f",null)),C=g.exports,_={components:{DashboardLinks:C}},x=_,w=Object(l["a"])(x,b,p,!1,null,null,null),y=w.exports,k=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.uploads.length?s("b-dropdown",{attrs:{id:"uploads-list",size:"lg",variant:"link","toggle-class":"text-decoration-none","menu-class":"shadow-lg","no-caret":""},scopedSlots:t._u([{key:"button-content",fn:function(){return[s("div",{staticClass:"icon rounded-lg"},[t.countOfNotCompleted?s("b-badge",{staticClass:"position-absolute",attrs:{variant:"danger"}},[t._v(t._s(t.countOfNotCompleted))]):t._e(),s("b-icon",{staticClass:"rounded bg-blue p-2",attrs:{variant:"white",icon:"cloud-upload"}})],1)]},proxy:!0}],null,!1,915584363)},t._l(t.uploads,(function(t,e){return s("b-dropdown-text",{key:e},[s("upload-item",{attrs:{upload:t}})],1)})),1):t._e()},S=[],E=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"d-flex align-items-center justify-content-between"},[s("div",{staticClass:"mr-3 rounded-lg"},[s("b-avatar",{staticClass:"shadow-sm",attrs:{src:t.upload.imgSrc,rounded:"lg"}})],1),s("div",{staticStyle:{width:"250px"}},[s("span",[t._v(t._s(t._f("strLength")(t.upload.title,20)))]),s("div",{staticClass:"d-flex align-items-center"},[s("b-progress",{staticClass:"font-weight-700 w-100",attrs:{variant:t.variant}},[s("b-progress-bar",{attrs:{max:100,value:t.upload.progress,label:t.label,"show-progress":"",animated:t.inProgress,striped:t.inProgress}})],1),t.inProgress?t._e():s("span",{staticClass:"h4 mb-0 c-pointer ml-1",on:{click:t.removeUploaded}},[t._v("×")])],1)])])},N=[],L={props:["upload"],computed:{inProgress:function(){return"progress"==this.upload.status},isDone:function(){return"success"==this.upload.status},isFailed:function(){return"error"==this.upload.status},variant:function(){return this.inProgress?"blue":this.isDone?"success":"danger"},label:function(){return this.inProgress?"".concat(this.upload.progress,"%"):this.isDone?"Uploaded successfully":"Upload failed !"}},methods:{removeUploaded:function(){this.$store.commit("removeUpload",this.upload)}}},V=L,I=Object(l["a"])(V,E,N,!1,null,null,null),$=I.exports,A={components:{UploadItem:$},computed:{uploads:function(){return this.$store.state.uploads},countOfNotCompleted:function(){var t=this;return this.uploads.reduce((function(e,s){return t.isCompleted(s)||(e+=1),e}),0)}},methods:{isCompleted:function(t){return 100==t.progress&&"success"==t.status}}},j=A,O=(s("e814"),Object(l["a"])(j,k,S,!1,null,"2f6da15d",null)),D=O.exports,R={components:{DashboardNavbar:d,DashboardSidebar:y,DashboardLinks:C,UploadList:D},data:function(){return{sidebar:!1}},methods:{signed:function(){var t=this;setTimeout((function(){return t.$router.go(0)}),300)}}},U=R,M=Object(l["a"])(U,r,n,!1,null,null,null);e["a"]=M.exports},1148:function(t,e,s){"use strict";var r=s("a691"),n=s("577e"),a=s("1d80");t.exports=function(t){var e=n(a(this)),s="",i=r(t);if(i<0||i==1/0)throw RangeError("Wrong number of repetitions");for(;i>0;(i>>>=1)&&(e+=e))1&i&&(s+=e);return s}},"4d90":function(t,e,s){"use strict";var r=s("23e7"),n=s("0ccb").start,a=s("9a0c");r({target:"String",proto:!0,forced:a},{padStart:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}})},"4e3e":function(t,e,s){"use strict";s.d(e,"b",(function(){return n})),s.d(e,"a",(function(){return a}));var r=s("1da1"),n=(s("96cf"),s("a9e3"),s("4d90"),s("d3b7"),s("25f0"),function(t){t=Number(t);var e=Math.floor(t/3600),s=Math.floor(t%3600/60),r=Math.floor(t%3600%60),n=e>0?e+"h ":"",a=s>0?s+"min ":"",i=r>0?r+"sec":"",o=n+a+i;n=e>0?e.toString().padStart(2,"0")+":":"",a=s>0?s.toString().padStart(2,"0")+":":"",a=s?a:"00:",i=r>0?r.toString().padStart(2,"0"):"00";var c=n+a+i;return{hours:e,minutes:s,seconds:r,timeStr:o,timeNum:c}}),a=function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){var s,r,n=arguments;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return s=n.length>1&&void 0!==n[1]?n[1]:function(){},t.prev=1,t.next=4,e();case 4:r=t.sent,s(null,r),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](1),s(t.t0);case 11:case"end":return t.stop()}}),t,null,[[1,8]])})));return function(e){return t.apply(this,arguments)}}()},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,s){var r=s("1d80"),n=s("577e"),a=s("5899"),i="["+a+"]",o=RegExp("^"+i+i+"*"),c=RegExp(i+i+"*$"),l=function(t){return function(e){var s=n(r(e));return 1&t&&(s=s.replace(o,"")),2&t&&(s=s.replace(c,"")),s}};t.exports={start:l(1),end:l(2),trim:l(3)}},"60b9":function(t,e,s){"use strict";s("7934")},7156:function(t,e,s){var r=s("861d"),n=s("d2bb");t.exports=function(t,e,s){var a,i;return n&&"function"==typeof(a=e.constructor)&&a!==s&&r(i=a.prototype)&&i!==s.prototype&&n(t,i),t}},7178:function(t,e,s){},7934:function(t,e,s){},"9a0c":function(t,e,s){var r=s("342f");t.exports=/Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(r)},"9f51":function(t,e,s){"use strict";s("b031")},a9e3:function(t,e,s){"use strict";var r=s("83ab"),n=s("da84"),a=s("94ca"),i=s("6eeb"),o=s("5135"),c=s("c6b6"),l=s("7156"),u=s("d9b5"),d=s("c04e"),b=s("d039"),p=s("7c73"),f=s("241c").f,m=s("06cf").f,v=s("9bf2").f,h=s("58a8").trim,g="Number",C=n[g],_=C.prototype,x=c(p(_))==g,w=function(t){if(u(t))throw TypeError("Cannot convert a Symbol value to a number");var e,s,r,n,a,i,o,c,l=d(t,"number");if("string"==typeof l&&l.length>2)if(l=h(l),e=l.charCodeAt(0),43===e||45===e){if(s=l.charCodeAt(2),88===s||120===s)return NaN}else if(48===e){switch(l.charCodeAt(1)){case 66:case 98:r=2,n=49;break;case 79:case 111:r=8,n=55;break;default:return+l}for(a=l.slice(2),i=a.length,o=0;o<i;o++)if(c=a.charCodeAt(o),c<48||c>n)return NaN;return parseInt(a,r)}return+l};if(a(g,!C(" 0o1")||!C("0b1")||C("+0x1"))){for(var y,k=function(t){var e=arguments.length<1?0:t,s=this;return s instanceof k&&(x?b((function(){_.valueOf.call(s)})):c(s)!=g)?l(new C(w(e)),s,k):w(e)},S=r?f(C):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),E=0;S.length>E;E++)o(C,y=S[E])&&!o(k,y)&&v(k,y,m(C,y));k.prototype=_,_.constructor=k,i(n,g,k)}},b031:function(t,e,s){},bb7d:function(t,e,s){"use strict";s("bc75")},bc75:function(t,e,s){},e814:function(t,e,s){"use strict";s("7178")},e9b8:function(t,e,s){"use strict";var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-modal",{attrs:{id:"lectureVideo","hide-footer":"",size:"xl",centered:"","body-class":"p-0"},on:{hidden:function(e){return t.$emit("closed")}},scopedSlots:t._u([{key:"modal-header",fn:function(e){var r=e.close;return[s("div",{staticClass:"d-flex align-items-center justify-content-between w-100"},[s("div",{staticClass:"d-flex align-items-center"},[s("h6",{staticClass:"mb-0"},[t._v(" Lecture:  "),s("span",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip",value:t.lecture.title,expression:"lecture.title"}],staticClass:"font-sm font-weight-700"},[t._v(t._s(t._f("strLength")(t.lecture.title,30)))])])]),s("b-button",{attrs:{size:"sm",variant:"outline-danger"},on:{click:function(t){return r()}}},[t._v(" Close ")])],1)]}},{key:"default",fn:function(){return[s("video",{ref:"videoReview",staticClass:"video-review d-flex w-100",attrs:{controls:"",src:t.lecturesURL+"/"+t.lecture.video}},[t._v(" Your browser does not support the video tag. ")])]},proxy:!0}])})},n=[],a={computed:{lecture:function(){return this.$store.state.Course.oneLecture}}},i=a,o=s("2877"),c=Object(o["a"])(i,r,n,!1,null,"46bf77a4",null);e["a"]=c.exports},f90d:function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("dashboard-layout",[s("b-breadcrumb",{staticClass:"bg-white border rounded shadow-sm font-weight-600 mb-30px"},[s("b-breadcrumb-item",{attrs:{to:"/dashboard"}},[s("b-icon",{staticClass:"mr-1",attrs:{icon:"house-fill",scale:"1.25","shift-v":"1.25","aria-hidden":"true"}}),t._v(" Dashboard ")],1),s("b-breadcrumb-item",{attrs:{to:"/dashboard/courses"}},[t._v(" Courses ")]),s("b-breadcrumb-item",{attrs:{active:""}},[t._v(" "+t._s(t.course.title)+" ")])],1),t.course?s("div",{staticClass:"course-header-area"},[s("b-container",{attrs:{fluid:"lg"}},[s("b-row",[s("b-col",{attrs:{lg:"8"}},[s("div",{staticClass:"course-header-wrap"},[s("h1",{staticClass:"title d-none d-lg-block"},[t._v(t._s(t.course.title))]),s("h3",{staticClass:"title d-lg-none"},[t._v(t._s(t.course.title))]),s("p",{staticClass:"subtitle"},[t._v(t._s(t.course.short_description))]),s("div",{staticClass:"rating-row"},[s("span",{staticClass:"course-badge best-seller"},[t._v("beginner")]),s("span",{staticClass:"enrolled-num"},[t._v(" "+t._s(t.course.studentsCount)+" Students enrolled ")])]),s("div",{staticClass:"created-row"},[s("span",{staticClass:"last-updated-date"},[t._v("Last updated "+t._s(t._f("date")(t.course.updatedAt)))]),s("span",{staticClass:"comment"},[s("i",{staticClass:"fas fa-comment",attrs:{"aria-hidden":"true"}}),s("span",[t._v(" arabic")])])])])])],1)],1)],1):t._e(),s("div",{staticClass:"course-content-area py-5"},[s("b-container",{attrs:{fluid:"lg"}},[s("b-row",[s("b-col",{attrs:{lg:"8"}},[s("div",{staticClass:"course-content pb-4"},[s("h4",{staticClass:"mb-3 font-weight-700"},[t._v("Course content")]),s("div",{staticClass:"d-flex align-items-center justify-content-between mb-2"},[s("p",{staticClass:"mb-0 font-md"},[t._v(" "+t._s(+t.course.sections.length)+" sections • "+t._s(t.lecturesCount)+" lectures • "+t._s(t.lecturesTime(t.course.time).timeStr)+" total length ")]),s("b-btn",{attrs:{size:"sm",variant:"teal"},on:{click:t.expandAll}},[t.allExpanded?s("span",[t._v(" Collapse All ")]):s("span",[t._v(" Expand All ")])])],1),s("div",{staticClass:"course-content-sections"},t._l(t.course.sections,(function(e,r){return s("b-card",{key:r,attrs:{"no-body":""}},[s("b-card-body",{staticClass:"p-3 d-flex justify-content-between c-pointer",on:{click:function(t){e.lecturesVisible=!e.lecturesVisible}}},[s("div",{staticClass:"d-flex align-items-center"},[s("b-icon",{attrs:{icon:"chevron-"+(e.lecturesVisible?"up":"down")}}),s("span",{staticClass:"mx-2 font-weight-600"},[t._v(t._s(e.title))])],1),s("span",{staticClass:"font-md"},[t._v(" "+t._s(e.lectures.length)+" lectures • "+t._s(t.lecturesTime(e.time).timeStr)+" ")])]),s("b-collapse",{model:{value:e.lecturesVisible,callback:function(s){t.$set(e,"lecturesVisible",s)},expression:"section.lecturesVisible"}},[s("b-card-footer",{staticClass:"p-0 border-0"},t._l(e.lectures,(function(e,r){return s("div",{key:r,staticClass:"d-flex align-items-center justify-content-between p-3 font-md"},[s("div",[s("span",{staticStyle:{"font-size":"18px"}},[e.video?s("b-icon",{staticClass:"rounded-circle bg-dark p-1 c-pointer",attrs:{icon:"caret-right-fill",variant:"white"},on:{click:function(s){return t.showLectureVideo(e)}}}):s("b-icon",{staticClass:"rounded-circle bg-dark p-1",attrs:{icon:"dash-circle",scale:"2",variant:"white"}})],1),e.video?s("span",{staticClass:"mx-2 text-primary c-pointer",staticStyle:{"text-decoration":"underline"},on:{click:function(s){return t.showLectureVideo(e)}}},[t._v(" "+t._s(e.title)+" ")]):s("span",{staticClass:"mx-2"},[t._v(t._s(e.title))]),s("b-icon",{staticClass:"c-pointer",attrs:{icon:"chevron-"+(e.descriptionVisible?"up":"down"),variant:"dark"},on:{click:function(t){e.descriptionVisible=!e.descriptionVisible}}}),s("b-collapse",{model:{value:e.descriptionVisible,callback:function(s){t.$set(e,"descriptionVisible",s)},expression:"lecture.descriptionVisible"}},[s("p",{staticClass:"text-muted pl-4 mt-1 mb-0 font-md"},[t._v(t._s(e.description))])])],1),s("div",[t._v(t._s(t.lecturesTime(e.time).timeNum))])])})),0)],1)],1)})),1)]),s("div",{staticClass:"course-requirments py-4"},[s("h4",{staticClass:"mb-3 font-weight-700"},[t._v("Requirements")]),s("div",{staticClass:"requirments-content font-md"},[s("ul",t._l(t.course.requirements,(function(e,r){return s("li",{key:r},[t._v(" "+t._s(e)+" ")])})),0)])]),s("div",{staticClass:"course-description py-4"},[s("h4",{staticClass:"mb-3 font-weight-700"},[t._v("Description")]),s("div",{staticClass:"description-content font-md",domProps:{innerHTML:t._s(t.course.description)}})])]),s("b-col",{attrs:{lg:"4"}},[s("div",{staticClass:"course-sidebar natural"},[s("div",{staticClass:"preview-video-box"},[t.course.thumbnail?s("img",{staticClass:"img-fluid w-100",attrs:{src:t.thumbnailsURL+"/"+t.course.thumbnail}}):t._e()]),s("div",{staticClass:"course-sidebar-text-box"},[s("div",{staticClass:"buy-btns"},[s("b-btn",{staticClass:"btn-enroll",attrs:{disabled:""}},[t._v("Enroll")])],1)])])])],1)],1)],1),s("LectureVideo")],1)},n=[],a=s("1da1"),i=(s("159b"),s("96cf"),s("4e3e")),o=s("e9b8"),c=s("10b2"),l={components:{DashboardLayout:c["a"],LectureVideo:o["a"]},data:function(){return{allExpanded:!1}},mounted:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getCourse();case 2:t.$store.commit("setLoader",!1);case 3:case"end":return e.stop()}}),e)})))()},computed:{course:function(){return this.$store.state.Course.one},lecturesCount:function(){var t,e;return null===(t=this.course)||void 0===t||null===(e=t.sections)||void 0===e?void 0:e.reduce((function(t,e){return t+=e.lectures.length,t}),0)}},watch:{allExpanded:function(t){var e,s;null===(e=this.course)||void 0===e||null===(s=e.sections)||void 0===s||s.forEach((function(e){e.lecturesVisible=t,t||e.lectures.forEach((function(e){e.descriptionVisible=t}))}))}},methods:{getCourse:function(){return this.$store.dispatch("Course/show",this.$route.params.courseId)},expandAll:function(){this.allExpanded=!this.allExpanded},lecturesTime:function(t){return Object(i["b"])(t)},showLectureVideo:function(t){this.$store.commit("Course/setLecture",t),this.$bvModal.show("lectureVideo")}}},u=l,d=(s("bb7d"),s("2877")),b=Object(d["a"])(u,r,n,!1,null,"b637c020",null);e["default"]=b.exports}}]);
//# sourceMappingURL=CourseShow.47602f50.js.map
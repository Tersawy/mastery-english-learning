(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["CourseShow"],{"0ccb":function(t,e,s){var i=s("50c4"),r=s("577e"),n=s("1148"),o=s("1d80"),a=Math.ceil,c=function(t){return function(e,s,c){var l,u,d=r(o(e)),f=d.length,b=void 0===c?" ":r(c),p=i(s);return p<=f||""==b?d:(l=p-f,u=n.call(b,a(l/b.length)),u.length>l&&(u=u.slice(0,l)),t?d+u:u+d)}};t.exports={start:c(!1),end:c(!0)}},1148:function(t,e,s){"use strict";var i=s("a691"),r=s("577e"),n=s("1d80");t.exports=function(t){var e=r(n(this)),s="",o=i(t);if(o<0||o==1/0)throw RangeError("Wrong number of repetitions");for(;o>0;(o>>>=1)&&(e+=e))1&o&&(s+=e);return s}},1874:function(t,e,s){"use strict";s("5911")},"4d90":function(t,e,s){"use strict";var i=s("23e7"),r=s("0ccb").start,n=s("9a0c");i({target:"String",proto:!0,forced:n},{padStart:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}})},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,s){var i=s("1d80"),r=s("577e"),n=s("5899"),o="["+n+"]",a=RegExp("^"+o+o+"*"),c=RegExp(o+o+"*$"),l=function(t){return function(e){var s=r(i(e));return 1&t&&(s=s.replace(a,"")),2&t&&(s=s.replace(c,"")),s}};t.exports={start:l(1),end:l(2),trim:l(3)}},5911:function(t,e,s){},7156:function(t,e,s){var i=s("861d"),r=s("d2bb");t.exports=function(t,e,s){var n,o;return r&&"function"==typeof(n=e.constructor)&&n!==s&&i(o=n.prototype)&&o!==s.prototype&&r(t,o),t}},7257:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-modal",{attrs:{id:"lectureVideo","hide-footer":"",size:"xl",centered:"","body-class":"p-0"},on:{hidden:function(e){return t.$emit("closed")}},scopedSlots:t._u([{key:"modal-header",fn:function(e){var i=e.close;return[s("div",{staticClass:"d-flex align-items-center justify-content-between w-100"},[s("div",{staticClass:"d-flex align-items-center"},[s("h6",{staticClass:"mb-0"},[t._v(" Lecture:  "),s("span",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip",value:t.lecture.title,expression:"lecture.title"}],staticClass:"font-sm font-weight-700"},[t._v(t._s(t._f("strLength")(t.lecture.title,30)))])])]),s("b-button",{attrs:{size:"sm",variant:"outline-danger"},on:{click:function(t){return i()}}},[t._v(" Close ")])],1)]}},{key:"default",fn:function(){return[s("video",{ref:"videoReview",staticClass:"video-review d-flex",attrs:{controls:"",src:t.lecturesURL+"/"+t.lecture.video}},[t._v("Your browser does not support the video tag.")])]},proxy:!0}])})},r=[],n={computed:{lecture:function(){return this.$store.state.Course.oneLecture}}},o=n,a=s("2877"),c=Object(a["a"])(o,i,r,!1,null,"755b6049",null);e["a"]=c.exports},"9a0c":function(t,e,s){var i=s("342f");t.exports=/Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(i)},a9e3:function(t,e,s){"use strict";var i=s("83ab"),r=s("da84"),n=s("94ca"),o=s("6eeb"),a=s("5135"),c=s("c6b6"),l=s("7156"),u=s("d9b5"),d=s("c04e"),f=s("d039"),b=s("7c73"),p=s("241c").f,v=s("06cf").f,m=s("9bf2").f,h=s("58a8").trim,C="Number",_=r[C],g=_.prototype,w=c(b(g))==C,x=function(t){if(u(t))throw TypeError("Cannot convert a Symbol value to a number");var e,s,i,r,n,o,a,c,l=d(t,"number");if("string"==typeof l&&l.length>2)if(l=h(l),e=l.charCodeAt(0),43===e||45===e){if(s=l.charCodeAt(2),88===s||120===s)return NaN}else if(48===e){switch(l.charCodeAt(1)){case 66:case 98:i=2,r=49;break;case 79:case 111:i=8,r=55;break;default:return+l}for(n=l.slice(2),o=n.length,a=0;a<o;a++)if(c=n.charCodeAt(a),c<48||c>r)return NaN;return parseInt(n,i)}return+l};if(n(C,!_(" 0o1")||!_("0b1")||_("+0x1"))){for(var y,E=function(t){var e=arguments.length<1?0:t,s=this;return s instanceof E&&(w?f((function(){g.valueOf.call(s)})):c(s)!=C)?l(new _(x(e)),s,E):x(e)},V=i?p(_):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),S=0;V.length>S;S++)a(_,y=V[S])&&!a(E,y)&&m(E,y,v(_,y));E.prototype=g,g.constructor=E,o(r,C,E)}},f90d:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("b-breadcrumb",{staticClass:"bg-white border rounded shadow-sm font-weight-600 mb-30px"},[s("b-breadcrumb-item",{attrs:{to:"/dashboard"}},[s("b-icon",{staticClass:"mr-1",attrs:{icon:"house-fill",scale:"1.25","shift-v":"1.25","aria-hidden":"true"}}),t._v(" Dashboard ")],1),s("b-breadcrumb-item",{attrs:{to:"/dashboard/courses"}},[t._v(" Courses ")]),s("b-breadcrumb-item",{attrs:{active:""}},[t._v(" "+t._s(t.course.title)+" ")])],1),t.course?s("div",{staticClass:"course-header-area"},[s("b-container",{attrs:{fluid:"lg"}},[s("b-row",[s("b-col",{attrs:{lg:"8"}},[s("div",{staticClass:"course-header-wrap"},[s("h1",{staticClass:"title d-none d-lg-block"},[t._v(t._s(t.course.title))]),s("h3",{staticClass:"title d-lg-none"},[t._v(t._s(t.course.title))]),s("p",{staticClass:"subtitle"},[t._v(t._s(t.course.short_description))]),s("div",{staticClass:"rating-row"},[s("span",{staticClass:"course-badge best-seller"},[t._v("beginner")]),s("span",{staticClass:"enrolled-num"},[t._v(" "+t._s(t.course.sconfigrationtudentsCount)+" Students enrolled ")])]),s("div",{staticClass:"created-row"},[s("span",{staticClass:"last-updated-date"},[t._v("Last updated "+t._s(t._f("date")(t.course.updatedAt)))]),s("span",{staticClass:"comment"},[s("i",{staticClass:"fas fa-comment",attrs:{"aria-hidden":"true"}}),s("span",[t._v(" arabic")])])])])])],1)],1)],1):t._e(),s("div",{staticClass:"course-content-area py-5"},[s("b-container",{attrs:{fluid:"lg"}},[s("b-row",[s("b-col",{attrs:{lg:"8"}},[s("div",{staticClass:"course-content pb-4"},[s("h4",{staticClass:"mb-3 font-weight-700"},[t._v("Course content")]),s("div",{staticClass:"d-flex align-items-center justify-content-between mb-2"},[s("p",{staticClass:"mb-0 font-md"},[t._v(" "+t._s(+t.course.sections.length)+" sections • "+t._s(t.lecturesCount)+" lectures • "+t._s(t.lecturesTime(t.course.time).timeStr)+" total length ")]),s("b-btn",{attrs:{size:"sm",variant:"teal"},on:{click:t.expandAll}},[t.allExpanded?s("span",[t._v(" Collapse All ")]):s("span",[t._v(" Expand All ")])])],1),s("div",{staticClass:"course-content-sections"},t._l(t.course.sections,(function(e,i){return s("b-card",{key:i,attrs:{"no-body":""}},[s("b-card-body",{staticClass:"p-3 d-flex justify-content-between c-pointer",on:{click:function(t){e.lecturesVisible=!e.lecturesVisible}}},[s("div",{staticClass:"d-flex align-items-center"},[s("b-icon",{attrs:{icon:"chevron-"+(e.lecturesVisible?"up":"down")}}),s("span",{staticClass:"mx-2 font-weight-600"},[t._v(t._s(e.title))])],1),s("span",{staticClass:"font-md"},[t._v(" "+t._s(e.lectures.length)+" lectures • "+t._s(t.lecturesTime(e.time).timeStr)+" ")])]),s("b-collapse",{model:{value:e.lecturesVisible,callback:function(s){t.$set(e,"lecturesVisible",s)},expression:"section.lecturesVisible"}},[s("b-card-footer",{staticClass:"p-0 border-0"},t._l(e.lectures,(function(e,i){return s("div",{key:i,staticClass:"d-flex align-items-center justify-content-between p-3 font-md"},[s("div",[s("span",{staticStyle:{"font-size":"18px"}},[e.video?s("b-icon",{staticClass:"rounded-circle bg-dark p-1 c-pointer",attrs:{icon:"caret-right-fill",variant:"white"},on:{click:function(s){return t.showLectureVideo(e)}}}):s("b-icon",{staticClass:"rounded-circle bg-dark p-1",attrs:{icon:"dash-circle",scale:"2",variant:"white"}})],1),e.video?s("span",{staticClass:"mx-2 text-primary c-pointer",staticStyle:{"text-decoration":"underline"},on:{click:function(s){return t.showLectureVideo(e)}}},[t._v(" "+t._s(e.title)+" ")]):s("span",{staticClass:"mx-2"},[t._v(t._s(e.title))]),s("b-icon",{staticClass:"c-pointer",attrs:{icon:"chevron-"+(e.descriptionVisible?"up":"down"),variant:"dark"},on:{click:function(t){e.descriptionVisible=!e.descriptionVisible}}}),s("b-collapse",{model:{value:e.descriptionVisible,callback:function(s){t.$set(e,"descriptionVisible",s)},expression:"lecture.descriptionVisible"}},[s("p",{staticClass:"text-muted pl-4 mt-1 mb-0 font-md"},[t._v(t._s(e.description))])])],1),s("div",[t._v(t._s(t.lecturesTime(e.time).timeNum))])])})),0)],1)],1)})),1)]),s("div",{staticClass:"course-requirments py-4"},[s("h4",{staticClass:"mb-3 font-weight-700"},[t._v("Requirements")]),s("div",{staticClass:"requirments-content font-md"},[s("ul",t._l(t.course.requirements,(function(e,i){return s("li",{key:i},[t._v(" "+t._s(e)+" ")])})),0)])]),s("div",{staticClass:"course-description py-4"},[s("h4",{staticClass:"mb-3 font-weight-700"},[t._v("Description")]),s("div",{staticClass:"description-content font-md",domProps:{innerHTML:t._s(t.course.description)}})])]),s("b-col",{attrs:{lg:"4"}},[s("div",{staticClass:"course-sidebar natural"},[s("div",{staticClass:"preview-video-box"},[t.course.thumbnail?s("img",{staticClass:"img-fluid w-100",attrs:{src:t.thumbnailsURL+"/"+t.course.thumbnail}}):t._e()]),s("div",{staticClass:"course-sidebar-text-box"},[s("div",{staticClass:"buy-btns"},[s("router-link",{staticClass:"btn btn-enroll",attrs:{to:"/login"}},[t._v("Enroll")])],1)])])])],1)],1)],1),s("LectureVideo")],1)},r=[],n=(s("159b"),s("a9e3"),s("4d90"),s("d3b7"),s("25f0"),function(t){t=Number(t);var e=Math.floor(t/3600),s=Math.floor(t%3600/60),i=Math.floor(t%3600%60),r=e>0?e+"h ":"",n=s>0?s+"min ":"",o=i>0?i+"sec":"",a=r+n+o;r=e>0?e.toString().padStart(2,"0")+":":"",n=s>0?s.toString().padStart(2,"0")+":":"",n=0==s?"00:":n,o=i>0?i.toString().padStart(2,"0"):"00";var c=r+n+o;return{hours:e,minutes:s,seconds:i,timeStr:a,timeNum:c}}),o=s("7257"),a={components:{LectureVideo:o["a"]},data:function(){return{allExpanded:!1}},mounted:function(){this.getCourse()},computed:{course:function(){return this.$store.state.Course.one},lecturesCount:function(){var t,e;return null===(t=this.course)||void 0===t||null===(e=t.sections)||void 0===e?void 0:e.reduce((function(t,e){return t+=e.lectures.length,t}),0)}},watch:{allExpanded:function(t){var e,s;null===(e=this.course)||void 0===e||null===(s=e.sections)||void 0===s||s.forEach((function(e){e.lecturesVisible=t,t||e.lectures.forEach((function(e){e.descriptionVisible=t}))}))}},methods:{getCourse:function(){return this.$store.dispatch("Course/show",this.$route.params.courseId)},expandAll:function(){this.allExpanded=!this.allExpanded},lecturesTime:function(t){return n(t)},showLectureVideo:function(t){this.$store.commit("Course/setLecture",t),this.$bvModal.show("lectureVideo")}}},c=a,l=(s("1874"),s("2877")),u=Object(l["a"])(c,i,r,!1,null,"72d23334",null);e["default"]=u.exports}}]);
//# sourceMappingURL=CourseShow.2d2ab3b1.js.map
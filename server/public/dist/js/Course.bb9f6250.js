(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Course"],{"0c05":function(t,e,s){"use strict";s("d371")},"0ccb":function(t,e,s){var n=s("50c4"),i=s("577e"),r=s("1148"),a=s("1d80"),o=Math.ceil,c=function(t){return function(e,s,c){var u,l,d=i(a(e)),f=d.length,h=void 0===c?" ":i(c),p=n(s);return p<=f||""==h?d:(u=p-f,l=r.call(h,o(u/h.length)),l.length>u&&(l=l.slice(0,u)),t?d+l:l+d)}};t.exports={start:c(!1),end:c(!0)}},1148:function(t,e,s){"use strict";var n=s("a691"),i=s("577e"),r=s("1d80");t.exports=function(t){var e=i(r(this)),s="",a=n(t);if(a<0||a==1/0)throw RangeError("Wrong number of repetitions");for(;a>0;(a>>>=1)&&(e+=e))1&a&&(s+=e);return s}},"12e5":function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"js-container congrats-container",staticStyle:{top:"0px !important"}})},i=[],r=function(t){this.el=t,this.containerEl=null,this.confettiFrequency=3,this.confettiColors=["#EF2964","#00C09D","#2D87B0","#48485E","#EFFF1D"],this.confettiAnimations=["slow","medium","fast"],this._setupElements(),this._renderConfetti()};r.prototype._setupElements=function(){var t=document.createElement("div");t.classList.add("confetti-container"),this.el.appendChild(t),this.containerEl=t},r.prototype._renderConfetti=function(){var t=this;this.confettiInterval=setInterval((function(){var e=document.createElement("div"),s=Math.floor(3*Math.random())+7+"px",n=t.confettiColors[Math.floor(Math.random()*t.confettiColors.length)],i=Math.floor(Math.random()*t.el.offsetWidth)+"px",r=t.confettiAnimations[Math.floor(Math.random()*t.confettiAnimations.length)];e.classList.add("confetti","confetti--animation-"+r),e.style.left=i,e.style.width=s,e.style.height=s,e.style.backgroundColor=n,e.removeTimeout=setTimeout((function(){e.parentNode.removeChild(e)}),3e3),t.containerEl.appendChild(e)}),25)};var a={mounted:function(){new r(document.querySelector(".js-container"))}},o=a,c=(s("505d"),s("2877")),u=Object(c["a"])(o,n,i,!1,null,null,null);e["default"]=u.exports},"2d54":function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t.course?s("div",{staticClass:"course-header-area"},[s("b-container",{attrs:{fluid:"lg"}},[s("b-row",[s("b-col",{attrs:{lg:"8"}},[s("div",{staticClass:"course-header-wrap"},[s("h1",{staticClass:"title d-none d-lg-block"},[t._v(t._s(t.course.title))]),s("h3",{staticClass:"title d-lg-none"},[t._v(t._s(t.course.title))]),s("p",{staticClass:"subtitle"},[t._v(t._s(t.course.short_description))]),s("div",{staticClass:"rating-row"},[s("span",{staticClass:"course-badge best-seller"},[t._v("beginner")]),s("span",{staticClass:"enrolled-num"},[t._v(" "+t._s(t.course.studentsCount)+" Students enrolled ")])]),s("div",{staticClass:"created-row"},[s("span",{staticClass:"last-updated-date"},[t._v("Last updated "+t._s(t._f("date")(t.course.updatedAt)))]),s("span",{staticClass:"comment"},[s("i",{staticClass:"fas fa-comment",attrs:{"aria-hidden":"true"}}),s("span",[t._v(" arabic")])])])])])],1)],1)],1):t._e(),s("div",{staticClass:"course-content-area py-5"},[s("b-container",{attrs:{fluid:"lg"}},[s("b-row",[s("b-col",{attrs:{lg:"8"}},[s("div",{staticClass:"course-content pb-4"},[s("h4",{staticClass:"mb-3 font-weight-700"},[t._v("Course content")]),s("SectionsContent",{attrs:{showVideoInModal:!0}})],1),s("div",{staticClass:"course-requirments py-4"},[s("h4",{staticClass:"mb-3 font-weight-700"},[t._v("Requirements")]),s("div",{staticClass:"requirments-content font-md"},[s("ul",t._l(t.course.requirements,(function(e,n){return s("li",{key:n},[t._v(" "+t._s(e)+" ")])})),0)])]),s("div",{staticClass:"course-description py-4"},[s("h4",{staticClass:"mb-3 font-weight-700"},[t._v("Description")]),s("div",{staticClass:"description-content font-md",domProps:{innerHTML:t._s(t.course.description)}})])]),s("b-col",{attrs:{lg:"4"}},[s("div",{staticClass:"course-sidebar natural"},[s("div",{staticClass:"preview-video-box"},[t.course.thumbnail?s("img",{staticClass:"img-fluid w-100",attrs:{src:t.thumbnailsURL+"/"+t.course.thumbnail}}):t._e()]),s("div",{staticClass:"course-sidebar-text-box"},[s("div",{staticClass:"buy-btns"},[!t.isAuth||t.isStudent?s("div",[t.course.isEnrolled?s("b-btn",{staticClass:"btn-enroll enrolled",attrs:{to:"/courses/"+t.course._id+"/start"}},[s("b-icon",{attrs:{icon:"check2-circle"}}),s("span",[t._v(" Start Learning now ")])],1):s("b-btn",{staticClass:"btn-enroll",on:{click:t.enroll}},[t._v("Enroll")])],1):s("b-btn",{staticClass:"btn-enroll",attrs:{disabled:""}},[t._v("Enroll")])],1)])])])],1)],1)],1),s("LectureVideo"),t.isCongrate?s("Congrats"):t._e()],1)},i=[],r=s("5530"),a=s("1da1"),o=(s("96cf"),s("12e5")),c=s("e9b8"),u=s("5262"),l={components:{LectureVideo:c["a"],Congrats:o["default"],SectionsContent:u["a"]},data:function(){return{isCongrate:!1}},mounted:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getCourse();case 2:t.$store.commit("setLoader",!1);case 3:case"end":return e.stop()}}),e)})))()},computed:{course:function(){return this.$store.state.Course.one}},methods:{getCourse:function(){return this.$store.dispatch("Course/show",this.$route.params.courseId)},enroll:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.isAuth){e.next=2;break}return e.abrupt("return",t.$bvModal.show("loginModal"));case 2:return e.prev=2,e.next=5,t.$store.dispatch("Student/enroll",t.course);case 5:t.$store.commit("Course/setOne",Object(r["a"])(Object(r["a"])({},t.course),{},{isEnrolled:!0})),t.$swal.fire({title:"Congratulations on the new course",icon:"success",confirmButtonText:"Start to learning"}).then((function(e){e.isConfirmed&&t.$router.push({name:"StartCourse",params:{courseId:t.$route.params.courseId}})})),t.isCongrate=!0,setTimeout((function(){return t.isCongrate=!1}),5e3),e.next=13;break;case 11:e.prev=11,e.t0=e["catch"](2);case 13:case"end":return e.stop()}}),e,null,[[2,11]])})))()}}},d=l,f=(s("e99e"),s("2877")),h=Object(f["a"])(d,n,i,!1,null,"263c9cdd",null);e["default"]=h.exports},"391e":function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.course?s("div",{staticClass:"start-learning"},[s("b-container",{staticClass:"px-lg-4",attrs:{fluid:""}},[s("b-breadcrumb",{staticClass:"bg-white border rounded shadow-sm font-weight-600 my-30px d-none d-sm-flex"},[s("b-breadcrumb-item",{attrs:{to:"/dashboard"}},[s("b-icon",{staticClass:"mr-1",attrs:{icon:"house-fill",scale:"1.25","shift-v":"1.25","aria-hidden":"true"}}),t._v(" My Courses ")],1),s("b-breadcrumb-item",{attrs:{active:""}},[t._v(" "+t._s(t.course.title)+" ")])],1),s("b-row",{staticClass:"mt-3 mt-sm-0"},[s("b-col",{attrs:{cols:"12",xl:"8"}},[t.isSectionQuiz?[s("SectionQuiz",{on:{startNextSection:t.startNextSection}})]:[t.lecture.video?s("div",[s("video",{ref:"video",staticClass:"video-start",attrs:{src:t.lecturesURL+"/"+t.lecture.video,controls:""}})]):t._e(),s("div",{staticClass:"course-details my-3 my-xl-30px"},[s("div",{staticClass:"user-details d-flex align-items-center"},[t.course.createdBy?s("b-avatar",{attrs:{src:t.userImageURL+"/"+t.course.createdBy.image}}):t._e(),s("span",{staticClass:"font-weight-700 mx-3"},[t._v(t._s(t._f("relation")(t.course.createdBy,"username")))]),s("div",{staticClass:"ml-auto text-muted"},[t._v(t._s(t._f("date")(t.lecture.createdAt)))])],1),s("div",{staticClass:"mx-md-50px pl-2 mt-3",domProps:{innerHTML:t._s(t.lecture.description)}}),s("SectionsContent",{staticClass:"d-xl-none mt-5",attrs:{"show-section-quiz":!0},on:{renderLectureVideo:function(){return t.isSectionQuiz=!1},sectionQuizLoaded:t.showSectionQuiz}}),t.lecture.quiz&&t.lecture.quiz.questions&&t.lecture.quiz.questions.length?s("div",{staticClass:"lecture-quiz mt-5"},[s("h3",{staticClass:"mb-3",staticStyle:{"text-decoration":"underline"}},[t._v("Quiz :-")]),s("div",{staticClass:"questions ml-3"},[s("ul",{staticClass:"questions-list pl-0 pl-xl-3"},t._l(t.lecture.quiz.questions,(function(e,n){return s("li",{key:n,staticClass:"questions-item"},[s("Question",{staticClass:"px-2 py-4 question-overlay",attrs:{question:Object.assign({},e),quiz:t.lecture.quiz}})],1)})),0)])]):t._e()],1)]],2),s("b-col",{attrs:{cols:"12",xl:"4"}},[s("SectionsContent",{attrs:{"show-section-quiz":!0},on:{renderLectureVideo:function(){return t.isSectionQuiz=!1},sectionQuizLoaded:t.showSectionQuiz}})],1)],1)],1)],1):t._e()},i=[],r=s("1da1"),a=(s("96cf"),s("b64b"),s("c740"),s("fb6a"),function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-overlay",{attrs:{show:t.isLoading,rounded:"",opacity:"0.6","spinner-small":"","spinner-variant":"primary"}},[s(t.questions[t.question.type],{tag:"component",attrs:{question:t.question,"text-class":t.textClass},on:{input:t.handleAnswer},scopedSlots:t._u([t.question.isCorrected?{key:"iconStatus",fn:function(){return[t.question.isTrue?s("b-icon",{attrs:{icon:"check",scale:"2",variant:"success"}}):s("b-icon",{attrs:{icon:"x",scale:"2",variant:"danger"}})]},proxy:!0}:null],null,!0)}),t.neededUserSubmit?s("div",{staticClass:"text-center mt-3 h4"},[s("span",{directives:[{name:"b-hover",rawName:"v-b-hover",value:function(){return t.isFillIcon=!t.isFillIcon},expression:"() => (isFillIcon = !isFillIcon)"}],on:{click:t.submit}},[t.isFillIcon?s("b-icon",{staticClass:"c-pointer",attrs:{icon:"check-circle-fill",variant:"success"}}):s("b-icon",{staticClass:"c-pointer",attrs:{icon:"check-circle",variant:"success"}})],1)]):t._e()],1)}),o=[],c=s("ade3"),u=(s("d3b7"),s("3ca3"),s("ddb0"),s("ac1f"),s("466d"),s("25f0"),s("99af"),s("5b55")),l=function(){return s.e("chunk-3e957914").then(s.bind(null,"ce80"))},d=function(){return s.e("chunk-2d0c4e35").then(s.bind(null,"3d6d"))},f=function(){return s.e("chunk-2d0e1a1c").then(s.bind(null,"7aea"))},h=function(){return s.e("chunk-2d0b1a46").then(s.bind(null,"215f"))},p=function(){return s.e("chunk-2ca917a0").then(s.bind(null,"0dee"))},m={props:["question","quiz"],data:function(){var t;return{questions:(t={},Object(c["a"])(t,u["h"],l),Object(c["a"])(t,u["g"],d),Object(c["a"])(t,u["k"],f),Object(c["a"])(t,u["i"],h),Object(c["a"])(t,u["j"],p),t),isFillIcon:!1,answer:{},isLoading:!1}},computed:{isSpeech:function(){return this.question.type===u["j"]},isChoise:function(){return this.question.type===u["g"]},isTrueOrFalse:function(){return this.question.type===u["k"]},neededUserSubmit:function(){return!this.isSpeech&&!this.isChoise&&!this.isTrueOrFalse},textClass:function(){return this.question.isCorrected?this.question.isTrue?" right":" wrong":""}},methods:{handleAnswer:function(t){this.answer={value:t},this.isSpeech&&(this.answer=new FormData,this.answer.set("value",t)),this.neededUserSubmit||this.submit()},submit:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.isValidAnswer()){e.next=2;break}return e.abrupt("return");case 2:return t.isLoading=!0,e.prev=3,e.next=6,t.$store.dispatch("Course/createAnswer",{answer:t.answer,questionId:t.question._id});case 6:return e.next=8,t.$store.dispatch("Course/quiz");case 8:e.next=12;break;case 10:e.prev=10,e.t0=e["catch"](3);case 12:t.isLoading=!1,t.isFillIcon=!1;case 14:case"end":return e.stop()}}),e,null,[[3,10]])})))()},isValidAnswer:function(){var t=this,e=this.answer.value;if("undefined"===typeof e&&!(this.answer instanceof FormData))return!1;if(this.question.type==u["h"]){var s=this.question.text.match(/\.\.+/gi),n=this.quiz.questions.findIndex((function(e){return e._id.toString()==t.question._id.toString()}))+1;if(s.length!=e.length){var i=s.length>1?"are":"is";return this.setGlobalError("Question No. ".concat(n," has ").concat(e.length," answers, but ").concat(s.length," ").concat(i," required")),!1}for(var r=0;r<e.length;r++)if(""==e[r]||null==e[r])return this.setGlobalError("Answer number ".concat(r+1," in Question No. ").concat(n," is required")),!1}return!0}}},b=m,v=s("2877"),g=Object(v["a"])(b,a,o,!1,null,null,null),C=g.exports,x=s("5262"),w=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"questions ml-3"},[s("b-card",{attrs:{"body-class":"text-center shadow rounded-lg"}},[s("b-badge",{staticClass:"font-md mr-2",attrs:{variant:"outline-primary"}},[s("b-icon",{attrs:{icon:"file-earmark-spreadsheet",scale:"0.9"}}),t._v(" Quiz Section ")],1),s("span",{staticClass:"font-weight-600",staticStyle:{"letter-spacing":"0.7px"}},[t._v(t._s(t.section.title))])],1),s("b-row",[s("b-col",{attrs:{cols:"12",sm:"8","offset-sm":"2"}},[t.isAnswered?s("b-card",{staticClass:"mt-4 shadow",attrs:{"body-class":"d-flex align-items-center flex-column"}},[s("radial-progress-bar",{attrs:{diameter:100,completedSteps:t.section.quiz.passRate,innerStrokeColor:"#ccc",startColor:"#d254aa",stopColor:"#d254aa","total-steps":100,strokeWidth:10,innerStrokeWidth:8}},[s("span",{staticClass:"h3 mb-0"},[t._v(t._s(t.section.quiz.passRate)+"%")])]),s("h3",{staticClass:"mt-4 font-weight-600"},[t._v("Pass Rate")])],1):t._e()],1)],1),s("ul",{staticClass:"questions-list pl-0 pl-xl-3 mt-4"},t._l(t.section.quiz.questions,(function(e,n){return s("li",{key:n,staticClass:"questions-item"},[s("Question",{staticClass:"px-2 py-4 question-overlay",attrs:{disabled:t.isPassedQuiz,answers:t.answers,question:Object.assign({},e)}})],1)})),0),t.isPassedQuiz?t._e():s("b-overlay",{staticClass:"d-inline-block",attrs:{show:t.isLoading,rounded:"",opacity:"0.6","spinner-small":"","spinner-variant":"primary"}},[s("b-btn",{staticClass:"mb-4",attrs:{disabled:t.isLoading,variant:"primary"},on:{click:t.saveAnswers}},[t._v("Save")])],1),s("b-modal",{attrs:{id:"modalProgress","no-close-on-backdrop":"","hide-header":"","hide-footer":"",centered:"","body-class":"p-0"}},[s("div",{staticClass:"d-flex align-items-center flex-column p-5"},[s("radial-progress-bar",{attrs:{diameter:200,completedSteps:t.quizProgress.completedSteps,innerStrokeColor:"#ccc",startColor:"#d254aa",stopColor:"#d254aa",animateSpeed:200,"total-steps":100,strokeWidth:12,innerStrokeWidth:10}},[s("span",{staticClass:"display-4"},[t._v(t._s(t.quizProgress.completedSteps)+"%")])]),s("h3",{staticClass:"mt-4 font-weight-600"},[t._v("Pass Rate")])],1)]),t.isCongrate?s("Congrats"):t._e()],1)},S=[],_=s("53ca"),y=s("2909"),k=(s("7db0"),s("159b"),s("75ba")),q=s("531a"),z=s.n(q),A=function(){return s.e("chunk-2d0f0c1b").then(s.bind(null,"9e70"))},E=function(){return Promise.resolve().then(s.bind(null,"12e5"))},I={components:{Question:A,RadialProgressBar:z.a,Congrats:E},data:function(){return{answers:[],isCongrate:!1,quizProgress:{completedSteps:0}}},mounted:function(){this.isAnswered&&(this.answers=this.section.quiz.questions.reduce((function(t,e){return[].concat(Object(y["a"])(t),[{question:e._id,value:e.answer}])}),[]))},computed:{section:function(){return this.$store.state.Course.oneSection},isAnswered:function(){return this.section.quiz.passRate>=0},isPassedQuiz:function(){return this.section.quiz.passRate>=50}},methods:{validateAnswers:function(){for(var t=this,e=this.answers,s=this.section.quiz.questions,n=function(n){var i=s[n],r=e.find((function(t){return t.question==i._id}));if(!r)return t.setGlobalError("Question No. ".concat(n+1," is required")),{v:!1};if(i.type==u["h"]){var a=i.text.match(/\.\.+/gi).length;if(a!=r.value.length){var o=a>1?"are":"is";return t.setGlobalError("Question No. ".concat(n+1," has ").concat(r.value.length," answers, but ").concat(a," ").concat(o," required")),{v:!1}}}},i=0;i<s.length;i++){var r=n(i);if("object"===Object(_["a"])(r))return r.v}return!0},saveAnswers:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var s,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.validateAnswers()){e.next=2;break}return e.abrupt("return");case 2:return s=new FormData,t.answers.forEach((function(t,e){t.type==u["h"]?(s.set("answers[".concat(e,"].question"),t.question),t.value.forEach((function(t,n){s.set("answers[".concat(e,"].value[").concat(n,"]"),t)}))):t.type==u["j"]?s.set("answers[".concat(e,"].").concat(t.question),t.value):(s.set("answers[".concat(e,"].question"),t.question),s.set("answers[".concat(e,"].value"),t.value))})),t.setLoading(!0),e.prev=5,e.next=8,t.$store.dispatch("Course/createSectionAnswers",s);case 8:return n=e.sent,e.next=11,t.$store.dispatch("Course/start",t.$store.state.Course.one._id);case 11:return e.next=13,t.$store.dispatch("Course/sectionQuiz");case 13:t.handleAnswersResponse(n),e.next=18;break;case 16:e.prev=16,e.t0=e["catch"](5);case 18:t.setLoading(!1);case 19:case"end":return e.stop()}}),e,null,[[5,16]])})))()},handleAnswersResponse:function(t){var e=this;this.$bvModal.show("modalProgress");var s=setInterval((function(){e.quizProgress.completedSteps==t.passRate?(clearInterval(s),setTimeout((function(){e.$bvModal.hide("modalProgress"),t.passRate>=50?e.passedQuiz():e.failedQuiz(),e.resetProgress()}),500)):e.quizProgress.completedSteps++}),20)},resetProgress:function(){var t=this;setTimeout((function(){t.quizProgress.completedSteps=0}),500)},passedQuiz:function(){var t=this;this.isCongrate=!0,setTimeout((function(){return t.isCongrate=!1}),5e3),Object(k["b"])({title:"Congratulations, you passed the Quiz",width:"38rem",imageWidth:300,imageUrl:this.API_URL+"/icons/emoticon-smile.png",confirmButtonText:"Lets go"}).then((function(e){e.isConfirmed&&t.$emit("startNextSection")}))},failedQuiz:function(){Object(k["b"])({title:"Sorry,",text:"You didn't pass the Quiz, please watch the videos again and try again later",width:"38rem",imageWidth:300,imageUrl:this.API_URL+"/icons/emoticon-sad2.png",confirmButtonText:"Close",customClass:{title:"text-danger",confirmButton:"btn btn-primary btn-lg"}})}}},L=I,P=Object(v["a"])(L,w,S,!1,null,"52aae671",null),$=P.exports,j={components:{Question:C,SectionsContent:x["a"],SectionQuiz:$},data:function(){return{allExpanded:!1,answers:[],isSectionQuiz:!1}},mounted:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var s,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getCourse();case 2:t.$store.commit("setLoader",!1),s=0;case 4:if(!(s<t.course.sections.length)){e.next=20;break}if(t.course.sections[s].lectures.length){e.next=7;break}return e.abrupt("continue",17);case 7:n=0;case 8:if(!(n<t.course.sections[s].lectures.length)){e.next=15;break}if(!t.course.sections[s].lectures[n]){e.next=12;break}return t.showLectureVideo(t.course.sections[s].lectures[n]),e.abrupt("break",15);case 12:n++,e.next=8;break;case 15:if(!Object.keys(t.lecture).length){e.next=17;break}return e.abrupt("break",20);case 17:s++,e.next=4;break;case 20:case"end":return e.stop()}}),e)})))()},computed:{course:function(){return this.$store.state.Course.one},lecture:function(){return this.$store.state.Course.oneLecture},section:function(){return this.$store.state.Course.oneSection}},methods:{getCourse:function(){return this.$store.dispatch("Course/start",this.$route.params.courseId)},showLectureVideo:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function s(){return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return e.isSectionQuiz=!1,e.$store.commit("Course/setLecture",t),s.prev=2,s.next=5,e.$store.dispatch("Course/quiz");case 5:s.next=9;break;case 7:s.prev=7,s.t0=s["catch"](2);case 9:case"end":return s.stop()}}),s,null,[[2,7]])})))()},showSectionQuiz:function(){this.section.quiz.questions.length&&(this.isSectionQuiz=!0)},startNextSection:function(){var t=this,e=this.course.sections.findIndex((function(e){return e._id==t.section._id}));if(!(e<0))for(var s=this.course.sections.slice(e+1),n=0;n<s.length;n++)if(s[n].lectures.length){s[n].lecturesVisible=!0;for(var i=0;i<s[n].lectures.length;i++)if(s[n].lectures[i]){this.showLectureVideo(s[n].lectures[i]);break}if(Object.keys(this.lecture).length)break}}}},O=j,R=(s("0c05"),Object(v["a"])(O,n,i,!1,null,null,null));e["default"]=R.exports},"466d":function(t,e,s){"use strict";var n=s("d784"),i=s("825a"),r=s("50c4"),a=s("577e"),o=s("1d80"),c=s("8aa5"),u=s("14c3");n("match",(function(t,e,s){return[function(e){var s=o(this),n=void 0==e?void 0:e[t];return void 0!==n?n.call(e,s):new RegExp(e)[t](a(s))},function(t){var n=i(this),o=a(t),l=s(e,n,o);if(l.done)return l.value;if(!n.global)return u(n,o);var d=n.unicode;n.lastIndex=0;var f,h=[],p=0;while(null!==(f=u(n,o))){var m=a(f[0]);h[p]=m,""===m&&(n.lastIndex=c(o,r(n.lastIndex),d)),p++}return 0===p?null:h}]}))},"4d90":function(t,e,s){"use strict";var n=s("23e7"),i=s("0ccb").start,r=s("9a0c");n({target:"String",proto:!0,forced:r},{padStart:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},"4e3e":function(t,e,s){"use strict";s.d(e,"a",(function(){return n}));s("a9e3"),s("4d90"),s("d3b7"),s("25f0");var n=function(t){t=Number(t);var e=Math.floor(t/3600),s=Math.floor(t%3600/60),n=Math.floor(t%3600%60),i=e>0?e+"h ":"",r=s>0?s+"min ":"",a=n>0?n+"sec":"",o=i+r+a;i=e>0?e.toString().padStart(2,"0")+":":"",r=s>0?s.toString().padStart(2,"0")+":":"",r=0==s?"00:":r,a=n>0?n.toString().padStart(2,"0"):"00";var c=i+r+a;return{hours:e,minutes:s,seconds:n,timeStr:o,timeNum:c}}},"505d":function(t,e,s){"use strict";s("919e")},5262:function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"d-flex align-items-center justify-content-between mb-2"},[s("p",{staticClass:"mb-0 font-sm"},[t._v(" "+t._s(+t.course.sections.length)+" sections • "+t._s(t.lecturesCount)+" lectures • "+t._s(t.lecturesTime(t.course.time).timeStr)+" total length ")]),s("b-btn",{staticClass:"text-nowrap",attrs:{size:"sm",variant:"teal"},on:{click:t.expandAll}},[t.allExpanded?s("span",[t._v(" Collapse All ")]):s("span",[t._v(" Expand All ")])])],1),s("div",{staticClass:"course-content-sections"},t._l(t.course.sections,(function(e,n){return s("b-card",{key:n,attrs:{"no-body":""}},[s("b-card-body",{staticClass:"p-3 d-flex justify-content-between c-pointer",on:{click:function(t){e.lecturesVisible=!e.lecturesVisible}}},[s("div",{staticClass:"d-flex align-items-center",staticStyle:{"font-size":"12px"}},[s("b-icon",{attrs:{icon:"chevron-"+(e.lecturesVisible?"up":"down")}}),s("span",{staticClass:"mx-2 font-weight-600"},[t._v(t._s(e.title))])],1),s("span",{staticClass:"font-sm d-flex flex-column text-right d-sm-inline-block"},[s("span",{staticClass:"text-nowrap"},[t._v(" "+t._s(e.lectures.length)+" lectures ")]),t.lecturesTime(e.time).timeStr?s("span",{staticClass:"d-none d-sm-inline-block"},[t._v(" • ")]):t._e(),s("span",[t._v(" "+t._s(t.lecturesTime(e.time).timeStr)+" ")])])]),s("b-collapse",{model:{value:e.lecturesVisible,callback:function(s){t.$set(e,"lecturesVisible",s)},expression:"section.lecturesVisible"}},[s("b-card-footer",{staticClass:"p-0 border-0"},[t._l(e.lectures,(function(e,n){return s("div",{key:n,staticClass:"d-flex align-items-baseline justify-content-between px-3 py-2"},[s("div",{staticStyle:{"font-size":"12px"}},[s("span",{staticStyle:{"font-size":"18px"}},[e.video?s("b-icon",{staticClass:"rounded-circle bg-dark p-1 c-pointer",attrs:{icon:"caret-right-fill",variant:"white"},on:{click:function(s){return t.showLectureVideo(e)}}}):s("b-icon",{staticClass:"rounded-circle bg-dark p-1",attrs:{icon:"dash-circle",scale:"2",variant:"white"}})],1),e.video?s("span",{staticClass:"mx-2 text-primary c-pointer",staticStyle:{"text-decoration":"underline"},on:{click:function(s){return t.showLectureVideo(e)}}},[t._v(" "+t._s(e.title)+" ")]):s("span",{staticClass:"mx-2"},[t._v(t._s(e.title))]),s("b-icon",{staticClass:"c-pointer",attrs:{icon:"chevron-"+(e.descriptionVisible?"up":"down"),variant:"dark"},on:{click:function(t){e.descriptionVisible=!e.descriptionVisible}}}),s("b-collapse",{model:{value:e.descriptionVisible,callback:function(s){t.$set(e,"descriptionVisible",s)},expression:"lecture.descriptionVisible"}},[s("p",{staticClass:"text-muted pl-4 mt-1 mb-0",domProps:{innerHTML:t._s(e.description)}})])],1),s("div",[t._v(t._s(t.lecturesTime(e.time).timeNum))])])})),s("b-overlay",{attrs:{show:t.isLoading,rounded:"",opacity:"0.6","spinner-small":"","spinner-variant":"primary"}},[t.showSectionQuiz&&e.hasQuiz?s("a",{staticClass:"section-quiz d-inline-block w-100 text-center py-3 mt-3 bg-warning-light text-primary font-weight-600 c-pointer",staticStyle:{"letter-spacing":"0.8px"},on:{click:function(s){return t.getSectionQuiz(e)}}},[s("b-icon",{attrs:{icon:"file-earmark-spreadsheet",scale:"1.3"}}),s("span",{staticClass:"mx-2",staticStyle:{"font-size":"12px"}},[t._v("Show Section Quiz")])],1):t._e()])],2)],1)],1)})),1)])},i=[],r=s("5530"),a=s("1da1"),o=(s("96cf"),s("159b"),s("4e3e")),c={props:["showVideoInModal","showSectionQuiz"],data:function(){return{allExpanded:!1}},watch:{allExpanded:function(t){this.course.sections.forEach((function(e){e.lecturesVisible=t,t||e.lectures.forEach((function(e){e.descriptionVisible=t}))}))}},computed:{course:function(){return this.$store.state.Course.one},lecturesCount:function(){return this.course.sections.reduce((function(t,e){return t+=e.lectures.length,t}),0)}},methods:{expandAll:function(){this.allExpanded=!this.allExpanded},lecturesTime:function(t){return Object(o["a"])(t)},showLectureVideo:function(t){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function s(){return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:if(e.$store.commit("Course/setLecture",t),!e.showVideoInModal){s.next=3;break}return s.abrupt("return",e.$bvModal.show("lectureVideo"));case 3:return s.prev=3,s.next=6,e.$store.dispatch("Course/quiz");case 6:s.next=10;break;case 8:s.prev=8,s.t0=s["catch"](3);case 10:e.$emit("renderLectureVideo");case 11:case"end":return s.stop()}}),s,null,[[3,8]])})))()},getSectionQuiz:function(t){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function s(){return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return e.$store.commit("Course/setSection",Object(r["a"])(Object(r["a"])({},t),{},{quiz:{}})),e.setLoading(!0),s.prev=2,s.next=5,e.$store.dispatch("Course/sectionQuiz");case 5:s.next=9;break;case 7:s.prev=7,s.t0=s["catch"](2);case 9:e.setLoading(!1),e.$emit("sectionQuizLoaded");case 11:case"end":return s.stop()}}),s,null,[[2,7]])})))()}}},u=c,l=(s("ad36"),s("2877")),d=Object(l["a"])(u,n,i,!1,null,"20e590c2",null);e["a"]=d.exports},"531a":function(t,e,s){t.exports=s("bb56").default},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,s){var n=s("1d80"),i=s("577e"),r=s("5899"),a="["+r+"]",o=RegExp("^"+a+a+"*"),c=RegExp(a+a+"*$"),u=function(t){return function(e){var s=i(n(e));return 1&t&&(s=s.replace(o,"")),2&t&&(s=s.replace(c,"")),s}};t.exports={start:u(1),end:u(2),trim:u(3)}},"6b97":function(t,e,s){},"6e03":function(t,e,s){},7156:function(t,e,s){var n=s("861d"),i=s("d2bb");t.exports=function(t,e,s){var r,a;return i&&"function"==typeof(r=e.constructor)&&r!==s&&n(a=r.prototype)&&a!==s.prototype&&i(t,a),t}},"85bf":function(t,e,s){"use strict";s("6b97")},"919e":function(t,e,s){},"9a0c":function(t,e,s){var n=s("342f");t.exports=/Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(n)},a9e3:function(t,e,s){"use strict";var n=s("83ab"),i=s("da84"),r=s("94ca"),a=s("6eeb"),o=s("5135"),c=s("c6b6"),u=s("7156"),l=s("d9b5"),d=s("c04e"),f=s("d039"),h=s("7c73"),p=s("241c").f,m=s("06cf").f,b=s("9bf2").f,v=s("58a8").trim,g="Number",C=i[g],x=C.prototype,w=c(h(x))==g,S=function(t){if(l(t))throw TypeError("Cannot convert a Symbol value to a number");var e,s,n,i,r,a,o,c,u=d(t,"number");if("string"==typeof u&&u.length>2)if(u=v(u),e=u.charCodeAt(0),43===e||45===e){if(s=u.charCodeAt(2),88===s||120===s)return NaN}else if(48===e){switch(u.charCodeAt(1)){case 66:case 98:n=2,i=49;break;case 79:case 111:n=8,i=55;break;default:return+u}for(r=u.slice(2),a=r.length,o=0;o<a;o++)if(c=r.charCodeAt(o),c<48||c>i)return NaN;return parseInt(r,n)}return+u};if(r(g,!C(" 0o1")||!C("0b1")||C("+0x1"))){for(var _,y=function(t){var e=arguments.length<1?0:t,s=this;return s instanceof y&&(w?f((function(){x.valueOf.call(s)})):c(s)!=g)?u(new C(S(e)),s,y):S(e)},k=n?p(C):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),q=0;k.length>q;q++)o(C,_=k[q])&&!o(y,_)&&b(y,_,m(C,_));y.prototype=x,x.constructor=y,a(i,g,y)}},ad36:function(t,e,s){"use strict";s("6e03")},bb56:function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"radial-progress-container",style:t.containerStyle},[s("div",{staticClass:"radial-progress-inner",style:t.innerCircleStyle},[t._t("default")],2),s("svg",{staticClass:"radial-progress-bar",attrs:{width:t.diameter,height:t.diameter,version:"1.1",xmlns:"http://www.w3.org/2000/svg"}},[s("defs",[s("radialGradient",{attrs:{id:"radial-gradient"+t._uid,fx:t.gradient.fx,fy:t.gradient.fy,cx:t.gradient.cx,cy:t.gradient.cy,r:t.gradient.r}},[s("stop",{attrs:{offset:"30%","stop-color":t.startColor}}),s("stop",{attrs:{offset:"100%","stop-color":t.stopColor}})],1)],1),s("circle",{style:t.strokeStyle,attrs:{r:t.innerCircleRadius,cx:t.radius,cy:t.radius,fill:"transparent",stroke:t.innerStrokeColor,"stroke-dasharray":t.circumference,"stroke-dashoffset":"0","stroke-linecap":t.strokeLinecap}}),s("circle",{style:t.progressStyle,attrs:{transform:"rotate(270, "+t.radius+","+t.radius+")",r:t.innerCircleRadius,cx:t.radius,cy:t.radius,fill:"transparent",stroke:"url(#radial-gradient"+t._uid+")","stroke-dasharray":t.circumference,"stroke-dashoffset":t.circumference,"stroke-linecap":t.strokeLinecap}})])])},i=[],r=(s("a9e3"),s("99af"),{props:{diameter:{type:Number,required:!1,default:200},totalSteps:{type:Number,required:!0,default:10},completedSteps:{type:Number,required:!0,default:0},startColor:{type:String,required:!1,default:"#bbff42"},stopColor:{type:String,required:!1,default:"#429321"},strokeWidth:{type:Number,required:!1,default:10},innerStrokeWidth:{type:Number,required:!1,default:10},strokeLinecap:{type:String,required:!1,default:"round"},animateSpeed:{type:Number,required:!1,default:1e3},innerStrokeColor:{type:String,required:!1,default:"#323232"},fps:{type:Number,required:!1,default:60},timingFunc:{type:String,required:!1,default:"linear"},isClockwise:{type:Boolean,required:!1,default:!0}},data:function(){return{gradient:{fx:.99,fy:.5,cx:.5,cy:.5,r:.65},gradientAnimation:null,currentAngle:0,strokeDashoffset:0}},computed:{radius:function(){return this.diameter/2},circumference:function(){return Math.PI*this.innerCircleDiameter},stepSize:function(){return 0===this.totalSteps?0:100/this.totalSteps},finishedPercentage:function(){return this.stepSize*this.completedSteps},circleSlice:function(){return 2*Math.PI/this.totalSteps},animateSlice:function(){return this.circleSlice/this.totalPoints},innerCircleDiameter:function(){return this.diameter-2*this.innerStrokeWidth},innerCircleRadius:function(){return this.innerCircleDiameter/2},totalPoints:function(){return this.animateSpeed/this.animationIncrements},animationIncrements:function(){return 1e3/this.fps},hasGradient:function(){return this.startColor!==this.stopColor},containerStyle:function(){return{height:"".concat(this.diameter,"px"),width:"".concat(this.diameter,"px")}},progressStyle:function(){return{height:"".concat(this.diameter,"px"),width:"".concat(this.diameter,"px"),strokeWidth:"".concat(this.strokeWidth,"px"),strokeDashoffset:this.strokeDashoffset,transition:"stroke-dashoffset ".concat(this.animateSpeed,"ms ").concat(this.timingFunc)}},strokeStyle:function(){return{height:"".concat(this.diameter,"px"),width:"".concat(this.diameter,"px"),strokeWidth:"".concat(this.innerStrokeWidth,"px")}},innerCircleStyle:function(){return{width:"".concat(this.innerCircleDiameter,"px")}}},methods:{getStopPointsOfCircle:function(t){for(var e=[],s=0;s<t;s++){var n=this.circleSlice*s;e.push(this.getPointOfCircle(n))}return e},getPointOfCircle:function(t){var e=.5,s=e+e*Math.cos(t),n=e+e*Math.sin(t);return{x:s,y:n}},gotoPoint:function(){var t=this.getPointOfCircle(this.currentAngle);t.x&&t.y&&(this.gradient.fx=t.x,this.gradient.fy=t.y)},direction:function(){return this.isClockwise?1:-1},changeProgress:function(t){var e=this,s=t.isAnimate,n=void 0===s||s;if(this.strokeDashoffset=(100-this.finishedPercentage)/100*this.circumference*this.direction(),this.gradientAnimation&&clearInterval(this.gradientAnimation),n){var i=(this.completedSteps-1)*this.circleSlice,r=(this.currentAngle-i)/this.animateSlice,a=Math.abs(r-this.totalPoints)/this.totalPoints,o=r<this.totalPoints;this.gradientAnimation=setInterval((function(){o&&r>=e.totalPoints||!o&&r<e.totalPoints?clearInterval(e.gradientAnimation):(e.currentAngle=i+e.animateSlice*r,e.gotoPoint(),r+=o?a:-a)}),this.animationIncrements)}else this.gotoNextStep()},gotoNextStep:function(){this.currentAngle=this.completedSteps*this.circleSlice,this.gotoPoint()}},watch:{totalSteps:function(){this.changeProgress({isAnimate:!0})},completedSteps:function(){this.changeProgress({isAnimate:!0})},diameter:function(){this.changeProgress({isAnimate:!0})},strokeWidth:function(){this.changeProgress({isAnimate:!0})}},created:function(){this.changeProgress({isAnimate:!1})}}),a=r,o=(s("85bf"),s("2877")),c=Object(o["a"])(a,n,i,!1,null,null,null);e["default"]=c.exports},c235:function(t,e,s){},d371:function(t,e,s){},e99e:function(t,e,s){"use strict";s("c235")},e9b8:function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-modal",{attrs:{id:"lectureVideo","hide-footer":"",size:"xl",centered:"","body-class":"p-0"},on:{hidden:function(e){return t.$emit("closed")}},scopedSlots:t._u([{key:"modal-header",fn:function(e){var n=e.close;return[s("div",{staticClass:"d-flex align-items-center justify-content-between w-100"},[s("div",{staticClass:"d-flex align-items-center"},[s("h6",{staticClass:"mb-0"},[t._v(" Lecture:  "),s("span",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip",value:t.lecture.title,expression:"lecture.title"}],staticClass:"font-sm font-weight-700"},[t._v(t._s(t._f("strLength")(t.lecture.title,30)))])])]),s("b-button",{attrs:{size:"sm",variant:"outline-danger"},on:{click:function(t){return n()}}},[t._v(" Close ")])],1)]}},{key:"default",fn:function(){return[s("video",{ref:"videoReview",staticClass:"video-review d-flex w-100",attrs:{controls:"",src:t.lecturesURL+"/"+t.lecture.video}},[t._v(" Your browser does not support the video tag. ")])]},proxy:!0}])})},i=[],r={computed:{lecture:function(){return this.$store.state.Course.oneLecture}}},a=r,o=s("2877"),c=Object(o["a"])(a,n,i,!1,null,"46bf77a4",null);e["a"]=c.exports}}]);
//# sourceMappingURL=Course.bb9f6250.js.map
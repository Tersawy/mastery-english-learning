(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-00898110"],{"053f":function(t,s){},"13f5":function(t,s){},"33f3":function(t,s,e){"use strict";e("50f6")},"50f6":function(t,s,e){},a8c2:function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"chat__container"},[e("div",{staticClass:"chat__icon",on:{click:t.toggleChat}},[t._m(0),t.unSeenMessagesCount?e("div",{staticClass:"chat__icon-messages-count"},[t._v(t._s(t.unSeenMessagesCount))]):t._e()]),e("div",{ref:"chatView",staticClass:"chat__view",class:{active:t.active,"current-chat":t.isCurrentContact}},[e("div",{staticClass:"chat__header"},[e("div",{staticClass:"chat__header-return",on:{click:t.openContacts}},[e("i",{staticClass:"fas fa-chevron-left"})]),e("div",{staticClass:"chat__header-title"},[t.isCurrentContact?[e("div",{staticClass:"chat__header-title-avatar",class:{online:t.currentContact.isOnline}},[e("img",{attrs:{src:t.userImageURL+"/"+t.currentContact.image}})]),e("div",[e("span",{staticClass:"chat__header-title-name"},[t._v(t._s(t.currentContact.username))]),t.currentContact.isWrite?e("div",{staticClass:"user-write"},[t._v("write now......")]):t._e()])]:e("span",[t._v("Chat")])],2),e("div",{staticClass:"chat__header-close",on:{click:t.toggleChat}},[e("i",{staticClass:"fas fa-times"})])]),e("div",{staticClass:"chat__body"},[e("div",{staticClass:"chat__contacts"},[e("div",{staticClass:"chat__contacts-header"},[e("div",{staticClass:"chat__contacts-header-search"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],attrs:{type:"text",placeholder:"Type to search..."},domProps:{value:t.search},on:{input:function(s){s.target.composing||(t.search=s.target.value)}}})])]),e("div",{staticClass:"chat__contacts-body"},t._l(t.contacts,(function(s,a){return e("div",{key:a,staticClass:"chat__contact",on:{click:function(e){return t.openContact(s)}}},[e("div",{staticClass:"chat__contact-avatar",class:{online:s.isOnline}},[e("img",{attrs:{src:t.userImageURL+"/"+s.image,alt:""}}),s.messages.unSeenMessagesCount?e("div",{staticClass:"chat__contact-info-message-count"},[t._v(t._s(s.messages.unSeenMessagesCount))]):t._e()]),e("div",{staticClass:"chat__contact-info"},[e("div",{staticClass:"chat__contact-info-name"},[e("span",[t._v(t._s(s.username))])]),s.messages.docs.length?e("div",{staticClass:"chat__contact-info-last-message"},[e("span",[t._v(t._s(s.messages.docs[0].text))]),s.messages.docs[0].mine?e("span",{staticClass:"chat__contact-info-last-message-status chat__message-status"},[0===s.messages.docs[0].status?e("span",{staticClass:"failed"},[e("svg",{staticClass:"icon",attrs:{viewBox:"0 0 16 16",width:"1em",height:"1em",focusable:"false",role:"img",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor"}},[e("g",{attrs:{transform:"translate(8 8) scale(1.3 1.3) translate(-8 -8)"}},[e("path",{attrs:{d:"M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"}})])])]):t._e(),1===s.messages.docs[0].status?e("span",{staticClass:"sent"},[e("svg",{staticClass:"icon",attrs:{viewBox:"0 0 16 16",width:"1.1em",height:"1.1em",focusable:"false",role:"img","aria-label":"check",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor"}},[e("g",{attrs:{transform:"translate(8 8) scale(1.7 1.7) translate(-8 -8)"}},[e("path",{attrs:{d:"M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"}})])])]):2===s.messages.docs[0].status?e("span",{staticClass:"received"},[e("svg",{staticClass:"icon",attrs:{viewBox:"0 0 16 16",width:"1em",height:"1em",focusable:"false",role:"img","aria-label":"check all",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor"}},[e("g",{attrs:{transform:"translate(8 8) scale(1.7 1.7) translate(-8 -8)"}},[e("path",{attrs:{d:"M8.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14l.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"}})])])]):3===s.messages.docs[0].status?e("span",{staticClass:"read"},[e("svg",{staticClass:"icon",attrs:{viewBox:"0 0 16 16",width:"1em",height:"1em",focusable:"false",role:"img","aria-label":"check all",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor"}},[e("g",{attrs:{transform:"translate(8 8) scale(1.7 1.7) translate(-8 -8)"}},[e("path",{attrs:{d:"M8.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14l.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"}})])])]):t._e()]):t._e()]):t._e(),s.isWrite?e("div",{staticClass:"user-write"},[t._v("write now......")]):t._e()])])})),0)]),e("div",{staticClass:"chat__messages"},[e("div",{ref:"messagesBody",staticClass:"chat__messages-body",class:{loading:t.isLoadMessages}},[t._l(t.currentMessages,(function(s,a){return e("div",{key:a,staticClass:"chat__message",class:{mine:s.mine}},[e("div",{staticClass:"chat__message-content"},[e("div",{staticClass:"chat__message-content-text"},[e("span",{directives:[{name:"hasArabicCharacter",rawName:"v-hasArabicCharacter"}]},[t._v(t._s(s.text))]),s.mine?e("div",{staticClass:"chat__message-content-text-status chat__message-status"},[0===s.status?e("span",{staticClass:"failed"},[e("svg",{staticClass:"icon",attrs:{viewBox:"0 0 16 16",width:"1em",height:"1em",focusable:"false",role:"img",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor"}},[e("g",{attrs:{transform:"translate(8 8) scale(1.3 1.3) translate(-8 -8)"}},[e("path",{attrs:{d:"M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"}})])])]):t._e(),1===s.status?e("span",{staticClass:"sent"},[e("svg",{staticClass:"icon",attrs:{viewBox:"0 0 16 16",width:"1.1em",height:"1.1em",focusable:"false",role:"img","aria-label":"check",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor"}},[e("g",{attrs:{transform:"translate(8 8) scale(1.7 1.7) translate(-8 -8)"}},[e("path",{attrs:{d:"M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"}})])])]):2===s.status?e("span",{staticClass:"received"},[e("svg",{staticClass:"icon",attrs:{viewBox:"0 0 16 16",width:"1em",height:"1em",focusable:"false",role:"img","aria-label":"check all",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor"}},[e("g",{attrs:{transform:"translate(8 8) scale(1.7 1.7) translate(-8 -8)"}},[e("path",{attrs:{d:"M8.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14l.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"}})])])]):3===s.status?e("span",{staticClass:"read"},[e("svg",{staticClass:"icon",attrs:{viewBox:"0 0 16 16",width:"1em",height:"1em",focusable:"false",role:"img","aria-label":"check all",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor"}},[e("g",{attrs:{transform:"translate(8 8) scale(1.7 1.7) translate(-8 -8)"}},[e("path",{attrs:{d:"M8.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14l.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"}})])])]):t._e()]):t._e()])])])})),t.isCurrentContact?e("div",{directives:[{name:"b-visible",rawName:"v-b-visible",value:t.loadMessages,expression:"loadMessages"}]}):t._e()],2),e("div",{staticClass:"chat__messages-footer"},[e("form",{on:{submit:function(s){return s.preventDefault(),t.newMessage.apply(null,arguments)}}},[e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.data.message,expression:"data.message"}],ref:"inputMsg",attrs:{type:"text",placeholder:"Type a message..."},domProps:{value:t.data.message},on:{keypress:function(s){return!s.type.indexOf("key")&&t._k(s.keyCode,"enter",13,s.key,"Enter")?null:t.newMessage.apply(null,arguments)},input:function(s){s.target.composing||t.$set(t.data,"message",s.target.value)}}}),t._v(" "),e("div",{staticClass:"chat__send-btn",on:{click:t.newMessage}},[e("i",{staticClass:"fas fa-paper-plane"})])])])])])])])},n=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"chat__icon-body"},[e("i",{staticClass:"fas fa-comments"})])}],c=e("5530"),i=e("1da1"),r=(e("96cf"),e("ac1f"),e("00b4"),e("1276"),e("d3b7"),e("25f0"),e("498a"),{name:"Chat",data:function(){return{namespace:"Chat",isLoadMessages:!1,data:{message:""},search:""}},mounted:function(){var t=this;window.onresize=function(){if(window.innerWidth<=768){var s=t.$refs.chatView.getBoundingClientRect().top;s=s<0?160:s,t.$refs.chatView.style.height=window.innerHeight-s+"px"}else t.$refs.chatView.style.height=""}},watch:{data:{handler:function(t){t.message.length>0&&this.$socket.emit("USER::WRITE",this.currentContact._id);var s=/[\u0600-\u06FF]/;t.message&&s.test(t.message.toString().split(" "))?this.$refs.inputMsg.style.textAlign="right":this.$refs.inputMsg.style.textAlign="left"},deep:!0},search:function(t){this.$store.dispatch("Chat/contacts","?search=".concat(t))}},computed:{active:function(){return this.$store.state.Chat.active},contacts:function(){return this.$store.state.Chat.contacts.docs},currentContact:function(){return this.$store.state.Chat.currentContact},currentMessages:function(){var t,s;return(null===(t=this.currentContact)||void 0===t||null===(s=t.messages)||void 0===s?void 0:s.docs)||[]},isCurrentContact:function(){var t;return!(null===(t=this.currentContact)||void 0===t||!t._id)},unSeenMessagesCount:function(){return this.$store.state.Chat.contacts.unSeenMessagesCount}},methods:{toggleChat:function(){var t=this;this.$store.commit("Chat/setActive",!this.active),this.active?this.$refs.chatView.style.display="block":setTimeout((function(){t.$refs.chatView.style.display="none",t.openContacts()}),500)},openContacts:function(){var t=this;this.$refs.chatView.classList.remove("current-chat"),setTimeout((function(){t.$store.commit("Chat/setCurrentContact",null)}),500)},openContact:function(t){var s=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:s.$store.commit("Chat/setCurrentContact",t),s.$refs.chatView.classList.add("current-chat"),setTimeout((function(){s.$refs.inputMsg.focus()}),500);case 3:case"end":return e.stop()}}),e)})))()},loadMessages:function(t){var s=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t&&s.currentContact.messages.hasMoreMessages){e.next=2;break}return e.abrupt("return");case 2:return s.isLoadMessages=!0,e.next=5,s.$store.dispatch("Chat/loadMessages");case 5:s.isLoadMessages=!1;case 6:case"end":return e.stop()}}),e)})))()},newMessage:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function s(){return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:if(t.validateForm()){s.next=2;break}return s.abrupt("return");case 2:return s.next=4,t.$store.dispatch("Chat/newMessage",Object(c["a"])(Object(c["a"])({},t.data),{},{recipient:t.currentContact._id}));case 4:t.resetForm(),t.$refs.inputMsg.focus();case 6:case"end":return s.stop()}}),s)})))()},validateForm:function(){return this.data.message.trim().length>0},resetForm:function(){this.data={message:""}}},directives:{clickOutside:{bind:function(t,s,e){t.clickOutsideEvent=function(a){t==a.target||t.contains(a.target)||e.context[s.expression](a)},document.body.addEventListener("click",t.clickOutsideEvent)},unbind:function(t){document.body.removeEventListener("click",t.clickOutsideEvent),t.clickOutsideEvent=null}},hasArabicCharacter:function(t){var s=/[\u0600-\u06FF]/;s.test(t.textContent.toString().split(" "))&&t.parentElement&&t.parentElement.classList.add("arabic-text")}}}),o=r,l=(e("33f3"),e("2877")),u=e("053f"),h=e.n(u),d=e("13f5"),m=e.n(d),g=Object(l["a"])(o,a,n,!1,null,"6a2d4acd",null);"function"===typeof h.a&&h()(g),"function"===typeof m.a&&m()(g);s["default"]=g.exports}}]);
//# sourceMappingURL=chunk-00898110.064a1122.js.map
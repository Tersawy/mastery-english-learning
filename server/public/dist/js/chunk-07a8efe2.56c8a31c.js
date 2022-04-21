(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-07a8efe2"],{"0dee":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"question question-speech flex-column align-items-start"},[n("div",{staticClass:"w-100"},[n("div",{staticClass:"d-flex w-100 align-items-center justify-content-between"},[n("span",[n("span",{class:"question-text "+(e.textClass||"")},[e._v(e._s(e.question.text))]),n("span",{staticClass:"ml-3"},[e._t("iconStatus")],2)]),n("recorder",{attrs:{disabled:e.disabled},on:{input:e.handleRecorder}})],1),e.question.isCorrected?n("div",[n("strong",{staticClass:"text-muted"},[e._v("Your answer is: ")]),e.question.isTrue?n("span",{staticClass:"bg-success-light w-fit-content px-2 rounded-lg"},[e._v(e._s(e.question.answer))]):n("span",{staticClass:"bg-danger-light w-fit-content text-white px-2 rounded-lg"},[e._v(e._s(e.question.answer))])]):e._e()])])},i=[],o=(n("d3b7"),n("3ca3"),n("ddb0"),n("2b3d"),n("9861"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"text-right"},[e.disabled?n("b-iconstack",{staticStyle:{cursor:"not-allowed"},attrs:{"font-scale":"2"}},[n("b-icon",{attrs:{stacked:"",icon:"mic",scale:"0.75",variant:"success"}}),n("b-icon",{attrs:{stacked:"",icon:"slash-circle",variant:"danger"}})],1):n("div",{staticStyle:{"font-size":"2rem"}},[e.isRecording?n("b-icon",{staticClass:"bg-danger rounded-circle p-2 c-pointer",attrs:{icon:"mic-fill",scale:"1.5",variant:"white"},on:{click:e.stopRecording}},[e._v("Stop")]):n("b-icon",{staticClass:"bg-transparent rounded-circle p-2 c-pointer",attrs:{icon:"mic",scale:"1.5",variant:"success"},on:{click:e.startRecording}})],1)],1)}),r=[],s=n("1da1"),c=(n("96cf"),n("c782")),u=n.n(c),l={props:["disabled"],data:function(){return{isRecording:!1,recorder:{},gumStream:{}}},mounted:function(){},methods:{startRecording:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=new(window.AudioContext||window.webkitAudioContext),e.recorder=new u.a(n),t.prev=2,t.next=5,navigator.mediaDevices.getUserMedia({audio:!0});case 5:return a=t.sent,e.recorder.init(a),e.gumStream=a,t.next=10,e.recorder.start();case 10:e.isRecording=!0,t.next=16;break;case 13:t.prev=13,t.t0=t["catch"](2),e.isRecording=!1;case 16:case"end":return t.stop()}}),t,null,[[2,13]])})))()},stopRecording:function(){var e=this;this.isRecording=!1,this.gumStream.getAudioTracks()[0].stop(),this.recorder.stop().then((function(t){var n=t.blob;e.isRecording=!1,e.$emit("input",n)}))}}},d=l,f=n("2877"),h=Object(f["a"])(d,o,r,!1,null,"4967102a",null),p=h.exports,g={props:["question","text-class","disabled"],components:{Recorder:p},data:function(){return{audioSrc:null}},methods:{handleRecorder:function(e){this.disabled||(this.audioSrc=URL.createObjectURL(e),this.$emit("input",e))}}},v=g,m=Object(f["a"])(v,a,i,!1,null,null,null);t["default"]=m.exports},"5c3d":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),i=n("9dd0"),o=r(i);function r(e){return e&&e.__esModule?e:{default:e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var c={nFrequencyBars:255,onAnalysed:null},u=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};s(this,e),this.config=Object.assign({},c,n),this.audioContext=t,this.audioInput=null,this.realAudioInput=null,this.inputPoint=null,this.audioRecorder=null,this.rafID=null,this.analyserContext=null,this.recIndex=0,this.stream=null,this.updateAnalysers=this.updateAnalysers.bind(this)}return a(e,[{key:"init",value:function(e){var t=this;return new Promise((function(n){t.inputPoint=t.audioContext.createGain(),t.stream=e,t.realAudioInput=t.audioContext.createMediaStreamSource(e),t.audioInput=t.realAudioInput,t.audioInput.connect(t.inputPoint),t.analyserNode=t.audioContext.createAnalyser(),t.analyserNode.fftSize=2048,t.inputPoint.connect(t.analyserNode),t.audioRecorder=new o.default(t.inputPoint);var a=t.audioContext.createGain();a.gain.value=0,t.inputPoint.connect(a),a.connect(t.audioContext.destination),t.updateAnalysers(),n()}))}},{key:"start",value:function(){var e=this;return new Promise((function(t,n){e.audioRecorder?(e.audioRecorder.clear(),e.audioRecorder.record(),t(e.stream)):n("Not currently recording")}))}},{key:"stop",value:function(){var e=this;return new Promise((function(t){e.audioRecorder.stop(),e.audioRecorder.getBuffer((function(n){e.audioRecorder.exportWAV((function(e){return t({buffer:n,blob:e})}))}))}))}},{key:"updateAnalysers",value:function(){if(this.config.onAnalysed){requestAnimationFrame(this.updateAnalysers);var e=new Uint8Array(this.analyserNode.frequencyBinCount);this.analyserNode.getByteFrequencyData(e);for(var t=new Array(255),n=0,a=void 0,i=0;i<255;i+=1)a=Math.floor(e[i])-Math.floor(e[i])%5,0!==a&&(n=i),t[i]=a;this.config.onAnalysed({data:t,lineTo:n})}}},{key:"setOnAnalysed",value:function(e){this.config.onAnalysed=e}}]),e}();u.download=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"audio";o.default.forceDownload(e,t+".wav")},t.default=u},"78fe":function(e,t,n){(function(t){var n=!!(t===t.window&&t.URL&&t.Blob&&t.Worker);function a(e,a){var i,o=this;if(a=a||{},n)return i=e.toString().trim().match(/^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/)[1],new t.Worker(t.URL.createObjectURL(new t.Blob([i],{type:"text/javascript"})));function r(e){setTimeout((function(){o.onmessage({data:e})}),0)}this.self=a,this.self.postMessage=r,setTimeout(e.bind(a,a),0)}a.prototype.postMessage=function(e){var t=this;setTimeout((function(){t.self.onmessage({data:e})}),0)},e.exports=a}).call(this,n("c8ba"))},"9dd0":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),i=n("78fe"),o=r(i);function r(e){return e&&e.__esModule?e:{default:e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var c={bufferLen:4096,numChannels:2,mimeType:"audio/wav"},u=function(){function e(t,n){var a=this;s(this,e),this.config=Object.assign({},c,n),this.recording=!1,this.callbacks={getBuffer:[],exportWAV:[]},this.context=t.context,this.node=(this.context.createScriptProcessor||this.context.createJavaScriptNode).call(this.context,this.config.bufferLen,this.config.numChannels,this.config.numChannels),this.node.onaudioprocess=function(e){if(a.recording){for(var t=[],n=0;n<a.config.numChannels;n++)t.push(e.inputBuffer.getChannelData(n));a.worker.postMessage({command:"record",buffer:t})}},t.connect(this.node),this.node.connect(this.context.destination);var i={};this.worker=new o.default((function(){var e=0,t=[],n=void 0,a=void 0;function i(e){n=e.sampleRate,a=e.numChannels,u()}function o(n){for(var i=0;i<a;i++)t[i].push(n[i]);e+=n[0].length}function r(n){for(var i=[],o=0;o<a;o++)i.push(l(t[o],e));var r=void 0;r=2===a?d(i[0],i[1]):i[0];var s=p(r),c=new Blob([s],{type:n});this.postMessage({command:"exportWAV",data:c})}function s(){for(var n=[],i=0;i<a;i++)n.push(l(t[i],e));this.postMessage({command:"getBuffer",data:n})}function c(){e=0,t=[],u()}function u(){for(var e=0;e<a;e++)t[e]=[]}function l(e,t){for(var n=new Float32Array(t),a=0,i=0;i<e.length;i++)n.set(e[i],a),a+=e[i].length;return n}function d(e,t){var n=e.length+t.length,a=new Float32Array(n),i=0,o=0;while(i<n)a[i++]=e[o],a[i++]=t[o],o++;return a}function f(e,t,n){for(var a=0;a<n.length;a++,t+=2){var i=Math.max(-1,Math.min(1,n[a]));e.setInt16(t,i<0?32768*i:32767*i,!0)}}function h(e,t,n){for(var a=0;a<n.length;a+=1)e.setUint8(t+a,n.charCodeAt(a))}function p(e){var t=new ArrayBuffer(44+2*e.length),i=new DataView(t);return h(i,0,"RIFF"),i.setUint32(4,36+2*e.length,!0),h(i,8,"WAVE"),h(i,12,"fmt "),i.setUint32(16,16,!0),i.setUint16(20,1,!0),i.setUint16(22,a,!0),i.setUint32(24,n,!0),i.setUint32(28,4*n,!0),i.setUint16(32,2*a,!0),i.setUint16(34,16,!0),h(i,36,"data"),i.setUint32(40,2*e.length,!0),f(i,44,e),i}this.onmessage=function(e){switch(e.data.command){case"init":i(e.data.config);break;case"record":o(e.data.buffer);break;case"exportWAV":r(e.data.type);break;case"getBuffer":s();break;case"clear":c();break}}}),i),this.worker.postMessage({command:"init",config:{sampleRate:this.context.sampleRate,numChannels:this.config.numChannels}}),this.worker.onmessage=function(e){var t=a.callbacks[e.data.command].pop();"function"===typeof t&&t(e.data.data)}}return a(e,[{key:"record",value:function(){this.recording=!0}},{key:"stop",value:function(){this.recording=!1}},{key:"clear",value:function(){this.worker.postMessage({command:"clear"})}},{key:"getBuffer",value:function(e){if(e=e||this.config.callback,!e)throw new Error("Callback not set");this.callbacks.getBuffer.push(e),this.worker.postMessage({command:"getBuffer"})}},{key:"exportWAV",value:function(e,t){if(t=t||this.config.mimeType,e=e||this.config.callback,!e)throw new Error("Callback not set");this.callbacks.exportWAV.push(e),this.worker.postMessage({command:"exportWAV",type:t})}}]),e}();u.forceDownload=function(e,t){var n=document.createElement("a");n.style="display: none",document.body.appendChild(n);var a=window.URL.createObjectURL(e);n.href=a,n.download=t,n.click(),window.URL.revokeObjectURL(a),document.body.removeChild(n)},t.default=u},c782:function(e,t,n){e.exports=n("5c3d")}}]);
//# sourceMappingURL=chunk-07a8efe2.56c8a31c.js.map
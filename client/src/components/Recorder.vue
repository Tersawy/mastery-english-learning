<template>
	<div class="text-right">
		<b-btn size="sm" class="w-auto" variant="success" v-if="!isRecording" @click="startRecording">Record</b-btn>
		<b-btn size="sm" class="w-auto" variant="danger" v-else @click="stopRecording">Stop</b-btn>
	</div>
</template>

<script>
	import Recorder from "recorder-js";

	export default {
		data() {
			return {
				isRecording: false,
				recorder: {},
				gumStream: {}
			};
		},
		mounted() {},
		methods: {
			async startRecording() {
				const audioContext = new (window.AudioContext || window.webkitAudioContext)();

				this.recorder = new Recorder(audioContext);

				try {
					let stream = await navigator.mediaDevices.getUserMedia({ audio: true });

					this.recorder.init(stream);

					this.gumStream = stream;

					await this.recorder.start();

					this.isRecording = true;
				} catch (err) {
					console.log(err);
					this.isRecording = false;
				}
			},
			stopRecording() {
				this.isRecording = false;

				this.gumStream.getAudioTracks()[0].stop();

				this.recorder.stop().then(({ blob }) => {
					this.isRecording = false;

					this.$emit("input", blob);
				});
			}
		}
		// methods: {
		// 	startRecording() {
		// 		console.log("recordButton clicked");

		// 		/*
		//       Simple constraints object, for more advanced audio features see
		//       https://addpipe.com/blog/audio-constraints-getusermedia/
		//     */
		// 		var constraints = { audio: true, video: false };

		// 		/*
		//       Disable the record button until we get a success or fail from getUserMedia()
		//     */

		// 		this.isRecording = true;

		// 		/*
		//       We're using the standard promise based getUserMedia()
		//       https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
		//     */

		// 		navigator.mediaDevices
		// 			.getUserMedia(constraints)
		// 			.then((stream) => {
		// 				console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

		// 				/*
		//           create an audio context after getUserMedia is called
		//           sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
		//           the sampleRate defaults to the one set in your OS for your playback device
		//         */
		// 				this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

		// 				//update the format
		// 				// document.getElementById("formats").innerHTML = "Format: 1 channel pcm @ " + audioContext.sampleRate / 1000 + "kHz";

		// 				/*  assign to gumStream for later use  */
		// 				this.gumStream = stream;

		// 				/* use the stream */
		// 				this.input = this.audioContext.createMediaStreamSource(stream);

		// 				/*
		//           Create the Recorder object and configure to record mono sound (1 channel)
		//           Recording 2 channels  will double the file size
		//         */
		// 				this.rec = new Recorder(this.input, { numChannels: 1 });

		// 				//start the recording process
		// 				this.rec.record();

		// 				console.log("Recording started");
		// 			})
		// 			.catch((err) => {
		// 				console.log(err);
		// 				//enable the record button if getUserMedia() fails
		// 				this.isRecording = false;
		// 			});
		// 	},
		// 	stopRecording() {
		// 		console.log("stopButton clicked");

		// 		//disable the stop button, enable the record too allow for new recordings
		// 		this.isRecording = false;

		// 		//reset button just in case the recording is stopped while paused
		// 		// pauseButton.innerHTML="Pause";
		// 		//tell the recorder to stop the recording
		// 		this.rec.stop();

		// 		//stop microphone access
		// 		this.gumStream.getAudioTracks()[0].stop();

		// 		console.log(this.rec);
		// 		//create the wav blob and pass it on to createDownloadLink
		// 		this.rec.exportWAV((blob) => {
		// 			var url = URL.createObjectURL(blob);
		// 			var au = document.createElement("audio");
		// 			var li = document.createElement("li");
		// 			var link = document.createElement("a");

		// 			//name of .wav file to use during upload and download (without extendion)
		// 			var filename = new Date().toISOString();

		// 			//add controls to the <audio> element
		// 			au.controls = true;
		// 			au.src = url;

		// 			//save to disk link
		// 			link.href = url;
		// 			link.download = filename + ".wav"; //download forces the browser to donwload the file using the  filename
		// 			link.innerHTML = "Save to disk";

		// 			//add the new audio element to li
		// 			li.appendChild(au);

		// 			//add the filename to the li
		// 			li.appendChild(document.createTextNode(filename + ".wav "));

		// 			//add the save to disk link to li
		// 			li.appendChild(link);

		// 			//upload link
		// 			// var upload = document.createElement("a");
		// 			// upload.href = "#";
		// 			// upload.innerHTML = "Upload";
		// 			// upload.addEventListener("click", function (event) {
		// 			// 	var xhr = new XMLHttpRequest();
		// 			// 	xhr.onload = function (e) {
		// 			// 		if (this.readyState === 4) {
		// 			// 			console.log("Server returned: ", e.target.responseText);
		// 			// 		}
		// 			// 	};
		// 			// 	var fd = new FormData();
		// 			// 	fd.append("audio_data", blob, filename);
		// 			// 	xhr.open("POST", "upload.php", true);
		// 			// 	xhr.send(fd);
		// 			// });
		// 			li.appendChild(document.createTextNode(" ")); //add a space in between
		// 			li.appendChild(upload); //add the upload link to li

		// 			//add the li element to the ol
		// 			console.log(li);
		// 			recordingsList.appendChild(li);
		// 		});
		// 	},
		// 	createDownloadLink(blob) {
		// 		console.log(blob);
		// 		var url = URL.createObjectURL(blob);
		// 		var au = document.createElement("audio");
		// 		var li = document.createElement("li");
		// 		var link = document.createElement("a");

		// 		//name of .wav file to use during upload and download (without extendion)
		// 		var filename = new Date().toISOString();

		// 		//add controls to the <audio> element
		// 		au.controls = true;
		// 		au.src = url;

		// 		//save to disk link
		// 		link.href = url;
		// 		link.download = filename + ".wav"; //download forces the browser to donwload the file using the  filename
		// 		link.innerHTML = "Save to disk";

		// 		//add the new audio element to li
		// 		li.appendChild(au);

		// 		//add the filename to the li
		// 		li.appendChild(document.createTextNode(filename + ".wav "));

		// 		//add the save to disk link to li
		// 		li.appendChild(link);

		// 		//upload link
		// 		// var upload = document.createElement("a");
		// 		// upload.href = "#";
		// 		// upload.innerHTML = "Upload";
		// 		// upload.addEventListener("click", function (event) {
		// 		// 	var xhr = new XMLHttpRequest();
		// 		// 	xhr.onload = function (e) {
		// 		// 		if (this.readyState === 4) {
		// 		// 			console.log("Server returned: ", e.target.responseText);
		// 		// 		}
		// 		// 	};
		// 		// 	var fd = new FormData();
		// 		// 	fd.append("audio_data", blob, filename);
		// 		// 	xhr.open("POST", "upload.php", true);
		// 		// 	xhr.send(fd);
		// 		// });
		// 		li.appendChild(document.createTextNode(" ")); //add a space in between
		// 		li.appendChild(upload); //add the upload link to li

		// 		//add the li element to the ol
		// 		console.log(li);
		// 		recordingsList.appendChild(li);
		// 	}
		// }
	};
</script>

<style lang="scss" scoped></style>

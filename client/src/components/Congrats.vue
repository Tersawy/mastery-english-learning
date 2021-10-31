// pulled from https://codepen.io/l2zeo/pen/ZEBLepW
<template>
	<div class="js-container congrats-container" style="top: 0px !important"></div>
</template>

<script>
	const Confettiful = function (el) {
		this.el = el;
		this.containerEl = null;

		this.confettiFrequency = 3;
		this.confettiColors = ["#EF2964", "#00C09D", "#2D87B0", "#48485E", "#EFFF1D"];
		this.confettiAnimations = ["slow", "medium", "fast"];

		this._setupElements();
		this._renderConfetti();
	};

	Confettiful.prototype._setupElements = function () {
		const containerEl = document.createElement("div");

		containerEl.classList.add("confetti-container");

		this.el.appendChild(containerEl);

		this.containerEl = containerEl;
	};

	Confettiful.prototype._renderConfetti = function () {
		this.confettiInterval = setInterval(() => {
			const confettiEl = document.createElement("div");
			const confettiSize = Math.floor(Math.random() * 3) + 7 + "px";
			const confettiBackground = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];
			const confettiLeft = Math.floor(Math.random() * this.el.offsetWidth) + "px";
			const confettiAnimation = this.confettiAnimations[Math.floor(Math.random() * this.confettiAnimations.length)];

			confettiEl.classList.add("confetti", "confetti--animation-" + confettiAnimation);
			confettiEl.style.left = confettiLeft;
			confettiEl.style.width = confettiSize;
			confettiEl.style.height = confettiSize;
			confettiEl.style.backgroundColor = confettiBackground;

			confettiEl.removeTimeout = setTimeout(function () {
				confettiEl.parentNode.removeChild(confettiEl);
			}, 3000);

			this.containerEl.appendChild(confettiEl);
		}, 25);
	};
	export default {
		mounted() {
			new Confettiful(document.querySelector(".js-container"));
		}
	};
</script>

<style lang="scss">
	@keyframes confetti-slow {
		0% {
			transform: translate3d(0, 0, 0) rotateX(0) rotateY(0);
		}

		100% {
			transform: translate3d(25px, 105vh, 0) rotateX(360deg) rotateY(180deg);
		}
	}

	@keyframes confetti-medium {
		0% {
			transform: translate3d(0, 0, 0) rotateX(0) rotateY(0);
		}

		100% {
			transform: translate3d(100px, 105vh, 0) rotateX(100deg) rotateY(360deg);
		}
	}

	@keyframes confetti-fast {
		0% {
			transform: translate3d(0, 0, 0) rotateX(0) rotateY(0);
		}

		100% {
			transform: translate3d(-50px, 105vh, 0) rotateX(10deg) rotateY(250deg);
		}
	}

	.congrats-container {
		width: 100vw;
		height: 100vh;
		background: transparent;
		border: 1px solid white;
		top: 0;
		left: 0;
		position: fixed;
		z-index: 10000;
	}

	.confetti-container {
		perspective: 700px;
		position: absolute;
		overflow: hidden;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	.confetti {
		position: absolute;
		z-index: 1;
		top: -10px;
		border-radius: 0%;

		&--animation-slow {
			animation: confetti-slow 2.25s linear 1 forwards;
		}

		&--animation-medium {
			animation: confetti-medium 1.75s linear 1 forwards;
		}

		&--animation-fast {
			animation: confetti-fast 1.25s linear 1 forwards;
		}
	}
</style>

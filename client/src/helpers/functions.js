export const secondsToHms = (seconds) => {
	seconds = Number(seconds);

	let h = Math.floor(seconds / 3600);
	let m = Math.floor((seconds % 3600) / 60);
	let s = Math.floor((seconds % 3600) % 60);

	let hDisplay = h > 0 ? h + "h " : "";
	let mDisplay = m > 0 ? m + "min " : "";
	let sDisplay = s > 0 ? s + "sec" : "";

	let textDisplay = hDisplay + mDisplay + sDisplay;

	hDisplay = h > 0 ? h.toString().padStart(2, "0") + ":" : "";
	mDisplay = m > 0 ? m.toString().padStart(2, "0") + ":" : "";
	mDisplay = m == 0 ? "00:" : mDisplay;
	sDisplay = s > 0 ? s.toString().padStart(2, "0") : "00";

	let numDisplay = hDisplay + mDisplay + sDisplay;

	return { hours: h, minutes: m, seconds: s, timeStr: textDisplay, timeNum: numDisplay };
};

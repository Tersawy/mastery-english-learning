
const fs = require("fs").promises;

exports.randomChar = (num = 8) => {
	let chars = "123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

	let random = "";

	for (let i = 0; i < num; i++) {
		random += chars[Math.floor(Math.random() * chars.length)];
	}

	return random;
}

// pulled from https://gist.github.com/Elements-/cf063254730cd754599e
exports.videoDuration = async (filePath) => {

  const buff = Buffer.alloc(100);

  const header = Buffer.from("mvhd");

  const file = await fs.open(filePath, "r");

  const { buffer } = await file.read(buff, 0, 100, 0);

  await file.close();

  const start = buffer.indexOf(header) + 17;
  
  const duration = buffer.readUInt32BE(start + 4);
  
  const timeScale = buffer.readUInt32BE(start);
  
  const audioLength = Math.floor((duration / timeScale) * 1000) / 1000;

  return audioLength;
  
  // console.log(buffer, header, start, timeScale, duration, audioLength);
}

// pulled from https://stackoverflow.com/questions/37096367/how-to-convert-seconds-to-minutes-and-hours-in-javascript/49905383
exports.secondsToHms = (seconds) => {
  seconds = Number(seconds);

	let h = Math.floor(seconds / 3600);
	let m = Math.floor(seconds % 3600 / 60);
	let s = Math.floor(seconds % 3600 % 60);

  let hDisplay = h > 0 ? (h + "h ") : "";
  let mDisplay = m > 0 ? (m + "min ") : "";
  let sDisplay = s > 0 ? (s + "sec") : "";

  let textDisplay = hDisplay + mDisplay + sDisplay;

  hDisplay = h > 0 ? (h.toString().padStart(2, "0") + ":") : "";
  mDisplay = m > 0 ? (m.toString().padStart(2, "0") + ":") : "";
  mDisplay = m == 0 ? "00:" : mDisplay;
  sDisplay = s > 0 ? (s.toString().padStart(2, "0")) : "00";

  let numDisplay = hDisplay + mDisplay + sDisplay;

  return { hours: h, minutes: m, seconds: s, timeStr: textDisplay, timeNum: numDisplay }

	// return [h, m, s, textDisplay];
}

//295752

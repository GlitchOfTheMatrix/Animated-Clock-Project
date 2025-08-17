const canvas = document.getElementById("canvas");
const faceColor = document.getElementById("face-color");
const borderColor = document.getElementById("border-color");
const numberLinesColor = document.getElementById("number-lines-color");
const largeHandColor = document.getElementById("large-hand-color");
const secondHandColor = document.getElementById("second-hand-color");

function clock() {
  const now = new Date();
  const ctx = canvas.getContext("2d");

  // Setup canvas
  ctx.save(); // save the default state
  ctx.clearRect(0, 0, 500, 500);
  ctx.translate(250, 250); // Put 0,0 in the middle
  ctx.rotate(-Math.PI / 2); // Rotate clock -90deg

  // Set default styles
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#f4f4f4";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";

  // Draw clock face/border
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = borderColor.value;
  ctx.fillStyle = faceColor.value;
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fill();
  ctx.restore();

  // Draw hour lines
  ctx.save();
  ctx.strokeStyle = numberLinesColor.value;
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
  }
  ctx.restore();

  // Draw minute lines
  ctx.save();
  ctx.strokeStyle = numberLinesColor.value;
  ctx.lineWidth = 4;
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath();
      ctx.moveTo(117, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }
  ctx.restore();

  // Get current time
  const hr = now.getHours() % 12;
  const min = now.getMinutes();
  const sec = now.getSeconds();

  // console.log(`${hr}:${min}:${sec}`);

  // Draw hour hand
  ctx.save();
  ctx.rotate(
    (Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec
  );
  ctx.strokeStyle = largeHandColor.value;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore();

  // Draw min hand
  ctx.save();
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.strokeStyle = largeHandColor.value;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(112, 0);
  ctx.stroke();
  ctx.restore();

  // Draw sec hand
  ctx.save();
  ctx.rotate((sec * Math.PI) / 30);
  ctx.strokeStyle = secondHandColor.value;
  ctx.fillStyle = secondHandColor.value;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(100, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 8, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();

  ctx.restore(); // restore default state

  requestAnimationFrame(clock);
}
requestAnimationFrame(clock);
document.getElementById("save-btn").addEventListener("click", () => {
  const dataURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = "clock.png";
  link.href = dataURL;
  link.click();
});

// Function to save a string value to local storage
function saveStringToLocalStorage(key, value) {
  if (typeof value === "string") {
    localStorage.setItem(key, value);
  } else {
    console.error("Value must be a string");
  }
}

// Function to save an object to local storage
function saveObjectToLocalStorage(key, obj) {
  try {
    const json = JSON.stringify(obj);
    localStorage.setItem(key, json);
  } catch (e) {
    console.error("Failed to save object:", e);
  }
}

// Function to save an array to local storage
function saveArrayToLocalStorage(key, arr) {
  if (Array.isArray(arr)) {
    localStorage.setItem(key, JSON.stringify(arr));
  } else {
    console.error("Value must be an array");
  }
}

// Function to retrieve a string from local storage
function getStringFromLocalStorage(key) {
  return localStorage.getItem(key);
}

// Function to retrieve an object from local storage
function getObjectFromLocalStorage(key) {
  const json = localStorage.getItem(key);
  try {
    return json ? JSON.parse(json) : null;
  } catch (e) {
    console.error("Failed to parse object:", e);
    return null;
  }
}

// Function to retrieve an array from local storage
function getArrayFromLocalStorage(key) {
  const json = localStorage.getItem(key);
  try {
    const arr = JSON.parse(json);
    return Array.isArray(arr) ? arr : [];
  } catch (e) {
    console.error("Failed to parse array:", e);
    return [];
  }
}

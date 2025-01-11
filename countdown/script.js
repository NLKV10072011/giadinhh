const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const messageEl = document.getElementById("message");

const tet2025 = "2025-01-29T00:00:00"; // Tết Nguyên Đán 2025

const fireworksAudio = new Audio('fireworks.mp3'); // Đảm bảo có tệp âm thanh "fireworks.mp3" trong thư mục

// Canvas for fireworks effect
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];
let fireworkSoundPlayed = false;

// Firework class definition
class Firework {
  constructor(x, y, color, radius, speed) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = radius;
    this.speed = speed;
    this.particles = [];
    this.exploded = false;
  }

  explode() {
    this.exploded = true;
    for (let i = 0; i < 100; i++) {
      const particle = new Particle(
        this.x,
        this.y,
        this.color,
        Math.random() * 360,
        Math.random() * this.speed + 1
      );
      this.particles.push(particle);
    }
  }

  update() {
    if (!this.exploded) {
      this.y -= this.speed; // Firework rises up
    } else {
      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].update();
        this.particles[i].draw();
      }
    }
  }
}

// Particle class definition
class Particle {
  constructor(x, y, color, angle, speed) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.angle = angle;
    this.speed = speed;
    this.life = 1;
    this.radius = Math.random() * 2 + 1;
  }

  update() {
    this.x += Math.cos(this.angle * Math.PI / 180) * this.speed;
    this.y += Math.sin(this.angle * Math.PI / 180) * this.speed;
    this.life -= 0.02;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = canvas.height - 30; // Fireworks will start from the bottom
  const color = `hsl(${Math.random() * 360}, 100%, 60%)`; // Random colors
  const radius = Math.random() * 10 + 5;
  const speed = Math.random() * 3 + 2;
  const firework = new Firework(x, y, color, radius, speed);
  fireworks.push(firework);
}

function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < fireworks.length; i++) {
    fireworks[i].update();
    if (fireworks[i].y <= 200 && !fireworks[i].exploded) { // If firework reaches a certain height, explode
      fireworks[i].explode();
    }
    if (fireworks[i].particles[0] && fireworks[i].particles[0].life <= 0) {
      fireworks.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animateFireworks);
}

function countdown() {
  const tetDate = new Date(tet2025);
  const currentDate = new Date();

  const totalSeconds = (tetDate - currentDate) / 1000;

  const days = Math.floor(totalSeconds / 3600 / 24);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const seconds = Math.floor(totalSeconds) % 60;

  updateTime(daysEl, days);
  updateTime(hoursEl, hours);
  updateTime(minutesEl, minutes);
  updateTime(secondsEl, seconds);

  if (totalSeconds <= 0 && !fireworkSoundPlayed) {
    fireworksAudio.play();
    messageEl.innerHTML = "Happy New Year 2025!";
    fireworkSoundPlayed = true;
    for (let i = 0; i < 10; i++) {
      createFirework();
    }
    animateFireworks();
  }
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function updateTime(element, value) {
  const newValue = formatTime(value);
  if (element.innerHTML !== newValue) {
    element.classList.add("changing");
    setTimeout(() => {
      element.innerHTML = newValue;
      element.classList.remove("changing");
    }, 300);
  }
}

countdown();
setInterval(countdown, 1000);

console.clear();
const clock = document.getElementById('clock');
const rings = {
hours: { el: clock.querySelector('.hours'), numbers: 12 },
minutes: { el: clock.querySelector('.minutes'), numbers: 60 },
seconds: { el: clock.querySelector('.seconds'), numbers: 60 },
};
Object.entries(rings).forEach(([key, item]) => {
item.el.innerHTML = '';
for (let i = 0; i < item.numbers; i++) {
const dot = document.createElement('div');
dot.className = 'dot';
const angle = (360 / item.numbers) * i;
dot.style.transform = `
rotate(${angle}deg)
translateY(calc((var(--clock-radius) + var(--dot-h) * .5) * -1))
`;
item.el.appendChild(dot);
}
});
const prevActive = {
hours: null,
minutes: null,
seconds: null
};
function updateClock() {
const now = new Date();
const current = {
hours: now.getHours() % 12,
minutes: now.getMinutes(),
seconds: now.getSeconds()
};
for (const unit in current) {
const value = current[unit];
const ring = rings[unit].el;
if (prevActive[unit] !== value) {
if (prevActive[unit] !== null) {
ring.children[prevActive[unit]].classList.remove('active');
}
ring.children[value].classList.add('active');
prevActive[unit] = value;
}
}
const timeDiv = document.getElementById('time');
const displayHours = now.getHours().toString().padStart(2, '0');
const displayMinutes = current.minutes.toString().padStart(2, '0');
const displaySeconds = current.seconds.toString().padStart(2, '0');
timeDiv.textContent = `${displayHours}:${displayMinutes}:${displaySeconds}`;
requestAnimationFrame(updateClock);
}
updateClock();

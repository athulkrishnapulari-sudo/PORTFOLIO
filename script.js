const darkblue = document.getElementById('darkblue');
const lightblue = document.getElementById('lightblue');
const home = document.getElementById('home');

let angle1 = 0;
let angle2 = Math.PI; 
const speed = 0.0015; 

let centerLeft = { x: 100, y: 200 };
let centerRight = { x: 300, y: 200 };
let orbitRadius = 30;

function updateCenters() {
  const rect = home.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  centerLeft.x = rect.left + rect.width * 0.12;

  centerLeft.y = cy - rect.height * 0.25;
  centerRight.x = rect.left + rect.width * 0.88;

  centerRight.y = cy + rect.height * 0.25;

  orbitRadius = Math.min(rect.width, rect.height) * 0.12; 
}

window.addEventListener('resize', updateCenters);
updateCenters();

function animate() {

  const x1 = centerLeft.x + orbitRadius * Math.cos(angle1) - darkblue.offsetWidth / 2;
  const y1 = centerLeft.y + orbitRadius * Math.sin(angle1) - darkblue.offsetHeight / 2;
  darkblue.style.left = x1 + 'px';
  darkblue.style.top = y1 + 'px';

  const x2 = centerRight.x + orbitRadius * Math.cos(angle2) - lightblue.offsetWidth / 2;
  const y2 = centerRight.y + orbitRadius * Math.sin(angle2) - lightblue.offsetHeight / 2;
  lightblue.style.left = x2 + 'px';
  lightblue.style.top = y2 + 'px';

  angle1 += speed;
  angle2 += speed;
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);









(function() {
  const statusEl = document.getElementById('status');
  if (!statusEl) return;

  const words = ['B.Tech Student', 'Web Developer', 'Ethical Hacker'];
  const typeSpeed = 180; 
  const deleteSpeed = 180; 
  const pauseBetween = 1400;


  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  statusEl.appendChild(cursor);

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = words[wordIndex];
    if (!deleting) {
      charIndex++;
      statusEl.firstChild && statusEl.removeChild(statusEl.firstChild);
      statusEl.insertBefore(document.createTextNode(current.slice(0, charIndex)), cursor);

      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, pauseBetween);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      charIndex--;
      statusEl.firstChild && statusEl.removeChild(statusEl.firstChild);
      statusEl.insertBefore(document.createTextNode(current.slice(0, charIndex)), cursor);

      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(tick, typeSpeed);
        return;
      }
      setTimeout(tick, deleteSpeed);
    }
  }


  statusEl.insertBefore(document.createTextNode(''), cursor);
  tick();
})();





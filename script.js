





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



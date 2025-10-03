const svg = document.getElementById('bouncy-svg');
const path = document.getElementById('bouncy-path');

const keyframes = [
  { y: 2, easing: 'ease-in' },
  { y: 10, easing: 'ease-out' },
  { y: 0, easing: 'ease-in' }, 
  { y: 8, easing: 'ease-out' },
  { y: 2, easing: 'ease-out' },
  { y: 6, easing: 'ease-out' },
  { y: 4, easing: 'ease-out' }
];

const timings = [0, 100, 250, 450, 650, 900, 1200];

let currentFrame = 0;
let startTime = null;
let animationId = null;
let isAnimating = false;

function updatePath(y) {
  path.setAttribute('d', `M 2,6 Q 16,${y} 30,6`);
}

function easeInQuad(t) {
  return t * t;
}

function easeOutQuad(t) {
  return t * (2 - t);
}

function animate(timestamp) {
  if (!startTime) startTime = timestamp;
  const elapsed = timestamp - startTime;
  
  if (elapsed >= timings[timings.length - 1]) {
    updatePath(keyframes[keyframes.length - 1].y);
    isAnimating = false;
    return;
  }
  
  let segmentIndex = 0;
  for (let i = 0; i < timings.length - 1; i++) {
    if (elapsed >= timings[i] && elapsed < timings[i + 1]) {
      segmentIndex = i;
      break;
    }
  }
  
  if (segmentIndex >= keyframes.length - 1) {
    updatePath(keyframes[keyframes.length - 1].y);
    isAnimating = false;
    return;
  }
  
  const segmentStart = timings[segmentIndex];
  const segmentEnd = timings[segmentIndex + 1];
  const segmentDuration = segmentEnd - segmentStart;
  const segmentProgress = (elapsed - segmentStart) / segmentDuration;
  
  const easing = keyframes[segmentIndex].easing;
  const easedProgress = easing === 'ease-in' 
    ? easeInQuad(segmentProgress) 
    : easeOutQuad(segmentProgress);
  
  const startY = keyframes[segmentIndex].y;
  const endY = keyframes[segmentIndex + 1].y;
  const currentY = startY + (endY - startY) * easedProgress;
  
  updatePath(currentY);
  animationId = requestAnimationFrame(animate);
}

function startAnimation() {
  if (isAnimating) return;
  
  isAnimating = true;
  startTime = null;
  animationId = requestAnimationFrame(animate);
}
interactiveHeroText.addEventListener('mouseover', startAnimation);

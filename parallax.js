const separator = document.querySelector('#separator');
const parallaxedSection = document.querySelector('#parallaxedSection'); // adjust if needed

const length = separator.getTotalLength();
separator.style.strokeDasharray = length;
separator.style.strokeDashoffset = length;

// Detect screen size
function getTraceDistance() {
  const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

  // Base trace distance for desktop
  let traceDistance = (totalScrollableHeight / 4) - 150;

  // On small screens, show only half the separator → trace more slowly
  if (window.innerWidth < 768) {
    traceDistance *= 1.8; // slow down tracing speed (~80% slower)
  }

  return traceDistance;
}

let traceDistance = getTraceDistance();

// Recalculate on resize
window.addEventListener('resize', () => {
  traceDistance = getTraceDistance();
});

document.addEventListener('scroll', () => {
  const scrollPosition = document.documentElement.scrollTop;
  const scrollPercentage = Math.min(scrollPosition / traceDistance, 1);

  separator.style.strokeDashoffset = length * (1 - scrollPercentage);

  // Optional parallax effect
  if (parallaxedSection) {
    const parallaxAmount = scrollPosition;
    parallaxedSection.style.transform = `translateY(-${parallaxAmount}px)`;
    parallaxedSection.style.marginBottom = `-${parallaxAmount}px`;
  }
});

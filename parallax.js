const separator = document.querySelector('#separator');
const parallaxedSection = document.querySelector('#parallaxedSection'); // adjust if needed

const length = separator.getTotalLength();
separator.style.strokeDasharray = length;
separator.style.strokeDashoffset = length;

function getTraceDistance() {
  const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

  let traceDistance = (totalScrollableHeight / 4) - 150;

  if (window.innerWidth < 768) {
    traceDistance *= 1.8;
  }

  return traceDistance;
}

let traceDistance = getTraceDistance();

window.addEventListener('resize', () => {
  traceDistance = getTraceDistance();
});

document.addEventListener('scroll', () => {
  const scrollPosition = document.documentElement.scrollTop;
  const scrollPercentage = Math.min(scrollPosition / traceDistance, 1);

  separator.style.strokeDashoffset = length * (1 - scrollPercentage);

  if (parallaxedSection) {
    const parallaxAmount = scrollPosition;
    parallaxedSection.style.transform = `translateY(-${parallaxAmount}px)`;
    parallaxedSection.style.marginBottom = `-${parallaxAmount}px`;
  }
});

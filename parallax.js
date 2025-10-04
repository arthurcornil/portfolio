const separator = document.querySelector('#separator');
const length = separator.getTotalLength();
const screenHeight = screen.height;
separator.style.strokeDasharray = length;
separator.style.strokeDashoffset = length;

const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
document.addEventListener("scroll", (event) => {
	const scrollPosition = document.documentElement.scrollTop;
	const screenHeight = window.innerHeight - 250;

	const scrollPercentage = Math.min(scrollPosition / screenHeight, 1);

	separator.style.strokeDashoffset = length * (1 - scrollPercentage);

	const parallaxAmount = Math.min(scrollPosition, screenHeight) / 1.5;
	parallaxedSection.style.transform = `translateY(-${parallaxAmount}px)`;
	parallaxedSection.style.marginBottom = `-${parallaxAmount}px`;
})

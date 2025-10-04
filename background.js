if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
	;
} else {
	const dotGridElements = document.querySelectorAll('.dot-grid');

	dotGridElements.forEach(element => {
	  const computedStyle = getComputedStyle(element);
	  const gridGap = parseInt(computedStyle.getPropertyValue('--grid-gap'));
	  const baseDotSize = parseInt(computedStyle.getPropertyValue('--dot-size'));
	  const dotColor = computedStyle.getPropertyValue('--dot-color');
	  
	  const influenceRadius = gridGap * 2;
	  
	  const canvas = document.createElement('canvas');
	  canvas.style.position = 'absolute';
	  canvas.style.top = '0';
	  canvas.style.left = '0';
	  canvas.style.pointerEvents = 'none';
	  canvas.style.width = '100%';
	  canvas.style.height = '100%';
	  canvas.style['z-index'] = '0';
	  
	  if (getComputedStyle(element).position === 'static') {
		element.style.position = 'relative';
	  }
	  
	  element.prepend(canvas);
	  
	  const ctx = canvas.getContext('2d');
	  let mouseX = -1000;
	  let mouseY = -1000;
	  
	  function resizeCanvas() {
		canvas.width = element.offsetWidth;
		canvas.height = element.offsetHeight;
	  }
	  
	  resizeCanvas();
	  window.addEventListener('resize', resizeCanvas);
	  
	  function parseColor(colorStr) {
		const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
		  return {
			r: parseInt(match[1]),
			g: parseInt(match[2]),
			b: parseInt(match[3]),
			a: match[4] ? parseFloat(match[4]) : 1
		  };
	  }
	  
	  const color = parseColor(dotColor);
	  
	  function drawDots() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		const cols = Math.ceil(canvas.width / gridGap) + 1;
		const rows = Math.ceil(canvas.height / gridGap) + 1;
		
		for (let row = 0; row < rows; row++) {
		  for (let col = 0; col < cols; col++) {
			const x = col * gridGap;
			const y = row * gridGap;
			
			const dx = mouseX - x;
			const dy = mouseY - y;
			const distance = Math.sqrt(dx * dx + dy * dy);
			
			let scale = 1;
			if (distance < influenceRadius) {
			  scale = 1 + (6 * (1 - distance / influenceRadius));
			}
			
			const dotSize = baseDotSize * scale;
			const radius = dotSize / 2;
			
			ctx.beginPath();
			ctx.arc(x, y, radius, 0, Math.PI * 2);
			ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
			ctx.fill();
		  }
		}
		
		requestAnimationFrame(drawDots);
	  }
	  
	  element.addEventListener('mousemove', (e) => {
		const rect = element.getBoundingClientRect();
		mouseX = e.clientX - rect.left;
		mouseY = e.clientY - rect.top;
	  });
	  
	  element.addEventListener('mouseleave', () => {
		mouseX = -1000;
		mouseY = -1000;
	  });
	  
	  element.style.backgroundImage = 'none';
	  
	  drawDots();
	});
}

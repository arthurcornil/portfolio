// Interactive dot grid that scales dots based on cursor proximity
const dotGridElements = document.querySelectorAll('.dot-grid');

dotGridElements.forEach(element => {
  // Get CSS variables
  const computedStyle = getComputedStyle(element);
  const gridGap = parseInt(computedStyle.getPropertyValue('--grid-gap'));
  const baseDotSize = parseInt(computedStyle.getPropertyValue('--dot-size'));
  const dotColor = computedStyle.getPropertyValue('--dot-color');
  
  // Influence radius - how far the cursor affects dots
  const influenceRadius = gridGap * 2;
  
  // Create a canvas overlay for dynamic dots
  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style['z-index'] = '0';
  
  // Make element position relative if it isn't already
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
  
  // Parse rgba color
  function parseColor(colorStr) {
    const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (match) {
      return {
        r: parseInt(match[1]),
        g: parseInt(match[2]),
        b: parseInt(match[3]),
        a: match[4] ? parseFloat(match[4]) : 1
      };
    }
    return { r: 0, g: 0, b: 0, a: 0.12 };
  }
  
  const color = parseColor(dotColor);
  
  function drawDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate dot positions
    const cols = Math.ceil(canvas.width / gridGap) + 1;
    const rows = Math.ceil(canvas.height / gridGap) + 1;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * gridGap;
        const y = row * gridGap;
        
        // Calculate distance to cursor
        const dx = mouseX - x;
        const dy = mouseY - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Calculate scale based on distance (1x to 2x)
        let scale = 1;
        if (distance < influenceRadius) {
          // Linear interpolation: closer = bigger
          scale = 1 + (4 * (1 - distance / influenceRadius));
        }
        
        const dotSize = baseDotSize * scale;
        const radius = dotSize / 2;
        
        // Draw dot
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
  
  // Hide the CSS background dots since we're drawing on canvas
  element.style.backgroundImage = 'none';
  
  drawDots();
});

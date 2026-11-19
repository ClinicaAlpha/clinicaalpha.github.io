const canvas = document.querySelector('#evidence-field');
const context = canvas.getContext('2d');

function drawEvidenceField() {
  const { width, height } = canvas.getBoundingClientRect();
  if (!width || !height) return;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);

  const midX = width * 0.47;
  const midY = height * 0.49;
  const branches = [
    [0.03, 0.43, 0.15, 0.07, 0.21, 0.39],
    [0.95, 0.17, 0.75, 0.02, 0.64, 0.37],
    [0.94, 0.82, 0.89, 0.54, 0.72, 0.66],
    [0.16, 0.97, 0.14, 0.64, 0.33, 0.74],
  ];

  branches.forEach(([x, y, c1x, c1y, c2x, c2y], branchIndex) => {
    const gradient = context.createLinearGradient(x * width, y * height, midX, midY);
    gradient.addColorStop(0, 'rgba(111, 146, 137, 0.06)');
    gradient.addColorStop(0.57, 'rgba(155, 190, 174, 0.48)');
    gradient.addColorStop(1, 'rgba(220, 244, 225, 0.74)');
    context.strokeStyle = gradient;

    for (let strand = -13; strand <= 13; strand += 1) {
      const t = strand / 13;
      const sway = Math.sin(t * 2.8 + branchIndex);
      context.lineWidth = strand === 0 ? 1.2 : 0.56;
      context.beginPath();
      context.moveTo((x + 0.06 * t) * width, (y + 0.17 * t) * height);
      context.bezierCurveTo(
        (c1x + 0.22 * t) * width, (c1y + 0.10 * sway) * height,
        (c2x - 0.07 * t) * width, (c2y + 0.16 * t) * height,
        midX + 0.026 * width * t, midY - 0.026 * height * t,
      );
      context.stroke();
    }
  });

  context.strokeStyle = 'rgba(162, 202, 184, 0.19)';
  context.lineWidth = 0.8;
  for (const scale of [0.36, 0.46, 0.68, 0.90]) {
    context.beginPath();
    context.ellipse(midX, midY, width * scale * 0.45, height * scale * 0.30, -0.29, 0.1, 5.9);
    context.stroke();
  }
  context.fillStyle = '#c8e6d5';
  for (const [x, y] of [[0.22, 0.22], [0.36, 0.37], [0.09, 0.63], [0.68, 0.43], [0.80, 0.49], [0.76, 0.66], [0.31, 0.83]]) {
    context.beginPath();
    context.arc(x * width, y * height, 1.6, 0, Math.PI * 2);
    context.fill();
  }
}

new ResizeObserver(drawEvidenceField).observe(canvas);

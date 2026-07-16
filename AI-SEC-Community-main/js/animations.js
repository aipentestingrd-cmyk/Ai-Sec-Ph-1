(() => {
  'use strict';

  initNetworkAnimation();
  initFadeUpReveal();

  function initNetworkAnimation() {
    const container = document.querySelector('[data-network-animation]');
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const NODE_COUNT = 56;
    const CONNECTION_DISTANCE = 150;
    const primaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--brand-primary')
      .trim() || '#9930f6';
    const [pr, pg, pb] = hexToRgb(primaryColor);

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;
    let nodes = [];
    let rafId = null;

    function hexToRgb(hex) {
      const clean = hex.replace('#', '');
      const num = parseInt(clean.length === 3
        ? clean.split('').map((c) => c + c).join('')
        : clean, 16);
      return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
    }

    function createNodes() {
      const count = NODE_COUNT;
      const list = [];
      for (let i = 0; i < count; i += 1) {
        list.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          radius: 2 + Math.random() * 1.5,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
      return list;
    }

    function resize() {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!nodes.length) {
        nodes = createNodes();
      } else {
        nodes.forEach((node) => {
          node.x = Math.min(node.x, width);
          node.y = Math.min(node.y, height);
        });
      }
    }

    function drawFrame(time) {
      ctx.clearRect(0, 0, width, height);

      nodes.forEach((node) => {
        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x <= 0 || node.x >= width) node.vx *= -1;
          if (node.y <= 0 || node.y >= height) node.vy *= -1;
          node.x = Math.max(0, Math.min(width, node.x));
          node.y = Math.max(0, Math.min(height, node.y));
        }
      });

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < CONNECTION_DISTANCE) {
            const opacity = 1 - distance / CONNECTION_DISTANCE;
            ctx.strokeStyle = `rgba(${pr}, ${pg}, ${pb}, ${(opacity * 0.55).toFixed(3)})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        const pulse = prefersReducedMotion
          ? 0
          : Math.sin((time || 0) / 900 + node.pulsePhase) * 0.6;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${pr}, ${pg}, ${pb}, 0.85)`;
        ctx.arc(node.x, node.y, node.radius + pulse, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!prefersReducedMotion) {
        rafId = window.requestAnimationFrame(drawFrame);
      }
    }

    resize();
    drawFrame(0);

    if (!prefersReducedMotion) {
      rafId = window.requestAnimationFrame(drawFrame);
    }

    window.addEventListener('resize', () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      resize();
      drawFrame(0);
      if (!prefersReducedMotion) {
        rafId = window.requestAnimationFrame(drawFrame);
      }
    });
  }

  function initFadeUpReveal() {
    const targets = document.querySelectorAll('[data-animate="fade-up"]');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    targets.forEach((el) => observer.observe(el));
  }
})();

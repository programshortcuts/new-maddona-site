// animations.css
// Wait for everything to load
window.onload = () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const img = document.getElementById("target");

  // Canvas setup
  canvas.width = 500;
  canvas.height = 500;

  let particles = [];
  let imagePoints = [];
  let morphing = false;

  // -----------------------------
  // CREATE PARTICLES FROM TEXT
  // -----------------------------
  function createTextParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "bold 48px Arial";
    ctx.textAlign = "center";

    ctx.fillText("Madonna Medical Spa", canvas.width / 2, canvas.height / 2);

    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);

    particles = [];

    for (let y = 0; y < canvas.height; y += 4) {
      for (let x = 0; x < canvas.width; x += 4) {
        const index = (y * canvas.width + x) * 4;

        if (data.data[index + 3] > 128) {
          particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2
          });
        }
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    console.log("Particles created:", particles.length);
  }

  // -----------------------------
  // CREATE IMAGE TARGET POINTS
  // -----------------------------
  function createImagePoints() {
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    const imgWidth = 300;
    const imgHeight = 300;

    tempCtx.drawImage(
      img,
      (canvas.width - imgWidth) / 2,
      (canvas.height - imgHeight) / 2,
      imgWidth,
      imgHeight
    );

    const data = tempCtx.getImageData(0, 0, canvas.width, canvas.height);

    imagePoints = [];

    for (let y = 0; y < canvas.height; y += 4) {
      for (let x = 0; x < canvas.width; x += 4) {
        const index = (y * canvas.width + x) * 4;

        if (data.data[index + 3] > 128) {
          imagePoints.push({ x: x, y: y });
        }
      }
    }

    console.log("Image points:", imagePoints.length);
  }

  // -----------------------------
  // ANIMATION LOOP
  // -----------------------------
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      if (morphing && imagePoints.length > 0) {
        const target = imagePoints[i % imagePoints.length];

        // Smooth morph toward image
        p.x += (target.x - p.x) * 0.04;
        p.y += (target.y - p.y) * 0.04;
      } else {
        // Smoke phase
        p.x += p.vx;
        p.y += p.vy;

        p.vx += (Math.random() - 0.5) * 0.05;
        p.vy -= 0.01;
      }

      ctx.fillStyle = "rgba(10, 9, 9, 0.5)";
      ctx.fillRect(p.x, p.y, 2, 2);
    });

    requestAnimationFrame(animate);
  }

  // -----------------------------
  // INIT FLOW
  // -----------------------------
  img.onload = () => {
    createTextParticles();
    createImagePoints();
    animate();

    // Start morph after 2 seconds
    setTimeout(() => {
      morphing = true;
    }, 200);
  };

  // If image is already cached
  if (img.complete) {
    img.onload();
  }
};
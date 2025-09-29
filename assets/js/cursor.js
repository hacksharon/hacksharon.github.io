(function () {
    const canvas = document.getElementById("cursor-canvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let target = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
    };
    let circle = { x: target.x, y: target.y };

    window.addEventListener("pointermove", (e) => {
        target.x = e.clientX;
        target.y = e.clientY;
    });

    function frame() {
        // Clear entire canvas each frame to prevent trails
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Smooth follow
        const smoothing = 0.08;
        circle.x += (target.x - circle.x) * smoothing;
        circle.y += (target.y - circle.y) * smoothing;

        // Radial gradient circle
        const radius = 500;
        const grad = ctx.createRadialGradient(
            circle.x,
            circle.y,
            0,
            circle.x,
            circle.y,
            radius
        );
        grad.addColorStop(0, "rgba(34, 153, 184,0.2)");
        grad.addColorStop(1, "rgba(34, 153, 184,0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, radius, 0, Math.PI * 2);
        ctx.fill();

        requestAnimationFrame(frame);
    }
    frame();
})();

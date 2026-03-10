import { useRef, useEffect } from 'react';

export default function HeroMatrix() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Make it high res
        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            }
        };
        resizeCanvas();

        // Characters for the matrix rain
        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン*&^%$#@!'.split('');

        const fontSize = 20;
        let columns = Math.ceil(canvas.width / fontSize);

        let drops: number[] = [];
        let speeds: number[] = [];
        let opacities: number[] = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * -100; // Start offscreen randomly
            speeds[x] = 0.5 + Math.random() * 1.5; // Random speed for parallax feel
            opacities[x] = 0.5 + Math.random() * 0.5; // Increased base opacity
        }

        const draw = () => {
            // Radial gradient mask for trail effect
            ctx.fillStyle = 'rgba(2, 6, 23, 0.1)'; // Dark background to clear
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `bold ${fontSize}px "Fira Code", monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters[Math.floor(Math.random() * characters.length)];

                // Calculate fade based on column position (edges more transparent)
                const xPos = i * fontSize;
                const centerX = canvas.width / 2;
                const distFromCenter = Math.abs(xPos - centerX);
                const maxDist = canvas.width / 2;
                const edgeFade = Math.max(0.1, 1 - Math.pow(distFromCenter / maxDist, 2)); // Minimum fade 0.1

                const colorValue = Math.floor(180 + Math.random() * 75); // dynamic bright green
                ctx.fillStyle = `rgba(34, ${colorValue}, 94, ${opacities[i] * edgeFade * 1.5})`; // brighter multiplier

                // Head of the drop
                if (Math.random() > 0.90) {
                    ctx.fillStyle = `rgba(134, 239, 172, ${edgeFade})`; // green-300 for bright head
                    ctx.shadowColor = '#4ADE80';
                    ctx.shadowBlur = 10;
                } else {
                    ctx.shadowBlur = 0;
                }

                ctx.fillText(text, xPos, drops[i] * fontSize);

                // Reset drop
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
                    drops[i] = 0;
                    speeds[i] = 0.5 + Math.random() * 1.5;
                }

                drops[i] += speeds[i];
            }
        };

        window.addEventListener('resize', () => {
            resizeCanvas();
            columns = Math.ceil(canvas.width / fontSize);
            drops = [];
            speeds = [];
            opacities = [];
            for (let x = 0; x < columns; x++) {
                drops[x] = Math.random() * -100;
                speeds[x] = 0.5 + Math.random() * 1.5;
                opacities[x] = 0.1 + Math.random() * 0.9;
            }
        });

        const interval = setInterval(draw, 40); // slightly smoother than 33ms

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden rounded-2xl md:rounded-[2rem] opacity-90">
            {/* The canvas itself */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full mix-blend-screen"
                style={{
                    maskImage: 'radial-gradient(ellipse at center, black 25%, transparent 85%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 25%, transparent 85%)',
                }}
            />
            {/* A glass overlay to make it sit deeper */}
            <div className="absolute inset-0 bg-background-dark/10 backdrop-blur-[1px] pointer-events-none" />
        </div>
    );
}

window.addEventListener("load", () => {
    function initCanvas(canvasId, chartCanvasId) {
        const canvas = document.querySelector(`#${canvasId}`);
        const ctx = canvas.getContext("2d");
        let selectedColor = "black";
        let brushSize = 10;
        const strokes = [];

        let painting = false;

        function resizeCanvas() {
            const savedData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            canvas.width = window.innerWidth * 0.8;
            canvas.height = window.innerHeight * 0.8;
            ctx.putImageData(savedData, 0, 0);
        }

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        function startPosition(e) {
            painting = true;
            strokes.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
            draw(e);
        }

        function finishedPosition() {
            painting = false;
            ctx.beginPath();
        }

        function draw(e) {
            if (!painting) return;
            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) * (canvas.width / rect.width);
            const y = (e.clientY - rect.top) * (canvas.height / rect.height);
            ctx.lineWidth = brushSize;
            ctx.lineCap = 'round';
            ctx.strokeStyle = selectedColor;
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
        }

        function undo() {
            if (strokes.length > 0) {
                ctx.putImageData(strokes.pop(), 0, 0);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }

        function reset() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            strokes.length = 0;
        }

        const sizeButtons = document.querySelectorAll(`#${canvasId} ~ .bottomBox img`);
        sizeButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                if (btn.id === "tiny") brushSize = 2;
                else if (btn.id === "small") brushSize = 7;
                else if (btn.id === "large") brushSize = 15;
                else if (btn.id === "big") brushSize = 30;
                else if (btn.id === "eraser") selectedColor = '#f2f2f2';
            });
        });

        const parent = canvas.closest(".bigScreen, .smallScreen");
        parent.querySelector("#undo").addEventListener("click", undo);
        parent.querySelector("#reset").addEventListener("click", reset);

        canvas.addEventListener('mousedown', startPosition);
        canvas.addEventListener('mouseup', finishedPosition);
        canvas.addEventListener('mousemove', draw);

        const chartCanvas = document.getElementById(chartCanvasId).getContext('2d');
        const data = {
            labels: ['Red', 'Orange', 'Yellow', 'Green', 'Cyan', 'Blue', 'Purple', 'Pink'],
            datasets: [{
                label: 'Color',
                data: [50, 50, 50, 50, 50, 50, 50, 50],
                backgroundColor: [
                    'rgb(255,61,75)',
                    'rgb(251,181,65)',
                    'rgb(246,217,70)',
                    'rgb(71,248,68)',
                    'rgb(79,224,237)',
                    'rgb(54,162,235)',
                    'rgb(153,102,255)',
                    'rgb(255,102,204)'
                ],
                hoverOffset: 10
            }]
        };

        new Chart(chartCanvas, {
            type: 'doughnut',
            data: data,
            options: {
                onClick: (e, activeElements) => {
                    if (activeElements.length > 0) {
                        const datasetIndex = activeElements[0].datasetIndex;
                        const index = activeElements[0].index;
                        selectedColor = data.datasets[datasetIndex].backgroundColor[index];
                    }
                },
                plugins: {
                    legend: {
                    position: 'left',
                    labels: {
                        color: 'white',
                        boxWidth: 17,
                        boxHeight: 17,
                        padding: 7,
                        font: {
                        size: 12,
                        family: 'Arial',
                        weight: 'normal'
                        },
                        textAlign: 'left',
                    }
                    }
                }
            }
        });
    }

    initCanvas("canvas", "chartCanvas");
    initCanvas("canvas2", "chartCanvas2");
});

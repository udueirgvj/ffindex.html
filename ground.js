// ground.js - رسم الأرض
export class Ground {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.y = canvas.height - 60; // موضع الأرض من الأسفل
    }

    draw() {
        const ctx = this.ctx;
        const w = this.canvas.width;
        const groundY = this.y;

        // رسم الأرض بلون بني
        ctx.fillStyle = '#8B5A2B';
        ctx.fillRect(0, groundY, w, 60);

        // رسم حدود العشب
        ctx.fillStyle = '#5D3A1A';
        ctx.fillRect(0, groundY, w, 5);

        // رسم خطوط بيضاء متقطعة (مثل مدرج)
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 3;
        ctx.setLineDash([20, 30]);
        ctx.beginPath();
        ctx.moveTo(20, groundY + 30);
        ctx.lineTo(w - 20, groundY + 30);
        ctx.stroke();
        ctx.setLineDash([]); // إعادة الضبط

        // إضافة بعض التفاصيل (حجارة صغيرة)
        ctx.fillStyle = '#4A3A2A';
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.arc(100 + i*150, groundY + 20, 5, 0, Math.PI*2);
            ctx.fill();
        }
    }

    // إرجاع مستوى الأرض (Y) للمساعدة في التصادم
    getGroundY() {
        return this.y;
    }
}

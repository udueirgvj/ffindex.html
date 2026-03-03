// sky.js - إدارة خلفية السماء (الرسم والتحديث)
export class Sky {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        // يمكن إضافة نجوم أو غيوم متحركة لاحقاً
    }

    // رسم السماء مع تدرج لوني
    draw() {
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;

        // تدرج من الأزرق الفاتح إلى الأزرق الداكن
        const gradient = ctx.createLinearGradient(0, 0, 0, h);
        gradient.addColorStop(0, '#87CEEB');   // أزرق فاتح (أعلى)
        gradient.addColorStop(0.7, '#4A90E2'); // أزرق متوسط
        gradient.addColorStop(1, '#1E3C72');   // أزرق داكن (أسفل)

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);

        // رسم سحابة بسيطة (اختياري)
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.beginPath();
        ctx.arc(150, 80, 30, 0, Math.PI*2);
        ctx.arc(200, 60, 25, 0, Math.PI*2);
        ctx.arc(100, 70, 20, 0, Math.PI*2);
        ctx.fill();
    }

    // يمكن إضافة تحديث للسماء (مثل تحريك السحب) لكننا نبقيها بسيطة
    update() {
        // لا شيء حاليًا
    }
}

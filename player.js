// player.js - كيان الطائرة (اللاعب)
export class Player {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.radius = 15; // نصف قطر دائرة التصادم
        this.speed = 7;    // السرعة الافتراضية
    }

    // تحديث الموقع بناءً على مؤشر الفأرة أو اللمس
    updatePosition(mouseX, mouseY) {
        // التأكد من عدم خروج الطائرة عن حدود الشاشة مع هامش
        this.x = Math.min(Math.max(mouseX, this.radius), this.canvas.width - this.radius);
        this.y = Math.min(Math.max(mouseY, this.radius), this.canvas.height - this.radius);
    }

    // رسم الطائرة كمثلث بسيط (يمكن تطويره لصورة)
    draw() {
        const ctx = this.ctx;
        ctx.save();
        ctx.translate(this.x, this.y);

        // دوران بسيط حسب الاتجاه (يمكن إضافته لاحقاً)
        // هنا نرسم طائرة باتجاه اليمين (مثلث)
        ctx.fillStyle = '#FFD700'; // ذهبي
        ctx.beginPath();
        ctx.moveTo(15, 0);      // رأس المثلث (يمين)
        ctx.lineTo(-10, -10);    // خلفية أعلى
        ctx.lineTo(-10, 10);     // خلفية أسفل
        ctx.closePath();
        ctx.fill();

        // إضافة لهب خلفي إذا كان متحركاً
        ctx.fillStyle = '#FF8C00';
        ctx.beginPath();
        ctx.moveTo(-10, -5);
        ctx.lineTo(-20, 0);
        ctx.lineTo(-10, 5);
        ctx.fill();

        ctx.restore();

        // رسم دائرة التصادم (للتطوير - يمكن إخفاؤها لاحقاً)
        // ctx.strokeStyle = 'red';
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        // ctx.stroke();
    }

    // تعيين السرعة من المتحكم
    setSpeed(newSpeed) {
        this.speed = parseFloat(newSpeed);
    }

    // جلب نصف قطر التصادم
    getRadius() {
        return this.radius;
    }
                          }

// game.js - تجميع كل الوحدات وإدارة اللعبة
import { Sky } from './sky.js';
import { Ground } from './ground.js';
import { Player } from './player.js';

// عناصر HTML
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreSpan = document.getElementById('scoreValue');
const speedSlider = document.getElementById('speedSlider');
const speedSpan = document.getElementById('speedValue');
const restartBtn = document.getElementById('restartBtn');

// إنشاء الكائنات
const sky = new Sky(canvas);
const ground = new Ground(canvas);
const player = new Player(canvas);

// متغيرات اللعبة
let gameRunning = true;
let score = 0;
let obstacles = []; // مصفوفة العوائق
let frameCount = 0;
const obstacleSpawnRate = 50; // كل 50 إطاراً يظهر عائق جديد

// الاستماع لحركة الماوس واللمس
function handleMove(e) {
    if (!gameRunning) return;

    let clientX, clientY;
    if (e.touches) {
        // حدث لمس
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
        e.preventDefault();
    } else {
        clientX = e.clientX;
        clientY = e.clientY;
    }

    // تحويل إحداثيات الصفحة إلى إحداثيات الكانفاس
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const canvasX = (clientX - rect.left) * scaleX;
    const canvasY = (clientY - rect.top) * scaleY;

    player.updatePosition(canvasX, canvasY);
}

canvas.addEventListener('mousemove', handleMove);
canvas.addEventListener('touchmove', handleMove, { passive: false });
canvas.addEventListener('touchstart', handleMove, { passive: false }); // للبدء الفوري

// التحكم في السرعة
speedSlider.addEventListener('input', (e) => {
    const val = e.target.value;
    speedSpan.textContent = parseFloat(val).toFixed(1);
    player.setSpeed(val);
});

// زر إعادة التشغيل
restartBtn.addEventListener('click', () => {
    resetGame();
});

// دالة إعادة الضبط
function resetGame() {
    gameRunning = true;
    score = 0;
    obstacles = [];
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;
    scoreSpan.textContent = '0';
}

// دالة إنشاء عائق جديد
function spawnObstacle() {
    const size = 15 + Math.random() * 20; // حجم عشوائي
    obstacles.push({
        x: Math.random() * (canvas.width - 2*size) + size,
        y: -size, // يبدأ من فوق الشاشة
        radius: size,
        speed: 2 + Math.random() * 3 // سرعة سقوط عشوائية
    });
}

// دالة تحديث العوائق
function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.y += obs.speed;

        // إزالة العوائق التي خرجت من الشاشة (أسفل)
        if (obs.y - obs.radius > canvas.height) {
            obstacles.splice(i, 1);
            continue;
        }

        // التحقق من التصادم مع الطائرة
        const dx = obs.x - player.x;
        const dy = obs.y - player.y;
        const distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < obs.radius + player.getRadius()) {
            gameRunning = false;
            break; // توقف اللعبة عند التصادم
        }

        // زيادة النقاط إذا مر العائق بسلام (اختياري: نحتاج لآلية عدم تكرار النقاط)
        // نضيف نقطة عند أول مرة يمر فيها أسفل الشاشة؟ لكن سنبسطها: كل إطار يمر دون تصادم نزيد النقاط؟ هذا سيرفع النقاط بسرعة.
        // الأفضل: نزيد النقاط عند تجاوز العائق لمستوى معين.
        // سنفعل: إذا أصبح العائق أسفل الطائرة ولم نصطدم به، نزيد النقاط مرة واحدة فقط.
        // لهذا نستخدم علامة.
        if (!obs.scored && obs.y > player.y + 30) {
            obs.scored = true;
            score++;
            scoreSpan.textContent = score;
        }
    }
}

// دالة رسم العوائق
function drawObstacles() {
    ctx.fillStyle = '#8B0000'; // أحمر داكن
    obstacles.forEach(obs => {
        ctx.beginPath();
        ctx.arc(obs.x, obs.y, obs.radius, 0, Math.PI*2);
        ctx.fill();
        // إضافة تأثير عيون (تجسيد "جوستك" كوحوش؟)
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(obs.x - 5, obs.y - 5, 4, 0, Math.PI*2);
        ctx.arc(obs.x + 5, obs.y - 5, 4, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(obs.x - 5, obs.y - 5, 2, 0, Math.PI*2);
        ctx.arc(obs.x + 5, obs.y - 5, 2, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = '#8B0000'; // إعادة اللون
    });
}

// حلقة اللعبة الرئيسية
function gameLoop() {
    // رسم العناصر
    sky.draw();       // السماء أولاً
    ground.draw();    // الأرض فوق السماء

    if (gameRunning) {
        // توليد العوائق
        frameCount++;
        if (frameCount % obstacleSpawnRate === 0) {
            spawnObstacle();
        }

        updateObstacles();
    }

    drawObstacles();
    player.draw();    // الطائرة فوق كل شيء

    // إذا انتهت اللعبة، نعرض رسالة
    if (!gameRunning) {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('انتهت اللعبة', canvas.width/2, canvas.height/2);
        ctx.font = '20px Arial';
        ctx.fillText('اضغط إعادة', canvas.width/2, canvas.height/2 + 50);
    }

    requestAnimationFrame(gameLoop);
}

// بدء اللعبة
resetGame();
gameLoop();

// منع القائمة اليمنى على الكانفاس
canvas.addEventListener('contextmenu', (e) => e.preventDefault());

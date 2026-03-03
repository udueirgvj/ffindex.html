let joystick = {
    dx: 0,
    dy: 0
};

const joy = document.getElementById("joystick");
const stick = document.getElementById("stick");

joy.addEventListener("touchmove", e=>{
    const rect = joy.getBoundingClientRect();
    const touch = e.touches[0];
    let x = touch.clientX - rect.left - 60;
    let y = touch.clientY - rect.top - 60;

    let dist = Math.sqrt(x*x + y*y);
    let max = 40;

    if(dist > max){
        x = x / dist * max;
        y = y / dist * max;
    }

    stick.style.left = (x + 60 - 30) + "px";
    stick.style.top = (y + 60 - 30) + "px";

    joystick.dx = x / max;
    joystick.dy = y / max;
});

joy.addEventListener("touchend", ()=>{
    stick.style.left = "30px";
    stick.style.top = "30px";
    joystick.dx = 0;
    joystick.dy = 0;
});

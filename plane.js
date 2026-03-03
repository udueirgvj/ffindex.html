let plane = {
    x: window.innerWidth/2,
    y: window.innerHeight/2,
    size: 20
};

function updatePlane(canvas){
    plane.x += joystick.dx * 5;
    plane.y += joystick.dy * 5;

    if(plane.x < 0) plane.x = 0;
    if(plane.x > canvas.width) plane.x = canvas.width;
    if(plane.y < 0) plane.y = 0;
    if(plane.y > canvas.height) plane.y = canvas.height;
}

function drawPlane(ctx){
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(plane.x, plane.y - plane.size);
    ctx.lineTo(plane.x - plane.size, plane.y + plane.size);
    ctx.lineTo(plane.x + plane.size, plane.y + plane.size);
    ctx.closePath();
    ctx.fill();
}

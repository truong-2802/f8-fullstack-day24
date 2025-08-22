let isDragging = false;     
let current = null;                        
let currentX = 0;          
let currentY = 0;

const coord = {
  x : 0 ,
  y : 0
}

const tinders = document.querySelectorAll(".tinder-s");

function handleMouseDown(e) {
    e.preventDefault();          
    isDragging = true;           
    current = e.currentTarget; 
    
    coord.x = e.clientX;          
    coord.y = e.clientY;          
    
    current.style.transition = "none"; 
}

tinders.forEach(tinder => {
    tinder.addEventListener("mousedown", handleMouseDown);
});




function handleMouseUp() {
    if (!isDragging || !current) return; 
    
    isDragging = false;
    
    const finalX = currentX;     
    const finalY = currentY;
    const rotation = finalX / 10; 
    
    
    if (Math.abs(finalX) > 150) {
        current.style.transition = "transform 0.3s ease-out, opacity 0.3s ease-out";
        current.style.transform = `translateX(${finalX > 0 ? '100%' : '-100%'}) translateY(${finalY}px) rotate(${rotation}deg)`;
        current.style.opacity = "0";
        
        setTimeout(() => {
            if (current && current.parentNode) {
                current.parentNode.removeChild(current);
            }
        }, 300);
    } else {
        
        current.style.transition = "transform 0.3s ease-out";
        current.style.transform = "translateX(0) translateY(0) rotate(0deg)";
    }
    
    
    current = null;
    currentX = 0;
    currentY = 0;
}


document.addEventListener("mouseup", handleMouseUp);



function handleMouseMove(e) {
  if (!isDragging || !current) return;

  e.preventDefault();

  currentX = e.clientX - coord.x;
  currentY = e.clientY - coord.y;

  const rotation = currentX / 10;

  const distance = Math.sqrt(currentX * currentX + currentY * currentY);
  const scale = Math.max(0.95, 1 - distance / 1000);

  current.style.transform = `translateX(${currentX}px) translateY(${currentY}px) rotate(${rotation}deg) scale(${scale})`;

  const opacity = 1 - Math.abs(currentX) / 300;
  current.style.opacity = Math.max(0.5, opacity);


  current.classList.remove("like", "nope");
  document.querySelectorAll(".bor-icon").forEach(i => {
    i.classList.remove("active-like", "active-nope");
  });

  if (currentX > 50) {
    current.classList.add("like");
    document.querySelector(".bor-icon:last-child").classList.add("active-like");
  }

  if (currentX < -50) {
    current.classList.add("nope");
    document.querySelector(".bor-icon:first-child").classList.add("active-nope");
  }
}

document.addEventListener("mousemove", handleMouseMove);



function handleTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    e.currentTarget.dispatchEvent(mouseEvent);
}

tinders.forEach(tinder => {
    tinder.addEventListener("touchstart", handleTouchStart, { passive: false });
});

function handleTouchEnd(e) {
    const mouseEvent = new MouseEvent("mouseup", {});
    document.dispatchEvent(mouseEvent);
}

document.addEventListener("touchend", handleTouchEnd);

function handleTouchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    document.dispatchEvent(mouseEvent);
}

document.addEventListener("touchmove", handleTouchMove, { passive: false });
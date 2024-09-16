function headerfixed(){
  const header = document.querySelector('header') // colocar em cache
    window.addEventListener('scroll', function () {
        if (window.scrollY > 0) header.classList.add('headerfixed'); // > 0 ou outro valor desejado
        else header.classList.remove('headerfixed')
        console.log(window.scrollY)
  })
}

function sidebarbar (){
  const buttonNavBar = document.querySelector(".hamburger-menu")
  const sidebar = document.getElementById("sidebar")
  
  sidebar.classList.toggle("active")
  buttonNavBar.classList.toggle("active")
}

function scrollSmooth(){
  const a = document.querySelectorAll(".nav-header a[href^='#']")
  
  function smoothScrollTo(endX, endY, duration) {
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();
  
    duration = typeof duration !== "undefined" ? duration : 400;
  
    const easeInOutQuart = (time, from, distance, duration) => {
      if ((time /= duration / 2) < 1)
        return (distance / 2) * time * time * time * time + from;
      return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
    };
  
    const timer = setInterval(() => {
      const time = new Date().getTime() - startTime;
      const newX = easeInOutQuart(time, startX, distanceX, duration);
      const newY = easeInOutQuart(time, startY, distanceY, duration);
      if (time >= duration) {
        clearInterval(timer);
      }
      window.scroll(newX, newY);
    }, 1000 / 60);
  }

  a.forEach((link)=>{
    link.addEventListener("click",(ev)=>{
      ev.preventDefault()
      let element = ev.target
      let ID = element.getAttribute("href")
      const topscrool = document.querySelector(ID).offsetTop
      const distanceFromTheTop = topscrool - 70

      smoothScrollTo(0,distanceFromTheTop)

      console.log(distanceFromTheTop)
    })
  })
}

headerfixed()
scrollSmooth()




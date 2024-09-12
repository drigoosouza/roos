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


headerfixed()



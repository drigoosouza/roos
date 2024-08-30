
let buttonIndex = 0
let qt_image = document.querySelectorAll(".img-portifolio")
const image = document.querySelector(".container-carroussel")
console.log(image)
console.log(qt_image.length)

function buttonStatus () {
  const prev = document.querySelector(".arrow-left")
  const prevOn = document.querySelector(".slide-on-left")
  console.log(prev)
  const prevInfo = buttonIndex == 0
  prev.disabled = prevInfo
  prevOn.disabled = prevInfo

  const next = document.querySelector(".arrow-right")
  const nextOn = document.querySelector(".slide-on-right")
  console.log(next)
  const nextInfo = buttonIndex==qt_image.length-1
  next.disabled=nextInfo
  nextOn.disabled=nextInfo
}

function scrolly (button){ 
  buttonIndex += button
  image.style.transform=`translate(${-800*buttonIndex}px)`

  buttonStatus()
  console.log(buttonIndex)
} 




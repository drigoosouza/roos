const form = document.getElementById('contactForm')
form.addEventListener('submit', async function sendemail(e) {
  e.preventDefault()

  const name = this.name.value
  const lastname = this.lastname.value
  const email = this.email.value
  const content = this.content.value
  const message = this.message.value
  const popup = document.getElementById("popup")
  const button = this.querySelector("button")

  button.innerText = "Enviando..."
  button.disabled = true
  button.style.cursor ="wait"
  button.style.opacity = "0.7"
  
  try {
      const send = await fetch("https://roos-main-n1pjoqncj-drigoosouzas-projects.vercel.app", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, lastname, email, content, message })
      }).then((value)=>console.log({value}))

      console.log(send)



    this.name.value = ""
    this.lastname.value = ""
    this.email.value = ""
    this.content.value = ""
    this.message.value = ""
  

    const result = await send.json()
    popup.innerText = result.message
    popup.style.color = "#0ebd0e"
    popup.style.border="3px solid #0ebd0e"
    popup.style.right = "50px"

  }catch(error){
    popup.innerText = "Erro ao enviar o E-mail!"
    popup.style.color="#d80c0cff"
    popup.style.border = "3px solid #d80c0cff"
    popup.style.right = "50px"

  }finally{

    button.innerHTML="Enviar"
    button.disabled = false
    button.style.cursor = "pointer"
    button.style.opacity = "1"

    setTimeout(() => {
      popup.style.right = "-550px"
    },10000);
  }
})


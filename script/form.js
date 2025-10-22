const script_google = "https://script.google.com/macros/s/AKfycbxVV7uPMJgZKKl5F17YWVzniB5dAKQj-dIrch1Jt2cww4IRLeuhXjslvZ6c1A8Mj7_aeA/exec"
const date_form = document.forms[form_contact]

date_form.addEventListener('submit',function (e){
    e.preventDefault()
    fetch(script_google, {method: 'POST', body: new FormData(date_form)})
    .then(Response=>{
        alert('dados enviados com sucesso!!', Response)
        date_form.reset()
    }).catch(error=>alert('erro no envio dos dados', error));
})
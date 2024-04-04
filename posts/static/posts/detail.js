console.log("hello world")

const backBtn = document.getElementById('back-btn')


backBtn.addEventListener('click', ()=>{
    history.back()
})
console.log("hello world")

const postBox = document.getElementById('post-box')
const authorBox = document.getElementById('author-box')
const alertBox = document.getElementById('alert-box')
const backBtn = document.getElementById('back-btn')
const updateBtn = document.getElementById('update-btn')
const deleteBtn = document.getElementById('delete-btn')
const url = window.location.href + "data/"
const spinnerBox = document.getElementById('spinner-box')

const titleInput = document.getElementById('id_title')
const bodyInput = document.getElementById('id_body')
const updateUrl = window.location.href + "update/"
const deleteUrl = window.location.href + "delete/"
const profileBox = document.getElementById('profie-box')
const updateForm = document.getElementById('update-form')
const deleteForm = document.getElementById('delete-form')
const csrf = document.getElementsByName('csrfmiddlewaretoken')




//backBtn.addEventListener('click', ()=>{
 //   history.back()
//})

$.ajax({
    type: 'GET',
    url: url,
    success: function(response){
        console.log(response)
        const data = response.data

        if(data.logged_in !== data.author){
            console.log('different')
        }else{
            console.log('the same')
            updateBtn.classList.remove('not-visible')
            deleteBtn.classList.remove('not-visible')
        }
        
        const titleEl = document.createElement('h3')
        titleEl.setAttribute('class', 'mt-3')
        titleEl.setAttribute('id', 'title')

        const bodyEl = document.createElement('p')
        bodyEl.setAttribute('class', 'mt-1')
        bodyEl.setAttribute('id', 'body')
        
        const userImgEl = document.createElement('img')
        userImgEl.setAttribute('class', 'rounded-circle ')
        userImgEl.setAttribute('src', data.avatar)
        userImgEl.setAttribute('alt', 'profileImage')
      
        const userNameEl = document.createElement('p')
        userNameEl.setAttribute('class', 'mt-1')
        userNameEl.setAttribute('id', 'user')
        userNameEl.setAttribute('id', 'profile')

        titleEl.textContent = data.title
        bodyEl.textContent = data.body
   
        titleInput.value = data.title
        bodyInput.value = data.body
        userNameEl.textContent = data.author

        postBox.appendChild(titleEl)
        postBox.appendChild(bodyEl)

        profileBox.appendChild(userImgEl)
        authorBox.appendChild(userNameEl)

        spinnerBox.classList.add('not-visible')
    },
    error: function(error){
        console.log(error)
    }

})


updateForm.addEventListener('submit', e=>{
    e.preventDefault()

    const title = document.getElementById('title')
    const body = document.getElementById('body')

    $.ajax({
        type: 'POST',
        url: updateUrl,
        data: {
            'csrfmiddlewaretoken': csrf[0].value,
            'title': titleInput.value,
            'body': bodyInput.value,
        },
        success: function(response){
            console.log(response)
            title.textContent = response.title
            body.textContent = response.body
            handleAlerts('success', 'post has been updated')
        }, 
        error: function(error){
            console.log(error)
        }
    })

})

deleteForm.addEventListener('submit', e=>{
    e.preventDefault()

    $.ajax({
        tpye: 'POST',
        url: deleteUrl,
        data: {'csrfmiddlewaretoken': csrf[0].value,},
        success: function(response){
            window.location.href = window.location.origin
            localStorage.setItem('title', titleInput.value)
        },
        error: function(error){
            console.log(error)
        }
        
    })
})
const spinnerBox = document.getElementById('spinner-box')
const loadBtn = document.getElementById('load-btn')
const postsBox = document.getElementById('posts-box')
const endBox = document.getElementById('end-box')

const getCookie =(name) =>{
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

const likeUnlikePosts = ()=> {
    const likeUnlikeForms = [...document.getElementsByClassName('like-unlike-forms')]
    likeUnlikeForms.forEach(form=> form.addEventListener('submit', e=>{
        e.preventDefault()
        const clickedId = e.target.getAttribute('data-form-id')
        const clickedBtn = document.getElementById(`like-unlike-${clickedId}`)

        $.ajax({
            type: 'POST',
            url: "/like-unlike/",
            data: {
                'csrfmiddlewaretoken': csrftoken,
                'pk': clickedId,

            },
            success: function(response){
                console.log(response)
                clickedBtn.textContent = response.liked ? `Unlike (${response.count})` : `Like (${response.count})`
            },
            error: function(error){
                console.log(error)
            }
        })

    }))
}
let visible = 3
const getData = () => {
    $.ajax({
        type: "GET",
        url: `/data/${visible}/`, // when you press on button click, this visible grow, 3 to 6, to 9
        success: function(response){
            console.log(response)
            const data = response.data
            
            setTimeout(()=>{
                spinnerBox.classList.add('not-visible')
                data.forEach(element => {
                    postsBox.innerHTML += `
                    <div class="card mb-2">
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text">${element.body}</p>
                        </div>
                        <div class="card-footer">
                            <div class="row">
                                <div class="col-2">
                                    <a href="#" class="btn btn-primary">Details</a>
                                </div>
                                <div class="col-2">
                                    <form class="like-unlike-forms" data-form-id="${element.id}">
                                        
                                        <button type="submit" class="btn btn-primary" id="like-unlike-${element.id}">
                                            ${element.liked ? `Unlike (${element.count})`: `Like (${element.count})`}
                                        </button>
                                    </form>
                                </div>
                            </div>                    
                        </div>
                    </div>

                    `
                    
                });
                likeUnlikePosts()
            }, 100)
            console.log(response.size)
            if(response.size === 0){
                endBox.textContent = 'No Posts Added Yet...'
            }
            else if(response.size <= visible){
                loadBtn.classList.add('not-visible')
                endBox.textContent = 'No more posts to load..'
            }
        },
        error: function(error){
            console.log(error)
        },

    })
}

loadBtn.addEventListener('click', ()=>{
    spinnerBox.classList.remove('not-visible')
    visible += 3
    getData()
})



getData()
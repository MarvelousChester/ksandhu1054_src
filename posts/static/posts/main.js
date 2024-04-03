const spinnerBox = document.getElementById('spinner-box')
const loadBtn = document.getElementById('load-btn')
const postsBox = document.getElementById('posts-box')
const endBox = document.getElementById('end-box')

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
                                <div class="col-1">
                                    <a href="#" class="btn btn-primary">Details</a>
                                </div>
                                <div class="col-1">
                                    <a href="#" class="btn btn-primary">Like</a>
                                </div>
                            </div>                    
                        </div>
                    </div>

                    `
                });
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
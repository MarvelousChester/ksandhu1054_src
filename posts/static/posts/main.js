console.log("Hello world");

const helloWorldBox = document.getElementById('hello-world')
const postsBox = document.getElementById('posts-box')

//helloWorldBox.innerHTML= 'Hello <b>World</b>'


$.ajax({
    type: 'GET',
    url: '/hello-world/',
    success:function(response){
        console.log('success', response.text)
        helloWorldBox.textContent = response.text
    }, 
    error: function(error){
        console.log(error)
    }
})

$.ajax({
    type: "GET",
    url: '/data/',
    success: function(response){
        console.log(response)
        const data = response.data
        console.log(data)
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
        }, 100);
    },
    error: function(error){
        console.log(error)
    },

})
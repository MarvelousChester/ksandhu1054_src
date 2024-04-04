from django.shortcuts import render
from .models import Post
from django.http import JsonResponse
from .forms import PostForm
from profiles.models import Profile
# Create your views here.


def post_list_and_create(request):
    form = PostForm(request.POST or None)
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        
        if form.is_valid():
            author = Profile.objects.get(user=request.user)
            print(author)
            instance = form.save(commit=False)
            instance.author = author
            instance.save()
            return JsonResponse({
                'title': instance.title,
                'body': instance.body,
                'author': instance.author.user.username,
                'id': instance.id,
            })
    context = {
        'form': form,
    }
   
    return render(request, 'posts/main.html', context) # Will be using the key in the template

# initialy display 3 posts and then increase them, get lower and upper and then add thme
def load_post_data_view(request, num_posts):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        visible = 3
        upper = num_posts # 9 
        lower = upper - visible # 6 
        size = Post.objects.all().count()
        qs = Post.objects.all()
        data = []
        for obj in qs: 
            item = {
                'id': obj.id,
                'title': obj.title,
                'body': obj.body,
                'liked': True if request.user in obj.liked.all() else False,
                'count': obj.like_count,
                'author': obj.author.user.username
            }
            data.append(item)
        return JsonResponse({'data':data[lower:upper], 'size': size})

def like_unlike_post(request):
     if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        pk = request.POST.get('pk')
        obj = Post.objects.get(pk=pk)
        if request.user in obj.liked.all():
            # Remove
            liked = False
            obj.liked.remove(request.user)
        else:
            # NOt in list so we must like and add to the liked list of post
            liked = True
            obj.liked.add(request.user)
        return JsonResponse({'liked': liked, 'count': obj.like_count})


def hello_world_view(request):
    return JsonResponse({'text': 'Hello World'})


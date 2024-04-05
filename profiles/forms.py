from django import forms
from .models import Profile

class ProileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ('bio', 'avatar',)

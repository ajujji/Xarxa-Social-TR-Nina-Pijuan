from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import datetime
from django.utils import timezone
from transformers import pipeline

class User(AbstractUser):
    score = models.IntegerField(default=0)

    def update_score(self):
        self.score = Post.objects.filter(user=self).aggregate(total_score=models.Sum('sentiment_score'))['total_score'] or 0
        self.save()
    
    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "score": self.score,
        }


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=512)
    timestamp = models.DateTimeField(default=timezone.now, editable=False)
    sentiment_score = models.IntegerField(null=True, blank=True)
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.user.update_score()

    def delete(self, *args, **kwargs):
        super().delete(*args, **kwargs)
        self.user.update_score()

    def serialize(self):
        return {
            "id": self.id,
            "user": self.user.username,
            "timestamp": self.timestamp.strftime("%d %b %Y, %I:%M %p"),
            "text": self.text,
            "sentiment_score": self.sentiment_score,
        }
    def __str__(self):
        return f"{self.id}. {self.user.username} posted '{self.text}' on {self.timestamp.strftime('%d %b %Y, %I:%M %p')}"
    

class Follower(models.Model):
    follower = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "followers")
    following = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "followings")
    timestamp = models.DateTimeField(default = datetime.now, editable = False)

    def serialize(self):
        return {
            "id": self.id,
            "follower": self.follower.username,
            "following": self.following.username,
            "timestamp": self.timestamp.strftime("%d %b %Y, %I:%M %p"),
        }
    
    def __str__(self):
        return f"{self.follower.username} follows {self.following.username} since {self.timestamp.strftime('%d %b %Y, %I:%M %p')}"
    

class Like(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "users_liked")
    post = models.ForeignKey(Post, on_delete = models.CASCADE, related_name = "liked_posts")
    timestamp = models.DateTimeField(default = datetime.now, editable = False)

    def serialize(self):
        return {
            "id": self.id,
            "user": self.user,
            "post": self.post,
            "timestamp": self.timestamp.strftime("%d %b %Y, %I:%M %p"),
        }
    
    def __str__(self):
        return f"{self.user.username} liked {self.post} on {self.timestamp.strftime('%d %b %Y, %I:%M %p')}"
    
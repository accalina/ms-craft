
from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

# Create your models here.
class Player(models.Model):
    user        = models.ForeignKey(User, on_delete=models.CASCADE)
    cash        = models.IntegerField(null=False, default=300)
    joindate    = models.DateTimeField(default=now)

    def __str__(self):
        return f"{self.user.username}"

class Market(models.Model):
    name    = models.CharField(max_length=30, null=False)
    desc    = models.TextField(blank=True)
    health  = models.IntegerField(null=False, default=0)
    atkmin  = models.IntegerField(null=False, default=0)
    atkmax  = models.IntegerField(null=False, default=0)
    price   = models.IntegerField(null=False, default=0)
    sprite  = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name}"

class Equipment(models.Model):
    name    = models.CharField(max_length=30, null=False)
    desc    = models.TextField(blank=True)
    attack  = models.IntegerField(null=False, default=0)
    price   = models.IntegerField(null=False, default=0)
    sprite  = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name}"

class Member(models.Model):
    player  = models.ForeignKey(Player, on_delete=models.CASCADE) 
    name    = models.CharField(max_length=30, null=False)
    unit    = models.ForeignKey(Market, on_delete=models.CASCADE)
    equip   = models.ForeignKey(Equipment, on_delete=models.CASCADE)
    active  = models.BooleanField(null=False, default=True)

    def __str__(self):
        return f"{self.name}"

class Enemy(models.Model):
    name    = models.CharField(max_length=30, null=False)
    desc    = models.TextField(blank=True)
    health  = models.IntegerField(null=False, default=0)
    atkmin  = models.IntegerField(null=False, default=0)
    atkmax  = models.IntegerField(null=False, default=0)
    price   = models.IntegerField(null=False, default=0)
    sprite  = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name}"
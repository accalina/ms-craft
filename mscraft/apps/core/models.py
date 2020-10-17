from django.db import models

# Create your models here.
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
    name    = models.CharField(max_length=30, null=False)
    unit    = models.OneToOneField(Market, on_delete=models.CASCADE)
    equip   = models.OneToOneField(Equipment, on_delete=models.CASCADE)
    active  = models.BooleanField(null=False, default=True)

    def __str__(self):
        return f"{self.name}"

class Enemy(models.Model):
    name    = models.CharField(max_length=30, null=False)
    desc    = models.TextField(blank=True)
    health  = models.IntegerField(null=False, default=0)
    atkmin  = models.IntegerField(null=False, default=0)
    atkmax  = models.IntegerField(null=False, default=0)
    sprite  = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name}"
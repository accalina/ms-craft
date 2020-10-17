from django.contrib import admin

from .models import (
    Market,
    Equipment,
    Member,
    Enemy
)

# Register your models here.
admin.site.register(Market)
admin.site.register(Equipment)
admin.site.register(Member)
admin.site.register(Enemy)
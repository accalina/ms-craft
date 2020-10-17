
from rest_framework import serializers

from .models import (
    Market,
    Equipment,
    Member,
    Enemy
)

class MarketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Market
        fields = [
            'id',
            'name',
            'desc',
            'health',
            'atkmin',
            'atkmax',
            'price',
            'sprite'
        ]

class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = [
            'id',
            'name',
            'desc',
            'attack',
            'price',
            'sprite'
        ]

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = [
            'id',
            'name',
            'unit',
            'equip',
            'active'
        ]

class EnemySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enemy
        fields = [
            'id',
            'name',
            'desc',
            'health',
            'atkmin',
            'atkmax',
            'sprite',
        ]
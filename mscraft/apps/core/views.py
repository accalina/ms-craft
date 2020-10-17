# from django.shortcuts import render

from rest_framework import filters
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from .models import (
    Market,
    Equipment,
    Member,
    Enemy
)

from .serializers import (
    MarketSerializer,
    EquipmentSerializer,
    MemberSerializer,
    EnemySerializer
)


# Create your views here.
class MarketAPIView(ModelViewSet):
    queryset = Market.objects.all()
    serializer_class = MarketSerializer
    search_fields = ['name']
    filter_backends = [filters.SearchFilter]

class EquipmentAPIView(ModelViewSet):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    search_fields = ['name']
    filter_backends = [filters.SearchFilter]

class MemberAPIView(ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    search_fields = ['name']
    filter_backends = [filters.SearchFilter]

class EnemyAPIView(ModelViewSet):
    queryset = Enemy.objects.all()
    serializer_class = EnemySerializer
    search_fields = ['name']
    filter_backends = [filters.SearchFilter]


class Test(APIView):
    def get(self, request, name=None):
        personel_list = [personel.name for personel in Market.objects.all()]
        return Response({'personel':personel_list, 'name': name})

    def post(self, request, name=None):
        """
        Todo: still not found how to inject parameter
        """
        return Response({"data": self.request.data})
        # personel = Member.objects.filter(id=personel_id)
        # enemy_data = Enemy.objects.filter(id=enemy_id)
        # return Response({"member": personel_data.name, "enemy": enemy_data.name})
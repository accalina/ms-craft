
from django.urls import path, include
from rest_framework import permissions
from rest_framework.routers import DefaultRouter
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

from apps.core.views import (
    MarketAPIView,
    EquipmentAPIView,
    MemberAPIView,
    EnemyAPIView,
    PlayerAPIView,
    ProfileAPIView,
    GenerateBattle,
    BuyMember,
    SellMember,
    FallenHero,
)

schema_view = get_schema_view(
    openapi.Info(
        title="MSCraft API Service",
        default_version='v2',
        description="This is MSCraft API service for those who need app integration and automation",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="admin@cloudwolf.net"), 
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

router = DefaultRouter()
router.register('market', MarketAPIView,        basename="market")
router.register('equipment', EquipmentAPIView,  basename="equipment")
router.register('member', MemberAPIView,        basename="member")
router.register('enemy', EnemyAPIView,          basename="enemy")
router.register('player', PlayerAPIView,        basename="player")
router.register('profile', ProfileAPIView,      basename="profile")

urlpatterns = [
    path('v1/token',            TokenObtainPairView.as_view(),  name="token_obtain"),
    path('v1/token/refresh',    TokenRefreshView.as_view(),     name="token_refresh"),
    path('v1/generateBattle',   GenerateBattle.as_view()),
    path('v1/buymember',        BuyMember.as_view()),
    path('v1/sellmember',       SellMember.as_view()),
    path('v1/heroes/<playerid>',FallenHero.as_view()),
    path('v1/',                 include(router.urls)),
    path('v2/',                 schema_view.with_ui('swagger', cache_timeout=0)),
    path('redoc/',              schema_view.with_ui('redoc', cache_timeout=0)),
]
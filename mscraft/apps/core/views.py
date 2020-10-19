
import random
from rest_framework import filters
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from .models import (
    Market,
    Equipment,
    Member,
    Enemy,
    Player
)

from .serializers import (
    MarketSerializer,
    EquipmentSerializer,
    MemberSerializer,
    EnemySerializer,
<<<<<<< HEAD
    PlayerSerializer,
    ProfileSerializer
=======
    PlayerSerializer
>>>>>>> 9474c1aa221ff7d2c6e29be11679a9c25ce0f0ca
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
    queryset = Member.objects.filter(active=True)
    serializer_class = MemberSerializer
    search_fields = ['player__id']
    filter_backends = [filters.SearchFilter]

class EnemyAPIView(ModelViewSet):
    queryset = Enemy.objects.all()
    serializer_class = EnemySerializer
    search_fields = ['name']
    filter_backends = [filters.SearchFilter]

class PlayerAPIView(ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    search_fields = ['id']
    filter_backends = [filters.SearchFilter]

<<<<<<< HEAD
class ProfileAPIView(ModelViewSet):
    http_method_names = ['get']
    def get_queryset(self):
        return Player.objects.filter(user=self.request.user)
    serializer_class = ProfileSerializer

class GenerateBattle(APIView):
    """
        This endpoint is used for generating RnG Battle log
        Use the POST request to generate the battlelog.

        Parameters:
            playerid    : <int>,
            memberid    : <int>,
            enemyid     : <int>
    """
    def get(self, request): 
        return Response({"msg": "This endpoint is used for generating RnG Battle log"})

=======
class GenerateBattle(APIView):
    """
        This endpoint is used for generating RnG Battle log
        Use the POST request to generate the battlelog.

        Parameters:
            playerid    : <int>,
            memberid    : <int>,
            enemyid     : <int>
    """
    def get(self, request): 
        return Response({"msg": "This endpoint is used for generating RnG Battle log"})

>>>>>>> 9474c1aa221ff7d2c6e29be11679a9c25ce0f0ca
    def post(self, request):
        """
            Parameters:
                playerid    : <int>,
                memberid    : <int>,
                enemyid     : <int>
            Return:
                --
        """
        report = []
        winner = ""
        battle = True
        data = self.request.data
        p = Player.objects.get(id=data.get('playerid'))
        m = Member.objects.get(id=data.get('memberid'))
        e = Enemy.objects.get(id=data.get('enemyid'))

        while battle:
            # Member turn to attack
            m_atk       = random.randint(m.unit.atkmin, m.unit.atkmax)
            e.health    = e.health - m_atk
            report.append(f"{m.name} Attack inflict {m_atk} damage, {e.name} have {e.health} HP left")
            if e.health <= 0:
                battle = False
                report.append("Battle is over")
                winner = f"Member {m.name}"
                wincash = e.price + p.cash
                p.cash = wincash
                p.save()
                break
            # Enemy turn to attack
            e_atk           = random.randint(e.atkmin, e.atkmax)
            m.unit.health   = m.unit.health - e_atk
            report.append(f"{e.name} Attack inflict {e_atk} damage, {m.name} have {e.health} HP left")
            if m.unit.health <= 0:
                battle = False
                report.append("Battle is over")
                winner = f"Enemy {h.name}"
                # m.status = False
                # m.save()
                break
        return Response({"report": report, "winner": winner, 'memberSprinte': m.unit.sprite, 'enemySprite': e.sprite})

class BuyMember(APIView):
    """
        This endpoint is used for Buy new member from market
        Parameters:
            unitname    : <str>,
            playerid    : <int>,
            marketid    : <int>,
    """
    def get(self, request): 
        return Response({"msg": "This endpoint is used for Buy new member from market"})

    def post(self, request):
        data = self.request.data
        ply = Player.objects.get(id=data.get('playerid'))
        mar = Market.objects.get(id=data.get('marketid'))
        equ = Equipment.objects.get(id=1)
        unitname = data.get('unitname')

        if ply.cash >= mar.price:
            # Player has sufficient cash
            ply.cash = ply.cash - mar.price
            Member.objects.create(
                name=unitname,
                player=ply,
                unit=mar,
                equip=equ,
                active=True
            )
            ply.save()
            return Response({"msg": f"New member {unitname} has join", "success": True})
        return Response({"msg": "insufficient funds", "success": False})

class SellMember(APIView):
    """
        This endpoint is used for Sell old member to the market
        Parameters:
            playerid    : <int>,
            memberid    : <int>,
    """
    def get(self, request): 
        return Response({"msg": "This endpoint is used for Sell old member to the market"})

    def post(self, request):
        try:
            data = self.request.data
            ply = Player.objects.get(id=data.get('playerid'))
            m_data = Member.objects.get(id=data.get('memberid'))
            ply.cash = ply.cash + m_data.unit.price
            ply.save()
            m_data.delete()
            return Response({"msg": f"Member sold back to the market", "success": True})
<<<<<<< HEAD
        except:
=======
        except apps.core.models.Member.DoesNotExist:
>>>>>>> 9474c1aa221ff7d2c6e29be11679a9c25ce0f0ca
            return Response({"msg": f"No Member with that ID", "success": False})

class FallenHero(APIView):
    """
        This endpoint is used for display deactivated member
        Parameters:
            playerid    : <int>,
    """
    def get(self, request, playerid):
        fallenList = [m.name for m in Member.objects.filter(player=playerid, active=False)]
        return Response({"Heroes": fallenList})
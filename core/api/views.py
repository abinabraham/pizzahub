
from rest_framework import viewsets
from rest_framework.response import Response

from . serializers import ItemSerializer
from core.models import Item as Items
from rest_framework import generics

class ItemViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing instances.
    """
    serializer_class = ItemSerializer
    queryset = Items.objects.all()
    filter_fields = ('category', ) 

class ItemListView(generics.ListAPIView):
    serializer_class = ItemSerializer

    def get_queryset(self):
        """
        This view should return a list of category pizza
        for the currently authenticated user.
        """
        category = self.kwargs['category']
        return Items.objects.filter(category=category)
    


from . views import ItemViewSet, ItemListView
from rest_framework.routers import DefaultRouter
from django.urls import path

router = DefaultRouter()
router.register('items', ItemViewSet, basename='item')
urlpatterns = router.urls


urlpatterns += [
    path('pizza/<category>', ItemListView.as_view()),
]
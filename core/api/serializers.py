from rest_framework import serializers
from core.models import ( Item
)


class ItemSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = (
            'id',
            'title',
            'category',
            'slug',
            'description',
            'image',
            'price',
            'discount_price'
        )

    def get_category(self, obj):
        return obj.get_category_display()

"""
author@abin 2020
Models for Products and its variants
"""
from django.db import models

MENU_CHOICES = (
    ('V', 'VEG PIZZA'),
    ('NV', 'NON-VEG PIZZA')
)




class Item(models.Model):
    title = models.CharField(max_length=100)    
    category = models.CharField(choices=MENU_CHOICES, max_length=2)
    slug = models.SlugField()
    description = models.TextField()
    price = models.FloatField()
    discount_price = models.FloatField(blank=True, null=True)
    image = models.ImageField(upload_to='items/%y%m%d')

    def __str__(self):
        return self.title

   

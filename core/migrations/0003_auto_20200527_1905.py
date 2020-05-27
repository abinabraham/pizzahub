# Generated by Django 3.0.6 on 2020-05-27 19:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20200526_1754'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='variation',
            unique_together=None,
        ),
        migrations.RemoveField(
            model_name='variation',
            name='item',
        ),
        migrations.AddField(
            model_name='item',
            name='discount_price',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='item',
            name='price',
            field=models.FloatField(default=100),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='ItemVariation',
        ),
        migrations.DeleteModel(
            name='Variation',
        ),
    ]

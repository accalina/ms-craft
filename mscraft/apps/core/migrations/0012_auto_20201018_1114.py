# Generated by Django 3.1 on 2020-10-18 11:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0011_auto_20201018_1054'),
    ]

    operations = [
        migrations.AlterField(
            model_name='member',
            name='equip',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.equipment'),
        ),
    ]

# Generated by Django 3.0.8 on 2020-09-14 20:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dropshop', '0009_auto_20200911_0342'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='confirmationemail',
            name='expires_at',
        ),
    ]
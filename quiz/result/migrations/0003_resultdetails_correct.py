# Generated by Django 4.2.5 on 2023-09-24 16:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('result', '0002_alter_result_score'),
    ]

    operations = [
        migrations.AddField(
            model_name='resultdetails',
            name='correct',
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
    ]
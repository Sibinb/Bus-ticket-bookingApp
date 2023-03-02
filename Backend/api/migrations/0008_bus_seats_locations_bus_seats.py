# Generated by Django 4.1.2 on 2023-02-23 09:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_rename_is_block_customuser_is_access'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=200)),
                ('fare', models.BigIntegerField()),
                ('pics', models.ImageField(upload_to='pics/')),
            ],
        ),
        migrations.CreateModel(
            name='Seats',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(max_length=100)),
                ('seat_no', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Locations',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Role', models.CharField(max_length=100)),
                ('location', models.CharField(max_length=100)),
                ('price', models.BigIntegerField()),
                ('bus_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.bus')),
            ],
        ),
        migrations.AddField(
            model_name='bus',
            name='seats',
            field=models.ManyToManyField(to='api.seats'),
        ),
    ]
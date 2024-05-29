from django.db import models

class Episode(models.Model):
    season = models.PositiveIntegerField()
    episode_number = models.PositiveIntegerField()
    title = models.CharField(max_length=100)
    description = models.TextField()
    air_date = models.DateField()

    def __str__(self):
        return f'Season {self.season} Episode {self.episode_number}: {self.title}'

class Character(models.Model):
    name = models.CharField(max_length=100)
    actor = models.CharField(max_length=100)
    description = models.TextField()
    profile_picture = models.ImageField(upload_to='character_pics/', blank=True)

    def __str__(self):
        return self.name
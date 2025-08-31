# backend/management/commands/check_db.py
from django.core.management.base import BaseCommand
from django.db import connection
from django.db.utils import OperationalError

class Command(BaseCommand):
    help = 'Проверяет подключение к базе данных'

    def handle(self, *args, **options):
        try:
            db_conn = connection.cursor()
            db_conn.execute('SELECT 1')
            self.stdout.write(
                self.style.SUCCESS('Успешное подключение к базе данных!')
            )
        except OperationalError:
            self.stdout.write(
                self.style.ERROR('Ошибка подключения к базе данных!')
            )

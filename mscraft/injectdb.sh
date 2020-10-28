#!/bin/bash
python manage.py dumpdata > dump.json
docker cp dump.json mscraft_backend:/cloudwolf/ms-craft/mscraft
docker exec mscraft_backend sh -c "python manage.py loaddata dump.json"
rm dump.json
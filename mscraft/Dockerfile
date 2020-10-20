# Preparing Stage
FROM python:3.8-alpine as base
LABEL author="Accalina"

# Builder Stage
FROM base as builder
WORKDIR /cloudwolf
ENV PATH=/install/bin:$PATH

RUN mkdir /install
RUN apk update && apk add --update git
RUN git clone --branch feat/backend_core --single-branch https://github.com/accalina/ms-craft.git
RUN cd /cloudwolf/ms-craft/mscraft && pip install --prefix=/install -r requirements.txt

# Runtime Stage
FROM base as runtime
WORKDIR /cloudwolf
ENV PYTHONUNBUFFERED 1

COPY --from=builder /cloudwolf .
COPY --from=builder /install /usr/local

WORKDIR /cloudwolf/ms-craft/mscraft 
RUN python manage.py makemigrations
RUN python manage.py migrate
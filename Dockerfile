FROM ubuntu:latest
LABEL authors="kdren"

ENTRYPOINT ["top", "-b"]
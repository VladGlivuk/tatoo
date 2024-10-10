# init
FROM python:3.10

RUN mkdir /src

COPY . /src/

WORKDIR /src

ADD requirements.txt /src/

RUN pip install -r requirements.txt

ADD . /src

# RUN python3 src/main.py

#CMD ["python3 src/main.py && python3 src/main1.py"]

EXPOSE 8000
EXPOSE 8080

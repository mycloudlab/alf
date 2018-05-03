FROM eclipse-mosquitto:1.4.12
COPY docker-entrypoint.sh /

RUN touch /mosquitto/config/mosquitto_passwd && \ 
    chmod 777 /mosquitto/config/mosquitto.conf && \
    chmod 777 /mosquitto/config/mosquitto_passwd

EXPOSE 1883

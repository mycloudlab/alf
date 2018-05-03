# alf
Alf é uma arquitetura para comunicação de bots por meio de agentes



# openshift

Para executar no openshift utilize o comando:

```bash
# roda o servidor mqtt
oc new-app --name=mqtt-server https://github.com/mycloudlab/alf \
--context-dir=mqtt-server \
--strategy=docker \
-e AUTH="user:passwd"

# roda o analyzer
oc new-app --name=analyzer https://github.com/mycloudlab/alf \
--context-dir=analyzer \
--strategy=docker \
-e MQTT_BROKER=mqtt://mqtt-server:1883 \
-e MQTT_USERNAME user -e MQTT_PASSWORD passwd -e WIT_AI_TOKEN=<your wit.ai server token> 
```
#!/bin/ash

cat <<EOF > /mosquitto/config/mosquitto.conf
allow_anonymous false 
password_file /mosquitto/config/mosquitto_passwd
protocol websockets
EOF

echo $AUTH > /mosquitto/config/mosquitto_passwd
mosquitto_passwd -U /mosquitto/config/mosquitto_passwd


set -e
exec "$@"
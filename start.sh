#!/bin/bash
set -e

if [ -z "${AMQP_URL}" ];
then
URL="127.0.0.1"
else
URL="${AMQP_URL:7}"
fi

until bash -c "cat < /dev/null > /dev/tcp/${URL}/5672"; do
  >&2 echo "Rabbit MQ not up yet on ${URL}"
  sleep 1
done

echo "Rabbit MQ is up on ${URL}"

node .

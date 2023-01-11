export APP_NAME=${1}

if [ -z "${APP_NAME}" ]
then
	echo "enter app name"
	exit 1 
fi

FILE_PATH="run.yaml"

function cleanup {
	docker-compose -f ${FILE_PATH} down
}

trap cleanup EXIT
cleanup

docker-compose -f ${FILE_PATH} build run
docker-compose -f ${FILE_PATH} run \
	--name ${APP_NAME} \
	--service-ports \
	run

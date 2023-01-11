export APP_NAME=${1}
export ARG=${2}

if [ -z "${APP_NAME}" ]
then
	echo "ERROR: enter an application name"
	exit 1
fi
FILE_PATH="${APP_NAME}/test.yaml"

function cleanup {
	docker-compose -f ${FILE_PATH} down
}

trap cleanup EXIT
cleanup

docker-compose -f ${FILE_PATH} build test
docker-compose -f ${FILE_PATH} run \
	--name test-${APP_NAME} \
	test

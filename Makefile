TEST = $(shell echo $$TEST)

NVM_DIR = $(shell echo $$NVM_DIR)

ifeq (${TEST},TRUE)
		SOURCE = .
else
		SOURCE = source
endif

build:
	${SOURCE} ${NVM_DIR}/nvm.sh && nvm use && NODE_ENV=production npm run build

install:
	${SOURCE} ${NVM_DIR}/nvm.sh && nvm install
	${SOURCE} ${NVM_DIR}/nvm.sh && nvm use && npm prune
	${SOURCE} ${NVM_DIR}/nvm.sh && nvm use && npm install --dev
	${SOURCE} ${NVM_DIR}/nvm.sh && nvm use && npm install --production

test:
	${SOURCE} ${NVM_DIR}/nvm.sh && nvm use && npm test

lint:
	${SOURCE} ${NVM_DIR}/nvm.sh && nvm use && ./node_modules/eslint/bin/eslint.js -c linting/dev.yaml src/

clean:
	rm -rf node_modules static

run:
	${SOURCE} ${NVM_DIR}/nvm.sh && nvm use && npm start

# generic
configure:
	npm install

clean:
	rm -rf node_modules static

dev-server:
	./node_modules/.bin/webpack-dev-server --config ./configs/hot/webpack.config.babel.js

# website
test-website:
	./node_modules/.bin/mocha --require mocha --compilers js:babel-core/register --reporter spec "src/**/__tests__/*-test.js"

lint-website:
	./node_modules/eslint/bin/eslint.js -c linting/prod.yaml src/

prod-website:
	NODE_ENV=production BUILD_ENV=build ./node_modules/.bin/webpack --config ./configs/website/webpack.config.babel.js

# button
lint-button:
	./node_modules/eslint/bin/eslint.js -c linting/prod.yaml button/

prod-button:
	NODE_ENV=production BUILD_ENV=build ./node_modules/.bin/webpack --config ./configs/button/webpack.config.babel.js
	cp ./button/index.js ./github.io/libs/console-rest.js

test-button:
	./node_modules/.bin/mocha --require mocha --compilers js:babel-core/register --reporter spec "button/**/__tests__/*-test.js"

# all
lint: lint-website lint-button

test: test-website test-button

prod: prod-website prod-button

.PHONY: all
all: deps install/all shopify/dev

.PHONY: deps
deps:
	npm i -g yarn@latest

.PHONY: install/all
install/all: install web/install

.PHONY: install
install:
	yarn

.PHONY: web/install
web/install:
	$(MAKE) -C web install

.PHONY: shopify/dev 
shopify/dev:
	yarn shopify app dev

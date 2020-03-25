##
# All The Sockets!

.PHONY: common
common:
	cp -fR common/* elixir/priv/static
	cp -fR common/* node/public

.PHONY: node
node: common
	docker-compose build ats-node

.PHONY: elixir
elixir: common
	docker-compose build ats-elixir

.PHONY: all
all: node elixir

.PHONY: run
run:
	docker-compose up --build --force-recreate

# end

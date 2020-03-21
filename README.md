# all-the-sockets!

Start one of the apps:

```
# NodeJS
❯ cd node && npm i && node node/index.js

# Elixir
❯ cd elixir && mix deps.get && iex -S mix
```

Generate some load!

```sh
❯ npm i -g artillery && artillery run munitions.yml
```

## Elixir

### Attach remote shell

```
❯ docker-compose exec ats-elixir all_the_sockets remote
Erlang/OTP 22 [erts-10.7] [source] [64-bit] [smp:10:10] [ds:10:10:10] [async-threads:1]

Interactive Elixir (1.10.2) - press Ctrl+C to exit (type h() ENTER for help)
iex(all_the_sockets@ats-elixir)1> Node.ping :"rabbit@ats-rabbit"
:pong
```

FROM elixir:alpine
LABEL maintainer="Alan Burgoyne <alan@srcur.com>"

EXPOSE 8081
ENV MIX_ENV=prod
ENV PATH="/app/_build/prod/rel/all_the_sockets/bin:$PATH"
WORKDIR /app

ADD . .
RUN mix local.hex --force
RUN mix local.rebar --force
RUN mix deps.get
RUN mix release

CMD ["all_the_sockets", "start"]

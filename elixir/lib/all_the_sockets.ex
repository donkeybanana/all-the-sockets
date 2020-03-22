defmodule AllTheSockets do
  @moduledoc false

  use Application

  def start(_, _) do
    children = [
      Plug.Cowboy.child_spec(
        scheme: :http,
        plug: AllTheSockets.Router,
        options: [
          dispatch: dispatch(),
          port: 8081
        ]
      ),
      Registry.child_spec(
        keys: :duplicate,
        name: Registry.AllTheSockets
      )
    ]

    opts = [strategy: :one_for_one, name: AllTheSockets.Application]

    Supervisor.start_link(children, opts)
  end

  defp dispatch do
    [
      {:_,
       [
         {"/ws", AllTheSockets.SocketHandler, []},
         {:_, Plug.Cowboy.Handler, {AllTheSockets.Router, []}}
       ]}
    ]
  end
end

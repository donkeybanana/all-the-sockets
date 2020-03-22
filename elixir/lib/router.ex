defmodule AllTheSockets.Router do
  use Plug.Router

  plug Plug.Static,
    at: "/",
    from: :all_the_sockets
  plug(:match)
  plug(:dispatch)

  require EEx

  EEx.function_from_file(:defp, :index_template, "lib/index.eex", [])

  post "/" do
    {:ok, message, _} = Plug.Conn.read_body(conn)

    IO.puts "[ats-elixir](web): POST / body=#{message}"

    AllTheSockets.broadcast(message)

    send_resp(conn, 200, Jason.encode!(%{ack: message}))
  end

  match _ do
    send_resp(conn, 200, index_template())
  end
end

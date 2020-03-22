defmodule AllTheSockets.Router do
  use Plug.Router

  plug(:match)
  plug(:dispatch)

  post "/" do
    {:ok, message, _} = Plug.Conn.read_body(conn)

    IO.puts "[ats-elixir](web): POST / body=#{message}"

    Registry.AllTheSockets
    |> Registry.dispatch("all-the-sockets", fn clients ->
      for {pid, _} <- clients do
        Process.send(pid, message, [])
      end
    end)

    send_resp(conn, 200, Jason.encode!(%{ack: message}))
  end

  match _ do
    send_resp(conn, 200, "???")
  end
end

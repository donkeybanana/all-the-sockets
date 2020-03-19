defmodule AllTheSockets.SocketHandler do
  @behaviour :cowboy_websocket

  def init(req, _) do
    {:cowboy_websocket, req, nil}
  end

  def websocket_init(state) do
    {:ok, state}
  end

  def websocket_handle({:text, json}, state) do
    payload = Jason.decode!(json)
    type = payload["type"]

    IO.puts("[receive] #{type}")

    message =
      case type do
        "boleh" ->
          "Websockets boleh!"

        _ ->
          "???"
      end

    {:reply, {:text, message}, state}
  end

  def websocket_info(info, state) do
    {:reply, {:text, info}, state}
  end
end

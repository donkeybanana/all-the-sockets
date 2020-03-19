defmodule AllTheSocketsTest do
  use ExUnit.Case
  doctest AllTheSockets

  test "greets the world" do
    assert AllTheSockets.hello() == :world
  end
end

defmodule AllTheSockets.MixProject do
  use Mix.Project

  def project do
    [
      app: :all_the_sockets,
      version: "0.1.0",
      elixir: "~> 1.10",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      mod: {AllTheSockets, []},
      extra_applications: [:logger]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:cowboy, "~> 2.7"},
      {:plug, "~> 1.8"},
      {:plug_cowboy, "~> 2.1"},
      {:jason, "~> 1.2"},
    ]
  end
end

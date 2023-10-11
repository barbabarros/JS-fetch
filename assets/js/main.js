const url = "https://pokeapi.co/api/v2/pokemon?limit=5&offset=0";
debugger
fetch(url)
  .then((e) => e.json())
  .then((e) => e.results)
  .then((data1) => data1.map((pokemon) => pokemon.url))
  .then((urls) => Promise.all(urls.map((url) => fetch(url))))
  .then((responses) => Promise.all(responses.map((response) => response.json()))
  )

  .then((pokemons) => {
    const novoHtml = document.getElementById("teste");

    pokemons.forEach((pokemons) => {
      const pokemon = new Pokemon();
      pokemon.nome = pokemons.name;
      pokemon.id = pokemons.id;
      pokemon.imagem = pokemons.sprites.other.dream_world.front_default;
      pokemon.tipos = pokemons.types.map((tipos) => tipos.type.name);

      novoHtml.innerHTML += `
                    <h2>${pokemon.id}</h2>
                    <h1>${pokemon.nome}</h1>
                    <img src="${pokemon.imagem}" height=120px></img>
                    <h3>${pokemon.tipos}</h3>
    `;
    });
  });

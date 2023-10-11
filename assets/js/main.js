const url = "https://pokeapi.co/api/v2/pokemon?limit=5&offset=0"

fetch(url)
	.then((resposta) => resposta.json())
	.then((respostaObj) => respostaObj.results)
	.then((arrayPokemons) => arrayPokemons.map((pokemon) => pokemon.url))
	.then((arrayUrl) => Promise.all(arrayUrl.map((url) => fetch(url))))
	.then((responses) =>
		Promise.all(responses.map((responseObj) => responseObj.json()))
	)
	.then((arrayPokemons) => {
		const novoHtml = document.getElementById("teste")

		arrayPokemons.forEach((pokemons) => {
			const pokemon = new Pokemon()
			pokemon.nome = pokemons.name
			pokemon.id = pokemons.id
			pokemon.imagem = pokemons.sprites.other.dream_world.front_default
			pokemon.tipos = pokemons.types.map((tipos) => tipos.type.name)

			novoHtml.innerHTML += `
                    <h2>${pokemon.id}</h2>
                    <h1>${pokemon.nome}</h1>
                    <img src="${pokemon.imagem}" height=120px></img>
                    <h3>${pokemon.tipos}</h3>
    `
		})
	})

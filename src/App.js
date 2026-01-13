// Importamos a biblioteca
import React, { useEffect, useState } from 'react';

// Importaremos o arquivo com o conteúdo do tdmb
import Tmdb from './Tmdb';

import MovieRow from './components/MovieRow';

import './components/MovieRow.css';

// Apresentamos o conteúdo aqui
export default () => {

  // Cria um "estado" chamado movieList e uma função setMovieList para atualizar esse estado depois (ex: quando a API retornar os dados)
  const [movieList, setMovieList] = useState([]);

  // Ao entrar irá carregar o conteúdo
  useEffect(() => {
    const loadAll = async () => {

      // Pegará a lista total( Catalogo inicial) apresentando o conteudo
      let list = await Tmdb.getHomeList();
      setMovieList(list);
    }

    loadAll();
  }, []);

  // Criação das listas que chamarão o conteúdo por categorias
  return (
    <div className="page">

      {/* Esta sessão chamará a lista de filmes, independente da categoria */}
      <section className="lists">

        {/* Mapeamento para pegar o item + código  */}
        {movieList.map((item, key) => (

          // Montagem da estrutura para receber as informações - Chave + titulo + descrição
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

    </div>
  )
}
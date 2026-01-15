// Importamos a biblioteca
import { useEffect, useState } from 'react';

// Importaremos o arquivo com o conteúdo do tdmb
import Tmdb from './Tmdb';

// Importaremos o css do app.css
import './App.css';

// Importaremos a estrtura pronta do conteúdo da API
import MovieRow from './components/MovieRow';

// Estilização do conteúdo que virá da API
import './components/MovieRow';

// Importaremos o conteúdo do filem em destaque 
import FeaturedMovie from './components/FeaturedMovie';

// Importação do Header
import Header from './components/Header';

// Apresentamos o conteúdo aqui
export default () => {

  // Cria um "estado" chamado movieList e uma função setMovieList para atualizar esse estado depois (ex: quando a API retornar os dados)
  const [movieList, setMovieList] = useState([]);

  // Estado para o filme em destaque
  const [featuredData, setFeaturedData] = useState(null);

  // Estado para o Header
  const [blackHeader, setBlackHeader] = useState(true);

  // Ao entrar irá carregar o conteúdo
  useEffect(() => {
    const loadAll = async () => {

      // Pegará a lista total( Catalogo inicial) apresentando o conteudo
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegando o Featured
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  // Efeito para o scroll do header
  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  // Criação das listas que chamarão o conteúdo por categorias
  return (
    <div className="page">

      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      {/* Esta sessão chamará a lista de filmes, independente da categoria */}
      <section className="lists">

        {/* Mapeamento para pegar o item + código  */}
        {movieList.map((item, key) => (

          // Montagem da estrutura para receber as informações - Chave + titulo + descrição
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Feito com <span role="img" aria-label="coração">❤️</span> por Alfredo Mello<br />
        Direitos de imagem para Netflix<br />
        Dados pegos do site Themoviedb.org
      </footer>

      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/3:2/w_2560%2Cc_limit/Netflix_LoadTime.gif" alt="Carregando" />
        </div>
      }
    </div>
  )
}
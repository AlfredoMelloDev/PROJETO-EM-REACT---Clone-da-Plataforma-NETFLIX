// Arquivo que carregará o conteúdo da AudioParam( Imagem, nome, descrição )

import React from 'react';
import './MovieRow.css';

export default ({ title, items }) => {
    return (
        <div>
            {/* Título do filme */}
            <h2>{title}</h2>

            <div className='movieRow--listarea'>
                {/* Lógica para encontrar o conteúdo */}
                {items.results.length > 0 && items.results.map((item, key) => (

                    // Irá buscar a imagem do conteúdo que está relacionado
                    <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
                ))}
            </div>
        </div>
    );
}
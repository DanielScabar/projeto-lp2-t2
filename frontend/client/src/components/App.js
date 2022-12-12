import React from 'react';
import CriarLembrete from './CriarLembrete';
import ListarLembrete from './ListarLembrete';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
  <div className='container'>
    <h1>Crie seu Lembrete</h1>
    <CriarLembrete />
    <hr/>
    <h1>Lembretes:</h1>
    <ListarLembrete />
    </div>
  );
};
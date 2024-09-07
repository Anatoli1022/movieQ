'use client';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

import MovieList from '../components/MovieList';

const socket = io.connect('http://localhost:3001');

const Page = () => {
  const [roomId, setRoom] = useState('');
  const [messageReceived, setMessageReceived] = useState('');
  const [userId, setUserId] = useState('');
  const [movie, setMovie] = useState('');
  const [matchesMovie, setMatchesMovie] = useState([]);

  // Генерация случайного идентификатора пользователя
  function generateUserId() {
    return `user-${Math.floor(Math.random() * 1000)}`;
  }

  // Присоединение к комнате
  const joinRoom = () => {
    if (roomId !== '') {
      const userId = generateUserId();
      setUserId(userId);
      socket.emit('join_room', userId, roomId);
    }
  };

  // Лайк фильма
  const likeMovie = (movieId: any) => {
    if (roomId !== '' && userId !== '') {
      socket.emit('like_movie', userId, roomId, movieId);
    }
  };

  useEffect(() => {
    // Обработка событий с сервера
    socket.on('room_full', (data: any) => {
      setMessageReceived(data.message);
    });

    socket.on('user_joined', (data: any) => {
      setMessageReceived(data.message);
    });

    socket.on('match', (data: any) => {
      setMessageReceived(`Match найден! Оба пользователя лайкнули фильм с id: ${data.movieId}`);
      setMatchesMovie(data.movieId);
    });

    return () => {
      socket.off('room_full');
      socket.off('user_joined');
      socket.off('match');
    };
  }, []);

  return (
    <div>
      <input
        type='text'
        className='text-black'
        placeholder='Room Number...'
        onChange={(event) => setRoom(event.target.value)}
      />
      <button onClick={joinRoom} className='rounded-r-lg border p-2'>
        Join Room
      </button>

      <button onClick={() => likeMovie(movie)} className='rounded-r-lg border p-2'>
        Like Movie
      </button>

      {matchesMovie && <MovieList movies={matchesMovie} />}

      <h1> Message: {messageReceived} </h1>
    </div>
  );
};

export default Page;

'use client';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import RandomFilm from '../../components/RandomFilm';
import MovieList from '../../components/MovieList';
import { Movie } from '../../types';
// const socket = io('http://localhost:3001');

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001');
const Page = () => {
  const [roomId, setRoom] = useState('');
  const [messageReceived, setMessageReceived] = useState('');
  const [userId, setUserId] = useState('');
  const [movie, setMovie] = useState<Movie[] | null>(null);
  const [matchesMovie, setMatchesMovie] = useState<Movie[] | []>([]);
  const [num, setNum] = useState(0);

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
  const likeMovie = (movie: Movie) => {
    if (roomId !== '' && userId !== '') {
      socket.emit('like_movie', userId, roomId, movie);
      setNum((prevState) => prevState + 1);
    }
  };

  // Пропуск фильма
  const skipMovie = () => {
    setNum((prevState) => prevState + 1);
  };

  useEffect(() => {
    // Обработка событий с сервера
    socket.on('room_full', (data) => {
      setMessageReceived(data.message);
    });

    socket.on('user_joined', (data) => {
      setMessageReceived(data.message);
    });

    // Показываем фильм, полученный с сервера
    socket.on('show_movie', (data: Movie[]) => {
      setMovie(data);
    });

    // Обработка match'а
    socket.on('match', (data: Movie) => {
      setMatchesMovie((prevState) => [...prevState, data]);
    });

    return () => {
      socket.off('room_full');
      socket.off('user_joined');
      socket.off('show_movie');
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

      {movie && <RandomFilm likeMovie={likeMovie} skipMovie={skipMovie} movie={movie[num]} />}

      <div className='mt-10'>
        <h2 className='text-3xl'>Matches movie</h2>
        <div className='mt-2'>{matchesMovie.length > 0 && <MovieList movies={matchesMovie} />}</div>
      </div>

      {messageReceived && <p> Message: {messageReceived} </p>}
    </div>
  );
};

export default Page;

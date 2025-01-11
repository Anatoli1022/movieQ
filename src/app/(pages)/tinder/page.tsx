'use client';

import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import RandomFilm from '../../components/RandomFilm';
import { Movie } from '../../types';
import MatchesMovie from '@/app/components/pages/tinder/MatchesMovie';

// Типы для данных от сервера
interface ServerMessage {
  message: string;
}

const Page = () => {
  const [roomId, setRoom] = useState(''); // ID комнаты
  const [messageReceived, setMessageReceived] = useState(''); // Сообщения от сервера
  const [userId, setUserId] = useState(''); // ID пользователя
  const [movie, setMovie] = useState<Movie[] | null>(null); // Список фильмов
  const [matchesMovie, setMatchesMovie] = useState<Movie[] | []>([]); // Мэтчи фильмов
  const [num, setNum] = useState(0); // Номер текущего фильма
  const [socketInstance, setSocketInstance] = useState<any>(null); // Экземпляр сокета (создаем динамически)

  // Генерация случайного идентификатора пользователя
  function generateUserId() {
    return `user-${Math.floor(Math.random() * 1000)}`;
  }

  // Присоединение к комнате
  const joinRoom = () => {
    if (roomId !== '') {
      const userId = generateUserId();
      setUserId(userId);

      // Создаем и инициализируем сокет при подключении к комнате
      const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001');
      setSocketInstance(socket); // Сохраняем экземпляр сокета

      socket.emit('join_room', userId, roomId);
    }
  };

  // Лайк фильма
  const likeMovie = (movie: Movie) => {
    if (roomId !== '' && userId !== '') {
      socketInstance.emit('like_movie', userId, roomId, movie);
      setNum((prevState) => prevState + 1);
    }
  };

  // Пропуск фильма
  const skipMovie = () => {
    setNum((prevState) => prevState + 1);
  };

  // Обработка событий с сервера
  useEffect(() => {
    if (socketInstance) {
      socketInstance.on('room_full', (data: ServerMessage) => {
        setMessageReceived(data.message);
      });

      socketInstance.on('user_joined', (data: ServerMessage) => {
        setMessageReceived(data.message);
      });

      // Показываем фильм, полученный с сервера
      socketInstance.on('show_movie', (data: Movie[]) => {
        setMovie(data);
      });

      // Обработка match'а
      socketInstance.on('match', (data: Movie) => {
        setMatchesMovie((prevState) => [...prevState, data]);
      });

      return () => {
        socketInstance.off('room_full');
        socketInstance.off('user_joined');
        socketInstance.off('show_movie');
        socketInstance.off('match');
      };
    }
  }, [socketInstance]); // Эффект сработает только при изменении socketInstance

  console.log(movie);

  return (
    <div className='relative'>
      {/* Если еще не выбран номер комнаты */}
      {!movie && (
        <>
          <input
            type='text'
            className='text-black'
            placeholder='Room Number...'
            onChange={(event) => setRoom(event.target.value)}
          />
          <button onClick={joinRoom} className='rounded-r-lg border p-2'>
            Join Room
          </button>
        </>
      )}

      {/* Показываем фильм, если он был получен */}
      {movie && <RandomFilm likeMovie={likeMovie} skipMovie={skipMovie} movie={movie[num]} />}

      {/* Отображаем список матчей */}
      <div className='mt-2'>{matchesMovie.length > 0 && <MatchesMovie movies={matchesMovie} />}</div>

      {/* Сообщение от сервера */}
      {messageReceived && <p> Message: {messageReceived} </p>}
    </div>
  );
};

export default Page;

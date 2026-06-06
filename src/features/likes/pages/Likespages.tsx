import { useNavigate }
from 'react-router-dom';

import {
  ArrowLeft,
  Heart,
} from 'lucide-react';

import { useLikes }
from '../hooks/useLikes';

import { LikesList }
from '../components/LikeList';

export function LikesPage() {
  const navigate = useNavigate();

  const {
    likes,
    totalLikes,
    loading,
    error,
  } = useLikes();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p>Cargando likes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-6">

      <button
        onClick={() => navigate('/profile')}
        className="flex items-center gap-2 mb-6 text-pink-500 hover:text-pink-600"
      >
        <ArrowLeft size={20} />
        Volver al perfil
      </button>

      <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-2xl p-6 mb-8 shadow">

        <div className="flex items-center gap-3 mb-2">

          <Heart size={28} />

          <h1 className="text-2xl md:text-3xl font-bold">
            Likes recibidos
          </h1>

        </div>

        <p className="text-5xl font-bold">
          {totalLikes}
        </p>

        <p className="opacity-90 mt-1">
          likes registrados
        </p>

      </div>

      {likes.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-10 text-center">

          <h3 className="text-xl font-semibold mb-2">
            Aún no tienes likes
          </h3>

          <p className="text-gray-500">
            Cuando otros usuarios den like
            a tu perfil aparecerán aquí.
          </p>

        </div>
      ) : (
        <LikesList likes={likes} />
      )}

    </div>
  );
}
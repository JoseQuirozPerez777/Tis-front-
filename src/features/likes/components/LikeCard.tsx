import type { UsuarioLikeDTO }
from '../services/likes.dto';

interface Props {
  like: UsuarioLikeDTO;
}

const DEFAULT_AVATAR =
  'https://cdn-icons-png.flaticon.com/512/149/149071.png';

export function LikeCard({
  like,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">

      <div className="flex items-center gap-4">

        <img
          src={like.foto || DEFAULT_AVATAR}
          alt={like.nombre}
          className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border"
        />

        <div className="flex-1 min-w-0">

          <h3 className="font-semibold text-gray-800 truncate">
            {like.nombre}
          </h3>

          <p className="text-sm text-gray-500">
            {like.profesion ||
              'Profesión no especificada'}
          </p>

          <p className="text-xs text-gray-400 mt-1">
            {new Date(
              like.fechaLike
            ).toLocaleString()}
          </p>

        </div>

      </div>

    </div>
  );
}
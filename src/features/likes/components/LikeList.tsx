import type { UsuarioLikeDTO }
from '../services/likes.dto';

import { LikeCard } from './LikeCard';

interface Props {
  likes: UsuarioLikeDTO[];
}

export function LikesList({
  likes,
}: Props) {
  return (
    <div className="space-y-3">

      {likes.map((like, index) => (
        <LikeCard
          key={`${like.nombre}-${index}`}
          like={like}
        />
      ))}

    </div>
  );
}
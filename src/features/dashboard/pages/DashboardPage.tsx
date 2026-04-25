import { useAuth } from '@/core/context/AuthContext';
import { Link } from 'react-router-dom';

const mockPosts = [
  {
    id: 1,
    author: 'Ana Martínez',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    timestamp: 'Hace 2 horas',
    content: 'Acabo de publicar mi nuevo proyecto de e-commerce usando React y Node.js. Implementé pasarela de pagos con Stripe y autenticación JWT. ¡Muy emocionada por los resultados!',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    likes: 24,
    comments: 5
  },
  {
    id: 2,
    author: 'Carlos Gómez',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    timestamp: 'Hace 5 horas',
    content: '¿Alguien más está probando la nueva versión de Next.js? Los Server Actions están increíbles para simplificar el backend. Aquí les dejo un pequeño artículo que escribí al respecto.',
    likes: 45,
    comments: 12
  },
  {
    id: 3,
    author: 'Laura Silva',
    avatarUrl: 'https://i.pravatar.cc/150?u=a04258a2462d826712d',
    timestamp: 'Ayer a las 14:30',
    content: 'Finalmente obtuve mi certificación en AWS Solutions Architect. Fue un camino largo pero valió la pena cada hora de estudio. 🚀☁️',
    likes: 112,
    comments: 18
  }
];

export const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">
            ¡Hola, {user?.fullName?.split(' ')[0] || 'Usuario'}! 👋
          </h1>
          <p className="text-text-secondary mt-1">
            Bienvenido a tu panel de control de Portafolios TIS.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-6 rounded-2xl hover:border-brand-azul-brillante/50 transition-colors group">
          <h3 className="text-xl font-semibold text-text-primary mb-2">Tu Perfil</h3>
          <p className="text-text-secondary text-sm mb-4">
            Mantén tu información personal y de contacto actualizada.
          </p>
          <Link to="/profile" className="text-brand-azul-brillante font-medium text-sm hover:underline">
            Revisar perfil →
          </Link>
        </div>

        <div className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-6 rounded-2xl hover:border-brand-morado/50 transition-colors group">
          <h3 className="text-xl font-semibold text-text-primary mb-2">Habilidades</h3>
          <p className="text-text-secondary text-sm mb-4">
            Añade y organiza tus habilidades técnicas y blandas.
          </p>
          <Link to="/skills" className="text-brand-morado font-medium text-sm hover:underline">
            Gestionar habilidades →
          </Link>
        </div>

        <div className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-6 rounded-2xl hover:border-violet-500/50 transition-colors group">
          <h3 className="text-xl font-semibold text-text-primary mb-2">Experiencia</h3>
          <p className="text-text-secondary text-sm mb-4">
            Registra y organiza tu experiencia laboral.
          </p>
          <Link to="/experience" className="text-violet-400 font-medium text-sm hover:underline">
            Ir a experiencia →
          </Link>
        </div>

        <div className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-6 rounded-2xl hover:border-[#10B981]/50 transition-colors group">
          <h3 className="text-xl font-semibold text-text-primary mb-2">Proyectos</h3>
          <p className="text-text-secondary text-sm mb-4">
            Muestra tus mejores trabajos y casos de éxito.
          </p>
          <Link to="/projects" className="text-[#10B981] font-medium text-sm hover:underline">
            Ir a proyectos →
          </Link>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-text-primary mb-6">Publicaciones Recientes</h2>

        <div className="space-y-6">
          {mockPosts.map((post) => (
            <div key={post.id} className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-6 rounded-2xl hover:border-brand-azul-brillante/30 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-card-border">
                  <img src={post.avatarUrl} alt={post.author} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">{post.author}</h3>
                  <p className="text-text-secondary text-sm">{post.timestamp}</p>
                </div>
              </div>

              <p className="text-text-primary mb-4 leading-relaxed">{post.content}</p>

              {post.image && (
                <div className="mb-4 rounded-xl overflow-hidden border border-card-border">
                  <img src={post.image} alt="Publicación" className="w-full h-auto object-cover max-h-96" />
                </div>
              )}

              <div className="flex items-center gap-6 text-text-secondary border-t border-card-border pt-4">
                <button className="flex items-center gap-2 hover:text-brand-azul-brillante transition-colors">
                  <span className="text-sm font-medium">♡ {post.likes}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-brand-azul-brillante transition-colors">
                  <span className="text-sm font-medium">💬 {post.comments}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
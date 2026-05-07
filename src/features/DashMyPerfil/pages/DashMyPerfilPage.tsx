
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/core/context/AuthContext';

export const DashMyPerfilPage = () => {

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
                    <Link to="/hardskills" className="text-brand-morado font-medium text-sm hover:underline">
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
                <div className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-6 rounded-2xl hover:border-[#10B981]/50 transition-colors group">
                    <h3 className="text-xl font-semibold text-text-primary mb-2">Formacion Academica</h3>
                    <p className="text-text-secondary text-sm mb-4">
                        Muestra tu formacion academica.
                    </p>
                    <Link to="/AcademicTraining" className="text-[#10B981] font-medium text-sm hover:underline">
                        Ir a formacion academica →
                    </Link>
                </div>
            </div>
        </div>
    );
};
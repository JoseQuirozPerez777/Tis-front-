import { useEffect, useState } from "react";

import {
  filtrosBusquedaIniciales,
  validarExperienciaMinima,
  validarSoloLetras,
  validarTecnologia,
  validarTextoGeneral,
  validarUbicacion,
} from "../models/filtros-busqueda.model";

import type {
  FiltrosBusqueda,
  OrdenarPor,
  PortafolioResultado,
} from "../models/filtros-busqueda.model";

import { buscarPortafoliosService } from "../services/filtros-busqueda.service";

export const useFiltrosBusqueda = () => {
  const [filtros, setFiltros] = useState<FiltrosBusqueda>(
    filtrosBusquedaIniciales,
  );

  const [resultados, setResultados] = useState<PortafolioResultado[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buscarPortafolios = async (filtrosActuales = filtros) => {
    try {
      setCargando(true);
      setError(null);

      const response = await buscarPortafoliosService(filtrosActuales);

      setResultados(response.data);
      setTotal(response.total);
      setTotalPaginas(response.totalPaginas || 1);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error al buscar portafolios.",
      );
      setResultados([]);
      setTotal(0);
      setTotalPaginas(1);
    } finally {
      setCargando(false);
    }
  };

  const actualizarFiltro = (
    campo: keyof FiltrosBusqueda,
    valor: string | number | string[],
  ) => {
    setFiltros((prev) => {
      let valorValidado: string | number | string[] = valor;

      if (typeof valor === "string") {
        if (
          campo === "profesion" ||
          campo === "especializacion" ||
          campo === "formacionAcademica"
        ) {
          valorValidado = validarSoloLetras(valor);
        }

        if (campo === "buscar") {
          valorValidado = validarTextoGeneral(valor);
        }

        if (campo === "tecnologia") {
          valorValidado = validarTecnologia(valor);
        }

        if (campo === "ubicacion") {
          valorValidado = validarUbicacion(valor);
        }

        if (campo === "experienciaMinima") {
          valorValidado = validarExperienciaMinima(valor);
        }
      }

      return {
        ...prev,
        [campo]: valorValidado,
        pagina: campo === "pagina" ? Number(valorValidado) : 1,
      };
    });
  };

  const cambiarOrden = (ordenarPor: OrdenarPor) => {
    setFiltros((prev) => ({
      ...prev,
      ordenarPor,
      pagina: 1,
    }));
  };

  const cambiarPagina = (pagina: number) => {
    const nuevaPagina = Math.max(1, Math.min(pagina, totalPaginas));

    const nuevosFiltros = {
      ...filtros,
      pagina: nuevaPagina,
    };

    setFiltros(nuevosFiltros);
    buscarPortafolios(nuevosFiltros);
  };

  const alternarIdioma = (idioma: string) => {
    setFiltros((prev) => {
      const existe = prev.idiomas.includes(idioma);

      return {
        ...prev,
        idiomas: existe
          ? prev.idiomas.filter((item) => item !== idioma)
          : [...prev.idiomas, idioma],
        pagina: 1,
      };
    });
  };

  const aplicarFiltros = () => {
    const nuevosFiltros = {
      ...filtros,
      pagina: 1,
    };

    setFiltros(nuevosFiltros);
    buscarPortafolios(nuevosFiltros);
  };

  const limpiarFiltros = () => {
    setFiltros(filtrosBusquedaIniciales);
    buscarPortafolios(filtrosBusquedaIniciales);
  };

  useEffect(() => {
    buscarPortafolios(filtrosBusquedaIniciales);
  }, []);

  return {
    filtros,
    resultados,
    total,
    totalPaginas,
    cargando,
    error,
    actualizarFiltro,
    cambiarOrden,
    cambiarPagina,
    alternarIdioma,
    aplicarFiltros,
    limpiarFiltros,
    buscarPortafolios,
  };
};
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const [isClient, setIsClient] = useState(false);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setIsClient(true);
    const root = document.createElement("div"); // создаем временный контейнер
    document.body.appendChild(root);
    setModalRoot(root);

    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.removeChild(root);
    };
  }, [onClose]);

  if (!isClient || !modalRoot) return null;

  return createPortal(
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={css.closeButton}>
          &times;
        </button>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average}/10</p>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
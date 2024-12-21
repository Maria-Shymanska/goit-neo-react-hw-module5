import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import Videos from "./components/Video/Video";

// Імпортуємо компоненти
const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage.jsx"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage.jsx")
);
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast.jsx"));
const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage.jsx")
);
const Navigation = lazy(() => import("./components/Navigation/Navigation.jsx"));

function App() {
  return (
    <div>
      <Navigation />
      <div className="container">
        <Suspense fallback={<h1>LOADING...</h1>}>
          <Routes>
            {/* Головна сторінка */}
            <Route path="/" element={<HomePage />} />

            {/* Сторінка пошуку */}
            <Route path="/movies" element={<MoviesPage />} />

            {/* Вкладені маршрути */}
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
              <Route path="video" element={<Videos />} />
            </Route>

            {/* Сторінка для неіснуючих маршрутів */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;

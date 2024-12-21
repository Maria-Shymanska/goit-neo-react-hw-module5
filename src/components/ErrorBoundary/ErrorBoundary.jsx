import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  //   static getDerivedStateFromError(error) {
  //     // Оновлює стан, щоб відобразити fallback UI
  //     return { hasError: true };
  //   }

  componentDidCatch(error, errorInfo) {
    // Ви можете передати помилку в систему логування
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Рендеримо запасний інтерфейс
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el state, así el siguiente renderizado lo mostrará en la IU.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier interfaz de usuario diferente
      return this.props.fallback || <h1>Oh no! Ha roto.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

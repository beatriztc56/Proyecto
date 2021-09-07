import React, { Component } from "react";
import corazon1 from "./assets/img/corazon1.png";
import corazon0 from "./assets/img/corazon0.png";

export class ContadorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contador: 0,
    };
  }

  cambiarContador(n) {
    this.setState({ contador: n });
  }

  restar() {
    this.cambiarContador(this.state.contador - 1);
  }

  sumar() {
    this.cambiarContador(this.state.contador + 1);
  }

  render() {
    return (
      <div className="contador">
        <div
          className="quitar"
          img
          src={corazon0}
          onClick={(event) => {
            this.restar();
          }}
        >
          <img src={corazon0} alt="resta" />
        </div>
        &nbsp;
        {this.state.contador}
        &nbsp;
        <div
          className="poner"
          img
          src={corazon1}
          onClick={(event) => {
            this.sumar();
          }}
        >
          <img src={corazon1} alt="suma" />
        </div>
      </div>
    );
  }
}

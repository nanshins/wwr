import { createElement } from "react";
import { render } from "react-dom";
import App from "./_app";
import { reportWebVitals } from "./report-web-vitals";

function main(): void {
  const root = document.querySelector(`[data-application="true"]`);

  if (root) {
    render(createElement(App), root);
  }
}

void main();

void reportWebVitals(console.log);

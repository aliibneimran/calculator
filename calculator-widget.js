(function () {
  // Load CSS dynamically
  const cssLink = document.createElement("link");
  cssLink.rel = "stylesheet";
  cssLink.href = "https://cdn.jsdelivr.net/gh/aliibneimran/calculator@latest/calculator-widget.css";
  // cssLink.href = "calculator-widget.css";
  document.head.appendChild(cssLink);

  // Create Toggle Button
  const toggleBtn = document.createElement("button");
  toggleBtn.id = "calculator-toggle";
  toggleBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width='2em' height='2em'><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.464 20.536C4.93 22 7.286 22 12 22s7.071 0 8.535-1.465C22 19.072 22 16.714 22 12s0-7.071-1.465-8.536C19.072 2 16.714 2 12 2S4.929 2 3.464 3.464C2 4.93 2 7.286 2 12s0 7.071 1.464 8.535Z"/><path stroke-linecap="round" d="M18 8.5h-4m4 6h-4m4 3h-4m-4-9H8m0 0H6m2 0v-2m0 2v2m1.5 4L8 16m0 0l-1.5 1.5M8 16l-1.5-1.5M8 16l1.5 1.5"/></g></svg>`;
  document.body.appendChild(toggleBtn);

  // Create Modal Overlay + Calculator
  const overlay = document.createElement("div");
  overlay.id = "calculator-overlay";
  overlay.innerHTML = `
    <div id="calculator-widget">
      <div id="calculator-header">
        Calculator
        <button id="calculator-close">&times;</button>
      </div>
      <input type="text" id="calculator-display" disabled />
      <div class="calculator-buttons">
        <button>7</button><button>8</button><button>9</button><button>/</button>
        <button>4</button><button>5</button><button>6</button><button>*</button>
        <button>1</button><button>2</button><button>3</button><button>-</button>
        <button>0</button><button>.</button><button>=</button><button>+</button>
        <button>C</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const calculator = overlay.querySelector("#calculator-widget");
  const display = calculator.querySelector("#calculator-display");
  const buttons = calculator.querySelectorAll(".calculator-buttons button");
  const closeBtn = calculator.querySelector("#calculator-close");

  let expression = "";

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.textContent;

      if (value === "C") {
        expression = "";
        display.value = "";
      } else if (value === "=") {
        try {
          expression = eval(expression).toString();
          display.value = expression;
        } catch {
          display.value = "Error";
          expression = "";
        }
      } else {
        expression += value;
        display.value = expression;
      }
    });
  });

  // Open modal
  toggleBtn.addEventListener("click", () => {
    overlay.style.display = "flex";
  });

  // Close modal
  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
  });

  // Close modal when clicking outside calculator
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.style.display = "none";
    }
  });
})();

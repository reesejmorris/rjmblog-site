(() => {
  try {
    const storedTheme = localStorage.getItem("theme");
    const theme = storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";

    document.documentElement.setAttribute("data-theme", theme);
  } catch {
    // Theme selection is optional; continue with the stylesheet default.
  }
})();

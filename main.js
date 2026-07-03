// ============================================================
// Executive Commerce Forum - Summer Edition — interest form handler
// ============================================================

(function () {
  const form = document.getElementById("interest-form");
  const status = document.getElementById("form-status");
  const success = document.getElementById("form-success");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.classList.remove("error");
    status.textContent = "";

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (data._gotcha) return;

    if (!data.Name || !data.email || !data.Company || !data.Title || !data.Seniority) {
      status.classList.add("error");
      status.textContent = "Please complete name, email, company, title, and seniority.";
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      status.classList.add("error");
      status.textContent = "Please enter a valid work email address.";
      return;
    }

    const submitButton = form.querySelector("button[type='submit']");
    const label = submitButton.querySelector(".button-label");
    const originalLabel = label.textContent;

    submitButton.disabled = true;
    label.textContent = "Sending…";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (!response.ok) {
        const json = await response.json().catch(() => ({}));
        const message = json?.errors?.[0]?.message || "Submission failed";
        throw new Error(message);
      }

      form.hidden = true;
      success.hidden = false;
      success.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (error) {
      console.error(error);
      status.classList.add("error");
      status.textContent = "Something went wrong. Please try again, or email Danielle directly at danielle.salvatore@shopify.com.";
      submitButton.disabled = false;
      label.textContent = originalLabel;
    }
  });
})();

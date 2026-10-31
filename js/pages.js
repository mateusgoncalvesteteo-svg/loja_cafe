export function showPage(pageId) {
  const pages = document.querySelectorAll(".page-section");
  pages.forEach(page => {
    if (page.id === pageId) {
      page.classList.remove("d-none");
    } else {
      page.classList.add("d-none");
    }
  });
}
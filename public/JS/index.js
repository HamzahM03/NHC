function toggleMenu(){
  const menu = document.getElementById("hamburger-icon")
  const links = document.getElementById("hamburger-links");
  menu.classList.toggle("open");
  links.classList.toggle("open");
}
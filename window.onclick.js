window.addEventListener('click', (e)=>{
  e.preventDefault();
  console.log(e);
  console.log(e.type, e.target);
});

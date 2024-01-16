import Swal from "sweetalert2";

const Loading = () =>
  Swal.fire({
    html: `<div class="flex flex-col gap-4 min-h-24 items-center overflow-hidden justify-center"><img class="w-20 h-20 mx-auto animate-spin" src="https://www.svgrepo.com/show/70469/loading.svg" alt="Loading icon"><h1 class="text-white font-bold text-2xl">Loading...</h1></div>`,
    allowOutsideClick: false,
    showConfirmButton: false,
    background: `rgba(0,0,0,0.0)`,
  });

export default Loading;

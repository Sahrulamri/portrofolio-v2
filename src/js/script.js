

document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault(); // cegah reload

  const form = e.target;
  const formData = new FormData(form);

  const response = await fetch("https://formspree.io/f/mvgwkbqn", {
    method: "POST",
    body: formData,
    headers: { 'Accept': 'application/json' }
  });

  if (response.ok) {
    Swal.fire({
      title: "Berhasil!",
      text: "Pesan kamu sudah terkirim 🙌",
      icon: "success",
      confirmButtonColor: "#000",
    });
    form.reset(); // kosongkan form setelah terkirim
  } else {
    Swal.fire({
      title: "Gagal!",
      text: "Terjadi kesalahan. Coba lagi ya 😢",
      icon: "error",
      confirmButtonColor: "#000",
    });
  }
});

// typing
const words = [
  "Software Developer",
  "Web Developer",
  "Data Scientist",
  "Machine Learning Engineer",
];

let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;
const speed = 100; // kecepatan ngetik
const pause = 1500; // jeda setelah selesai ketik

function type() {
  currentWord = words[i];
  
  if (isDeleting) {
    document.getElementById("typing").textContent = currentWord.substring(0, j--);
  } else {
    document.getElementById("typing").textContent = currentWord.substring(0, j++);
  }

  if (!isDeleting && j === currentWord.length + 1) {
    isDeleting = true;
    setTimeout(type, pause); // jeda sebelum hapus
    return;
  }

  if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % words.length; // ganti kata selanjutnya
  }

  setTimeout(type, speed);
}

type();


const btn = document.getElementById("cvDropdownBtn");
const menu = document.getElementById("cvDropdown");
const chevron = document.getElementById("chevronIcon");

btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");

    // Toggle ikon
    chevron.classList.toggle("fa-chevron-down");
    chevron.classList.toggle("fa-chevron-up");
});

// Klik di luar dropdown
document.addEventListener("click", function (e) {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.add("hidden");

        // Kembalikan ikon menjadi panah bawah
        chevron.classList.remove("fa-chevron-up");
        chevron.classList.add("fa-chevron-down");
    }
});


// slider
// slider
const swiper = new Swiper(".projectSwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,

    // TAMBAHKAN CONFIG AUTOPLAY DI SINI
    autoplay: {
        delay: 1000, // Slider akan bergeser otomatis setiap 1 detik (1000ms)
        disableOnInteraction: false, // Ditahan/diklik tidak akan mematikan fungsi otomatisnya
        pauseOnMouseEnter: true, // Opsional: Slider berhenti jalan kalau mouse hover di atas card
    },

    navigation: {
        prevEl: "#prevBtn",
        nextEl: "#nextBtn",
    },

    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        }
    }
});

// Logika update bar kustom yang kemarin (biarkan tetap ada di bawahnya)
const dots = document.querySelectorAll("#customPagination .custom-dot");

swiper.on("slideChange", function () {
    const activeIndex = swiper.realIndex; 
    dots.forEach((dot, index) => {
        if (index === activeIndex) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
});

dots.forEach((dot) => {
    dot.addEventListener("click", function () {
        const index = parseInt(this.getAttribute("data-index"));
        swiper.slideToLoop(index);
    });
});



// filter project
const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".swiper-slide");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // ===== Ubah warna tombol =====
        filterButtons.forEach(btn => {
            btn.classList.remove("bg-white", "text-black");
            btn.classList.add("bg-gray-800", "text-white");
        });

        button.classList.remove("bg-gray-800", "text-white");
        button.classList.add("bg-white", "text-black");

        // ===== Ambil kategori =====
        const filter = button.dataset.filter;
        console.log("Filter dipilih:", filter);
        console.log(filterButtons);

        // ===== Filter project =====
        projects.forEach(project => {

            const categories = project.dataset.category.split(",");

            if (filter === "all" || categories.includes(filter)) {
                project.style.display = "";
            } else {
                project.style.display = "none";
            }

          });
          
          console.log(filter);
        // Update swiper
        swiper.update();

    });

});

// modal
const modal = document.getElementById("projectModal");

function openModal() {
    modal.classList.remove("hidden");
}

function closeModal() {
    modal.classList.add("hidden");
}

document.getElementById("closeModal").onclick = closeModal;
document.getElementById("closeModal2").onclick = closeModal;

// klik area gelap
modal.addEventListener("click", function (e) {
    if (e.target === modal) {
        closeModal();
    }
});
// ===== Data & LocalStorage =====
let categories = JSON.parse(localStorage.getItem("todolist-categories")) || [
  { name: "Sekolah", tasks: [{ text: "Tugas agama", done: false }] },
  { name: "Code", tasks: ["React", "Js lanjutan", "Git github", "Php", "Proyek C"].map(t => ({ text: t, done: false })) },
  { name: "Les", tasks: ["Bab1","Bab2","Bab3","Bab4","Bab5","Bab6","Bab7","Bab8","Bab9","Bab10"].map(t => ({ text: t, done: false })) },
  { name: "Target Code", tasks: ["React (lumayan jago)", "Node Js(wajib)", "flutter"].map(t => ({ text: t, done: false })) },
  { name: "Long times", tasks: ["C#", ".net", "react native(maybe)"].map(t => ({ text: t, done: false })) }
];

const categoriesContainer = document.getElementById("categoriesContainer");
const addCategoryBtn = document.getElementById("addCategoryBtn");
const newCategoryInput = document.getElementById("newCategory");

// ===== Render Fungsi =====
function saveAndRender() {
  localStorage.setItem("todolist-categories", JSON.stringify(categories));
  renderCategories();
}

function renderCategories() {
  categoriesContainer.innerHTML = "";
  categories.forEach((cat, i) => {
    const col = document.createElement("div");
    col.className = "col-12 col-md-6";
    col.innerHTML = `
      <div class="card shadow border-0">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="card-title mb-0">${cat.name}</h5>
            <button class="btn btn-sm btn-danger btn-delete-cat">Hapus</button>
          </div>
          <ul class="list-group list-group-flush mb-3">
            ${cat.tasks.map((task, idx) => `
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <input type="checkbox" class="form-check-input me-2 task-toggle" ${task.done ? "checked" : ""} data-cat="${i}" data-task="${idx}">
                  <span style="text-decoration: ${task.done ? "line-through" : "none"}">${task.text}</span>
                </div>
                <button class="btn btn-sm btn-outline-danger btn-delete-task" data-cat="${i}" data-task="${idx}">❌</button>
              </li>
            `).join("")}
          </ul>
          <div class="input-group">
            <input type="text" class="form-control new-task-input" placeholder="Tambah task di ${cat.name}" data-cat="${i}">
            <button class="btn btn-success btn-add-task" data-cat="${i}">Tambah</button>
          </div>
        </div>
      </div>
    `;
    categoriesContainer.appendChild(col);
  });

  // Tambah event listener
  document.querySelectorAll(".btn-delete-cat").forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      if (confirm("Yakin hapus kategori ini?")) {
        categories.splice(idx, 1);
        saveAndRender();
      }
    });
  });

  document.querySelectorAll(".task-toggle").forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      const catIndex = parseInt(checkbox.dataset.cat);
      const taskIndex = parseInt(checkbox.dataset.task);
      categories[catIndex].tasks[taskIndex].done = !categories[catIndex].tasks[taskIndex].done;
      saveAndRender();
    });
  });

  document.querySelectorAll(".btn-delete-task").forEach(btn => {
    btn.addEventListener("click", () => {
      const catIndex = parseInt(btn.dataset.cat);
      const taskIndex = parseInt(btn.dataset.task);
      if (confirm("Yakin hapus task ini?")) {
        categories[catIndex].tasks.splice(taskIndex, 1);
        saveAndRender();
      }
    });
  });

  document.querySelectorAll(".btn-add-task").forEach(btn => {
    btn.addEventListener("click", () => {
      const catIndex = parseInt(btn.dataset.cat);
      const input = document.querySelector(`.new-task-input[data-cat="${catIndex}"]`);
      const value = input.value.trim();
      if (!value) return;
      categories[catIndex].tasks.push({ text: value, done: false });
      input.value = "";
      saveAndRender();
    });
  });
}

// ===== Add Kategori =====
addCategoryBtn.addEventListener("click", () => {
  const value = newCategoryInput.value.trim();
  if (!value) return;
  categories.push({ name: value, tasks: [] });
  newCategoryInput.value = "";
  saveAndRender();
});

// ===== Init =====
renderCategories();

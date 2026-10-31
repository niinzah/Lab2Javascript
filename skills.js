

class Skills {
    constructor(id, name, category, proficiency, yearsExperience, description) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.proficiency = proficiency;
        this.yearsExperience = yearsExperience;
        this.description = description;
    }
}

const skills = [
{id: 1, name: "User Interviews", category: "Professional", proficiency: 5, yearsExperience: 5.5, description: "I use this skill when designing apps and websites to talk to potential users and to understand user needs and pain points. I am able to ask questions in a way which truly digs into understanding the WHY behind their answers."},
{id: 2, name: "Prototype Testing", category: "Professional", proficiency: 3, yearsExperience: 6.0, description: "Once I have created an app or a website, I test it with users to see if they can use it and understand it. I am able to observe their behavior and ask questions to understand their experience."},
{id: 3, name: "Surveys", category: "Professional", proficiency: 3, yearsExperience: 7.0, description: "I use surveys to gain numerical data to support the insights I find from user interviews. It quantifies the user behaviours and helps me with decision making."},
{id: 4, name: "Weight Lifting", category: "Fitness", proficiency: 4, yearsExperience: 10.0, description: "Through consistent weight lifting, I have improved my strength and endurance as well as my discipline and focus which I also use in my studies and work.."},
{id: 5, name: "Running", category: "Fitness", proficiency: 3, yearsExperience: 12.0, description: "Similarly to weight lifting, running has helped me improve my cardiovascular health and mental resilience."},
{id: 6, name: "Swedish", category: "Language", proficiency: 3, yearsExperience: 10.0, description: "I learnt swedish as a child and am currently relearning it, I use this skill on a dayto day basis."},
{id: 7, name: "German", category: "Language", proficiency: 4, yearsExperience: 5.5, description: "I use English in my studies and work life, I conduct my user interviews and surveys in English which allows me to reach a wide range of users."},
{id: 8, name: "English", category: "Language", proficiency: 5, yearsExperience: 19.0, description: "I learnt German which has also helped me in my work life and career, as I worked in a German company."} 
];

const skillsContainer = document.getElementById("skills-container");
const filterContainer = document.getElementById("skill-filters");
const sortSelect = document.getElementById("skill-sort");

function renderSkills(list = skills) {
  skillsContainer.innerHTML = "";

  list.forEach((skill) => {
    const card = document.createElement("article");
    card.className = "skill-card";

    const title = document.createElement("h3");
    title.textContent = skill.name;

    const description = document.createElement("p");
    description.textContent = skill.description;

    const category = document.createElement("p");
    category.className = "skill-category";
    category.textContent = skill.category;

    const meta = document.createElement("p");
    meta.textContent = `${skill.proficiency} ${skill.proficiency === 1 ? "proficiency" : "proficiency out of 5"}` + " · " + `${skill.yearsExperience} ${skill.yearsExperience === 1 ? "year" : "years"}`;

    card.append(title, category, meta, description);
    skillsContainer.appendChild(card);
  });
}

function createFilterButton(label, category) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "filter-btn";
  button.textContent = label;
  button.dataset.category = category;
  button.setAttribute("aria-pressed", "false");
  return button;
}

function renderFilters() {
  filterContainer.innerHTML = "";

  const categories = [...new Set(skills.map((skill) => skill.category))];

  filterContainer.appendChild(createFilterButton("All Skills", "all"));
  categories.forEach((category) => {
    filterContainer.appendChild(createFilterButton(category, category));
  });
}
let currentCategory = "all";
let currentSort = "name";

const sorters = {
  name: (a, b) => a.name.localeCompare(b.name),
  "name-desc": (a, b) => b.name.localeCompare(a.name),
  proficiency: (a, b) =>
   b.proficiency - a.proficiency || a.name.localeCompare(b.name),
    "proficiency-asc": (a, b) =>
    a.proficiency - b.proficiency || a.name.localeCompare(b.name),
};

function updateSkills() {
  const filtered = currentCategory === "all"
    ? skills
    : skills.filter((skill) => skill.category === currentCategory);

  const sorted = [...filtered].sort(sorters[currentSort]);

  renderSkills(sorted);

  filterContainer.querySelectorAll(".filter-btn").forEach((button) => {
    const active = button.dataset.category === currentCategory;
    button.setAttribute("aria-pressed", String(active));
  });
}

function filterSkills(category) {
  currentCategory = category;
  updateSkills();
}

if (skillsContainer && filterContainer && sortSelect) {
  filterContainer.addEventListener("click", (e) => {
    const button = e.target.closest(".filter-btn");
    if (button) filterSkills(button.dataset.category);
  });

  sortSelect.addEventListener("change", () => {
    currentSort = sortSelect.value;
    updateSkills();
  });

  document.addEventListener("DOMContentLoaded", () => {
    renderFilters();
    filterSkills("all");
  });
}


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

function renderSkills(list = skills) {
  skillsContainer.innerHTML = "";

  list.forEach((skill) => {
    const card = document.createElement("article");
    card.className = "skill-card";

    const title = document.createElement("h3");
    title.textContent = skill.name;

    const description = document.createElement("p");
    description.textContent = skill.description;

    card.append(title, description);
    skillsContainer.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
});
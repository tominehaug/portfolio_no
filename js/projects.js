const container = document.querySelector(".projects");

let projectCards = [];

async function fetchProjects() {
  try {
    const response = await fetch("projects.json");
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.errors?.[0]?.message || "Failed network response");
    return data;
  } catch (error) {
    showError(error.message);
    return null;
  }
}

function showError(messageText) {
  container.innerHTML = "";

  const errorWrapper = document.createElement("div");
  errorWrapper.classList.add("error");

  const message = document.createElement("p");
  message.textContent = messageText;

  const retryBtn = document.createElement("button");
  retryBtn.textContent = "Try Again";
  retryBtn.addEventListener("click", fetchProjects);

  errorWrapper.appendChild(message);
  errorWrapper.appendChild(retryBtn);
  container.appendChild(errorWrapper);
}

function displayProjects(projects) {
  projects.forEach((card) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    const thumbnail = document.createElement("img");
    thumbnail.src = card.image.src;
    thumbnail.alt = card.image.alt;

    const title = document.createElement("h3");
    title.textContent = card.title;

    const description = document.createElement("p");
    description.textContent = card.description;

    cardDiv.appendChild(thumbnail);
    cardDiv.appendChild(title);
    cardDiv.appendChild(description);

    if (card.live) {
      const liveBtn = document.createElement("a");
      liveBtn.textContent = "Live link";
      liveBtn.href = card.live;
      liveBtn.target = "_blank";
      cardDiv.appendChild(liveBtn);
    }

    if (card.repository) {
      const gitBtn = document.createElement("a");
      gitBtn.textContent = "GitHub Repo";
      gitBtn.href = card.repository;
      gitBtn.target = "_blank";
      cardDiv.appendChild(gitBtn);
    }

    if (card.figma) {
      const figmaBtn = document.createElement("a");
      figmaBtn.textContent = "Figma Design";
      figmaBtn.href = card.figma;
      figmaBtn.target = "_blank";
      cardDiv.appendChild(figmaBtn);
    }

    container.appendChild(cardDiv);
  });
}

async function init() {
  projectCards = await fetchProjects();
  if (!projectCards) return;
  displayProjects(projectCards);
}

init();

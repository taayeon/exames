const cards = document.querySelector(".scroll");
const create = document.querySelector(".create_btn");
const show = document.querySelector(".show");
const nameValue = document.querySelector(".name");
const lastName = document.querySelector(".lastName");
const imgUrl = document.querySelector(".imgUrl");
const container = document.querySelector(".container");
const closeX = document.querySelector(".closeX");
const showBtn = document.querySelector(".showBtn");

create.addEventListener("click", () => {
  checkInputs();
  nameValue.value = "";
  lastName.value = "";
  imgUrl.value = "";
});

function addTask() {
  cards.innerHTML = "";
  let task = JSON.parse(localStorage.getItem("elem")) || [];
  console.log(task);
  task.map((el) => {
    cards.innerHTML += `
        <div class="card">
            <img src="${el.imgUrl}"/>
            <span>${el.nameValue}</span>
            <span>${el.lastName}</span>
            <button class="deleteBtn">delete</button>
        </div>
        `;
  });
  deleetHandler();
}

addTask();

function checkInputs() {
  if (
    nameValue.value.trim === "" ||
    lastName.value.trim() === "" ||
    imgUrl.value.trim() === ""
  ) {
    let modal = document.createElement("div");
    let mainModal = document.createElement("div");
    mainModal.className = "mainModal";
    modal.className = "modal";
    modal.innerHTML = `<h2> Please fill the all inputs </h2> <button class="close">Close</button>`;
    mainModal.append(modal);
    container.append(mainModal);

    let closeBtn = document.querySelector(".close");
    closeHandler(closeBtn);
  } else {
    let task = JSON.parse(localStorage.getItem("elem")) || [];
    let new_task = {
      id: 1,
      nameValue: nameValue.value,
      lastName: lastName.value,
      imgUrl: imgUrl.value,
    };
    task.push(new_task);
    localStorage.setItem("elem", JSON.stringify(task));
    addTask();
  }
}

function closeHandler(closeBtn) {
  closeBtn.addEventListener("click", () => {
    let modal = document.querySelector(".modal");
    modal.parentElement.remove();
  });
}

closeX.addEventListener("click", () => {
  show.style.display = "none";
});

showBtn.addEventListener("click", () => {
  show.style.display = "block";
});

function deleetHandler(params) {
  let task = JSON.parse(localStorage.getItem("elem")) || [];
  let deleteBtn = document.querySelectorAll(".deleteBtn");

  console.log(deleteBtn);
  deleteBtn.forEach((el, id) => {
    el.addEventListener("click", () => {
      task = task.filter((el, index) => {
        return index !== id;
      });
      localStorage.setItem("elem", JSON.stringify(task));
      addTask();
    });
  });
}

deleetHandler();
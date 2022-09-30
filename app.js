const main = document.getElementById("main");

var daily = document.getElementById("daily");
var weekly = document.getElementById("weekly");
var monthly = document.getElementById("monthly");

const getData = async (periodOfTime) => {
  const boxes = document.querySelectorAll(".dataDivs");

  await boxes.forEach((box) => {
    box.remove();
  });

  await fetch("./data.json")
    .then((res) => res.json())
    .then((datas) => {
      console.log(datas);
      datas.forEach((element) => {
        let div = document.createElement("div");

        let data = document.createElement("div");

        let names = document.createElement("div");

        let workData = document.createElement("div");

        let h2 = document.createElement("h2");

        let hours = document.createElement("h1");

        let previous = document.createElement("span");

        if (periodOfTime === "daily") {
          hours.innerText = element.timeframes.daily.current + "hrs";
          previous.innerText =
            "Last day - " + element.timeframes.daily.previous + "hrs";
          daily.classList.add("active");
          weekly.classList.remove("active");
          monthly.classList.remove("active");
        }
        if (periodOfTime === "weekly") {
          hours.innerText = element.timeframes.weekly.current + "hrs";
          previous.innerText =
            "Last Week - " + element.timeframes.weekly.previous + "hrs";

          daily.classList.remove("active");
          weekly.classList.add("active");
          monthly.classList.remove("active");
        }
        if (periodOfTime === "monthly") {
          hours.innerText = element.timeframes.monthly.current + "hrs";
          previous.innerText =
            "Last month - " + element.timeframes.monthly.previous + "hrs";
          daily.classList.remove("active");
          weekly.classList.remove("active");
          monthly.classList.add("active");
        }

        h2.innerText = element.title;

        names.appendChild(h2);

        names.classList.add("names");

        data.appendChild(names);

        workData.classList.add("workData");

        workData.appendChild(hours);

        workData.appendChild(previous);

        data.appendChild(workData);

        data.classList.add("data");

        div.style.backgroundColor = element.color;

        div.style.backgroundImage = `url(${element.image})`;

        div.classList.add("dataDivs");

        div.appendChild(data);

        main.appendChild(div);
      });
    })
    .catch((err) => console.log(err));
};

getData("weekly");

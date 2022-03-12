exports = showDate;

function showDate() {
  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("es-CR", options);

  return day;
}

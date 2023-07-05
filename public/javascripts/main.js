
//board id for lookBoard
function getId(event) {
    const id = event.target.value;
    console.log(id);
    location.href = "/lookBoard/" + id
}


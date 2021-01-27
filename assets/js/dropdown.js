function dropDown() {
    let btn = document.getElementById("dropdown-content");

    switch(btn.style.display) {
        case "none":
            btn.style.display = "block";
            break;
        case "block":
            btn.style.display = "none";
            break;
    }
    
}
function dropDown()
{
    document.getElementById('dropdown').hidden = !document.getElementById('dropdown').hidden;
}

function dropDownClick(input)
{
    console.log(input.getAttribute("value"));
}
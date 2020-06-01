var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["nome"] = document.getElementById("nome").value;
    formData["email"] = document.getElementById("email").value;
    formData["tel"] = document.getElementById("tel").value;
    formData["cep"] = document.getElementById("cep").value;
    formData["rua"] = document.getElementById("rua").value;
    formData["numero"] = document.getElementById("numero").value;
    formData["bairro"] = document.getElementById("bairro").value;
    formData["cidade"] = document.getElementById("cidade").value;
    formData["estado"] = document.getElementById("estado").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("listaCadastro").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.nome;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.email;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.tel;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.cep;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.rua;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.numero;
    cell7 = newRow.insertCell(6);
    cell7.innerHTML = data.bairro;
    cell8 = newRow.insertCell(7);
    cell8.innerHTML = data.cidade;
    cell9 = newRow.insertCell(8);
    cell9.innerHTML = data.estado;
    cell10 = newRow.insertCell(9);
    cell10.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("tel").value = "";
    document.getElementById("cep").value = "";
    document.getElementById("rua").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("estado").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("nome").value = selectedRow.cells[0].innerHTML;
    document.getElementById("email").value = selectedRow.cells[1].innerHTML;
    document.getElementById("tel").value = selectedRow.cells[2].innerHTML;
    document.getElementById("cep").value = selectedRow.cells[3].innerHTML;
    document.getElementById("rua").value = selectedRow.cells[4].innerHTML;
    document.getElementById("numero").value = selectedRow.cells[5].innerHTML;
    document.getElementById("bairro").value = selectedRow.cells[6].innerHTML;
    document.getElementById("cidade").value = selectedRow.cells[7].innerHTML;
    document.getElementById("estado").value = selectedRow.cells[8].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.nome;
    selectedRow.cells[1].innerHTML = formData.email;
    selectedRow.cells[2].innerHTML = formData.tel;
    selectedRow.cells[3].innerHTML = formData.cep;
    selectedRow.cells[4].innerHTML = formData.rua;
    selectedRow.cells[5].innerHTML = formData.numero;
    selectedRow.cells[6].innerHTML = formData.bairro;
    selectedRow.cells[7].innerHTML = formData.cidade;
    selectedRow.cells[8].innerHTML = formData.estado;
}

function onDelete(td) {
    if (confirm('Deseja realmente deletar?')) {
        row = td.parentElement.parentElement;
        document.getElementById("listaCadastro").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("nome").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}

function buscaCep(cep){
    $.get('https://viacep.com.br/ws/'+ cep + '/json/', {}, function(response){
        if(response.erro !== true){
            $('#rua').val(response.logradouro);
            $('#bairro').val(response.bairro);
            $('#cidade').val(response.localidade);
            $('#estado').val(response.uf);
        }
    },'json');
}
const PASSWORD = "vayadmin123"; // СМЕНИ

function login(){
const p=document.getElementById('pass').value;
if(p===PASSWORD){
document.getElementById('login').style.display='none';
document.getElementById('panel').classList.remove('hidden');
}else{
document.getElementById('err').innerText='Неверный пароль';
}
}

function logout(){
location.reload();
}

function gen(){
const data={
version:version.value,
date:date.value,
changes:changes.value.split('\n')
};
out.innerText=JSON.stringify(data,null,2);
}

document.getElementById('inscprof').addEventListener('click', inspro);

async function inspro() {
  const supabase = window.supabaseClient;

  let nomp = document.getElementById('nomprof').value.trim();
  let matiere = document.getElementById('matiere').value.trim();
  localStorage.setItem('matiere_prof', matiere);

  let email = document.getElementById('emailprof').value.trim();
  let pass = document.getElementById('passprof').value;
  let repass = document.getElementById('repassprof').value;

  if (!nomp) return alert("Saisir le nom et prénom du prof");
  if (!matiere) return alert("Saisir votre matière");
  if (!email) return alert("Saisir votre email");
  if (!pass) return alert("Saisir votre mot de passe");
  if (pass != repass) return alert("Les deux mots de passe doivent être identiques");

  const { error } = await supabase
    .from('prof')
    .insert([{ nom: nomp, email: email, matiere: matiere, password: pass }]);

  if (error) {
    alert("Erreur Supabase : " + error.message);
    return false;
  }

  alert("Inscription réussie");

  document.getElementById('nomprof').value = "";
  document.getElementById('matiere').value = "";
  document.getElementById('emailprof').value = "";
  document.getElementById('passprof').value = "";
  document.getElementById('repassprof').value = "";

  showSection('form_pro');
  return false;
}


document.getElementById('conprof').addEventListener('click',login);

async function login(){
  const supabase = window.supabaseClient;
    let addres=document.getElementById('addp').value;
    let pass=document.getElementById('passp').value;
    if(!addres||!pass)return alert("remplir tous les champs");
        const{data,error}=await supabase
        .from('prof')
        .select('*')
        .eq('email',addres)
        .limit(1);

        if (error)return alert("error"+error.message);
        if (!data||data.length==0)return alert("addresse not founeded");
        if (data[0].password!=pass)return alert("mot de passe incorrect");
        window.location.href="prof.html";
}

 
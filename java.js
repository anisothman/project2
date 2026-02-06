window.onload = () => {
  if (!window.supabaseClient) {
    console.error("Supabase not initialized");
    return;
  }

  function showSection(id) {
    document.querySelectorAll('.content').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
  }

  window.showSection = showSection;
  showSection('princip');

  document.getElementById('btnInscription').addEventListener('click', verifetu);

  async function verifetu() {
    const supabase = window.supabaseClient;

    let nom = document.getElementById('nom').value.trim();
    let email = document.getElementById('email').value.trim();
    let pass = document.getElementById('passetu').value;
    let pass1 = document.getElementById('passetu1').value;

    if (!nom) return alert("Veuillez saisir le nom.");
    if (!email) return alert("Veuillez saisir l'email.");
    if (!pass) return alert("Veuillez saisir le mot de passe.");
    if (pass !== pass1) return alert("Les mots de passe ne correspondent pas.");

    const { error } = await supabase
      .from('etudiant')
      .insert([{ nom, email, password: pass }]);

    if (error) {
      alert("Erreur Supabase : " + error.message);
      return false;
    }

    alert("Inscription réussie ✅");

    document.getElementById('nom').value = "";
    document.getElementById('email').value = "";
    document.getElementById('passetu').value = "";
    document.getElementById('passetu1').value = "";

    showSection('form_etu');
    return false;
  }
};

document.getElementById("conet").addEventListener('click',loginetu);
async function loginetu(){
  const supabase = window.supabaseClient;

let add=document.getElementById("add").value;
let pass = document.getElementById("passl").value;

if (!pass||!add)return alert("remplir tous les champs");

const{data,error}=await supabase
.from('etudiant')
.select('*')
.eq('email',add)
.limit(1);
if (error)return alert('erreru lors de recherer' + error.message);
if (data.length==0)return alert("adresse no trouver");
if (data[0].password!=pass ) return alert("password incorrect");

const currentStudentName = localStorage.getItem('currentStudentName');

 window.location.href = "etu.html";

}

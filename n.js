document.getElementById("en").addEventListener('click', function(event){
  event.preventDefault(); // منع إعادة التحميل
  engister();
});
async function engister() {
  const supabase = window.supabaseClient;
  let matiere = document.getElementById('mat').value;

  let no = document.getElementById('np').value;
  let note = document.getElementById('notep').value;
  if (!no  || !note) {
    return alert("Remplir tous les champs");
  }

  // البحث عن الطالب حسب الاسم
  const { data: li, error: msg } = await supabase
    .from('etudiant')
    .select("*")
    .eq('nom', no)
    .limit(1);

  if (msg) {
    return alert("Erreur lors de la recherche de l'étudiant: " + msg.message);
  }

  if (!li || li.length === 0) {
    return alert("Étudiant introuvable");
  }
const { data: lie, error: msge } = await supabase
    .from('note')
    .select("*")
    .match({ nom: no, matiere: matiere })
    .limit(1);
if (lie.length!=0)return alert("deja rempli");
  // إدخال البيانات في جدول note
  const { data: lis, error: message } = await supabase
    .from('note')
    .insert([
      {
        id: li[0].id,
        matiere: matiere,
        nom: no,
        note: parseFloat(note)
      }
    ]);

  if (message) {
    return alert("Erreur lors de l'insertion: " + message.message);
  }

  return alert("Note enregistrée avec succès!");
}

// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

for (let i = 0; i < pieces.length; i++) {
  // Récupération de l'élément du DOM qui accueillera les fiches
  const sectionFiches = document.querySelector(".fiches");
  // Création d’une balise dédiée à une pièce automobile
  const pieceElement = document.createElement("article");

  const imageElement = document.createElement("img");
  imageElement.src = pieces[i].image;

  const nomElement = document.createElement("h2");
  nomElement.innerText = pieces[i].nom;

  const prixElement = document.createElement("p");
  prixElement.innerText = `Prix: ${pieces[i].prix} € (${
    pieces[i].prix < 35 ? "€" : "€€€"
  })`;

  const categorieElement = document.createElement("p");
  categorieElement.innerText = pieces[i].categorie ?? "(aucune catégorie)";

  const descriptionElement = document.createElement("p");
  descriptionElement.innerText =
    pieces[i].description ?? "Pas de description pour le moment.";

  const stockElement = document.createElement("p");
  stockElement.innerText = pieces[i].disponibilite
    ? "En stock"
    : "Rupture de stock";
  // On rattache la balise article à la section Fiches
  sectionFiches.appendChild(pieceElement);
  // On rattache nos éléments à pieceElement (la balise article)
  pieceElement.appendChild(imageElement);
  pieceElement.appendChild(nomElement);
  pieceElement.appendChild(prixElement);
  pieceElement.appendChild(categorieElement);
  pieceElement.appendChild(descriptionElement);
  pieceElement.appendChild(stockElement);
}

const boutonTrier = document.querySelector(".btn-trier");

boutonTrier.addEventListener("click", function () {
  const piecesOrdonnees = Array.from(pieces);
  piecesOrdonnees.sort(function (a, b) {
    return a.prix - b.prix;
  });
  console.log(piecesOrdonnees);
});

const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", function () {
  const piecesFiltrees = pieces.filter(function (piece) {
    return piece.prix <= 35;
  });
});

const boutonDescription = document.querySelector(".btn-no-description");

boutonDescription.addEventListener("click", () => {
  const piecesAvecDescription = pieces.filter((piece) => {
    return piece.description;
  });
  console.log(piecesAvecDescription);
});

const boutonDecroissant = document.querySelector(".btn-trier-desc");

boutonDecroissant.addEventListener("click", () => {
  const piecesOrdonneesDesc = Array.from(pieces);
  piecesOrdonneesDesc.sort((a, b) => {
    return b.prix - a.prix;
  });
  console.log(piecesOrdonneesDesc);
});

const noms = pieces.map((piece) => piece.nom);

for (let i = pieces.length - 1; i >= 0; i--) {
  if (pieces[i].prix > 35) {
    noms.splice(i, 1);
  }
}
console.log(noms);

//Création de la liste
const abordablesElements = document.createElement("ul");
//Ajout de chaque nom à la liste
for (let i = 0; i < noms.length; i++) {
  const nomElement = document.createElement("li");
  nomElement.innerText = noms[i];
  abordablesElements.appendChild(nomElement);
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector(".abordables").appendChild(abordablesElements);

const nomDisponibles = pieces.map((piece) => piece.nom);
const prixDisponibles = pieces.map((piece) => piece.prix);

for (let i = nomDisponibles.length - 1; i >= 0; i--) {
  if (!pieces[i].disponibilite) {
    nomDisponibles.splice(i, 1);
    prixDisponibles.splice(i, 1);
  }
}

const disponiblesElements = document.createElement("ul");

for (let i = 0; i < nomDisponibles.length; i++) {
  const nomElement = document.createElement("li");
  nomElement.innerText = `${nomDisponibles[i]} - ${prixDisponibles[i]} €`;
  disponiblesElements.appendChild(nomElement);
}

document.querySelector(".disponibles").appendChild(disponiblesElements);

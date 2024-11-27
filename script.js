// Classe pour les produits
class Produit {
    constructor(id, nom, prix, image) {
      this.id = id;
      this.nom = nom;
      this.prix = prix;
      this.image = image; // URL de l'image
    }
  }
  
  // Classe pour un élément dans le panier
  class ShoppingCartItem {
    constructor(produit, quantite) {
      this.produit = produit;
      this.quantite = quantite;
    }
  
    // Calculer le prix total de cet élément
    getPrixTotal() {
      return this.produit.prix * this.quantite;
    }
  }
  
  // Classe pour le panier
  class Panier {
    constructor() {
      this.elements = [];
    }
  
    // Ajouter un produit au panier
    ajouterElement(produit, quantite = 1) {
      const index = this.elements.findIndex(item => item.produit.id === produit.id);
      if (index !== -1) {
        this.elements[index].quantite += quantite;
      } else {
        this.elements.push(new ShoppingCartItem(produit, quantite));
      }
      this.afficherPanier();
    }
  
    // Supprimer un produit du panier
    supprimerElement(idProduit) {
      this.elements = this.elements.filter(item => item.produit.id !== idProduit);
      this.afficherPanier();
    }
  
    // Obtenir le prix total du panier
    obtenirTotal() {
      return this.elements.reduce((total, item) => total + item.getPrixTotal(), 0);
    }
  
    // Afficher le contenu du panier dans le DOM
    afficherPanier() {
      const panierContenu = document.getElementById('contenuPanier');
      const totalPanier = document.getElementById('totalPanier');
      panierContenu.innerHTML = '';
  
      if (this.elements.length === 0) {
        panierContenu.innerHTML = '<p>Le panier est vide.</p>';
        totalPanier.innerHTML = 'Total : 0€';
      } else {
        this.elements.forEach(item => {
          const elementHTML = document.createElement('div');
          elementHTML.classList.add('item');
          elementHTML.innerHTML = `
            <p>${item.produit.nom} (Quantité: ${item.quantite}) - Prix total: ${item.getPrixTotal()}€</p>
            <button class="btn-supprimer" data-id="${item.produit.id}">Supprimer</button>
          `;
          panierContenu.appendChild(elementHTML);
        });
        totalPanier.innerHTML = `Total : ${this.obtenirTotal().toFixed(2)}€`;
  
        // Ajouter les gestionnaires pour les boutons de suppression
        document.querySelectorAll('.btn-supprimer').forEach(button => {
          button.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            this.supprimerElement(id);
          });
        });
      }
    }
  }
  
  // Initialisation des produits avec des images
  const produits = [
    new Produit(1, 'T-shirt', 19.99, '/T-shirt.webp'),
    new Produit(2, 'Pantalon', 39.99, '/Pantalon.jpeg'),
    new Produit(3, 'Casquette', 14.99, '/Casquettes.webp')
  ];
  
  // Initialisation du panier
  const panier = new Panier();
  
  // Fonction pour afficher les produits dynamiquement dans le DOM
  function afficherProduits() {
    const produitsList = document.getElementById('produits-list');
  
    produits.forEach(produit => {
      const produitDiv = document.createElement('div');
      produitDiv.classList.add('produit');
      produitDiv.innerHTML = `
        <img src="${produit.image}" alt="${produit.nom}" class="produit-image">
        <p>${produit.nom} - ${produit.prix.toFixed(2)}€</p>
        <button class="btn-ajouter" data-id="${produit.id}">Ajouter au panier</button>
      `;
      produitsList.appendChild(produitDiv);
    });
  
    // Ajouter les gestionnaires pour les boutons d'ajout
    document.querySelectorAll('.btn-ajouter').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        const produit = produits.find(p => p.id === id);
        panier.ajouterElement(produit);
      });
    });
  }
  
  // Appeler la fonction pour afficher les produits dès que la page charge
  document.addEventListener('DOMContentLoaded', afficherProduits);
  
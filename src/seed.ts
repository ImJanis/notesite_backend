import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

import { records, users } from "./app/db/schema";

const db = drizzle({
  connection: {
    connectionString:
      process.env.DATABASE_URL ??
      "postgresql://postgres:postgres@localhost:5432/notesite",
  },
});

const TARGET_EMAIL = "janis.boucard@gmail.com";

const sampleRecords = [
  {
    sourceType: "phone_call",
    title: "Prise de contact - Client Martin",
    description:
      "Premier échange pour qualifier le projet de rénovation de la salle de bain",
    notesInternal:
      "Budget annoncé ~12-15k€. Proposer une visite sur site cette semaine. Client sensible aux délais.",
    status: "completed",
    durationSeconds: 1680,
  },
  {
    sourceType: "in_person",
    title: "Visite sur site - Appartement République",
    description:
      "Relevés, photos et clarification des besoins avant consultation des artisans",
    notesInternal:
      "Attention contraintes copro: horaires et évacuation gravats. Prévoir solution protection parties communes.",
    status: "completed",
    durationSeconds: 3120,
  },
  {
    sourceType: "visio",
    title: "Présentation comparative des devis",
    description:
      "Restitution client: 3 devis cuisine + explication des postes et options",
    notesInternal:
      "Mettre en avant difference matériaux/garanties. Client hésite entre standard et premium.",
    status: "completed",
    durationSeconds: 2780,
  },
  {
    sourceType: "phone_call",
    title: "RDV - Électricien Dupuis",
    description:
      "Validation disponibilité + ajustement du chiffrage pour mise aux normes",
    notesInternal:
      "Demander attestation décennale. Confirmer délai d'intervention et planning coordonné.",
    status: "completed",
    durationSeconds: 1240,
  },
  {
    sourceType: "in_person",
    title: "RDV de négociation - Projet Maison Leroy",
    description:
      "Négociation sur le lot menuiserie et arbitrage des options de finition",
    notesInternal:
      "Objectif: -5% sur le lot ou ajout de prestations sans surcoût. Client veut sécuriser date de démarrage.",
    status: "completed",
    durationSeconds: 2460,
  },
  {
    sourceType: "in_person",
    title: "Point de suivi chantier - J+10",
    description:
      "Coordination multi-lots (plomberie, carrelage, peinture) et gestion des imprévus",
    notesInternal:
      "Risque retard carrelage livraison. Prévoir plan B ou ré-ordonnancer peinture.",
    status: "recording",
    durationSeconds: 0,
  },
  {
    sourceType: "other",
    title: "Note interne - Qualification projet en attente",
    description: "Synthèse rapide après audio instantané non rattaché à un RDV",
    notesInternal:
      "À rattacher au projet 'Studio Opéra'. Créer un RDV d'étude et relancer le client pour valider le budget.",
    status: "created",
    durationSeconds: 0,
  },
  {
    sourceType: "phone_call",
    title: "Prise de contact - Client Martin",
    description:
      "Premier échange pour qualifier le projet de rénovation de la salle de bain",
    notesInternal:
      "Budget annoncé ~12-15k€. Proposer une visite sur site cette semaine. Client sensible aux délais.",
    status: "completed",
    durationSeconds: 1680,
  },
  {
    sourceType: "in_person",
    title: "Visite sur site - Appartement République",
    description:
      "Relevés, photos et clarification des besoins avant consultation des artisans",
    notesInternal:
      "Attention contraintes copro: horaires et évacuation gravats. Prévoir solution protection parties communes.",
    status: "completed",
    durationSeconds: 3120,
  },
  {
    sourceType: "visio",
    title: "Présentation comparative des devis",
    description:
      "Restitution client: 3 devis cuisine + explication des postes et options",
    notesInternal:
      "Mettre en avant difference matériaux/garanties. Client hésite entre standard et premium.",
    status: "completed",
    durationSeconds: 2780,
  },
  {
    sourceType: "phone_call",
    title: "RDV - Électricien Dupuis",
    description:
      "Validation disponibilité + ajustement du chiffrage pour mise aux normes",
    notesInternal:
      "Demander attestation décennale. Confirmer délai d'intervention et planning coordonné.",
    status: "completed",
    durationSeconds: 1240,
  },
  {
    sourceType: "in_person",
    title: "RDV de négociation - Projet Maison Leroy",
    description:
      "Négociation sur le lot menuiserie et arbitrage des options de finition",
    notesInternal:
      "Objectif: -5% sur le lot ou ajout de prestations sans surcoût. Client veut sécuriser date de démarrage.",
    status: "completed",
    durationSeconds: 2460,
  },
  {
    sourceType: "in_person",
    title: "Point de suivi chantier - J+10",
    description:
      "Coordination multi-lots (plomberie, carrelage, peinture) et gestion des imprévus",
    notesInternal:
      "Risque retard carrelage livraison. Prévoir plan B ou ré-ordonnancer peinture.",
    status: "recording",
    durationSeconds: 0,
  },
  {
    sourceType: "other",
    title: "Note interne - Qualification projet en attente",
    description: "Synthèse rapide après audio instantané non rattaché à un RDV",
    notesInternal:
      "À rattacher au projet 'Studio Opéra'. Créer un RDV d'étude et relancer le client pour valider le budget.",
    status: "created",
    durationSeconds: 0,
  },
  {
    sourceType: "phone_call",
    title: "Prise de contact - Client Martin",
    description:
      "Premier échange pour qualifier le projet de rénovation de la salle de bain",
    notesInternal:
      "Budget annoncé ~12-15k€. Proposer une visite sur site cette semaine. Client sensible aux délais.",
    status: "completed",
    durationSeconds: 1680,
  },
  {
    sourceType: "in_person",
    title: "Visite sur site - Appartement République",
    description:
      "Relevés, photos et clarification des besoins avant consultation des artisans",
    notesInternal:
      "Attention contraintes copro: horaires et évacuation gravats. Prévoir solution protection parties communes.",
    status: "completed",
    durationSeconds: 3120,
  },
  {
    sourceType: "visio",
    title: "Présentation comparative des devis",
    description:
      "Restitution client: 3 devis cuisine + explication des postes et options",
    notesInternal:
      "Mettre en avant difference matériaux/garanties. Client hésite entre standard et premium.",
    status: "completed",
    durationSeconds: 2780,
  },
  {
    sourceType: "phone_call",
    title: "RDV - Électricien Dupuis",
    description:
      "Validation disponibilité + ajustement du chiffrage pour mise aux normes",
    notesInternal:
      "Demander attestation décennale. Confirmer délai d'intervention et planning coordonné.",
    status: "completed",
    durationSeconds: 1240,
  },
  {
    sourceType: "in_person",
    title: "RDV de négociation - Projet Maison Leroy",
    description:
      "Négociation sur le lot menuiserie et arbitrage des options de finition",
    notesInternal:
      "Objectif: -5% sur le lot ou ajout de prestations sans surcoût. Client veut sécuriser date de démarrage.",
    status: "completed",
    durationSeconds: 2460,
  },
  {
    sourceType: "in_person",
    title: "Point de suivi chantier - J+10",
    description:
      "Coordination multi-lots (plomberie, carrelage, peinture) et gestion des imprévus",
    notesInternal:
      "Risque retard carrelage livraison. Prévoir plan B ou ré-ordonnancer peinture.",
    status: "recording",
    durationSeconds: 0,
  },
  {
    sourceType: "other",
    title: "Note interne - Qualification projet en attente",
    description: "Synthèse rapide après audio instantané non rattaché à un RDV",
    notesInternal:
      "À rattacher au projet 'Studio Opéra'. Créer un RDV d'étude et relancer le client pour valider le budget.",
    status: "created",
    durationSeconds: 0,
  },
  {
    sourceType: "phone_call",
    title: "Prise de contact - Client Martin",
    description:
      "Premier échange pour qualifier le projet de rénovation de la salle de bain",
    notesInternal:
      "Budget annoncé ~12-15k€. Proposer une visite sur site cette semaine. Client sensible aux délais.",
    status: "completed",
    durationSeconds: 1680,
  },
  {
    sourceType: "in_person",
    title: "Visite sur site - Appartement République",
    description:
      "Relevés, photos et clarification des besoins avant consultation des artisans",
    notesInternal:
      "Attention contraintes copro: horaires et évacuation gravats. Prévoir solution protection parties communes.",
    status: "completed",
    durationSeconds: 3120,
  },
  {
    sourceType: "visio",
    title: "Présentation comparative des devis",
    description:
      "Restitution client: 3 devis cuisine + explication des postes et options",
    notesInternal:
      "Mettre en avant difference matériaux/garanties. Client hésite entre standard et premium.",
    status: "completed",
    durationSeconds: 2780,
  },
  {
    sourceType: "phone_call",
    title: "RDV - Électricien Dupuis",
    description:
      "Validation disponibilité + ajustement du chiffrage pour mise aux normes",
    notesInternal:
      "Demander attestation décennale. Confirmer délai d'intervention et planning coordonné.",
    status: "completed",
    durationSeconds: 1240,
  },
  {
    sourceType: "in_person",
    title: "RDV de négociation - Projet Maison Leroy",
    description:
      "Négociation sur le lot menuiserie et arbitrage des options de finition",
    notesInternal:
      "Objectif: -5% sur le lot ou ajout de prestations sans surcoût. Client veut sécuriser date de démarrage.",
    status: "completed",
    durationSeconds: 2460,
  },
  {
    sourceType: "in_person",
    title: "Point de suivi chantier - J+10",
    description:
      "Coordination multi-lots (plomberie, carrelage, peinture) et gestion des imprévus",
    notesInternal:
      "Risque retard carrelage livraison. Prévoir plan B ou ré-ordonnancer peinture.",
    status: "recording",
    durationSeconds: 0,
  },
  {
    sourceType: "other",
    title: "Note interne - Qualification projet en attente",
    description: "Synthèse rapide après audio instantané non rattaché à un RDV",
    notesInternal:
      "À rattacher au projet 'Studio Opéra'. Créer un RDV d'étude et relancer le client pour valider le budget.",
    status: "created",
    durationSeconds: 0,
  },
  {
    sourceType: "phone_call",
    title: "Prise de contact - Client Martin",
    description:
      "Premier échange pour qualifier le projet de rénovation de la salle de bain",
    notesInternal:
      "Budget annoncé ~12-15k€. Proposer une visite sur site cette semaine. Client sensible aux délais.",
    status: "completed",
    durationSeconds: 1680,
  },
  {
    sourceType: "in_person",
    title: "Visite sur site - Appartement République",
    description:
      "Relevés, photos et clarification des besoins avant consultation des artisans",
    notesInternal:
      "Attention contraintes copro: horaires et évacuation gravats. Prévoir solution protection parties communes.",
    status: "completed",
    durationSeconds: 3120,
  },
  {
    sourceType: "visio",
    title: "Présentation comparative des devis",
    description:
      "Restitution client: 3 devis cuisine + explication des postes et options",
    notesInternal:
      "Mettre en avant difference matériaux/garanties. Client hésite entre standard et premium.",
    status: "completed",
    durationSeconds: 2780,
  },
  {
    sourceType: "phone_call",
    title: "RDV - Électricien Dupuis",
    description:
      "Validation disponibilité + ajustement du chiffrage pour mise aux normes",
    notesInternal:
      "Demander attestation décennale. Confirmer délai d'intervention et planning coordonné.",
    status: "completed",
    durationSeconds: 1240,
  },
  {
    sourceType: "in_person",
    title: "RDV de négociation - Projet Maison Leroy",
    description:
      "Négociation sur le lot menuiserie et arbitrage des options de finition",
    notesInternal:
      "Objectif: -5% sur le lot ou ajout de prestations sans surcoût. Client veut sécuriser date de démarrage.",
    status: "completed",
    durationSeconds: 2460,
  },
  {
    sourceType: "in_person",
    title: "Point de suivi chantier - J+10",
    description:
      "Coordination multi-lots (plomberie, carrelage, peinture) et gestion des imprévus",
    notesInternal:
      "Risque retard carrelage livraison. Prévoir plan B ou ré-ordonnancer peinture.",
    status: "recording",
    durationSeconds: 0,
  },
  {
    sourceType: "other",
    title: "Note interne - Qualification projet en attente",
    description: "Synthèse rapide après audio instantané non rattaché à un RDV",
    notesInternal:
      "À rattacher au projet 'Studio Opéra'. Créer un RDV d'étude et relancer le client pour valider le budget.",
    status: "created",
    durationSeconds: 0,
  },
  {
    sourceType: "phone_call",
    title: "Prise de contact - Client Martin",
    description:
      "Premier échange pour qualifier le projet de rénovation de la salle de bain",
    notesInternal:
      "Budget annoncé ~12-15k€. Proposer une visite sur site cette semaine. Client sensible aux délais.",
    status: "completed",
    durationSeconds: 1680,
  },
  {
    sourceType: "in_person",
    title: "Visite sur site - Appartement République",
    description:
      "Relevés, photos et clarification des besoins avant consultation des artisans",
    notesInternal:
      "Attention contraintes copro: horaires et évacuation gravats. Prévoir solution protection parties communes.",
    status: "completed",
    durationSeconds: 3120,
  },
  {
    sourceType: "visio",
    title: "Présentation comparative des devis",
    description:
      "Restitution client: 3 devis cuisine + explication des postes et options",
    notesInternal:
      "Mettre en avant difference matériaux/garanties. Client hésite entre standard et premium.",
    status: "completed",
    durationSeconds: 2780,
  },
  {
    sourceType: "phone_call",
    title: "RDV - Électricien Dupuis",
    description:
      "Validation disponibilité + ajustement du chiffrage pour mise aux normes",
    notesInternal:
      "Demander attestation décennale. Confirmer délai d'intervention et planning coordonné.",
    status: "completed",
    durationSeconds: 1240,
  },
  {
    sourceType: "in_person",
    title: "RDV de négociation - Projet Maison Leroy",
    description:
      "Négociation sur le lot menuiserie et arbitrage des options de finition",
    notesInternal:
      "Objectif: -5% sur le lot ou ajout de prestations sans surcoût. Client veut sécuriser date de démarrage.",
    status: "completed",
    durationSeconds: 2460,
  },
  {
    sourceType: "in_person",
    title: "Point de suivi chantier - J+10",
    description:
      "Coordination multi-lots (plomberie, carrelage, peinture) et gestion des imprévus",
    notesInternal:
      "Risque retard carrelage livraison. Prévoir plan B ou ré-ordonnancer peinture.",
    status: "recording",
    durationSeconds: 0,
  },
  {
    sourceType: "other",
    title: "Note interne - Qualification projet en attente",
    description: "Synthèse rapide après audio instantané non rattaché à un RDV",
    notesInternal:
      "À rattacher au projet 'Studio Opéra'. Créer un RDV d'étude et relancer le client pour valider le budget.",
    status: "created",
    durationSeconds: 0,
  },
  {
    sourceType: "phone_call",
    title: "Prise de contact - Client Martin",
    description:
      "Premier échange pour qualifier le projet de rénovation de la salle de bain",
    notesInternal:
      "Budget annoncé ~12-15k€. Proposer une visite sur site cette semaine. Client sensible aux délais.",
    status: "completed",
    durationSeconds: 1680,
  },
  {
    sourceType: "in_person",
    title: "Visite sur site - Appartement République",
    description:
      "Relevés, photos et clarification des besoins avant consultation des artisans",
    notesInternal:
      "Attention contraintes copro: horaires et évacuation gravats. Prévoir solution protection parties communes.",
    status: "completed",
    durationSeconds: 3120,
  },
  {
    sourceType: "visio",
    title: "Présentation comparative des devis",
    description:
      "Restitution client: 3 devis cuisine + explication des postes et options",
    notesInternal:
      "Mettre en avant difference matériaux/garanties. Client hésite entre standard et premium.",
    status: "completed",
    durationSeconds: 2780,
  },
  {
    sourceType: "phone_call",
    title: "RDV - Électricien Dupuis",
    description:
      "Validation disponibilité + ajustement du chiffrage pour mise aux normes",
    notesInternal:
      "Demander attestation décennale. Confirmer délai d'intervention et planning coordonné.",
    status: "completed",
    durationSeconds: 1240,
  },
  {
    sourceType: "in_person",
    title: "RDV de négociation - Projet Maison Leroy",
    description:
      "Négociation sur le lot menuiserie et arbitrage des options de finition",
    notesInternal:
      "Objectif: -5% sur le lot ou ajout de prestations sans surcoût. Client veut sécuriser date de démarrage.",
    status: "completed",
    durationSeconds: 2460,
  },
  {
    sourceType: "in_person",
    title: "Point de suivi chantier - J+10",
    description:
      "Coordination multi-lots (plomberie, carrelage, peinture) et gestion des imprévus",
    notesInternal:
      "Risque retard carrelage livraison. Prévoir plan B ou ré-ordonnancer peinture.",
    status: "recording",
    durationSeconds: 0,
  },
  {
    sourceType: "other",
    title: "Note interne - Qualification projet en attente",
    description: "Synthèse rapide après audio instantané non rattaché à un RDV",
    notesInternal:
      "À rattacher au projet 'Studio Opéra'. Créer un RDV d'étude et relancer le client pour valider le budget.",
    status: "created",
    durationSeconds: 0,
  },
  {
    sourceType: "phone_call",
    title: "Prise de contact - Client Martin",
    description:
      "Premier échange pour qualifier le projet de rénovation de la salle de bain",
    notesInternal:
      "Budget annoncé ~12-15k€. Proposer une visite sur site cette semaine. Client sensible aux délais.",
    status: "completed",
    durationSeconds: 1680,
  },
  {
    sourceType: "in_person",
    title: "Visite sur site - Appartement République",
    description:
      "Relevés, photos et clarification des besoins avant consultation des artisans",
    notesInternal:
      "Attention contraintes copro: horaires et évacuation gravats. Prévoir solution protection parties communes.",
    status: "completed",
    durationSeconds: 3120,
  },
  {
    sourceType: "visio",
    title: "Présentation comparative des devis",
    description:
      "Restitution client: 3 devis cuisine + explication des postes et options",
    notesInternal:
      "Mettre en avant difference matériaux/garanties. Client hésite entre standard et premium.",
    status: "completed",
    durationSeconds: 2780,
  },
  {
    sourceType: "phone_call",
    title: "RDV - Électricien Dupuis",
    description:
      "Validation disponibilité + ajustement du chiffrage pour mise aux normes",
    notesInternal:
      "Demander attestation décennale. Confirmer délai d'intervention et planning coordonné.",
    status: "completed",
    durationSeconds: 1240,
  },
  {
    sourceType: "in_person",
    title: "RDV de négociation - Projet Maison Leroy",
    description:
      "Négociation sur le lot menuiserie et arbitrage des options de finition",
    notesInternal:
      "Objectif: -5% sur le lot ou ajout de prestations sans surcoût. Client veut sécuriser date de démarrage.",
    status: "completed",
    durationSeconds: 2460,
  },
  {
    sourceType: "in_person",
    title: "Point de suivi chantier - J+10",
    description:
      "Coordination multi-lots (plomberie, carrelage, peinture) et gestion des imprévus",
    notesInternal:
      "Risque retard carrelage livraison. Prévoir plan B ou ré-ordonnancer peinture.",
    status: "recording",
    durationSeconds: 0,
  },
  {
    sourceType: "other",
    title: "Note interne - Qualification projet en attente",
    description: "Synthèse rapide après audio instantané non rattaché à un RDV",
    notesInternal:
      "À rattacher au projet 'Studio Opéra'. Créer un RDV d'étude et relancer le client pour valider le budget.",
    status: "created",
    durationSeconds: 0,
  },
];

async function seed() {
  console.log(`Looking for user with email: ${TARGET_EMAIL}`);

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, TARGET_EMAIL))
    .limit(1);

  if (!user) {
    console.error(`User with email ${TARGET_EMAIL} not found.`);
    console.error("Please create the user first via the auth flow.");
    process.exit(1);
  }

  console.log(`Found user: ${user.name} (${user.id})`);

  const existingRecords = await db
    .select()
    .from(records)
    .where(eq(records.userId, user.id));

  if (existingRecords.length > 0) {
    console.log(
      `User already has ${existingRecords.length} records. Skipping.`,
    );
    process.exit(0);
  }

  console.log(`Inserting ${sampleRecords.length} records...`);

  await db.insert(records).values(
    sampleRecords.map((record) => ({
      ...record,
      userId: user.id,
    })),
  );

  console.log("Seeding complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

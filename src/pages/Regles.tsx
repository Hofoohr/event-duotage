import Hero from '../components/Hero'
import config from '../data/config.json'
import { dungeonGroups, eventEnd, eventStart, formatDate } from '../lib/tournament'

const day = (d: Date) => formatDate(d.toISOString(), { day: 'numeric', month: 'long', year: 'numeric' })

export default function Regles() {
  return (
    <div className="min-h-screen">
      <Hero
        title="Règlement du tournoi"
        subtitle="Toutes les règles et conditions de participation à l'épreuve de duotage sur Ombre."
      />
      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
        <section className="mb-12 bg-gray-800/30 rounded-lg p-6 sm:p-8 border border-gray-700">
          <h2 className="text-3xl font-bold mb-4 text-white">Objectif de l'épreuve</h2>
          <p className="text-gray-300 leading-relaxed">
            L'<strong className="text-white">Event Duotage — Génération Miracle</strong> est un parcours de duotage sur le serveur Ombre. Les équipes peuvent être composées de <strong className="text-white">deux personnes différentes ou d'une seule personne en duocompte</strong>. Les salles comme les boss doivent être réalisées en duo. <strong className="text-white">Celui qui va le plus loin gagne.</strong>
          </p>
          <p className="text-gray-400 mt-4">
            L'événement se déroule du <strong className="text-white">{day(eventStart)}</strong> au <strong className="text-white">{day(eventEnd)}</strong>.
          </p>
        </section>

        {dungeonGroups.map(g => (
          <section key={g.key} className="mb-12 bg-gray-800/30 rounded-lg p-6 sm:p-8 border border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-white">{g.title}</h2>
            <p className="text-sm text-gray-400 mb-4 italic">{g.hint}</p>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              {g.dungeons.map(d => (
                <li key={d.id}>{d.name}</li>
              ))}
            </ol>
          </section>
        ))}

<section className="mb-12 bg-gradient-to-r from-yellow-900/20 to-yellow-800/20 rounded-lg p-6 sm:p-8 border border-yellow-600/30"><h2 className="text-3xl font-bold mb-6 text-yellow-300">Cashprize</h2><div className="space-y-4 text-gray-300"><p>Le cashprize sera réparti en fonction du <strong className="text-white">nombre de joueurs dans l'équipe</strong>.</p><p>Une équipe composée de <strong className="text-white">deux joueurs différents</strong> gagnera <strong className="text-yellow-300">deux fois plus</strong> de cashprize qu'une équipe composée d'un seul joueur en duocompte.</p><p>Cashprize actuel : <strong className="text-yellow-300">environ {config.cashPrizeMin} – {config.cashPrizeMax} M kamas</strong>.</p><p className="italic">Le montant du cashprize est mis à jour sur le site.</p></div></section>
<section className="mb-12 bg-gray-800/30 rounded-lg p-6 sm:p-8 border border-gray-700"><h2 className="text-3xl font-bold mb-6 text-white">Règles de personnage et d'équipement</h2><ul className="space-y-3 text-gray-300"><li>• <strong className="text-white">Niveaux maximum :</strong> 105 pour le premier palier, puis 165. Pensez à verrouiller votre expérience. Un combat fait avec un niveau d'avance ne sera pas accepté.</li><li>• <strong className="text-white">Familiers :</strong> limités au niveau 85.</li><li>• <strong className="text-white">Montures :</strong> dragodindes, volkornes et muldos autorisés jusqu'au niveau 200.</li><li>• <strong className="text-white">Dofus :</strong> aucun Dofus autorisé, à l'exception du Dokoko et de l'Argenté. Pour les donjons THL, d'autres Dofus pourront éventuellement être ajoutés à la liste des Dofus autorisés.</li><li>• <strong className="text-white">Exos PA/PM/PO/Invo :</strong> interdits, à l'exception du Gelano PM, PO ou 1 Invo.</li><li>• <strong className="text-white">Exos 2% dommages :</strong> interdits.</li><li>• <strong className="text-white">Brisage PA/PM/PO :</strong> interdit.</li><li>• <strong className="text-white">Parchotage :</strong> interdit.</li><li>• <strong className="text-white">Runes de transcendance :</strong> interdites.</li><li>• <strong className="text-white">Changement de classe :</strong> interdit.</li><li>• <strong className="text-white">Bonbons, tatouages, éclats et autres altérations :</strong> formellement interdits.</li><li>• <strong className="text-white">Altérations donnant des bonus ou malus :</strong> interdites, l'altération Ivoire est donc interdite.</li><li>• <strong className="text-white">Changements de stuff :</strong> autorisés entre les combats.</li></ul></section>
<section className="mb-12 bg-gray-800/30 rounded-lg p-6 sm:p-8 border border-gray-700"><h2 className="text-3xl font-bold mb-6 text-white">Règles des duotages</h2><ul className="space-y-3 text-gray-300"><li>• Les <strong className="text-white">salles</strong> doivent également être réalisées en duo.</li><li>• La run se termine dès la <strong className="text-white">première mort</strong> lors d'un duotage.</li><li>• Une mort lors d'un duotage, boss ou salle, définit définitivement le placement de l'équipe. Il est interdit de recommencer une run.</li><li>• Seules les morts lors des duotages comptent. En cas de mort lors d'une agro hors tournoi, vous pouvez remonter le personnage et reprendre le tournoi où vous en étiez.</li><li>• En cas d'égalité (mort au même combat), les équipes sont <strong className="text-white">à égalité dans le classement</strong>.</li><li>• Les changements de stuff sont autorisés entre les combats.</li></ul></section>
<section className="mb-12 bg-gray-800/30 rounded-lg p-6 sm:p-8 border border-gray-700"><h2 className="text-3xl font-bold mb-6 text-white">Comment participer</h2><ol className="space-y-3 text-gray-300 list-decimal list-inside"><li>Créez un post dans <strong className="text-white">#participation-event-duotage</strong>.</li><li>Utilisez vos pseudos ou le nom de votre team en titre.</li><li>Postez tous vos screens dans ce post. Vous pouvez également expliquer comment vous avez appréhendé le combat.</li><li>Postez les screens des <strong className="text-white">stats + stuff joué</strong> ainsi que les screens des combats. Consultez <strong className="text-white">#modalité-de-participation</strong> pour le format attendu.</li><li>Votre stuff doit être visible avec l'option <strong className="text-white">« afficher le profil »</strong> en jeu.</li><li>Respectez les niveaux maximums et pensez à verrouiller votre expérience.</li><li>Les combats doivent être réalisés dans l'ordre défini, sauf pour les cinq derniers combats niveau 165 qui sont en ordre libre.</li><li>Le fait de faire les <strong className="text-white">combats miroir sur officiel pour train</strong> est interdit.</li></ol><div className="mt-6 bg-blue-900/20 border border-blue-600/30 rounded-lg p-4"><p className="text-blue-300"><strong>Aide financière :</strong> si vous avez des problèmes de budget pour vos stuffs, vous pouvez me MP et nous pourrons peut-être nous arranger.</p></div></section>
<section className="mb-12 bg-gray-800/30 rounded-lg p-6 sm:p-8 border border-gray-700"><h2 className="text-3xl font-bold mb-6 text-white">Départage</h2><p className="text-gray-300">En cas d'égalité, notamment si plusieurs équipes meurent au même combat, les équipes sont <strong className="text-white">à égalité dans le classement</strong>.</p><p className="text-gray-400 mt-4">Le classement suit avant tout la progression : <strong className="text-white">celui qui va le plus loin gagne</strong>.</p></section>
      </div>
    </div>
  )
}

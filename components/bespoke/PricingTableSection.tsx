'use client'

import { motion } from 'framer-motion'

export type PricingRow = {
  style: string
  metal: string
  startingFrom: string
  includes: string
}

export const pricingTables: Record<string, PricingRow[]> = {
  'engagement-rings': [
    { style: 'Solitaire (0.5ct lab)', metal: '14K Gold', startingFrom: '$1,800', includes: '0.5ct lab-grown diamond, 4-prong setting, free resize' },
    { style: 'Solitaire (1ct lab)', metal: '14K Gold', startingFrom: '$2,800', includes: '1ct lab-grown diamond, 4 or 6-prong, certified stone' },
    { style: 'Solitaire (1ct natural)', metal: '14K Gold', startingFrom: '$6,500', includes: '1ct GIA-graded natural diamond, certified, free resize' },
    { style: 'Halo (1ct centre)', metal: '14K Gold', startingFrom: '$3,800', includes: '1ct centre + pavé halo, 30+ accent diamonds' },
    { style: 'Three-Stone (1+0.5+0.5ct)', metal: '14K Gold', startingFrom: '$4,500', includes: '2ctw mixed natural/lab option, matching side stones' },
    { style: 'Vintage / Art Deco', metal: '18K Gold', startingFrom: '$5,000', includes: 'Milgrain detailing, filigree, vintage-inspired settings' },
    { style: 'Platinum Solitaire (1ct)', metal: 'Platinum', startingFrom: '$4,500', includes: 'Most durable metal, hypoallergenic, lifetime plating' },
  ],
  'wedding-bands': [
    { style: 'Plain Band (3mm)', metal: '10K Gold', startingFrom: '$900', includes: 'Comfort or standard fit, polished or brushed' },
    { style: 'Plain Band (4-5mm)', metal: '14K Gold', startingFrom: '$1,400', includes: 'Comfort fit, any finish, free engraving' },
    { style: 'Plain Band', metal: 'Platinum', startingFrom: '$1,800', includes: 'Most durable, hypoallergenic, lifetime polish' },
    { style: 'Half-Eternity Diamond', metal: '14K Gold', startingFrom: '$3,500', includes: '1-1.5ctw channel or shared-prong, lifetime warranty' },
    { style: 'Full Eternity Diamond', metal: '14K Gold', startingFrom: '$6,000', includes: '2.5-3ctw continuous diamonds, any stone shape' },
    { style: 'Men\'s Wide Band (6-8mm)', metal: '14K Gold', startingFrom: '$2,200', includes: 'Hammered, brushed, or polished, free engraving' },
    { style: 'Contour / Shaped', metal: '14K Gold', startingFrom: '$1,600', includes: 'Custom-shaped to nest flush against your engagement ring' },
  ],
  'rings': [
    { style: 'Signet Ring (Plain)', metal: '10K Gold', startingFrom: '$1,400', includes: 'Hand-engraved initial or crest, any finish' },
    { style: 'Signet Ring (Diamond-Set)', metal: '14K Gold', startingFrom: '$2,500', includes: 'Pavé diamond face, engraved initial or crest' },
    { style: 'Statement Ring', metal: '14K Gold', startingFrom: '$1,800', includes: 'Any centre stone, any shape, custom gallery' },
    { style: 'Stackable Set (3 bands)', metal: '14K Gold', startingFrom: '$2,500', includes: '3 coordinating bands, mix of textures and stones' },
    { style: 'Cocktail Ring (2ct+ centre)', metal: '18K Gold', startingFrom: '$4,500', includes: 'Large centre gem or diamond, halo or bezel' },
    { style: 'Men\'s Ring (Engraved)', metal: '10K Gold', startingFrom: '$1,600', includes: 'Custom engraving, any font including Arabic' },
  ],
  'pendants': [
    { style: 'Initial Pendant', metal: '10K Gold', startingFrom: '$1,000', includes: 'Block, script, or custom font — chain sold separately' },
    { style: 'Name Pendant (Bubble Letter)', metal: '14K Gold', startingFrom: '$1,600', includes: 'Up to 6 letters, any font, polished finish' },
    { style: 'Name Pendant (Diamond-Set)', metal: '14K Gold', startingFrom: '$2,500', includes: 'Pavé diamond coverage, VS or VVS clarity option' },
    { style: 'Arabic Calligraphy', metal: '14K Gold', startingFrom: '$1,800', includes: 'Any name, verse, or phrase — Thuluth, Naskh, Diwani fonts' },
    { style: 'Religious (Allah / Ayat al-Kursi)', metal: '14K Gold', startingFrom: '$2,200', includes: 'Traditional calligraphy or modern interpretation' },
    { style: 'Photo Pendant', metal: '14K Gold', startingFrom: '$1,800', includes: 'Laser-engraved or dome-set photo, diamond halo optional' },
    { style: 'Religious Symbol (Cross / Hamsa / Om)', metal: '14K Gold', startingFrom: '$1,400', includes: 'Traditional or modern design, diamond option' },
    { style: 'Custom Logo / Brand', metal: '14K Gold', startingFrom: '$2,500', includes: 'From logo file, CAD approval, any complexity' },
  ],
  'chains': [
    { style: 'Cuban Link 5mm (22")', metal: '10K Gold', startingFrom: '$2,500', includes: '~45g solid, box clasp, double-lock' },
    { style: 'Cuban Link 8mm (22")', metal: '14K Gold', startingFrom: '$6,500', includes: '~75g solid, box clasp with safety, diamond-cut option' },
    { style: 'Cuban Link 10mm+ (24")', metal: '14K Gold', startingFrom: '$10,500', includes: 'Heavyweight 110g+, diamond-set clasp option' },
    { style: 'Rope Chain 4mm (22")', metal: '10K Gold', startingFrom: '$1,400', includes: 'Solid rope construction, lobster clasp' },
    { style: 'Franco Chain 4mm (22")', metal: '14K Gold', startingFrom: '$2,400', includes: 'Solid franco link, box clasp' },
    { style: 'Figaro Chain 5mm (22")', metal: '14K Gold', startingFrom: '$2,200', includes: 'Classic figaro pattern, lobster or box clasp' },
    { style: 'Iced-Out Cuban (5mm, 22")', metal: '14K Gold', startingFrom: '$9,500', includes: 'Fully pavé VS diamonds across every link' },
  ],
  'earrings': [
    { style: 'Diamond Studs (0.5ctw lab)', metal: '14K Gold', startingFrom: '$1,000', includes: 'Push-back posts, lab-grown diamonds' },
    { style: 'Diamond Studs (1ctw lab)', metal: '14K Gold', startingFrom: '$1,800', includes: 'Screw-back option, IGI certified' },
    { style: 'Diamond Studs (1ctw natural)', metal: '14K Gold', startingFrom: '$4,000', includes: 'GIA graded, screw-back, matched pair' },
    { style: 'Gold Hoops (Plain)', metal: '14K Gold', startingFrom: '$1,100', includes: 'Any diameter from 10mm to 50mm+' },
    { style: 'Pavé Diamond Hoops', metal: '14K Gold', startingFrom: '$2,500', includes: '~1ctw pavé coverage, huggie or small hoop' },
    { style: 'Huggies (Plain or Diamond)', metal: '14K Gold', startingFrom: '$900', includes: 'Everyday small hoops, plain or diamond-set' },
    { style: 'Chandelier / Drop', metal: '14K Gold', startingFrom: '$2,200', includes: 'Multi-stone setting, custom-designed' },
  ],
  'bracelets': [
    { style: 'Tennis Bracelet 2ctw (lab)', metal: '14K Gold', startingFrom: '$2,500', includes: '7" length, safety chain, double-lock clasp' },
    { style: 'Tennis Bracelet 3ctw (lab)', metal: '14K Gold', startingFrom: '$3,800', includes: '7" length, IGI certified, lifetime warranty' },
    { style: 'Tennis Bracelet 5ctw (lab)', metal: '14K Gold', startingFrom: '$6,500', includes: '7" length, premium VS or VVS option' },
    { style: 'Tennis Bracelet 3ctw (natural)', metal: '14K Gold', startingFrom: '$8,500', includes: 'GIA-graded naturals, safety chain' },
    { style: 'Cuban Link Bracelet 7mm', metal: '14K Gold', startingFrom: '$2,800', includes: '8" length, solid construction, box clasp' },
    { style: 'ID Bracelet (Engraved)', metal: '14K Gold', startingFrom: '$2,200', includes: 'Solid ID plate, any engraving, attached chain' },
    { style: 'Bangle (Plain)', metal: '14K Gold', startingFrom: '$1,800', includes: 'Solid bangle, any diameter, hinged option' },
    { style: 'Cuff (Diamond-Accent)', metal: '14K Gold', startingFrom: '$3,500', includes: 'Solid cuff with pavé diamond detailing' },
  ],
  'grillz': [
    { style: 'Single Tooth (Plain)', metal: '10K Gold', startingFrom: '$500', includes: 'Custom mold fit, polished or matte finish' },
    { style: 'Single Tooth (Diamond-Set)', metal: '14K Gold', startingFrom: '$1,400', includes: 'Pavé VS or VVS diamonds, custom setting' },
    { style: 'Top 6 (Plain)', metal: '10K Gold', startingFrom: '$2,000', includes: 'Solid 10K, polished, removable, custom mold' },
    { style: 'Top 6 (Diamond-Set VS)', metal: '14K Gold', startingFrom: '$4,500', includes: 'Pavé VS diamonds across 6 teeth, custom mold' },
    { style: 'Top 6 (VVS Clarity)', metal: '14K Gold', startingFrom: '$6,500', includes: 'Pavé VVS diamonds, premium tier, certified' },
    { style: 'Full Set (Plain 10K)', metal: '10K Gold', startingFrom: '$4,500', includes: 'Top + bottom, 12 teeth, removable, custom mold' },
    { style: 'Full Set (Diamond-Set VS)', metal: '14K Gold', startingFrom: '$9,500', includes: 'Top + bottom 12 teeth, pavé VS diamonds' },
    { style: 'Fangs (Pair)', metal: '14K Gold', startingFrom: '$1,400', includes: 'Top canines only, diamond-set option available' },
    { style: 'Diamond Dust Finish', metal: '10K-18K', startingFrom: '+$300', includes: 'Add-on textured diamond-dust finish to any grillz' },
  ],
}

export default function PricingTableSection({ type }: { type: string }) {
  const rows = pricingTables[type]
  if (!rows || rows.length === 0) return null

  return (
    <section className="py-20 px-4 border-t border-glacier-grey/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            Pricing Guide
          </h2>
          <p className="text-stone max-w-2xl mx-auto">
            Real starting prices by style and metal. Every quote is broken down line-by-line during consultation — no hidden fees.
          </p>
        </motion.div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left border-collapse">
            <thead>
              <tr className="border-b border-glacier-grey/30">
                <th className="p-3 text-glacier-grey text-xs uppercase tracking-wider font-semibold">Style</th>
                <th className="p-3 text-glacier-grey text-xs uppercase tracking-wider font-semibold">Metal</th>
                <th className="p-3 text-glacier-grey text-xs uppercase tracking-wider font-semibold">Starting From</th>
                <th className="p-3 text-glacier-grey text-xs uppercase tracking-wider font-semibold">Includes</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <motion.tr
                  key={`${row.style}-${i}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-glacier-grey/10 hover:bg-charcoal/30 transition-colors"
                >
                  <td className="p-3 text-white text-sm font-medium">{row.style}</td>
                  <td className="p-3 text-stone text-sm">{row.metal}</td>
                  <td className="p-3 text-glacier-grey text-sm font-bold">{row.startingFrom}</td>
                  <td className="p-3 text-stone text-xs">{row.includes}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-stone text-xs text-center mt-6 max-w-2xl mx-auto">
          All prices in CAD, subject to HST. Prices fluctuate with gold market spot rates. Final quote confirmed during consultation.
        </p>
      </div>
    </section>
  )
}

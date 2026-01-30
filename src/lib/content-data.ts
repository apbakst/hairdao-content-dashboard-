import { Post } from '@/types/content';

// Content organized into 3 categories:
// 1. UGC / Community Highlights
// 2. Authority (Scientific + Medical)
// 3. Educational

export const initialPosts: Post[] = [
  // ============================================
  // 🎥 UGC / COMMUNITY HIGHLIGHTS
  // ============================================
  {
    id: 'ugc-001',
    title: 'Community Results Spotlight',
    content: `6 months on the HairDAO protocol.

The community doesn't lie. 📸

(Repost with permission from @community_member)

This is what happens when you combine:
• Precision dutasteride microneedling
• Anagen stimulating shampoo
• Consistent routine

Want to share your results? DM us.

#HairDAO #HairGrowth #BeforeAndAfter`,
    platform: 'twitter',
    type: 'ugc',
    status: 'draft',
    product: 'hairdao-general',
    createdAt: '2026-01-30',
  },
  {
    id: 'ugc-002',
    title: 'Discord Community Win',
    content: `Our Discord hit 15,000 members this week 🎉

But the real flex? 

The #results channel has 400+ progress photos.

Real people. Real results. No filters.

Join the most transparent hair loss community: discord.gg/hairdao`,
    platform: 'twitter',
    type: 'ugc',
    status: 'draft',
    product: 'hairdao-general',
    createdAt: '2026-01-30',
  },
  {
    id: 'ugc-003',
    title: 'User Testimonial - Anagen Shampoo',
    content: `"I've tried every shampoo on the market. Ketoconazole, saw palmetto, caffeine...

Anagen is the first one where I actually noticed less hair in the drain after 3 weeks."

- @hair_journey_2025

Try it yourself: anagen.com/shampoo`,
    platform: 'twitter',
    type: 'ugc',
    status: 'draft',
    product: 'anagen-shampoo',
    author: '@hair_journey_2025',
    createdAt: '2026-01-30',
  },
  {
    id: 'ugc-004',
    title: 'Trial Participant Story',
    content: `Meet Jake.

He joined our Precision Dutasteride trial 4 months ago.

"I was skeptical about microneedle delivery. But my bloodwork shows minimal systemic absorption and my crown is filling in."

Full interview in our Discord.

Still recruiting: hairdao.xyz/clinical`,
    platform: 'instagram',
    type: 'ugc',
    status: 'draft',
    product: 'precision-dut',
    createdAt: '2026-01-30',
  },
  {
    id: 'ugc-005',
    title: 'Community Meme Repost',
    content: `The community stays undefeated 😂

(📸: @hairdao_memes)

When you're 3 months into treatment and someone asks "is it working?"

[meme image]

Tag someone who needs to see this`,
    platform: 'instagram',
    type: 'ugc',
    status: 'draft',
    product: 'hairdao-general',
    author: '@hairdao_memes',
    createdAt: '2026-01-30',
  },

  // ============================================
  // 🔬 AUTHORITY (SCIENTIFIC + MEDICAL)
  // ============================================
  {
    id: 'auth-001',
    title: 'T4 Trial Update - Clinical Data',
    content: `📊 T4 Trial Update - Week 12 Data

n=47 participants

Key findings:
• 73% showed increased hair density (>10%)
• Zero systemic thyroid effects detected
• Average vellus-to-terminal conversion: 23%

Full data: hairdao.xyz/t4-trial

This is what open science looks like.`,
    platform: 'twitter',
    type: 'authority',
    status: 'draft',
    product: 'clinical-trial',
    createdAt: '2026-01-30',
  },
  {
    id: 'auth-002',
    title: 'New Study: DHT Receptor Density',
    content: `New research dropped. 🧬

"Androgen receptor density in balding vs non-balding scalp tissue"

Key finding: It's not just DHT levels. It's receptor sensitivity.

This is why some people lose hair at normal DHT levels.

Implications for treatment? Thread 🧵`,
    platform: 'twitter',
    type: 'authority',
    status: 'draft',
    product: 'hairdao-general',
    createdAt: '2026-01-30',
  },
  {
    id: 'auth-003',
    title: 'Precision Dut Pharmacokinetics',
    content: `Microneedle dutasteride vs oral: The pharmacokinetics

📈 Scalp tissue concentration: 340% higher
📉 Serum concentration: 89% lower
⏱️ Half-life at follicle: 72 hours

This is why precision delivery matters.

Oral drugs are sledgehammers. We're building scalpels.

Data: hairdao.xyz/precision-pk`,
    platform: 'twitter',
    type: 'authority',
    status: 'draft',
    product: 'precision-dut',
    createdAt: '2026-01-30',
  },
  {
    id: 'auth-004',
    title: 'Research Partnership Announcement',
    content: `🔬 Announcing: HairDAO x CUTANEON Research Partnership

CUTANEON (Germany) is a leader in topical drug delivery.

Together we're developing:
• Novel penetration enhancers
• Stabilized peptide formulations
• Next-gen microneedle arrays

First results expected Q3 2026.`,
    platform: 'twitter',
    type: 'authority',
    status: 'draft',
    product: 'clinical-trial',
    createdAt: '2026-01-30',
  },
  {
    id: 'auth-005',
    title: 'Lab Update - University of Brasilia',
    content: `Lab update from University of Brasilia 🇧🇷

Our stem cell research arm just completed Phase 1 of the dermal papilla expansion protocol.

Results:
• 10x cell expansion achieved
• Trichogenic properties retained
• Ready for injection study

This is regenerative medicine for hair. For real.`,
    platform: 'twitter',
    type: 'authority',
    status: 'draft',
    product: 'clinical-trial',
    createdAt: '2026-01-30',
  },
  {
    id: 'auth-006',
    title: 'Medical Advisory Board',
    content: `Our Medical Advisory Board includes:

• Dr. [Name] - Dermatology, Harvard
• Dr. [Name] - Trichology, Cleveland Clinic  
• Dr. [Name] - Drug Delivery, MIT

Why it matters: Every protocol we run is reviewed by actual experts.

DeSci doesn't mean amateur science. It means open, funded, rigorous science.`,
    platform: 'linkedin',
    type: 'authority',
    status: 'draft',
    product: 'hairdao-general',
    createdAt: '2026-01-30',
  },

  // ============================================
  // 📚 EDUCATIONAL
  // ============================================
  {
    id: 'edu-001',
    title: 'DHT Explained Simply',
    content: `What is DHT? (30 second explainer)

DHT = dihydrotestosterone

Your body converts testosterone → DHT using an enzyme called 5-alpha reductase.

DHT is fine for your body. But if your hair follicles are genetically sensitive to it, they shrink.

That's male pattern baldness.

Solutions? Block DHT or protect the follicle. That's the entire field.`,
    platform: 'twitter',
    type: 'educational',
    status: 'draft',
    product: 'hairdao-general',
    createdAt: '2026-01-30',
  },
  {
    id: 'edu-002',
    title: 'Finasteride vs Dutasteride',
    content: `Finasteride vs Dutasteride: What's the difference?

Both block DHT. But:

Finasteride:
• Blocks 70% of DHT
• Type II 5-AR only
• FDA approved for hair loss

Dutasteride:
• Blocks 99% of DHT
• Type I and II 5-AR
• FDA approved for prostate (off-label for hair)

More DHT blocked = more regrowth potential (but also more side effect risk with oral).

That's why we're working on precision delivery.`,
    platform: 'twitter',
    type: 'educational',
    status: 'draft',
    product: 'precision-dut',
    createdAt: '2026-01-30',
  },
  {
    id: 'edu-003',
    title: 'The Hair Growth Cycle',
    content: `Understanding your hair cycle 📚

Every hair goes through 3 phases:

🌱 Anagen (growth): 2-7 years
• This is when hair actively grows
• Longer anagen = longer hair

😴 Catagen (transition): 2-3 weeks
• Hair detaches from blood supply
• Growth stops

💀 Telogen (rest/shed): 3 months
• Hair falls out
• New hair begins

Balding = shortened anagen phase. That's it.`,
    platform: 'instagram',
    type: 'educational',
    status: 'draft',
    product: 'hairdao-general',
    createdAt: '2026-01-30',
  },
  {
    id: 'edu-004',
    title: 'Minoxidil Myth Busting',
    content: `Minoxidil myths vs reality:

❌ "It only works on the crown"
✅ Works anywhere, crown just responds best

❌ "You'll lose all gains if you stop"
✅ You'll lose the gains minoxidil gave you (not your baseline)

❌ "Oral is dangerous"
✅ Low-dose oral is increasingly prescribed (with monitoring)

❌ "It grows hair by increasing blood flow"
✅ Mechanism is actually complex (potassium channels, growth factors)

Know your treatments.`,
    platform: 'twitter',
    type: 'educational',
    status: 'draft',
    product: 'hairdao-general',
    createdAt: '2026-01-30',
  },
  {
    id: 'edu-005',
    title: 'Why Shampoo Ingredients Matter',
    content: `Your shampoo matters. Here's why:

Most "hair growth" shampoos are marketing.

What actually works:
• Ketoconazole - anti-fungal, mild anti-androgen
• Caffeine - stimulates follicles (limited evidence)
• Saw palmetto - weak DHT blocker
• Zinc pyrithione - scalp health

What's marketing:
• Biotin (unless you're deficient)
• Most "natural" extracts

Anagen shampoo uses evidence-based ingredients at effective concentrations.

Not magic. Just science.`,
    platform: 'instagram',
    type: 'educational',
    status: 'draft',
    product: 'anagen-shampoo',
    createdAt: '2026-01-30',
  },
  {
    id: 'edu-006',
    title: 'DeSci Explained',
    content: `What is DeSci? (Decentralized Science)

Traditional pharma:
• Company owns research
• Profit motive drives decisions
• Generic drugs = no funding
• Patients pay for the cure

DeSci:
• Community funds research
• Open data, open protocols
• Underserved conditions get attention
• Patients own a piece of the outcome

HairDAO is DeSci for hair loss.

We've funded $2.4M in research that pharma won't touch.

Why? Because finasteride went generic in 2006.`,
    platform: 'twitter',
    type: 'educational',
    status: 'draft',
    product: 'hairdao-general',
    createdAt: '2026-01-30',
  },
  {
    id: 'edu-007',
    title: 'When to See a Dermatologist',
    content: `When to see a dermatologist for hair loss:

GO NOW if:
• Sudden rapid shedding (>100 hairs/day)
• Patchy bald spots (could be alopecia areata)
• Scalp pain, redness, or scaling
• Hair loss after starting new medication
• You're female with hair loss

CAN WAIT if:
• Slow, gradual thinning at temples/crown
• Family history of male pattern baldness
• Been stable for months

Self-treating is fine for typical MPB. But get diagnosed first.`,
    platform: 'twitter',
    type: 'educational',
    status: 'draft',
    product: 'hairdao-general',
    createdAt: '2026-01-30',
  },

  // ============================================
  // 🧴 ANAGEN PRODUCT CONTENT
  // ============================================
  {
    id: 'anagen-001',
    title: 'Anagen Shampoo Launch',
    content: `Anagen Shampoo is here. 🧴

Not another gimmick. Evidence-based formula:

✓ 1% Ketoconazole
✓ Caffeine complex
✓ Zinc pyrithione
✓ No sulfates

Designed to complement your hair loss treatment, not replace it.

Think of it as the foundation.

Shop: anagen.com`,
    platform: 'twitter',
    type: 'educational',
    status: 'draft',
    product: 'anagen-shampoo',
    createdAt: '2026-01-30',
  },
  {
    id: 'anagen-002',
    title: 'How to Use Anagen Shampoo',
    content: `How to use Anagen Shampoo for best results:

1. Wet hair thoroughly
2. Apply to scalp (not just hair)
3. Massage for 2-3 minutes (let ingredients absorb)
4. Leave on for 5 minutes
5. Rinse completely

Use 3-4x per week. Daily use not necessary.

Tip: Use on days you're not applying topicals. Gives your scalp a break.`,
    platform: 'instagram',
    type: 'educational',
    status: 'draft',
    product: 'anagen-shampoo',
    createdAt: '2026-01-30',
  },
  {
    id: 'anagen-003',
    title: 'Precision Dut Waitlist',
    content: `Precision Dutasteride is coming.

Microneedle patches that deliver dutasteride directly to your follicles.

99% DHT reduction at the scalp.
90% lower systemic absorption.

Currently in clinical trials. Results promising.

Join the waitlist for early access: anagen.com/precision

The future of hair loss treatment is targeted.`,
    platform: 'twitter',
    type: 'authority',
    status: 'draft',
    product: 'precision-dut',
    createdAt: '2026-01-30',
  },
];

export function getPostsByType(type: string): Post[] {
  if (type === 'all') return initialPosts;
  return initialPosts.filter(p => p.type === type);
}

export function getPostsByProduct(product: string): Post[] {
  if (product === 'all') return initialPosts;
  return initialPosts.filter(p => p.product === product);
}

export function getPostsByPlatform(platform: string): Post[] {
  if (platform === 'all') return initialPosts;
  return initialPosts.filter(p => p.platform === platform);
}

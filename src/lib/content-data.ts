import { Post } from '@/types/content';

// Pre-parsed content from markdown files
// In a full implementation, this would be generated at build time or served from an API

export const initialPosts: Post[] = [
  // Batch 1 - Twitter
  {
    id: 'B1-twitter-1',
    title: 'T4 Trial Recruitment',
    content: `We're running a clinical trial on T4 (levothyroxine) for hair regrowth.

Yes, the thyroid medication.

Why? Hair follicles have thyroid hormone receptors. Topical T4 may wake up dormant follicles without systemic effects.

Recruiting now: 47/150 spots filled
Compensation: $500 + 2,500 $HAIR

DM to apply 👇`,
    platform: 'twitter',
    type: 'community',
    status: 'draft',
    ref: 'B1-T2',
  },
  {
    id: 'B1-twitter-2',
    title: 'DeSci Education',
    content: `The last FDA-approved hair loss drug was finasteride.

In 1997.

28 years. Zero new mechanisms.

Why? No profit incentive. Both approved drugs are generic.

This is exactly why DeSci exists.

HairDAO is running 6 trials RIGHT NOW that pharma won't fund.

Own the cure. hairdao.xyz`,
    platform: 'twitter',
    type: 'educational',
    status: 'draft',
    ref: 'B1-T3',
  },
  {
    id: 'B1-twitter-3',
    title: 'Microneedle Thread',
    content: `What if you could block 99% of DHT without pills?

We're testing microneedle patches that deliver dutasteride directly to your scalp.

🧵 Thread:

1/ Oral dutasteride works. It blocks 99% of DHT vs 70% for finasteride.

But it goes everywhere — your scalp, bloodstream, brain, prostate.

5-10% of users get side effects. Some serious.

2/ The problem isn't the drug. It's the delivery.

What if we could get dutasteride TO the follicle without flooding your system?

3/ Enter: microneedle patches.

Tiny 500-micron needles create micro-channels in the skin. Drug-loaded tips dissolve in the dermis.

Result: high scalp concentration, 90% lower blood levels.

4/ We're running a Phase 1/2 trial now.

• 100 participants
• Fully remote
• Patches shipped to your door
• $750 + 5,000 $HAIR compensation

23 spots filled. Apply: hairdao.xyz/clinical

5/ This is what DeSci looks like.

Community-funded. Open research. Aligned incentives.

If it works, you don't just get your hair back.

You own a piece of the cure.`,
    platform: 'twitter',
    type: 'educational',
    status: 'draft',
    ref: 'B1-T4',
  },
  {
    id: 'B1-twitter-4',
    title: 'Weekly Stats Update',
    content: `HairDAO Weekly 📊

Research funded: $2.4M
Community members: 12,847
Active trials: 6
Applications this week: 127

Top trial: Microneedle Dutasteride (87% full)

Join us: hairdao.xyz`,
    platform: 'twitter',
    type: 'community',
    status: 'draft',
    ref: 'B1-T5',
  },
  {
    id: 'B1-twitter-5',
    title: 'Meme Tweet - PubMed',
    content: `me: "I'll just check my hairline real quick"

*3 hours later, deep in PubMed reading about Wnt/β-catenin signaling pathways*

anyway we're funding research on that: hairdao.xyz`,
    platform: 'twitter',
    type: 'humor',
    status: 'draft',
    ref: 'B1-T6',
  },
  {
    id: 'B1-twitter-6',
    title: 'Token Utility',
    content: `What does $HAIR actually do?

✅ Vote on which research gets funded
✅ Earn tokens by joining trials
✅ Get early access to treatments
✅ Share in IP revenue from breakthroughs

It's not just a token. It's ownership of the cure.`,
    platform: 'twitter',
    type: 'educational',
    status: 'draft',
    ref: 'B1-T7',
  },

  // Batch 1 - TikTok
  {
    id: 'B1-tiktok-1',
    title: "Things That DON'T Cause Hair Loss",
    content: `Things people blame for hair loss that literally don't cause it:

❌ Wearing hats
❌ Masturbation
❌ Shampoo frequency
❌ Gel/product buildup
❌ Your mom's dad being bald

What ACTUALLY causes it:

✅ DHT sensitivity (genetics)
✅ Scalp inflammation
✅ Nutrient deficiency
✅ Stress (telogen effluvium)
✅ Autoimmune conditions

Stop blaming hats. Start understanding DHT.`,
    platform: 'tiktok',
    type: 'educational',
    status: 'draft',
    ref: 'B1-TT1',
  },
  {
    id: 'B1-tiktok-2',
    title: 'Why Your Dad Is Bald',
    content: `"But my mom's dad had great hair!"

Cool. That's not how this works.

The "baldness comes from your mother's side" myth is...kinda true? But also wrong.

Here's the actual genetics:

The AR gene (androgen receptor) IS on the X chromosome. So you do get it from mom.

But there are 200+ other genes that influence hair loss. They come from BOTH parents.

If your dad is bald, you're still at higher risk.

Stop blaming one grandpa and start looking at the whole family tree.`,
    platform: 'tiktok',
    type: 'educational',
    status: 'draft',
    ref: 'B1-TT2',
  },
  {
    id: 'B1-tiktok-3',
    title: 'Hair Loss Industry Secrets',
    content: `Things the hair loss industry doesn't want you to know:

1. Minoxidil was discovered BY ACCIDENT. It was a blood pressure drug. Side effect: hair growth.

2. Generic finasteride costs $3/month. Brand Propecia? $90.

3. Most "hair growth serums" at Sephora have zero clinical evidence

4. The #1 thing that works? Consistency. Not magic products.

5. A DAO is funding more hair loss research than most pharma companies

That last one is us btw. hairdao.xyz`,
    platform: 'tiktok',
    type: 'educational',
    status: 'draft',
    ref: 'B1-TT3',
  },

  // Batch 1 - Instagram
  {
    id: 'B1-instagram-1',
    title: 'Reel: Brand vs Generic',
    content: `REEL: "The truth about brand vs. generic hair loss meds"

Hook: "Hair loss brands HATE this comparison"

Scene 1: Show Propecia box and generic finasteride
Scene 2: Point to active ingredient (same)
Scene 3: Point to price difference ($90 vs $3)
Scene 4: "Same molecule. Same effect. 30x the price."

CTA: Save your money. Fund research instead. Link in bio.`,
    platform: 'instagram',
    type: 'educational',
    status: 'draft',
    ref: 'B1-R1',
  },
  {
    id: 'B1-instagram-2',
    title: 'Carousel: Treatment Timeline',
    content: `CAROUSEL: "What to actually expect from hair loss treatment"

Slide 1: Title - "Your Hair Loss Timeline (realistic version)"

Slide 2: Month 0-2 - "The Shed" 
You might lose MORE hair. This is normal. Old weak hairs falling = new thick hairs coming.

Slide 3: Month 3-6 - "The Doubt Phase"
Not much visible change. This is where most people quit. Don't.

Slide 4: Month 6-12 - "The Progress"
Vellus hairs thickening. Hairline stabilizing. Progress photos matter here.

Slide 5: Month 12+ - "Maintenance Mode"
Results compound. Consistency is the treatment.

Slide 6: CTA - Join the community tracking real results: hairdao.xyz`,
    platform: 'instagram',
    type: 'educational',
    status: 'draft',
    ref: 'B1-C1',
  },

  // Batch 2 - Twitter
  {
    id: 'B2-twitter-1',
    title: 'Wnt Pathway Education',
    content: `Your hair follicle is basically a tiny stem cell factory.

And the foreman? The Wnt pathway.

When Wnt signaling is active, your follicle stays in growth mode. When it shuts down, the follicle miniaturizes.

DHT = Wnt suppressor.

Block DHT = let Wnt cook.

This is why finasteride works.

But what if we could activate Wnt directly?

That's exactly what some of our funded researchers are exploring.

Science is cooking: hairdao.xyz/research`,
    platform: 'twitter',
    type: 'educational',
    status: 'scheduled',
    scheduledDate: '2026-02-01',
    scheduledTime: '10:00',
    ref: 'B2-T1',
  },
  {
    id: 'B2-twitter-2',
    title: 'TWIST-1/2 Research',
    content: `New research direction we're excited about:

TWIST-1/2 inhibitors.

These are transcription factors that keep hair follicle stem cells dormant.

Block them = wake up sleeping follicles.

Early data from academic labs looks promising.

We're in talks to fund a translational study.

DeSci moves fast when incentives align.`,
    platform: 'twitter',
    type: 'educational',
    status: 'scheduled',
    scheduledDate: '2026-02-08',
    scheduledTime: '10:00',
    ref: 'B2-T2',
  },
  {
    id: 'B2-twitter-3',
    title: 'Meme - Stages of Acceptance',
    content: `The 5 stages of hair loss acceptance:

1. Denial: "It's just the lighting"
2. Anger: "Why me? My dad has hair"
3. Bargaining: "Maybe if I take every supplement..."
4. Depression: *buys 47th hat*
5. Action: "I'm joining a clinical trial and funding the cure"

We're at stage 5. hairdao.xyz`,
    platform: 'twitter',
    type: 'humor',
    status: 'scheduled',
    scheduledDate: '2026-02-07',
    scheduledTime: '14:00',
    ref: 'B2-T3',
  },
  {
    id: 'B2-twitter-4',
    title: 'Community Spotlight',
    content: `Community spotlight 🔦

@[member] just hit their 1-year mark on our microneedling protocol.

Results: Norwood 3 → Norwood 2
Density: +23% (measured via HairCheck)

No pills. Just weekly microneedling + topical minoxidil.

Real members. Real results. Real science.

Join the Discord to share your journey: discord.gg/hairdao`,
    platform: 'twitter',
    type: 'community',
    status: 'scheduled',
    scheduledDate: '2026-02-06',
    scheduledTime: '12:00',
    ref: 'B2-T4',
  },
  {
    id: 'B2-twitter-5',
    title: 'Lexy AI Promo',
    content: `We built an AI that writes patent applications in 60 seconds.

Why? Because filing patents costs $15-30K in lawyer fees.

Lexy generates draft claims for drug formulations instantly.

Enter your compound → get patent language covering dosing, delivery, formulations.

Free to use: lexy.hairdao.xyz

(Yes, we're a hair loss DAO that builds AI tools. DeSci is weird.)`,
    platform: 'twitter',
    type: 'product',
    status: 'scheduled',
    scheduledDate: '2026-02-05',
    scheduledTime: '11:00',
    ref: 'B2-T5',
  },
  {
    id: 'B2-twitter-6',
    title: 'DHT Explained',
    content: `DHT explained like you're 5:

Testosterone → gets converted by enzyme (5α-reductase) → DHT

DHT lands on hair follicle receptors → "time to shrink"

Follicle shrinks → hair gets thin → eventually nothing

Finasteride blocks the enzyme = less DHT
Minoxidil increases blood flow = more nutrients

Neither fixes the root cause.

That's why we fund research on the actual receptor biology.`,
    platform: 'twitter',
    type: 'educational',
    status: 'scheduled',
    scheduledDate: '2026-02-04',
    scheduledTime: '10:00',
    ref: 'B2-T6',
  },
  {
    id: 'B2-twitter-7',
    title: 'R&D Funding Stats',
    content: `Hair loss affects 80 million Americans.

Total R&D funding globally? ~$5.4 billion.

Sounds like a lot until you compare:

Cancer: $22 billion
Diabetes: $16 billion
Alzheimer's: $3.3 billion

For a condition affecting more people than all three combined.

This is the funding gap we exist to fill.

$2.4M funded so far. 6 active trials.

hairdao.xyz`,
    platform: 'twitter',
    type: 'educational',
    status: 'scheduled',
    scheduledDate: '2026-02-10',
    scheduledTime: '10:00',
    ref: 'B2-T7',
  },
  {
    id: 'B2-twitter-8',
    title: 'Naltrexone Trial',
    content: `New trial launching: Low-dose naltrexone for hair loss

Why naltrexone?
• Anti-inflammatory
• Modulates immune response
• Anecdotal reports of regrowth
• Almost no studies exist

We're fixing that.

60 participants. 6 months. Fully remote.

Compensation: $400 + 2,000 $HAIR

Apply now: hairdao.xyz/trials/naltrexone`,
    platform: 'twitter',
    type: 'community',
    status: 'scheduled',
    scheduledDate: '2026-02-03',
    scheduledTime: '10:00',
    ref: 'B2-T8',
  },

  // Batch 2 - TikTok
  {
    id: 'B2-tiktok-1',
    title: 'The Hairline From Your 20s',
    content: `"I just want my hairline from my 20s back"

Here's the honest truth:

If you caught it early (Norwood 1-2):
✅ Finasteride + minoxidil can stabilize
✅ Microneedling can thicken
✅ You might get 90% back

If you're Norwood 3+:
✅ You can improve density
✅ You can stop further loss
⚠️ Full restoration = transplant territory

The earlier you start, the more you keep.

Stop waiting. Start doing.`,
    platform: 'tiktok',
    type: 'educational',
    status: 'scheduled',
    scheduledDate: '2026-02-08',
    scheduledTime: '18:00',
    ref: 'B2-TT2',
  },
  {
    id: 'B2-tiktok-2',
    title: 'POV: Friend Asks About Hair',
    content: `POV: Your friend finally asks about your hair

Friend: "Bro your hair looks better, what are you doing?"

You: *deep breath*

"Ok so basically there's this enzyme called 5-alpha reductase that converts testosterone to DHT which binds to androgen receptors in genetically sensitive follicles causing miniaturization..."

Friend: 👁️👄👁️

"...anyway I take a pill and use foam."`,
    platform: 'tiktok',
    type: 'humor',
    status: 'scheduled',
    scheduledDate: '2026-02-04',
    scheduledTime: '18:00',
    ref: 'B2-TT3',
  },
  {
    id: 'B2-tiktok-3',
    title: 'Rating Hair Loss Advice',
    content: `Ranking hair loss advice from Reddit:

"Just shave it bro" - 2/10 (not advice, giving up)

"Fin gave me sides, try saw palmetto" - 4/10 (placebo)

"Minoxidil twice daily no exceptions" - 7/10 (solid)

"Microneedling 1.5mm weekly + min" - 8/10 (backed by studies)

"Join a clinical trial and fund the cure" - 10/10 (this is the way)`,
    platform: 'tiktok',
    type: 'humor',
    status: 'scheduled',
    scheduledDate: '2026-02-07',
    scheduledTime: '18:00',
    ref: 'B2-TT4',
  },
  {
    id: 'B2-tiktok-4',
    title: 'The Shed Explained',
    content: `"I started treatment and I'm losing MORE hair??"

Welcome to the shed. Let me explain:

Your follicles have a growth cycle:
• Anagen (growing) - 2-7 years
• Catagen (transition) - 2-3 weeks  
• Telogen (resting) - 3 months

When you start treatment, weak telogen hairs get pushed out early.

This looks like loss. It's actually progress.

The new hairs coming in? Thicker. Stronger.

The shed usually lasts 2-8 weeks.

Don't panic. Don't quit. This is how it works.`,
    platform: 'tiktok',
    type: 'educational',
    status: 'scheduled',
    scheduledDate: '2026-02-02',
    scheduledTime: '18:00',
    ref: 'B2-TT5',
  },

  // Batch 2 - Instagram
  {
    id: 'B2-instagram-1',
    title: 'Reel: Generic vs Brand',
    content: `REEL: "When you realize generic finasteride is the same as Propecia"

Scene 1: Split screen - Propecia ($90) vs Generic ($3)
Scene 2: Both boxes showing "Finasteride 1mg"
Scene 3: Mind blown reaction
Scene 4: "Same molecule. Same results. Different marketing."

Caption: The hair loss industry doesn't want you to know this. Generic finasteride is literally the same drug for 3% of the price. Link in bio for treatment guidance.`,
    platform: 'instagram',
    type: 'educational',
    status: 'scheduled',
    scheduledDate: '2026-02-01',
    scheduledTime: '12:00',
    ref: 'B2-R1',
  },
  {
    id: 'B2-instagram-2',
    title: 'Reel: 1 Year Consistency',
    content: `REEL: "What 1 year of consistency actually looks like"

Month 1-3: "Is this even working?"
Month 4-6: "Wait, I think I see something"
Month 7-9: "Ok this is definitely working"
Month 10-12: *shows progress photos*

Caption: No magic products. No shortcuts. Just finasteride, minoxidil, and weekly microneedling for 365 days. This is what real results look like. 

Track your progress with us: hairdao.xyz`,
    platform: 'instagram',
    type: 'results',
    status: 'scheduled',
    scheduledDate: '2026-02-04',
    scheduledTime: '12:00',
    ref: 'B2-R2',
  },
  {
    id: 'B2-instagram-3',
    title: 'Reel: Ingredients You Can\'t Pronounce',
    content: `REEL: "Ingredients in hair products you can't pronounce (and what they actually do)"

1. Ketoconazole - antifungal that reduces scalp inflammation
2. Tretinoin - vitamin A derivative, increases minoxidil absorption
3. Caffeine - stimulates follicles (modest evidence)
4. Biotin - B vitamin, only helps if you're deficient
5. Minoxidil - vasodilator, extends growth phase

Caption: Knowledge > marketing. Not everything that sounds scientific works, and not everything simple is useless. Know what you're putting on your scalp.`,
    platform: 'instagram',
    type: 'educational',
    status: 'scheduled',
    scheduledDate: '2026-02-06',
    scheduledTime: '12:00',
    ref: 'B2-R3',
  },
  {
    id: 'B2-instagram-4',
    title: 'Carousel: 5 Things Your Barber Notices',
    content: `CAROUSEL: "5 things your barber notices about your hair loss"

Slide 1: Title

Slide 2: Temple recession - "When I have to fade higher each time"

Slide 3: Crown thinning - "The whorl getting wider"

Slide 4: Density changes - "Hair feels lighter in my hands"

Slide 5: Texture changes - "Hairs getting finer, wirier"

Slide 6: Scalp visibility - "When I can see skin through wet hair"

Slide 7: CTA - Your barber sees it before you do. Start tracking early: hairdao.xyz`,
    platform: 'instagram',
    type: 'educational',
    status: 'scheduled',
    scheduledDate: '2026-02-10',
    scheduledTime: '12:00',
    ref: 'B2-C2',
  },

  // LinkedIn
  {
    id: 'B2-linkedin-1',
    title: 'DeSci Research Model',
    content: `The pharmaceutical industry has a hair loss problem.

Not the condition—the economics.

Both FDA-approved treatments (minoxidil, finasteride) are generic. No patent = no profit incentive = no R&D investment.

The result? The last new mechanism approved was in 1997.

At HairDAO, we're proving an alternative model:

• Community-funded research ($2.4M deployed)
• 6 active clinical trials
• Open IP development
• Token-aligned incentives

DeSci isn't just about decentralization. It's about fixing broken incentive structures.

When the market won't fund research, the community can.

#DeSci #Healthcare #Innovation`,
    platform: 'linkedin',
    type: 'educational',
    status: 'draft',
    ref: 'B2-LI1',
  },

  // Discord
  {
    id: 'B2-discord-1',
    title: 'Weekly Community Update',
    content: `📊 **Weekly Community Update**

**Trial Status:**
• Microneedle Dutasteride: 87/100 enrolled
• T4 Topical: 47/150 enrolled  
• Low-dose Naltrexone: LAUNCHING NEXT WEEK 🚀

**Research Updates:**
• TWIST-1/2 literature review completed
• New partnership with [University] in discussion

**Community Wins:**
• @member hit 1-year on protocol
• 3 new members shared progress photos

**This Week's Focus:**
Naltrexone trial recruitment starts Monday. Spread the word!

Questions? Drop them below 👇`,
    platform: 'discord',
    type: 'community',
    status: 'draft',
    ref: 'B2-DC1',
  },
];

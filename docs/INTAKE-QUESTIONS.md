# Portfolio Intake Questions

Companion to the Portfolio Build Sheet. Every project, every question.
Generated 29 August 2026.

How to use it: write badly and fast. Fragments, numbers, half sentences.
Blanks are fine and are information too. Answers marked DRAFTED were written
by me from reading your repos in Documents/GitHub. Check them and fix them.

---


# THE FEATURED EIGHT

Full case studies. These are the pages a recruiter actually reads, so they get all seven answers.


---

## 01. LandedTheJob  [Software]

*Your strongest software credential. One caution from the repo: 10 commits across two days. If it is deployed and used, the story is velocity and it is a great story. If it is not, we reframe it honestly rather than let a recruiter discover the gap themselves.*

### Q1. What is it, in one sentence?

> Fix my sentence if it undersells it.

**DRAFTED FROM YOUR REPO — check this:**
Paste a job listing and get back a resume rewritten to mirror its language, plus a cover letter pitched at that company's tone. Your own line in the README is better than anything I would write: your resume, rewritten to win.

### Q2. Role, timeline, status

> The deployment and users question. Answer it plainly, whichever way it goes.

**DRAFTED FROM YOUR REPO — check this:**
Solo. First commit 16 April 2026, last commit 17 April 2026, 10 commits total. 58 TypeScript files, 11 Prisma models, Clerk auth, Stripe billing, Anthropic Claude, Neon Postgres, Next.js 15 App Router. THE THING I CANNOT ANSWER: is it deployed, does anyone use it, does it earn? Nothing in the repo tells me. This one answer changes how the whole page gets written.

### Q3. What made it hard?

> Pick one of the three, or tell me I missed it.

**DRAFTED FROM YOUR REPO — check this:**
Candidates from your own code: LLM-based parsing of job listings pasted in any format (src/lib/parseJobListing.ts and parseJobText.ts), the credits and daily-cap billing model, or the user identity problem you fixed twice. That second one is the best story: you have a commit fixing a race in requireUser with an upsert, and another reclaiming a user row by email when the Clerk ID did not match. That is a real distributed-identity bug and most people never hit it.

### Q4. What did you decide, and what did you reject?

> Why the billing model changed on day two.

**DRAFTED FROM YOUR REPO — check this:**
Straight from your commit log: you switched from a plain subscription to a Pack plus Pro model with a daily cap, one day into the build. That is a genuine product decision with the rejected alternative built right into it. Why? Anthropic cost control? Also worth naming: Clerk over NextAuth, Neon over Supabase, and templates as reference HTML instead of a PDF library.

### Q5. What number can you put on it?

> Anything real, even ten users and eleven dollars.

**DRAFTED FROM YOUR REPO — check this:**
From the repo: 58 TypeScript files, 11 data models, 3 price points ($9/mo, $19/mo, $29 one-time), 10 commits, 2 days. NEEDS YOU: signups, revenue, generation time per resume, Anthropic spend per resume.

### Q6. What broke, and what did you do?

> The Clerk ID mismatch, from the user's side.

**DRAFTED FROM YOUR REPO — check this:**
Two auth bugs are already sitting in your commit log, described above. Pick the Clerk ID mismatch one and tell me what a real user actually experienced when it happened.

### Q7. What media do you have?

> Live URL, public repo, screen recording.

**DRAFTED FROM YOUR REPO — check this:**
In the repo: templates/ holds reference HTML for the resume and cover letter, and docs-spec.md. NEEDS YOU: a live URL, whether the GitHub repo is public, and a screen recording of paste-to-resume. For this project the recording matters more than any screenshot.


---

## 02. Engine Rebuild  [Mech]

*The most visceral proof on the list and almost certainly your best photography.*

### Q1. What is it, in one sentence?

> Which engine, which vehicle, and why it had to come apart. Example: 22R out of an 85 pickup at 240k, burning oil and down on compression in two cylinders.

_______________________________________________

### Q2. Role, timeline, status

> Solo or with someone. How many months of weekends. Does it run now, and how many miles since it went back together.

_______________________________________________

### Q3. What made it hard?

> Money, tools, space, or parts. Machine shop budget, no hoist, seized head bolts, measuring clearances without the right gauges, sourcing parts for an 80s Toyota.

_______________________________________________

### Q4. What did you decide, and what did you reject?

> Rebuild versus a junkyard replacement. Bore oversize versus standard. New head versus reman. Which rings and bearings and why. Give me one thing you rejected.

_______________________________________________

### Q5. What number can you put on it?

> Bore clearance, ring end gap, main and rod bearing clearance, compression before and after in psi, total cost, miles since. Compression before and after is the single most persuasive pair of numbers you own.

_______________________________________________

### Q6. What broke, and what did you do?

> Did it fire on the first crank? Oil pressure? A leak that made you pull it back apart? Anything you had to redo counts and helps.

_______________________________________________

### Q7. What media do you have?

> Bare block on the stand, crank and bearings, head, timing marks, and the first start. If you have the first start on video, that is the hero clip for the entire site.

_______________________________________________


---

## 03. Digital Record Player  [Hardware]

*After reading the repo: this is the best project you own. Power electronics, audio hardware, embedded Linux, a Python display renderer, a Flask control app, and a physical retrofit, all in one object that a person can walk up to and use. It proves the entire hybrid thesis by itself. Your README and NOTES.md are already most of a case study.*

### Q1. What is it, in one sentence?

> Correct anything I got wrong.

**DRAFTED FROM YOUR REPO — check this:**
A 1byone vinyl turntable retrofitted with a Raspberry Pi 4 into a self-contained Spotify Connect player. The original motor and platter still spin real vinyl, while a 4 inch round display mounted in the center shows the current album art rotating at 33 1/3 RPM, and a web UI on the network controls playback.

### Q2. Role, timeline, status

> Is it running now, and did the knob get finished.

**DRAFTED FROM YOUR REPO — check this:**
Solo. First commit 27 February 2026, last 23 April 2026, 97 commits, so about two months. Four systemd services in the repo (raspotify, display, control, knob) plus a git post-receive auto-deploy hook to the Pi. NEEDS YOU: is it running in your house right now, and did the physical volume knob get finished or is it still a future feature?

### Q3. What made it hard?

> Pick one: power, display, or audio.

**DRAFTED FROM YOUR REPO — check this:**
Candidates from your own notes: sharing one 12V supply between the motor circuit and the Pi while keeping the motor completely independent of it; driving a 720x720 round display under Wayland and labwc in kiosk mode; and the audio path through the PCM5122 DAC HAT. You have both a diagnose-audio.sh and a boot-optimize.sh sitting in the repo, which tells me audio and boot time each cost you real time. Which was worse?

### Q4. What did you decide, and what did you reject?

> Confirm the motor decision and add anything I missed.

**DRAFTED FROM YOUR REPO — check this:**
This one is documented and it is good: you hardwired the motor to the original OEM switches off the 12V rail rather than putting it under Pi control, and your notes list a 400W dual MOSFET trigger switch as purchased but not used for exactly that reason. A decision and its rejected alternative, with the leftover part as evidence. Second decision worth naming: Raspotify and librespot for the audio path with a separate Flask app on the Spotify Web API for control, instead of one program doing both.

### Q5. What number can you put on it?

> Parts cost, and boot time before and after.

**DRAFTED FROM YOUR REPO — check this:**
From the repo: 97 commits, Raspberry Pi 4 8GB, 720x720 round IPS touch display, PCM5122 DAC at 384 kHz / 32-bit with 112 dB SNR, 320 kbps stream, 12V 5A supply through a 5A blade fuse stepped down to 5V, 4 systemd services, Flask on port 8080. NEEDS YOU: total parts cost, and boot time before and after boot-optimize.sh. That before-and-after pair is the number this page wants.

### Q6. What broke, and what did you do?

> The slow boot and the silent audio. What actually happened.

**DRAFTED FROM YOUR REPO — check this:**
boot-optimize.sh and diagnose-audio.sh both exist, which means something was slow and something was silent. Tell me what happened and what fixed it.

### Q7. What media do you have?

> Shoot the internals and the video. Tell me when it is done.

**DRAFTED FROM YOUR REPO — check this:**
NEEDS YOU, and this is the highest priority photo shoot on the whole site: the internals with the Pi and DAC HAT stacked, the 12V wiring and fuse, and above all a video of the platter spinning with the album art rotating on the round screen. That clip is the best piece of media you could possibly have. Your README already contains two ASCII architecture diagrams that should be redrawn properly for the page.


---

## 04. FSAE Team  [Mech]

*The credential mechanical recruiters look for by name. Write it around the subsystem you personally owned, not around the team.*

### Q1. What is it, in one sentence?

> Which subsystem you owned and what it does on the car. Suspension, chassis, drivetrain, aero, electronics. The site is about your part.

_______________________________________________

### Q2. Role, timeline, status

> Team size, your title, which season, hours a week. Did the car pass tech and finish the event, and where did you place.

_______________________________________________

### Q3. What made it hard?

> A rules constraint, the cost cap, what your shop could actually manufacture, the schedule, or a teammate leaving. The rulebook is usually the interesting constraint, so name the rule.

_______________________________________________

### Q4. What did you decide, and what did you reject?

> A material, geometry, or process choice and the one you rejected. Steel tube versus bonded aluminum, that damper over another, welded versus machined.

_______________________________________________

### Q5. What number can you put on it?

> Mass in kg, stiffness, deflection under load, lap time, cost per unit, FEA safety factor, placing at comp.

_______________________________________________

### Q6. What broke, and what did you do?

> What failed in testing or at the event and what you did about it. FSAE always breaks something. This will be the best paragraph on the page.

_______________________________________________

### Q7. What media do you have?

> CAD screenshots, FEA plots, the part on the car, the car running. A photo of your part installed beats any render.

_______________________________________________


---

## 05. Japanese Motor Market  [Software]

*Promoted into slot 05 over NEST after reading both repos. This one sits exactly on your software and automotive lanes at the same time, which makes it the best single argument for the hybrid thesis you have in code.*

### Q1. What is it, in one sentence?

> Correct my sentence if I got the product wrong.

**DRAFTED FROM YOUR REPO — check this:**
A marketplace for Japanese cars, backed by a Python scraper that pulls completed Bring a Trailer auctions through the same public WordPress REST endpoint the site itself calls when you click Show More.

### Q2. Role, timeline, status

> Dates, and is it deployed.

**DRAFTED FROM YOUR REPO — check this:**
Solo. NOT A GIT REPO, so I could not read dates. Tell me when you built it and whether it is live anywhere. Scope in the folder: Next.js App Router, 12 Prisma models, admin dashboard, listings, sell flow, blog, ad placements, Clerk auth, account settings.

### Q3. What made it hard?

> Pick one of my candidates or replace them.

**DRAFTED FROM YOUR REPO — check this:**
Candidates I can see from the code: your scraper has random delays, certifi handling and retry logic, which means Bring a Trailer fought you. Or it is the data model, since you carry 12 models including ads, events and blog posts. Or pulling comparable pricing out of unstructured listing text. Which one actually cost you nights?

### Q4. What did you decide, and what did you reject?

> Why the REST endpoint over HTML parsing.

**DRAFTED FROM YOUR REPO — check this:**
You went after the WP REST endpoint instead of parsing rendered HTML. That is the decision, and HTML scraping is the alternative you rejected. Say why in your own words, because the reasoning is the interesting part.

### Q5. What number can you put on it?

> Add anything I could not see: users, traffic, cars listed by real people.

**DRAFTED FROM YOUR REPO — check this:**
From the repo: 20,245 listings scraped, 27 fields per listing, 50 image sets pulled, 12 data models, plus a separate dataset from a year earlier for comparison. Twenty thousand listings is a genuinely strong number. Lead with it.

### Q6. What broke, and what did you do?

> The scraper failure that made you write the retry logic.

**DRAFTED FROM YOUR REPO — check this:**
Rate limits, SSL, a schema change on their side, or bad rows. That retry logic in scrape.py exists for a reason. What was it?

### Q7. What media do you have?

> What you have, and whether you will make the chart.

**DRAFTED FROM YOUR REPO — check this:**
NEEDS YOU: screenshots of the listings page and the admin dashboard, and the scraper running. But the real opportunity is a chart. You have 20k listings and a year-over-year set. One good chart of Japanese car values over time would be the most interesting single object on your entire site.


---

## 06. RISD Car Design  [Mech]

*Your actual differentiator. Engineers who can draw are rare and everyone notices. This is the page people screenshot.*

### Q1. What is it, in one sentence?

> What the brief was and what you designed. Class of car, who it is for, what it is supposed to feel like.

_______________________________________________

### Q2. Role, timeline, status

> A course, a workshop, or self-directed. How long. Roughly how many sketches exist.

_______________________________________________

### Q3. What made it hard?

> Design constraints are real constraints: package, occupant position, wheelbase, powertrain layout, regulations. Or plainly, learning to draw a wheel that sits right on the ground.

_______________________________________________

### Q4. What did you decide, and what did you reject?

> A proportion or surfacing decision you made and the direction you abandoned. If you kept the earlier sketch, we show both.

_______________________________________________

### Q5. What number can you put on it?

> Harder here but not impossible: wheelbase, track, overall length, seating position, drag target, number of iterations.

_______________________________________________

### Q6. What broke, and what did you do?

> The version that did not work and why you scrapped it.

_______________________________________________

### Q7. What media do you have?

> This page is carried entirely by images. Scan the sketches flat in even light, not photographed at an angle on a desk. Include the rough ones. Process sells harder than one clean render.

_______________________________________________


---

## 07. Phantom Typewriter  [Hardware]

*The strange one, and the only project carrying personality. Do not sand the weirdness off it.*

### Q1. What is it, in one sentence?

> Tell me what it is. A real typewriter that does something unexpected? One that types by itself? One that writes to a screen? It is the best name on your list and I have no idea what it does.

_______________________________________________

### Q2. Role, timeline, status

> Solo, when, and does it work.

_______________________________________________

### Q3. What made it hard?

> Mechanical, electrical, or software. What fought you.

_______________________________________________

### Q4. What did you decide, and what did you reject?

> The key decision. Sensing the existing keys versus replacing the mechanism, actuating versus reading, restoring versus gutting.

_______________________________________________

### Q5. What number can you put on it?

> Words per minute, key travel, latency, number of keys wired, cost, hours in it.

_______________________________________________

### Q6. What broke, and what did you do?

> What broke, and whether you had to redesign around it.

_______________________________________________

### Q7. What media do you have?

> Video, and it is not optional. Nobody will understand this from a still. Ten seconds of it doing the thing.

_______________________________________________


---

## 08. Coleman Frame  [Fab]

*Fabrication is the one hard skill nothing else in your eight proves. Closes the site with a real object that got loaded and survived.*

### Q1. What is it, in one sentence?

> What it is and what it holds. A frame for what, mounted to what.

_______________________________________________

### Q2. Role, timeline, status

> Solo, how long it took, is it on the vehicle now, how many trips it has done.

_______________________________________________

### Q3. What made it hard?

> Load, weight, packaging around the vehicle, welding thin wall, or working without a proper jig.

_______________________________________________

### Q4. What did you decide, and what did you reject?

> Material and process. Why that tube size and wall thickness. Steel versus aluminum. MIG versus TIG. What you rejected and why.

_______________________________________________

### Q5. What number can you put on it?

> Frame weight, load carried, tube OD and wall, number of welds, cost, miles traveled on it.

_______________________________________________

### Q6. What broke, and what did you do?

> A weld that cracked, a fitment problem, something that worked loose on the highway.

_______________________________________________

### Q7. What media do you have?

> Tacked up in the jig, the finished welds close enough to see the beads, and it loaded in the field. Close-up weld photos are the proof and most people forget to take them.

_______________________________________________


# SWAP CANDIDATES

Not featured today, but promotable if one of the eight comes up thin.


---

## Mosquito Drone  [Hardware]

*Not built yet. Fill this in as a plan now, then update as you build. When it flies it takes slot 07.*

### Q1. What is it, in one sentence?

> What it is supposed to do, precisely. Detect and kill mosquitoes how, in what space.

_______________________________________________

### Q2. Role, timeline, status

> Solo? When are you starting? What is the realistic finish date.

_______________________________________________

### Q3. What made it hard?

> Detection at that size, tracking something that moves erratically, flight time, or doing anything lethal safely indoors. Which one worries you most.

_______________________________________________

### Q4. What did you decide, and what did you reject?

> CV on board versus off board. Which platform. What the actuator is. Name what you have already ruled out.

_______________________________________________

### Q5. What number can you put on it?

> Target detection range, frame rate, flight time, weight budget, parts budget.

_______________________________________________

### Q6. What broke, and what did you do?

> Nothing yet. Keep this box open and fill it in the day something fails, because you will not remember it later.

_______________________________________________

### Q7. What media do you have?

> Photograph the build as you go, especially the parts that fail. That folder is what makes this case study writable.

_______________________________________________


---

## NEST Messages  [Software]

*Demoted out of slot 05 after reading the repo. It is a single static Vite and React landing page, 3 commits, one day, and your own README says the signup form is non-functional with no backend. As a case study it would not survive a click on the repo link. It is also youth mental health, which is a domain that needs real care and real collaborators before it goes on a site as your work.*

### Q1. What is it, in one sentence?

> Correct me if there is more to it.

**DRAFTED FROM YOUR REPO — check this:**
A landing page for a concept: positive micro-interventions delivered by text to young people, in a mix of tones, positioned as built with clinicians and educators.

### Q2. Role, timeline, status

> Confirm.

**DRAFTED FROM YOUR REPO — check this:**
Solo. 3 commits, all on 23 September 2025. Static marketing page only, no backend.

### Q3. What made it hard?

> Anything?

**DRAFTED FROM YOUR REPO — check this:**
Honest answer is probably nothing was hard, because it is a landing page. If there is more to this that is not in the repo, tell me and I will reconsider.

### Q4. What did you decide, and what did you reject?

> Class, competition, org, or your own idea?

**DRAFTED FROM YOUR REPO — check this:**
NEEDS YOU: was this for a class, a competition, an organization, or your own idea?

### Q5. What number can you put on it?

> Anything measured.

**DRAFTED FROM YOUR REPO — check this:**
None available.

### Q6. What broke, and what did you do?

> Anything.

**DRAFTED FROM YOUR REPO — check this:**
n/a

### Q7. What media do you have?

> Answer the clinician question.

**DRAFTED FROM YOUR REPO — check this:**
The page itself. NEEDS YOU: is the clinician and educator claim on the page real? If it is not, it has to come off before this goes anywhere public.


---

## EchoPilot  [Software]

*Reading the repo: this is a well-developed business plan, not a product. Twelve strategy and integration documents, a brand guide, a launch timeline, and an apps/marketing folder. That is real work but it is product and GTM thinking, not engineering. It belongs on the site as a business case study or not at all.*

### Q1. What is it, in one sentence?

> Confirm or correct.

**DRAFTED FROM YOUR REPO — check this:**
A product that lets small business owners manage their Google Business Profile entirely over SMS: respond to reviews, update hours, post updates, request reviews from customers, without ever opening a dashboard.

### Q2. Role, timeline, status

> Confirm.

**DRAFTED FROM YOUR REPO — check this:**
Solo. First commit 6 December 2025, last 20 January 2026, 5 commits. Built: marketing site. Not built: the product. Planned stack was Next.js on Vercel, Fastify on Railway, Supabase, Twilio, Google Business Profile API, Stripe.

### Q3. What made it hard?

> Was Google verification really the blocker?

**DRAFTED FROM YOUR REPO — check this:**
From your own docs, the blocker was not code: a 60 day Google Business Profile verification requirement and the Google API approval process, plus Twilio approval. That is a genuinely interesting constraint and it is the honest story of this project.

### Q4. What did you decide, and what did you reject?

> Confirm the SMS-first call.

**DRAFTED FROM YOUR REPO — check this:**
The decision documented across your files is SMS as the primary interface with AI as an optional helper and the dashboard secondary. That is a real and slightly contrarian product call. The rejected alternative is the dashboard-first SaaS everyone else builds.

### Q5. What number can you put on it?

> How many businesses did you actually talk to?

**DRAFTED FROM YOUR REPO — check this:**
12 planning documents, echopilot.me registered. NEEDS YOU: how far did the Google verification actually get, and did you talk to any Boulder businesses? You have a boulder-business-outreach.md, so presumably yes. How many?

### Q6. What broke, and what did you do?

> What stopped it.

**DRAFTED FROM YOUR REPO — check this:**
NEEDS YOU: what stopped it. Google approval, time, or losing interest? Any of those is a fine answer and the third one is the most common.

### Q7. What media do you have?

> What is worth showing.

**DRAFTED FROM YOUR REPO — check this:**
The marketing site, the brand guide, and the architecture from stack.md.


---

## Valdra Outside  [Software]

*Promoted from the index after reading the repo. 62 commits across a full year on a live domain for a real business is not a favor for your girlfriend, it is sustained client work. That reads well.*

### Q1. What is it, in one sentence?

> Confirm.

**DRAFTED FROM YOUR REPO — check this:**
The website and online presence for VALDRA Outside, an outdoor gear company making first-aid products for adventurers. React 18, React Router, custom CSS, deployed to valdraoutside.com.

### Q2. Role, timeline, status

> Confirm.

**DRAFTED FROM YOUR REPO — check this:**
Solo build. First commit 21 August 2025, last 3 August 2026, 62 commits. Almost exactly a year of ongoing work, which is the most interesting fact about it.

### Q3. What made it hard?

> What was actually hard.

**DRAFTED FROM YOUR REPO — check this:**
NEEDS YOU: was it the design, the ecommerce side, or working with a client who is also your girlfriend? The last one is a real answer and an interesting one.

### Q4. What did you decide, and what did you reject?

> Why not Shopify.

**DRAFTED FROM YOUR REPO — check this:**
NEEDS YOU: why plain React and custom CSS rather than Shopify or Squarespace for a product company? There is a good answer here and it is probably about control or cost.

### Q5. What number can you put on it?

> Traffic or orders if you have them.

**DRAFTED FROM YOUR REPO — check this:**
62 commits over 12 months, 5 pages, a hero carousel. NEEDS YOU: traffic, orders, or launch date.

### Q6. What broke, and what did you do?

> Anything.

**DRAFTED FROM YOUR REPO — check this:**
NEEDS YOU.

### Q7. What media do you have?

> URL and screenshots.

**DRAFTED FROM YOUR REPO — check this:**
Live URL, screenshots, and the adventure photography the site is built around.


---

## Land Finder ("something")  [Software]

*Read it properly on your follow-up question. This holds the single most interesting piece of code you own: lib/scoring.ts, a weighted multi-factor model that scores a parcel for privacy, beauty, buildability and recreation from slope, forest cover, water distance, road access, aspect, elevation and public-land adjacency. That is a domain model with opinions in it, not CRUD, and almost nobody applying to the same jobs will have written one. What it does not have is real data. Import the county shapefiles and this takes slot 05.*

### Q1. What is it, in one sentence?

> Correct my sentence.

**DRAFTED FROM YOUR REPO — check this:**
A land discovery tool for Bonner and Boundary counties in North Idaho that scores rural parcels on how private, beautiful, buildable and recreation-adjacent they are, so a buyer can find good land nobody else noticed. Your own README line is the tagline: find land nobody else noticed.

### Q2. Role, timeline, status

> Active, parked, or being shown to investors?

**DRAFTED FROM YOUR REPO — check this:**
Solo. 1 commit, 8 May 2026, but the commit count is misleading: 25 source files and about 2,700 lines. NEEDS YOU: is this active, parked, or something you are showing to the land investors you have been talking to?

### Q3. What made it hard?

> The scoring weights or the GIS pipeline. Which.

**DRAFTED FROM YOUR REPO — check this:**
The interesting hard part is visible in scoring.ts: turning subjective ideas like privacy and beauty into numbers a computer can rank, from public GIS layers. Every weight in that file is a judgment call you had to defend to yourself. Second candidate is the geospatial pipeline, going from county shapefiles to PostGIS polygons to enrichment from USGS DEM, NLCD canopy and PAD-US.

### Q4. What did you decide, and what did you reject?

> Why graceful degradation, and why MapLibre over Mapbox.

**DRAFTED FROM YOUR REPO — check this:**
Two good ones are already in the code. First, everything degrades: no Supabase and it runs on curated local parcels, no OpenAI key and a deterministic regex parser handles natural-language search, and every parcel ships a baked-in summary so the drawer is never empty. That is a deliberate design stance and most people do not build that way. Second, MapLibre with OSM and Esri tiles instead of Mapbox, which means no key and no per-load cost. Say why on both.

### Q5. What number can you put on it?

> Real parcel count once you import. That is the unlock.

**DRAFTED FROM YOUR REPO — check this:**
From the repo: about 2,700 lines across 25 files, 4 scoring dimensions with documented weights, roughly 50 curated parcels, 2 counties, PostGIS schema with spatial indexes. NEEDS YOU, and this is the number that changes everything: how many real parcels once you run the importer against the actual Bonner and Boundary GIS data?

### Q6. What broke, and what did you do?

> A parcel the model scored badly wrong.

**DRAFTED FROM YOUR REPO — check this:**
NEEDS YOU. Anything in the shapefile import or the scoring that produced obviously wrong answers is a great story, because a scoring model that ranked a swamp as beautiful is the kind of failure people remember.

### Q7. What media do you have?

> Record the map.

**DRAFTED FROM YOUR REPO — check this:**
NEEDS YOU: a screen recording of the map with the drawer open on a high-scoring parcel. Geospatial work photographs better than any other kind of software, and this is the one project where a screenshot genuinely sells it.


---

## Client Work (Sutton Web Solutions, Ute Pass)  [Software]

*Also not on your list. You have an agency site and at least one real client site (Ute Pass Vacation Rentals, a family-owned rental business). Paid client work is one of the few things on a portfolio that a hiring manager reads as unambiguous proof you can finish something for someone other than yourself. Consider one combined page.*

### Q1. What is it, in one sentence?

> What Sutton Web Solutions is, and which clients you actually shipped for.

_______________________________________________

### Q2. Role, timeline, status

> When, how many clients, were you paid, is it still going.

_______________________________________________

### Q3. What made it hard?

> Scope, clients changing their minds, or deadlines.

_______________________________________________

### Q4. What did you decide, and what did you reject?

> One technical or process decision you made across projects.

_______________________________________________

### Q5. What number can you put on it?

> Clients, sites shipped, revenue, Lighthouse scores.

_______________________________________________

### Q6. What broke, and what did you do?

> A project that went sideways and what you learned.

_______________________________________________

### Q7. What media do you have?

> Live URLs for the client sites.

_______________________________________________


---

## Yosemite Sam Alarm Clock  [Hardware]

*The obvious swap for the record player if that one turns out thinner than expected.*

### Q1. What is it, in one sentence?

> What it does. What Yosemite Sam has to do with it.

_______________________________________________

### Q2. Role, timeline, status

> Solo, when, does it work.

_______________________________________________

### Q3. What made it hard?

> Mechanism, audio, electronics, or enclosure.

_______________________________________________

### Q4. What did you decide, and what did you reject?

> Key decision and the rejected option.

_______________________________________________

### Q5. What number can you put on it?

> Cost, parts count, decibels, hours.

_______________________________________________

### Q6. What broke, and what did you do?

> What broke.

_______________________________________________

### Q7. What media do you have?

> Photos, and a video of the alarm going off.

_______________________________________________


---

## Computer Case  [Hardware]

*Reads as CAD, sheet or panel work, thermals, and taste all at once if you have numbers.*

### Q1. What is it, in one sentence?

> What you built and why the off-the-shelf option did not work.

_______________________________________________

### Q2. Role, timeline, status

> Solo, when, in use now?

_______________________________________________

### Q3. What made it hard?

> Thermals, packaging, material, or tooling.

_______________________________________________

### Q4. What did you decide, and what did you reject?

> Material and process choice, and what you rejected.

_______________________________________________

### Q5. What number can you put on it?

> Volume in liters, temps under load before and after, weight, cost, dB.

_______________________________________________

### Q6. What broke, and what did you do?

> What broke or did not fit.

_______________________________________________

### Q7. What media do you have?

> CAD, in progress, finished, and a thermal comparison chart if you measured.

_______________________________________________


---

## Custom Car Radio (3D print)  [Hardware]

*Candidate for slot 08. Count your revisions honestly. Six revisions with calipers beats the Coleman frame. Three prints until it looked right does not.*

### Q1. What is it, in one sentence?

> What it is and which vehicle it goes in.

_______________________________________________

### Q2. Role, timeline, status

> Solo, when, installed and working?

_______________________________________________

### Q3. What made it hard?

> Fitting an unknown cavity, tolerance, heat, or the electronics.

_______________________________________________

### Q4. What did you decide, and what did you reject?

> How you captured the dash geometry, material choice, and what you rejected.

_______________________________________________

### Q5. What number can you put on it?

> Number of print revisions, tolerance achieved in mm, print time, filament cost, gap at the trim edge.

_______________________________________________

### Q6. What broke, and what did you do?

> The revisions that did not fit and what you measured differently.

_______________________________________________

### Q7. What media do you have?

> CAD, the print iterations lined up in a row, and it installed in the dash. A row of failed revisions is a great photo.

_______________________________________________


---

## Backpack Frame  [Fab]

*Backup for the Coleman frame. Same story shape, smaller load.*

### Q1. What is it, in one sentence?

> What it is and what it carries.

_______________________________________________

### Q2. Role, timeline, status

> Solo, when, have you actually hiked with it.

_______________________________________________

### Q3. What made it hard?

> Weight, comfort, load path, or welding thin tube.

_______________________________________________

### Q4. What did you decide, and what did you reject?

> Material and geometry choice, and the rejected option.

_______________________________________________

### Q5. What number can you put on it?

> Frame weight, load carried, miles hiked with it, cost.

_______________________________________________

### Q6. What broke, and what did you do?

> What failed or hurt.

_______________________________________________

### Q7. What media do you have?

> Welds, the frame, and it loaded on your back on a trail.

_______________________________________________


---

## 4Runners and the Pickup  [Mech]

*Four vehicles is a body of work, not a hobby. Best treated as one page about a fleet you keep alive.*

### Q1. What is it, in one sentence?

> The four vehicles, years and models, and what you have done to each in one line apiece.

_______________________________________________

### Q2. Role, timeline, status

> How long you have been running them, and how many are on the road right now.

_______________________________________________

### Q3. What made it hard?

> Parts availability, rust, budget, working outside, or diagnosing without a scan tool.

_______________________________________________

### Q4. What did you decide, and what did you reject?

> One repair where you chose the harder correct fix over the quick one.

_______________________________________________

### Q5. What number can you put on it?

> Combined mileage, years owned, money spent, longest single repair.

_______________________________________________

### Q6. What broke, and what did you do?

> The worst breakdown and how you got home.

_______________________________________________

### Q7. What media do you have?

> All four together if you can manage it. That single photo does more than any paragraph.

_______________________________________________


# INDEX ENTRIES

One line, one number, one image. That is all an index row can hold.


---

## PICO-8 Games  [Software]

### One line for the index

> Names of both games and what you play in each. I could not find them in your GitHub folder, so tell me where they live.

_______________________________________________

### One number or spec

> Lines of code, token count, hours, players.

_______________________________________________

### Best photo or video you have

> Playable links and animated GIFs. GIFs are the whole pitch here.

_______________________________________________


---

## Creative Tech Coursework  [Hardware]

### One line for the index

> You have a whole documentation site for this: IDC1 ideation, IDC1 project, an enclosures mini project. Tell me in one line what the course was and which of your hardware projects came out of it.

_______________________________________________

### One number or spec

> Semester, number of projects, your grade if it flatters you.

_______________________________________________

### Best photo or video you have

> The site is already built. Is it deployed? If so it links straight from your index.

_______________________________________________


---

## Resume Maker  [Software]

### One line for the index

> A drag-and-drop resume builder with live preview and PDF export. Is this the ancestor of LandedTheJob? If so, say that, because a project that turned into a better project is a good story.

_______________________________________________

### One number or spec

> 4 commits, September 2025. Anything else.

_______________________________________________

### Best photo or video you have

> Screenshot or a live link.

_______________________________________________


---

## Flame Thrower  [Hardware]

### One line for the index

> What it is, and lead with the safety interlock rather than the flame.

_______________________________________________

### One number or spec

> Range, fuel type and capacity, burn time, ignition reliability.

_______________________________________________

### Best photo or video you have

> A photo that shows the valve and interlock hardware, not just fire.

_______________________________________________


---

## Plasma Gun  [Hardware]

### One line for the index

> What it is and what it actually does. Same rule: lead with the electrical safety design.

_______________________________________________

### One number or spec

> Voltage, current, arc length, duty cycle, cost.

_______________________________________________

### Best photo or video you have

> Internals and a short video.

_______________________________________________


---

## Motorized La-Z-Boy  [Hardware]

### One line for the index

> One line, and let it be funny. This one earns its place by being funny.

_______________________________________________

### One number or spec

> Top speed, range, battery, weight, motor size.

_______________________________________________

### Best photo or video you have

> Video of someone riding it. Nothing else will do.

_______________________________________________


---

## Angel Pyro Sculpture  [Fab]

### One line for the index

> What it is and what it is made of.

_______________________________________________

### One number or spec

> Height, weight, material, hours.

_______________________________________________

### Best photo or video you have

> A good photo of it lit at night.

_______________________________________________


---

## Bird Cage  [Fab]

### One line for the index

> What you built and for what bird.

_______________________________________________

### One number or spec

> Dimensions, material, cost versus buying one.

_______________________________________________

### Best photo or video you have

> Finished photo, ideally occupied.

_______________________________________________


---

## Physical Scrabble Work Finder  [Hardware]

### One line for the index

> What it is. The name is intriguing and completely opaque, so be literal.

_______________________________________________

### One number or spec

> Anything measured.

_______________________________________________

### Best photo or video you have

> Video, because this sounds like it needs one.

_______________________________________________


---

## Car Exhaust  [Fab]

### One line for the index

> Which car, what you built, and why.

_______________________________________________

### One number or spec

> Pipe diameter, length, dB before and after, dyno numbers if you have them.

_______________________________________________

### Best photo or video you have

> Welds and the finished system under the car.

_______________________________________________


---

## 3D Printed Car Parts  [Hardware]

### One line for the index

> What parts, for what cars, and which ones are still in service.

_______________________________________________

### One number or spec

> How many parts, print hours, material, cost versus OEM.

_______________________________________________

### Best photo or video you have

> A grid of the parts, and any of them installed.

_______________________________________________


---

## Ducati  [Mech]

### One line for the index

> Which bike and what you did to it.

_______________________________________________

### One number or spec

> Year, miles, what you have replaced, cost.

_______________________________________________

### Best photo or video you have

> The bike, and anything you took apart.

_______________________________________________


# WRITING

The essay. Different shape, different purpose.


---

## Yestermorrow + North Carolina (essay)  [Writing]

*Not a case study. One essay, and the place on the site where you show how you think rather than what you made.*

### Q1. What is it, in one sentence?

> What you went to Yestermorrow to build, and what you built in North Carolina. Plainly, no reflection yet.

_______________________________________________

### Q2. Role, timeline, status

> When each was, how long, who you went with, and whether Archie was on both.

_______________________________________________

### Q3. What made it hard?

> What you did not expect. What building by hand taught you that a CAD screen does not.

_______________________________________________

### Q4. What did you decide, and what did you reject?

> One thing you believe about building now that you did not believe before those trips.

_______________________________________________

### Q5. What number can you put on it?

> Dates, days on site, square footage, what got finished.

_______________________________________________

### Q6. What broke, and what did you do?

> Something that went wrong on site, ideally funny.

_______________________________________________

### Q7. What media do you have?

> Archie's Mad River Valley photos, which need a link and a credit line with his name on it. Plus anything you shot yourself.

_______________________________________________

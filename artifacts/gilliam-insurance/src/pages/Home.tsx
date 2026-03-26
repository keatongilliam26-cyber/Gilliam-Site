import { useEffect, useRef, FormEvent, useState } from "react";
import "../gilliam.css";

const CITIES = [
  "Brownstown","Woodhaven","Trenton","Riverview","Southgate","Wyandotte",
  "Gibraltar","Flat Rock","Rockwood","Monroe","Grosse Ile","Allen Park",
  "Lincoln Park","Taylor","Romulus","Belleville","Carleton","Dundee",
  "Huron Twp","New Boston","LaSalle","Dearborn Hts","Melvindale","Ecorse",
  "River Rouge","Detroit","Dearborn","Westland","Garden City","Inkster",
  "Wayne","Canton","Ypsilanti","Milan","South Rockwood","Maybee",
  "Estral Beach","Whittaker","Willis","Sumpter Twp","Van Buren Twp","Rawsonville",
  "Springville","Azalia","Monroe Twp"
];

type TabId = "team" | "reviews" | "community" | "cities" | null;

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function Home() {
  const progressRef = useRef<HTMLDivElement>(null);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [activeTab, setActiveTab] = useState<TabId>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (progressRef.current) {
        const scrolled = Math.min(
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100,
          100
        );
        progressRef.current.style.width = scrolled + "%";
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/mykbydlz", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSubmitStatus("sent");
        form.reset();
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    }
  };

  const toggleTab = (tab: TabId) => {
    setActiveTab((prev) => (prev === tab ? null : tab));
  };

  return (
    <>
      <div id="prog" ref={progressRef} />

      {/* NAV */}
      <nav>
        <a href="#top" className="nlogo">
          <img src={`${BASE}/logo-white.png`} alt="Gilliam Insurance Services" className="nav-logo-img" />
        </a>
        <div className="nlinks">
          <a href="#coverage">Coverage</a>
          <a href="#about">About Keaton</a>
          <a href="#explore">Our Team & More</a>
          <a href="#reviews-tab" onClick={() => setActiveTab("reviews")}>Reviews</a>
          <a href="#explore" onClick={() => setActiveTab("cities")}>Service Area</a>
          <a href="tel:7342302464" className="ncta">(734) 230-2464</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hl">
          <img src={`${BASE}/logo-white.png`} alt="Gilliam Insurance Services" className="hlogo" />
          <div className="eyebrow">
            <div className="eline" />
            <span>Farm Bureau Insurance &middot; Southeast Michigan</span>
          </div>
          <h1>Your <em>Local</em> Agent.<br />Real Coverage.<br />Real People.</h1>
          <p className="hbio">
            We decided to start Gilliam Insurance Services because we care about the people in our community. We live and work in this area — our service is always personal and always local.
          </p>
          <div className="hbtns">
            <a href="#quote" className="btnr">Get a Free Quote</a>
            <a href="tel:7342302464" className="btng">Call (734) 230-2464</a>
          </div>
        </div>
        <div className="hr">
          <div className="acard">
            <div className="aphoto"><span className="ainit">KG</span></div>
            <div className="aname">Keaton Gilliam</div>
            <div className="arole">Licensed Farm Bureau Agent</div>
            <div className="ahr" />
            <div className="arow">
              <span className="aicon">📍</span>
              <span className="atxt">21689 Telegraph Rd<br />Brownstown, MI 48183</span>
            </div>
            <div className="arow">
              <span className="aicon">📞</span>
              <span className="atxt"><a href="tel:7342302464">(734) 230-2464</a></span>
            </div>
            <div className="arow">
              <span className="aicon">🏆</span>
              <span className="atxt">Multi-line licensed &middot; Home &middot; Auto &middot; Life &middot; Commercial</span>
            </div>
            <div className="astars">★★★★★</div>
            <div className="arating">Southeast Michigan's Trusted Agent</div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust">
        <div className="ti">✓ Multi-Line Licensed Team</div>
        <div className="ti">✓ Farm Bureau Insurance</div>
        <div className="ti">✓ One Call Handles Everything</div>
        <div className="ti">✓ 20+ Cities Served</div>
        <div className="ti">✓ Continued Education Certified</div>
      </div>

      {/* STATS */}
      <section className="sec boff">
        <div className="slabel reveal">Michigan By the Numbers</div>
        <h2 className="stitle reveal">Why the Right Coverage Matters More<br />Here Than Almost Anywhere Else</h2>
        <div className="sgrid">
          <div className="sbox reveal d1">
            <div className="sbig">~20%</div>
            <p>of Michigan drivers have no insurance — you share the road with them every day</p>
            <small>Insurance Research Council, 2022</small>
          </div>
          <div className="sbox reveal d2">
            <div className="sbig">$3,146</div>
            <p>average annual full coverage auto premium in Michigan — among the highest in the nation</p>
            <small>Insure.com, 2025</small>
          </div>
          <div className="sbox reveal d3">
            <div className="sbig">Top 5</div>
            <p>Michigan ranks top 5 most expensive states for car insurance year after year</p>
            <small>Multiple industry sources, 2025</small>
          </div>
          <div className="sbox reveal">
            <div className="sbig">$20/mo</div>
            <p>approximate starting cost of $250k life insurance for a healthy 25-year-old</p>
            <small>Approximate — actual quote required</small>
          </div>
        </div>
      </section>

      {/* COVERAGE */}
      <section className="sec bblack" id="coverage">
        <div className="slabel reveal w">What We Cover</div>
        <h2 className="stitle white reveal">Complete Protection for <em>Every</em> Part of Your Life</h2>
        <div className="cgrid">
          <div className="ccard reveal d1">
            <span className="cicon">
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 17H3v-4l2.5-6h13L21 13v4h-2"/>
                <circle cx="7.5" cy="17.5" r="2.5"/>
                <circle cx="16.5" cy="17.5" r="2.5"/>
                <path d="M10 17h4"/>
              </svg>
            </span>
            <h3>Auto Insurance</h3>
            <p>With nearly 1 in 5 Michigan drivers uninsured, proper auto coverage is essential. We make sure you're fully protected, including uninsured motorist coverage.</p>
          </div>
          <div className="ccard reveal d2">
            <span className="cicon">
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12l9-9 9 9"/>
                <path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/>
              </svg>
            </span>
            <h3>Home Insurance</h3>
            <p>Your home is your biggest asset. We review your policy annually to make sure your coverage reflects its current value and nothing is left unprotected.</p>
          </div>
          <div className="ccard reveal d3">
            <span className="cicon">
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4.5 8-10.5V5l-8-3-8 3v6.5c0 6 8 10.5 8 10.5z"/>
                <path d="M9 12h1.5l1-2.5 2 5 1-2.5H15"/>
              </svg>
            </span>
            <h3>Life Insurance</h3>
            <p>A healthy 25-year-old can get $250k in coverage for around $20/month. We'll get you a quote same day — no pressure, no runaround.</p>
          </div>
          <div className="ccard reveal d1">
            <span className="cicon">
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="12" height="17" rx="1"/>
                <rect x="15" y="10" width="6" height="11" rx="1"/>
                <path d="M7 8h2M11 8h2M7 12h2M11 12h2M7 16h2M11 16h2"/>
              </svg>
            </span>
            <h3>Business Insurance</h3>
            <p>Southeast Michigan business owners trust us for BOP, commercial auto, workers' comp, and liability. Let us protect what you've built.</p>
          </div>
          <div className="ccard reveal d2">
            <span className="cicon">
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 13l4-6h10l4 6"/>
                <rect x="3" y="13" width="18" height="8" rx="1"/>
                <path d="M10 21v-5h4v5"/>
                <path d="M7 16h2M15 16h2"/>
              </svg>
            </span>
            <h3>Farmowners Insurance</h3>
            <p>Farm Bureau was built by farmers. We offer comprehensive farmowners coverage protecting your land, livestock, equipment, and livelihood.</p>
          </div>
          <div className="ccard reveal d3">
            <span className="cicon">
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12a11 11 0 0122 0"/>
                <path d="M12 12v7a2 2 0 004 0"/>
                <path d="M12 2v2"/>
              </svg>
            </span>
            <h3>Umbrella Policies</h3>
            <p>One lawsuit can wipe out everything above your auto or home limits. An umbrella policy adds $1M+ of protection for just a few hundred dollars a year.</p>
          </div>
        </div>
      </section>

      {/* ACCORDION EXPLORER — Team, Reviews, Community, Cities */}
      <section className="sec boff" id="explore">
        <div className="slabel reveal">Explore More</div>
        <h2 className="stitle reveal" style={{ marginBottom: "36px" }}>
          Meet the Team. Read the Reviews. <em>See Our Area.</em>
        </h2>
        <div className="tab-bar reveal">
          {(["team","reviews","community","cities"] as TabId[]).map((tab) => (
            <button
              key={tab}
              className={`tab-btn tab-btn--light${activeTab === tab ? " tab-btn--active" : ""}`}
              onClick={() => toggleTab(tab)}
            >
              {tab === "team" && "Our Team"}
              {tab === "reviews" && "Client Reviews"}
              {tab === "community" && "Community"}
              {tab === "cities" && "Service Area"}
              <span className="tab-chevron">{activeTab === tab ? "▲" : "▼"}</span>
            </button>
          ))}
        </div>

        {/* TEAM PANEL */}
        <div id="team" className={`tab-panel tab-panel--light${activeTab === "team" ? " tab-panel--open" : ""}`}>
          <p className="tab-intro tab-intro--dark">We're not a call center. We're a small local team that genuinely cares about every client we work with.</p>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-photo"><div className="team-init">KG</div></div>
              <div className="team-role-badge">Owner &amp; Agent</div>
              <h3 className="team-name">Keaton Gilliam</h3>
              <div className="team-divider" />
              <p className="team-bio">Keaton founded Gilliam Insurance Services with one goal: to be the kind of agent he'd want for his own family. As a licensed multi-line Farm Bureau Insurance agent, he handles the full picture — home, auto, life, commercial, and farm coverage.</p>
              <div className="team-tags"><span>Home &amp; Auto</span><span>Life Insurance</span><span>Commercial</span><span>Farmowners</span></div>
            </div>
            <div className="team-card">
              <div className="team-photo"><div className="team-init">CC</div></div>
              <div className="team-role-badge">Sales Specialist</div>
              <h3 className="team-name">Connor</h3>
              <div className="team-divider" />
              <p className="team-bio">Connor is our sales specialist and brings energy, knowledge, and a no-pressure approach to every conversation. He's fully licensed to discuss life insurance and makes sure every new client walks away fully protected.</p>
              <div className="team-tags"><span>New Business</span><span>Auto &amp; Home</span><span>Life Insurance</span><span>Bundling</span></div>
            </div>
            <div className="team-card">
              <div className="team-photo"><div className="team-init">BC</div></div>
              <div className="team-role-badge">Customer Service</div>
              <h3 className="team-name">Bre</h3>
              <div className="team-divider" />
              <p className="team-bio">Bre is the backbone of our agency. She handles renewals, policy updates, certificates of insurance, and everything in between — making sure our clients feel taken care of every single time they reach out.</p>
              <div className="team-tags"><span>Policy Service</span><span>Renewals</span><span>COIs</span><span>Client Support</span></div>
            </div>
          </div>
        </div>

        {/* REVIEWS PANEL */}
        <div id="reviews-tab" className={`tab-panel tab-panel--light${activeTab === "reviews" ? " tab-panel--open" : ""}`}>
          <p className="tab-intro tab-intro--dark">Real People. Real Results. Southeast Michigan families trust us.</p>
          <div className="rgrid">
            <div className="rcard">
              <div className="rstars">★★★★★</div>
              <p className="rtext">"I couldn't be happier to have found Keaton and his wonderful staff! He was so knowledgeable and truly earned my business and trust. He got me better coverage for a lower cost, and I was also able to set up two very affordable life insurance policies. You won't regret reaching out!"</p>
              <div className="rauthor"><div className="ravatar">KG</div><div><strong>Kara Gagnon</strong><br /><small>Google Review · Life, Auto &amp; Renter's Insurance</small></div></div>
            </div>
            <div className="rcard">
              <div className="rstars">★★★★★</div>
              <p className="rtext">"We couldn't be happier to have found Keaton and his wonderful staff! He helped us with a situation our former agent caused even before we signed anything. He earned our business and more importantly our trust. He got us better coverage for the same or cheaper amount."</p>
              <div className="rauthor"><div className="ravatar">ML</div><div><strong>Melissa Linkey</strong><br /><small>Google Review</small></div></div>
            </div>
            <div className="rcard">
              <div className="rstars">★★★★★</div>
              <p className="rtext">"Keaton was able to save me over $1,200 annually on my auto insurance, despite having a teen driver. His quote was by far the lowest for even more coverage. He also provided home insurance with better coverage and rates, plus a very affordable umbrella policy. Highly recommend!"</p>
              <div className="rauthor"><div className="ravatar">ER</div><div><strong>Erica Roberts</strong><br /><small>Google Review · Auto, Home &amp; Umbrella</small></div></div>
            </div>
            <div className="rcard">
              <div className="rstars">★★★★★</div>
              <p className="rtext">"Great experience and highly recommend for all of your insurance needs. Keaton was very knowledgeable and made sure that my needs were met."</p>
              <div className="rauthor"><div className="ravatar">RH</div><div><strong>Robert Hopper</strong><br /><small>Google Review</small></div></div>
            </div>
            <div className="rcard">
              <div className="rstars">★★★★★</div>
              <p className="rtext">"I highly recommend doing business with Connor and Keaton at Farm Bureau Insurance. They went above and beyond to help me out of a very bad situation. Thank you very much for helping me guys."</p>
              <div className="rauthor"><div className="ravatar">RP</div><div><strong>Rick Pogats</strong><br /><small>Google Review</small></div></div>
            </div>
            <div className="rcard">
              <div className="rstars">★★★★★</div>
              <p className="rtext">"Great rates, friendly, and knowledgeable. Awesome job!"</p>
              <div className="rauthor"><div className="ravatar">EN</div><div><strong>Eric Nadeau</strong><br /><small>Google Review</small></div></div>
            </div>
          </div>
          <div className="rcta" style={{ marginTop: "32px" }}>
            <p>Had a great experience with Gilliam Insurance? We'd love to hear from you.</p>
            <a href="https://g.page/r/review" className="btnr" target="_blank" rel="noopener">Leave a Google Review ★</a>
          </div>
        </div>

        {/* COMMUNITY PANEL */}
        <div className={`tab-panel tab-panel--light${activeTab === "community" ? " tab-panel--open" : ""}`}>
          <p className="tab-intro tab-intro--dark">We show up for our neighbors — not just when something goes wrong, but every day in the communities we call home.</p>
          <div className="cgallery" style={{ maxWidth: "100%" }}>
            <div className="cgallery-card">
              <div className="cgallery-img">
                <img src={`${BASE}/community-office.jpg`} alt="Gilliam Insurance Services office at 21689 Telegraph Rd, Brownstown MI" />
              </div>
              <p className="cgallery-cap">Our office at 21689 Telegraph Rd, Brownstown, MI</p>
            </div>
            <div className="cgallery-card">
              <div className="cgallery-img">
                <img src={`${BASE}/community-donation.jpg`} alt="$2,000 donation check to Airport Community Schools" />
              </div>
              <p className="cgallery-cap">Proud to donate $2,000 to Airport Community Schools — Ending Childhood Hunger in Michigan</p>
            </div>
            <div className="cgallery-card">
              <div className="cgallery-img">
                <img src={`${BASE}/community-golf-booth.jpg`} alt="Gilliam Farm Bureau Insurance booth at local golf event" />
              </div>
              <p className="cgallery-cap">Out in the community — sponsoring local golf events</p>
            </div>
            <div className="cgallery-card">
              <div className="cgallery-img">
                <img src={`${BASE}/community-golf-banner.jpg`} alt="Gilliam Insurance Services Experience Matters banner at golf driving range" />
              </div>
              <p className="cgallery-cap">"The Experience Matters." — Our message on and off the course</p>
            </div>
          </div>
        </div>

        {/* CITIES PANEL */}
        <div id="cities" className={`tab-panel tab-panel--light${activeTab === "cities" ? " tab-panel--open" : ""}`}>
          <p className="tab-intro tab-intro--dark">Gilliam Insurance Services proudly serves families and businesses throughout Wayne, Monroe, and surrounding counties.</p>
          <div className="citygrid">
            {CITIES.map((city) => <div key={city} className="city">{city}</div>)}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="sec bblack" id="about">
        <div className="agrid">
          <div className="apwrap">
            <div className="apbox">
              <div className="aphold">
                <span className="pi">KG</span>
                <span className="ph">Add your photo here</span>
              </div>
            </div>
            <div className="aaccent">
              <span className="aaccent-n">MI</span>
              <span className="aaccent-t">Farm<br />Bureau</span>
            </div>
          </div>
          <div>
            <div className="slabel reveal w">Meet Your Agent</div>
            <h2 className="stitle white reveal" style={{ marginBottom: "24px" }}>
              Keaton Gilliam —<br /><em>Brownstown's</em> Farm Bureau Agency
            </h2>
            <blockquote className="aquote reveal">
              "We decided to start this agency because we care about the people in our community. We live and work in this area — our service is always personal and always local."
            </blockquote>
            <p className="abody reveal">
              Because we care so much about protecting you and your family, we'll get to know you, your needs, and your dreams so we can develop a personal insurance plan for you. Knowing you have the right team handling all your needs is one of the most secure feelings you can have.
            </p>
            <p className="abody reveal">
              Our goal is to bring you peace of mind — and to help you through the toughest times of your life. As a licensed, multi-line team, we can meet all your insurance needs with just one call.
            </p>
            <ul className="acreds reveal">
              <li>Licensed Multi-Line Insurance Agent — Michigan</li>
              <li>Committed to Continued Education &amp; Professional Development</li>
              <li>Local to Southeast Michigan — Serving Our Own Community</li>
              <li>21689 Telegraph Rd, Brownstown, MI 48183 &middot; (734) 230-2464</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FARM BUREAU CREDENTIALS — Task 1: text only, no SVG logo */}
      <section className="sec bred">
        <div className="fbinner reveal">
          <div className="fb-name-block">
            <div className="fb-name-main">Farm Bureau</div>
            <div className="fb-name-ins">Insurance&reg;</div>
            <div className="fb-name-state">Michigan</div>
          </div>
          <div className="fbcreds">
            <div className="fbcred">
              <div className="fbcredn">A-</div>
              <div className="fbcredt">A.M. Best<br />Excellent</div>
            </div>
            <div className="fbcred">
              <div className="fbcredn">660K+</div>
              <div className="fbcredt">Policies<br />Statewide</div>
            </div>
            <div className="fbcred">
              <div className="fbcredn">75+</div>
              <div className="fbcredt">Years in<br />Michigan</div>
            </div>
          </div>
          <div className="fbratings">
            <div className="fbrow">
              <span className="fblabel">Claims Experience</span>
              <span className="fbval">Ward's Superior — 7 Years</span>
            </div>
            <div className="fbrow">
              <span className="fblabel">Financial Strength</span>
              <span className="fbval">A.M. Best "Excellent" A-</span>
            </div>
            <div className="fbrow">
              <span className="fblabel">Life Companies</span>
              <span className="fbval">Ward's Top 50 — 28 Times</span>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE FORM */}
      <section className="sec bblack" id="quote">
        <div className="slabel reveal w">Get Started Today</div>
        <h2 className="stitle white reveal">Request a Quote Today</h2>
        <div className="fgrid">
          <div className="reveal">
            <p className="fintro">As your local Farm Bureau Insurance team, we'll find you the right coverage at the right price — and we'll actually pick up the phone when you call.</p>
            <ul className="ffeats">
              <li>Free, no-obligation quote</li>
              <li>Same-day response guaranteed</li>
              <li>Home · Auto · Life · Commercial · Farm</li>
              <li>Local team that knows Southeast Michigan</li>
              <li>Backed by Farm Bureau's A- rated carrier</li>
            </ul>
          </div>
          <div className="fcard reveal d2">
            <h3>Request a Quote Today</h3>
            <p className="fcardsub">We will get back to you same business day.</p>
            <form onSubmit={handleSubmit} id="quoteForm">
              <input type="hidden" name="_subject" value="New Quote Request — Gilliam Insurance Services" />
              <div className="fgrow">
                <div className="fg">
                  <label>First Name</label>
                  <input type="text" name="first_name" placeholder="First" autoComplete="given-name" required />
                </div>
                <div className="fg">
                  <label>Last Name</label>
                  <input type="text" name="last_name" placeholder="Last" autoComplete="family-name" required />
                </div>
              </div>
              <div className="fg">
                <label>Phone Number</label>
                <input type="tel" name="phone" placeholder="(734) 000-0000" autoComplete="tel" required />
              </div>
              <div className="fg">
                <label>Email Address</label>
                <input type="email" name="email" placeholder="you@email.com" autoComplete="email" required />
              </div>
              <div className="fg">
                <label>What Product Are You Interested In?</label>
                <select name="product_type" required defaultValue="">
                  <option value="" disabled>Select a product...</option>
                  <option>Life Insurance</option>
                  <option>Home Insurance</option>
                  <option>Auto Insurance</option>
                  <option>Auto + Home Bundle</option>
                  <option>Commercial / Business</option>
                  <option>Farmowners</option>
                  <option>Umbrella Policy</option>
                  <option>Multiple / Not Sure</option>
                </select>
              </div>
              <div className="fg">
                <label>Anything Else We Should Know?</label>
                <textarea name="notes" placeholder="Optional — e.g. teen driver, new home, etc." />
              </div>
              <button
                type="submit"
                className="fsbtn"
                disabled={submitStatus === "sending" || submitStatus === "sent"}
                style={submitStatus === "sent" ? { background: "#1a6b3a" } : {}}
              >
                {submitStatus === "idle" && "Get My Free Quote →"}
                {submitStatus === "sending" && "Sending..."}
                {submitStatus === "sent" && "✓ Sent! We'll be in touch soon."}
                {submitStatus === "error" && "Error — please call us directly."}
              </button>
              <p className="fnote">No spam. No pressure. We will reach out personally within one business day.</p>
            </form>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bcta">
        <div>
          <h2 className="bctat">Ready to Work With a Local Team<br />Who Actually Knows Your Name?</h2>
          <p className="bctasub">Gilliam Insurance Services &middot; Brownstown, MI &middot; Farm Bureau Insurance</p>
        </div>
        <div className="bctar">
          <a href="tel:7342302464" className="bctaphone">(734) 230-2464</a>
          <a href="#quote" className="btnr">Request a Free Quote</a>
          <p className="bctaaddr">21689 Telegraph Rd &middot; Brownstown, MI 48183<br />Mon–Fri &middot; Local Team &middot; We Pick Up the Phone</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <img src={`${BASE}/logo-white.png`} alt="Gilliam Insurance Services" className="flogof" />
        <nav className="flinks">
          <a href="#coverage">Coverage</a>
          <a href="#about">About</a>
          <a href="#explore" onClick={() => setActiveTab("team")}>Our Team</a>
          <a href="#explore" onClick={() => setActiveTab("reviews")}>Reviews</a>
          <a href="#explore" onClick={() => setActiveTab("cities")}>Service Area</a>
          <a href="#quote">Get a Quote</a>
        </nav>
        <p className="fcopy">© 2025 Gilliam Insurance Services · Farm Bureau Insurance Agent · Brownstown, MI</p>
      </footer>

      {/* FLOATING CTA */}
      <div className="float-cta">
        <a href="#quote" className="float-btn">+ Get a Free Quote</a>
        <a href="tel:7342302464" className="float-phone">📞 (734) 230-2464</a>
      </div>
    </>
  );
}

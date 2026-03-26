import { useEffect, useRef, FormEvent } from "react";
import "../gilliam.css";

export default function Home() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (progressRef.current) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
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
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted!");
  };

  return (
    <>
      <div id="prog" ref={progressRef}></div>

      <nav>
        <a href="#top" className="nlogo">GILLIAM <em>INSURANCE</em></a>
        <div className="nlinks">
          <a href="#coverage">Coverage</a>
          <a href="#about">About Keaton</a>
          <a href="#team">Our Team</a>
          <a href="#reviews">Reviews</a>
          <a href="#cities">Service Area</a>
          <a href="tel:7342302464" className="ncta">(734) 230-2464</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hl">
          <div className="hlogo">GILLIAM <em>INSURANCE</em></div>
          <div className="eyebrow">
            <div className="eline"></div>
            <span>Farm Bureau Insurance</span>
          </div>
          <h1>Southeast Michigan's <em>Trusted</em> Insurance Expert</h1>
          <p className="hbio">
            Farm Bureau Insurance Agent serving Brownstown, Woodhaven, Trenton, and all of Southeast Michigan. One call handles everything.
          </p>
          <div className="hbtns">
            <a href="#contact" className="btnr">Get a Free Quote</a>
            <a href="#coverage" className="btng">Explore Coverage</a>
          </div>
          <div className="hphone">
            Need immediate assistance? Call <a href="tel:7342302464">(734) 230-2464</a>
          </div>
        </div>
        <div className="hr">
          <div className="acard">
            <div className="aphoto">
              <span className="ainit">KG</span>
            </div>
            <div className="aname">Keaton Gilliam</div>
            <div className="arole">Lead Agent</div>
            <div className="ahr"></div>
            <div className="arow">
              <span className="aicon">📍</span>
              <span className="atxt">21911 Telegraph Rd<br />Brownstown, MI 48183</span>
            </div>
            <div className="arow">
              <span className="aicon">📞</span>
              <span className="atxt"><a href="tel:7342302464">(734) 230-2464</a></span>
            </div>
            <div className="arow">
              <span className="aicon">✉️</span>
              <span className="atxt"><a href="mailto:keaton.gilliam@fbinsmi.com">keaton.gilliam@fbinsmi.com</a></span>
            </div>
            <div className="astars">★★★★★</div>
            <div className="arating">5-Star Customer Rating</div>
            <div className="aclogo">FARM BUREAU INSURANCE</div>
          </div>
        </div>
      </section>

      <section className="trust">
        <div className="ti">✓ 5-Star Rated</div>
        <div className="ti">✓ Licensed Agent</div>
        <div className="ti">✓ Farm Bureau Member</div>
        <div className="ti">✓ SE Michigan Local</div>
        <div className="ti">✓ Free Consultations</div>
      </section>

      <section className="sec boff" id="stats">
        <div className="slabel reveal"><span>Our Impact</span></div>
        <h2 className="stitle reveal d1">Dedicated to <em>protecting</em> what matters most.</h2>
        <div className="sgrid reveal d2">
          <div className="sbox">
            <div className="sbig">6+</div>
            <p>Years Experience</p>
            <small>Serving the community</small>
          </div>
          <div className="sbox">
            <div className="sbig">500+</div>
            <p>Families Served</p>
            <small>Trusted by locals</small>
          </div>
          <div className="sbox">
            <div className="sbig">6</div>
            <p>Coverage Types</p>
            <small>Comprehensive solutions</small>
          </div>
          <div className="sbox">
            <div className="sbig">98%</div>
            <p>Satisfaction Rate</p>
            <small>Based on client reviews</small>
          </div>
        </div>
      </section>

      <section className="sec" id="coverage">
        <div className="slabel reveal"><span>Coverage Options</span></div>
        <h2 className="stitle reveal d1">One Call. <em>Every Coverage.</em></h2>
        <div className="cgrid reveal d2">
          <div className="ccard">
            <span className="cicon">🏠</span>
            <h3>Home Insurance</h3>
            <p>Protect your greatest asset with comprehensive coverage tailored to your property and belongings.</p>
          </div>
          <div className="ccard">
            <span className="cicon">🚗</span>
            <h3>Auto Insurance</h3>
            <p>Stay safe on the road with reliable protection for your vehicles, passengers, and liability.</p>
          </div>
          <div className="ccard">
            <span className="cicon">👨‍👩‍👧‍👦</span>
            <h3>Life Insurance</h3>
            <p>Secure your family's future and provide peace of mind with customizable life insurance plans.</p>
          </div>
          <div className="ccard">
            <span className="cicon">🏢</span>
            <h3>Commercial Insurance</h3>
            <p>Safeguard your business operations, assets, and employees against unforeseen risks.</p>
          </div>
          <div className="ccard">
            <span className="cicon">🚜</span>
            <h3>Farm Insurance</h3>
            <p>Specialized coverage for agricultural operations, equipment, livestock, and property.</p>
          </div>
          <div className="ccard">
            <span className="cicon">⚕️</span>
            <h3>Health Insurance</h3>
            <p>Access quality healthcare with plans designed to fit your personal or family needs.</p>
          </div>
        </div>
      </section>

      <section className="sec bblack" id="about">
        <div className="agrid">
          <div className="apwrap reveal">
            <div className="apbox">
              <div className="aphold">
                <span className="pi">KG</span>
                <span className="ph">Keaton Gilliam</span>
              </div>
            </div>
            <div className="aaccent">
              <span className="aaccent-n">6+</span>
              <span className="aaccent-t">Years<br/>Exp.</span>
            </div>
          </div>
          <div className="aright reveal d1">
            <div className="slabel w"><span>Meet Your Agent</span></div>
            <h2 className="stitle white">Keaton Gilliam</h2>
            <div className="aquote">"My mission is to ensure every family in Southeast Michigan has the exact protection they need, nothing less."</div>
            <p className="abody">As a local Farm Bureau Insurance agent, I understand the unique needs of our community. We live here, we work here, and we're dedicated to protecting our neighbors in Brownstown and beyond.</p>
            <ul className="acreds">
              <li>Licensed Farm Bureau Agent</li>
              <li>5-Star Customer Rating</li>
              <li>Community Trusted Since 2018</li>
              <li>Serving SE Michigan Families</li>
            </ul>
            <div className="alogo">GILLIAM <em>INSURANCE</em></div>
          </div>
        </div>
      </section>

      <section className="sec" id="team">
        <div className="slabel reveal"><span>Our People</span></div>
        <h2 className="stitle reveal d1">A team you can <em>trust.</em></h2>
        <div className="team-grid reveal d2">
          <div className="team-card">
            <div className="team-photo"><span className="team-init">KG</span></div>
            <span className="team-role-badge">Lead Agent</span>
            <div className="team-name">Keaton Gilliam</div>
            <div className="team-divider"></div>
            <p className="team-bio">Guiding the agency with expertise and a commitment to personalized service.</p>
            <div className="team-tags">
              <span>Licensed</span>
              <span>Farm Bureau</span>
            </div>
          </div>
          <div className="team-card">
            <div className="team-photo"><span className="team-init">SM</span></div>
            <span className="team-role-badge">Specialist</span>
            <div className="team-name">Sarah M.</div>
            <div className="team-divider"></div>
            <p className="team-bio">Dedicated Customer Service Specialist ensuring your needs are met promptly.</p>
            <div className="team-tags">
              <span>Support</span>
              <span>Local</span>
            </div>
          </div>
          <div className="team-card">
            <div className="team-photo"><span className="team-init">MT</span></div>
            <span className="team-role-badge">Liaison</span>
            <div className="team-name">Mike T.</div>
            <div className="team-divider"></div>
            <p className="team-bio">Claims Liaison helping you navigate the process smoothly when you need it most.</p>
            <div className="team-tags">
              <span>Claims</span>
              <span>Expert</span>
            </div>
          </div>
        </div>
      </section>

      <section className="sec bred">
        <div className="fbinner reveal">
          <div className="fbsvg">FARM BUREAU INSURANCE</div>
          <div className="fbcreds">
            <div className="fbcred">
              <div className="fbcredn">A+</div>
              <div className="fbcredt">Rating</div>
            </div>
            <div className="fbcred">
              <div className="fbcredn">1949</div>
              <div className="fbcredt">Established</div>
            </div>
          </div>
          <div className="fbratings">
            <div className="fbrow">
              <span className="fblabel">Financial Strength</span>
              <span className="fbval">Excellent</span>
            </div>
            <div className="fbrow">
              <span className="fblabel">Customer Satisfaction</span>
              <span className="fbval">98%</span>
            </div>
          </div>
        </div>
      </section>

      <section className="sec blight" id="reviews">
        <div className="slabel reveal"><span>Client Stories</span></div>
        <h2 className="stitle reveal d1">Hear from our <em>community.</em></h2>
        <div className="rgrid reveal d2">
          <div className="rcard">
            <div className="rstars">★★★★★</div>
            <p className="rtext">"Keaton made the process so easy. He explained my options clearly and found me better coverage for less than I was paying before."</p>
            <div className="rauthor">
              <div className="ravatar">JR</div>
              <div>
                <strong>Jennifer R.</strong>
                <small>Home & Auto Client</small>
              </div>
            </div>
          </div>
          <div className="rcard">
            <div className="rstars">★★★★★</div>
            <p className="rtext">"Best insurance agent in the area. The team is always responsive and truly cares about their clients. Highly recommend."</p>
            <div className="rauthor">
              <div className="ravatar">MD</div>
              <div>
                <strong>Mark D.</strong>
                <small>Business Client</small>
              </div>
            </div>
          </div>
          <div className="rcard">
            <div className="rstars">★★★★★</div>
            <p className="rtext">"I switched from my old provider because I wanted someone local. Keaton and his team have exceeded all my expectations."</p>
            <div className="rauthor">
              <div className="ravatar">LK</div>
              <div>
                <strong>Lisa K.</strong>
                <small>Life Insurance Client</small>
              </div>
            </div>
          </div>
        </div>
        <div className="rcta reveal d3">
          <p>Join hundreds of satisfied families in Southeast Michigan.</p>
          <a href="#contact" className="btnr">Get Started Today</a>
        </div>
      </section>

      <section className="sec-community" id="community">
        <div className="slabel reveal"><span>Our Home</span></div>
        <h2 className="stitle reveal d1" style={{textAlign: "center"}}>Deeply Rooted in SE Michigan</h2>
        <p className="csub reveal d2">Proudly supporting Brownstown and the surrounding areas through active community involvement, local sponsorships, and dedicated service.</p>
        <div className="cgallery reveal d3">
          <div className="cgallery-card">
            <div className="cgallery-img">🏙️</div>
            <div className="cgallery-cap">Brownstown Community</div>
          </div>
          <div className="cgallery-card">
            <div className="cgallery-img">🤝</div>
            <div className="cgallery-cap">Local Partnerships</div>
          </div>
          <div className="cgallery-card">
            <div className="cgallery-img">🏆</div>
            <div className="cgallery-cap">Award-Winning Service</div>
          </div>
          <div className="cgallery-card">
            <div className="cgallery-img">👨‍👩‍👧‍👦</div>
            <div className="cgallery-cap">Family Focused</div>
          </div>
        </div>
      </section>

      <section className="sec boff" id="contact">
        <div className="fgrid">
          <div className="fleft reveal">
            <div className="slabel"><span>Get in Touch</span></div>
            <h2 className="stitle">Let's discuss your <em>needs.</em></h2>
            <p className="fintro">Fill out the form, and our team will get back to you promptly with a personalized quote or answers to your questions.</p>
            <ul className="ffeats">
              <li>No obligation quotes</li>
              <li>Fast response times</li>
              <li>Tailored coverage plans</li>
            </ul>
            <div className="flogo" style={{color: "var(--black)"}}>GILLIAM <em>INSURANCE</em></div>
          </div>
          <div className="fright reveal d1">
            <div className="fcard">
              <h3>Request a Quote</h3>
              <p className="fcardsub">We're here to help you protect what matters.</p>
              <form onSubmit={handleSubmit}>
                <div className="fgrow">
                  <div className="fg">
                    <label>First Name</label>
                    <input type="text" required placeholder="John" />
                  </div>
                  <div className="fg">
                    <label>Last Name</label>
                    <input type="text" required placeholder="Doe" />
                  </div>
                </div>
                <div className="fg">
                  <label>Email Address</label>
                  <input type="email" required placeholder="john@example.com" />
                </div>
                <div className="fg">
                  <label>Phone Number</label>
                  <input type="tel" required placeholder="(734) 555-0123" />
                </div>
                <div className="fg">
                  <label>Insurance Type</label>
                  <select>
                    <option>Home Insurance</option>
                    <option>Auto Insurance</option>
                    <option>Life Insurance</option>
                    <option>Commercial Insurance</option>
                    <option>Farm Insurance</option>
                    <option>Health Insurance</option>
                    <option>Other / Multiple</option>
                  </select>
                </div>
                <div className="fg">
                  <label>Message (Optional)</label>
                  <textarea placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="fsbtn">Submit Request</button>
                <p className="fnote">Your information is secure and will not be shared.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" id="cities">
        <div className="slabel reveal"><span>Service Area</span></div>
        <h2 className="stitle reveal d1">Serving <em>Southeast Michigan.</em></h2>
        <p className="cintro reveal d2">Located in Brownstown, we proudly serve communities across the region, providing local expertise and dedicated support.</p>
        <div className="citygrid reveal d3">
          <div className="city">Brownstown</div>
          <div className="city">Woodhaven</div>
          <div className="city">Trenton</div>
          <div className="city">Wyandotte</div>
          <div className="city">Gibraltar</div>
          <div className="city">Flat Rock</div>
          <div className="city">Rockwood</div>
          <div className="city">Riverview</div>
          <div className="city">Southgate</div>
          <div className="city">Taylor</div>
          <div className="city">Lincoln Park</div>
          <div className="city">Melvindale</div>
          <div className="city">Allen Park</div>
          <div className="city">Monroe</div>
        </div>
      </section>

      <div className="bcta reveal">
        <div className="bctal">
          <div className="bctalogo">GILLIAM <em>INSURANCE</em></div>
          <div className="bctat">Ready to get covered?</div>
          <div className="bctasub">Contact us today for a free, comprehensive review of your insurance needs.</div>
        </div>
        <div className="bctar">
          <a href="tel:7342302464" className="bctaphone">(734) 230-2464</a>
          <div className="bctaaddr">21911 Telegraph Rd<br />Brownstown, MI 48183</div>
          <a href="#contact" className="btnr mt-2">Get a Quote</a>
        </div>
      </div>

      <div className="float-cta">
        <a href="#contact" className="float-btn">Get a Quote</a>
        <a href="tel:7342302464" className="float-phone">📞 (734) 230-2464</a>
      </div>

      <footer>
        <div className="flogof">GILLIAM <em>INSURANCE</em></div>
        <div className="flinks">
          <a href="#coverage">Coverage</a>
          <a href="#about">About</a>
          <a href="#team">Team</a>
          <a href="#reviews">Reviews</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="fcopy">
          &copy; {new Date().getFullYear()} Gilliam Insurance Services. Farm Bureau Insurance. All rights reserved.
        </div>
      </footer>
    </>
  );
}

import Image from "next/image";
import PortfolioNav from "@/components/PortfolioNav";
import ProjectGallery from "@/components/ProjectGallery";
import CopyEmail from "@/components/CopyEmail";
import TechStack from "@/components/TechStack";
import MotionEffects from "@/components/MotionEffects";
import { profile, services } from "@/data/portfolio";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <MotionEffects />
      <PortfolioNav />
      <main id="main">
        <section
          className="hero container"
          id="home"
          aria-labelledby="hero-heading"
        >
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span className="status-dot" />
              Independent fullstack developer
            </p>
            <h1 id="hero-heading">
              <span className="hero-line">
                <span>Thoughtful code.</span>
              </span>
              <span className="hero-line">
                <em>Real-world impact.</em>
              </span>
            </h1>
            <p className="hero-description">
              Hi, I’m Dean. I turn complex ideas into websites and software that
              make your business work better.
            </p>
            <div className="hero-actions">
              <a href="#work" className="button button-dark">
                View selected work <span aria-hidden="true">↘</span>
              </a>
              <a href="#contact" className="text-link">
                Have a project in mind?
              </a>
            </div>
            <div className="hero-location">
              <span aria-hidden="true">↳</span> Based in Depok, Indonesia.
              Building for anywhere.
            </div>
          </div>
          <figure className="hero-portrait">
            <div className="portrait-image">
              <Image
                src="/images/dean-ciremai.webp"
                alt="Dean Rabbani at the summit of Mount Ciremai, wearing a green hiking jacket"
                fill
                priority
                sizes="(max-width: 700px) 90vw, 38vw"
              />
            </div>
            <figcaption>
              <span>Dean Rabbani</span>
              <span>Developer. Problem solver. Explorer.</span>
            </figcaption>
            <span className="photo-note">
              Away from the keyboard, above the clouds.
            </span>
          </figure>
        </section>
        <TechStack />
        <section
          className="work-section container section-space"
          id="work"
          aria-labelledby="work-heading"
        >
          <div className="section-label">
            <span>Selected work</span>
            <span>Ideas, brought to life.</span>
          </div>
          <div className="section-heading" data-reveal>
            <h2 id="work-heading">
              Built for the
              <br />
              <em>real world.</em>
            </h2>
            <p>
              From a brand’s first impression to the systems behind its
              operations. Here’s a closer look at what I build.
            </p>
          </div>
          <ProjectGallery />
        </section>
        <section
          className="about-section"
          id="about"
          aria-labelledby="about-heading"
        >
          <div className="container about-layout">
            <div className="about-aside" data-reveal>
              <p className="eyebrow">The person behind the code</p>
              <div className="about-monogram" aria-hidden="true">
                dr<span>.</span>
              </div>
              <p className="about-caption">
                Curious by nature.
                <br />
                Intentional by practice.
              </p>
            </div>
            <div className="about-copy" data-reveal>
              <h2 id="about-heading">
                A developer who sees
                <br />
                <em>the bigger picture.</em>
              </h2>
              <p className="about-intro">
                I’m Dean Rabbani, a fullstack developer from Depok, Indonesia. I
                care about how things look, how they work, and the people who
                use them.
              </p>
              <p>
                My work spans brand websites, point of sale systems, enterprise
                software, and reporting platforms. I enjoy turning complicated
                requirements into something clear and useful, from the first
                screen to the database behind it.
              </p>
              <p>
                Outside of building, you’ll find me exploring new ideas or
                heading for a mountain trail. The same curiosity follows me back
                to my desk.
              </p>
              <a
                className="text-link"
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                See what I’m building on GitHub{" "}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
        <section
          className="services-section container section-space"
          id="services"
          aria-labelledby="services-heading"
        >
          <div className="section-label">
            <span>How I can help</span>
            <span>From an idea to something useful.</span>
          </div>
          <div className="section-heading" data-reveal>
            <h2 id="services-heading">
              Your next idea.
              <br />
              <em>Let’s build it right.</em>
            </h2>
            <p>
              A website for your business, a tool for your team, or a product
              you’re ready to bring to life.
            </p>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <article className="service-row" data-reveal key={service.number}>
                <span className="service-number">{service.number}</span>
                <h3>{service.name}</h3>
                <div>
                  <p>{service.description}</p>
                  <span className="service-tags">{service.tags}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="working-together" data-reveal>
            <span className="eyebrow">Working together</span>
            <p>
              We start with your goals, define what needs to be built, and keep
              the conversation open from the first draft to launch.
            </p>
            <a href="#contact" className="text-link">
              Tell me about your project <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
        <section
          className="contact-section"
          id="contact"
          aria-labelledby="contact-heading"
        >
          <div className="container">
            <div className="contact-top" data-reveal>
              <p className="eyebrow">
                <span className="status-dot" />
                Let’s make something useful
              </p>
              <span>Have an idea? I’d love to hear it.</span>
            </div>
            <h2 id="contact-heading" data-reveal>
              Good things start
              <br />
              with <em>a conversation.</em>
            </h2>
            <div className="contact-bottom" data-reveal>
              <div>
                <a
                  className="email-link"
                  href={`mailto:${profile.email}?subject=Let%E2%80%99s%20build%20something%20together`}
                >
                  {profile.email}
                  <span aria-hidden="true">↗</span>
                </a>
                <CopyEmail />
              </div>
              <p>
                Tell me what you’re building,
                <br />
                what you need, and where you want to go.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer container">
        <a href="#home" className="wordmark" aria-label="Back to top">
          dean<span>.</span>
        </a>
        <span>© {new Date().getFullYear()} Dean Rabbani</span>
        <div>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
          <a href={profile.instagram} target="_blank" rel="noopener noreferrer">
            Instagram ↗
          </a>
        </div>
        <a href="#home" className="back-top">
          Back to top ↑
        </a>
      </footer>
    </>
  );
}

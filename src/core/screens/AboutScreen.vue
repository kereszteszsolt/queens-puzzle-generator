<script setup lang="ts">
import githubIcon from '@/assets/uxwing-icons/github-icon.svg';
import emailIcon from '@/assets/uxwing-icons/envelope-line-icon.svg';
import webIcon from '@/assets/uxwing-icons/web-icon.svg';
import { onMounted } from 'vue';

const technologies = [
  {
    name: 'Vue 3',
    description: 'Progressive JavaScript framework with Composition API',
    link: 'https://vuejs.org/'
  },
  {
    name: 'TypeScript',
    description: 'Strongly typed programming language built on JavaScript',
    link: 'https://www.typescriptlang.org/'
  },
  {
    name: 'Vite',
    description: 'Next-generation frontend build tool',
    link: 'https://vitejs.dev/'
  },
  {
    name: 'Vue Router',
    description: 'Official routing library for Vue.js applications',
    link: 'https://router.vuejs.org/'
  },
  {
    name: 'Vanilla CSS',
    description: 'Custom CSS styles without any frameworks for full control',
    link: 'https://developer.mozilla.org/en-US/docs/Web/CSS'
  },
  {
    name: 'gh-pages',
    description: 'npm package to publish files to a gh-pages branch',
    link: 'https://www.npmjs.com/package/gh-pages'
  }
];

const obfuscatedEmail = ['contact', 'kereszteszsolt', 'com'];
const emailLink = `mailto:${obfuscatedEmail[0]}@${obfuscatedEmail[1]}.${obfuscatedEmail[2]}`;

const contactInfo = [
  {
    icon: githubIcon,
    label: 'GitHub',
    value: '@kereszteszsolt',
    link: 'https://github.com/kereszteszsolt'
  },
  {
    icon: emailIcon,
    label: 'Email',
    value: `${obfuscatedEmail[0]}@${obfuscatedEmail[1]}.${obfuscatedEmail[2]}`,
    link: emailLink
  },
  {
    icon: webIcon,
    label: 'Website',
    value: 'kereszteszsolt.com',
    link: 'https://kereszteszsolt.com'
  }
];

const lastUpdated = 'January 23, 2026';

onMounted(() => {
  const emailElement = document.querySelector('.contact-value');
  if (emailElement) {
    const emailParts = ['contact', 'kereszteszsolt', 'com'];
    emailElement.textContent = `${emailParts[0]}@${emailParts[1]}.${emailParts[2]}`;
    emailElement.parentElement?.setAttribute('href', `mailto:${emailParts[0]}@${emailParts[1]}.${emailParts[2]}`);
  }
});
</script>

<template>
  <div class="about-container">
    <!-- Header Section -->
    <section class="about-header">
      <div class="header-content">
        <div class="header-icon">ℹ️</div>
        <h1 class="page-title">About This Project</h1>
        <p class="page-subtitle">
          Legal Information & Project Details
        </p>
        <p class="last-updated">Last updated: {{ lastUpdated }}</p>
      </div>
    </section>

    <!-- Project Information -->
    <section class="info-section">
      <div class="info-card">
        <h2 class="section-title">
          <span class="title-icon">♛</span>
          Queens Game & Generator
        </h2>
        <p class="info-text">
          This is an open-source web application that brings a fresh twist to the classic Queens puzzle
          by adding a generator, optimizer, and color shuffler. It features a smart puzzle generator
          that creates unique, solvable challenges with a beautiful visual design.
        </p>
        <p class="info-text">
          The project is hosted on <a href="https://pages.github.com/" target="_blank" rel="noopener noreferrer" class="inline-link">GitHub Pages</a>, making it freely
          accessible to anyone who enjoys logic puzzles and algorithmic challenges.
        </p>
      </div>
    </section>

    <!-- Privacy & Data -->
    <section class="privacy-section">
      <div class="privacy-card">
        <h2 class="section-title">
          <span class="title-icon">🔒</span>
          Privacy & Data Collection
        </h2>
        <div class="privacy-content">
          <div class="privacy-item">
            <div class="check-icon">✓</div>
            <div>
              <strong>No data collection:</strong> This website does not collect, store,
              or process any personal data.
            </div>
          </div>
          <div class="privacy-item">
            <div class="check-icon">✓</div>
            <div>
              <strong>No tracking:</strong> This website doesn't use cookies, tracking technologies,
              or analytics tools.
            </div>
          </div>
          <div class="privacy-item">
            <div class="check-icon">✓</div>
            <div>
              <strong>No backend:</strong> This is a purely static website with no databases
              or server-side systems.
            </div>
          </div>
          <div class="privacy-item">
            <div class="check-icon">✓</div>
            <div>
              <strong>Local storage only:</strong> Game progress is saved locally in your
              browser's memory and is never transmitted.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Terms of Use -->
    <section class="terms-section">
      <div class="terms-card">
        <h2 class="section-title">
          <span class="title-icon">📜</span>
          Terms of Use
        </h2>
        <p class="terms-text">
          By accessing and using this website, you acknowledge that you do so at your own
          risk. This project was created for personal enjoyment and educational purposes.
          The author is not liable for any damages or losses resulting from its use.
        </p>
        <p class="terms-text">
          This project is open source and distributed under the <a href="https://github.com/kereszteszsolt/queens-puzzle-generator?tab=Apache-2.0-1-ov-file" target="_blank" rel="noopener noreferrer" class="inline-link">Apache 2.0 License</a>. You are free
          to use, modify, and distribute the code in accordance with the license terms.
        </p>
      </div>
    </section>

    <!-- Technology Stack -->
    <section class="tech-section">
      <h2 class="section-title">
        <span class="title-icon">⚙️</span>
        Technology & Credits
      </h2>
      <p class="tech-intro">
        This website was built using modern, open-source technologies:
      </p>
      <div class="tech-grid">
        <a
            v-for="(tech, index) in technologies"
            :key="index"
            :href="tech.link"
            target="_blank"
            rel="noopener noreferrer"
            class="tech-card"
        >
          <h3 class="tech-name">{{ tech.name }}</h3>
          <p class="tech-description">{{ tech.description }}</p>
          <span class="tech-arrow">→</span>
        </a>
      </div>
      <div class="credits">
        <p class="credits-text">
          <strong>Game Icons:</strong> Standard Unicode characters
        </p>
        <p class="credits-text">
          <strong>Contact Icons:</strong> Sourced from <a href="https://uxwing.com/" target="_blank" rel="noopener noreferrer" class="inline-link">UXWing</a>, a royalty-free icon library.
        </p>
      </div>
    </section>

    <!-- Contact Information -->
    <section class="contact-section">
      <div class="contact-content">
        <h2 class="section-title">
          <span class="title-icon">📧</span>
          Contact
        </h2>
        <p class="contact-intro">
          <strong>Website Maintainer:</strong> Keresztes Zsolt
        </p>
        <p class="contact-subtitle">
          For contact or feedback, reach out via any of the following channels. On my GitHub or website, you'll find more ways to connect, including <strong>social media channels</strong> and <strong>other projects</strong>.
        </p>
        <div class="contact-grid">
          <a
              v-for="(contact, index) in contactInfo"
              :key="index"
              :href="contact.link"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-card"
          >
            <img :src="contact.icon" :alt="contact.label" class="contact-icon-img" />
            <div class="contact-details">
              <div class="contact-label">{{ contact.label }}</div>
              <div class="contact-value">{{ contact.value }}</div>
            </div>
            <span class="contact-arrow">↗</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Footer CTA -->
    <section class="footer-cta">
      <div class="cta-content">
        <h2 class="cta-title">Ready to Play?</h2>
        <p class="cta-text">
          Challenge yourself with the Queens puzzle and put your logical thinking skills to the test!
        </p>
        <div class="cta-buttons">
          <router-link to="/queens" class="cta-button cta-primary">
            <span>Start Playing</span>
            <span class="button-arrow">→</span>
          </router-link>
          <router-link to="/" class="cta-button cta-secondary">
            <span>Back to Home</span>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem 2rem;
}

/* Header Section */
.about-header {
  text-align: center;
  padding: 3rem 1rem 4rem;
  background: linear-gradient(135deg, var(--color-primary-100) 0%, var(--color-tertiary-100) 100%);
  border-radius: var(--radius-xl);
  margin-bottom: 3rem;
  box-shadow: var(--shadow-md);
}

.header-content {
  max-width: 700px;
  margin: 0 auto;
}

.header-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.page-title {
  font-family: var(--font-heading), serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-secondary-800);
  margin-bottom: 0.75rem;
  line-height: 1.2;
}

.page-subtitle {
  font-size: 1.125rem;
  color: var(--color-secondary-700);
  margin-bottom: 0.5rem;
}

.last-updated {
  font-size: 0.875rem;
  color: var(--color-secondary-600);
  font-style: italic;
}

/* Section Titles */
.section-title {
  font-family: var(--font-heading);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-secondary-800);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.title-icon {
  font-size: 2rem;
}

/* Info Section */
.info-section {
  margin-bottom: 3rem;
}

.info-card {
  background: white;
  padding: 2.5rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 2px solid var(--color-neutral-variant-darker);
}

.info-text {
  font-size: 1.0625rem;
  color: var(--color-secondary-700);
  line-height: 1.7;
  margin-bottom: 1rem;
}

.info-text:last-child {
  margin-bottom: 0;
}

/* Privacy Section */
.privacy-section {
  margin-bottom: 3rem;
}

.privacy-card {
  background: linear-gradient(135deg, var(--color-secondary-100) 0%, var(--color-primary-100) 100%);
  padding: 2.5rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.privacy-content {
  display: grid;
  gap: 1.25rem;
}

.privacy-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  background: white;
  padding: 1.25rem;
  border-radius: var(--radius-md);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.check-icon {
  flex-shrink: 0;
  width: 1.75rem;
  height: 1.75rem;
  background: var(--color-secondary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
}

.privacy-item div {
  color: var(--color-secondary-700);
  line-height: 1.6;
}

.privacy-item strong {
  color: var(--color-secondary-800);
}

/* Terms Section */
.terms-section {
  margin-bottom: 3rem;
}

.terms-card {
  background: white;
  padding: 2.5rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 2px solid var(--color-neutral-variant-darker);
}

.terms-text {
  font-size: 1.0625rem;
  color: var(--color-secondary-700);
  line-height: 1.7;
  margin-bottom: 1rem;
}

.terms-text:last-child {
  margin-bottom: 0;
}

/* Technology Section */
.tech-section {
  margin-bottom: 3rem;
  padding: 2.5rem;
  background: var(--color-tertiary-100);
  border-radius: var(--radius-lg);
}

.tech-intro {
  font-size: 1.0625rem;
  color: var(--color-secondary-700);
  margin-bottom: 2rem;
  text-align: center;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.tech-card {
  background: white;
  padding: 1.75rem;
  border-radius: var(--radius-md);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 2px solid var(--color-neutral-variant-darker);
  position: relative;
  overflow: hidden;
}

.tech-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  border-color: var(--color-tertiary-500);
}

.tech-name {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-secondary-800);
  margin-bottom: 0.5rem;
}

.tech-description {
  font-size: 0.9375rem;
  color: var(--color-secondary-700);
  line-height: 1.5;
  margin-bottom: 0;
}

.tech-arrow {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  font-size: 1.5rem;
  color: var(--color-tertiary-500);
  transition: transform 0.3s ease;
}

.tech-card:hover .tech-arrow {
  transform: translate(4px, -4px);
}

.credits {
  background: white;
  padding: 1.5rem;
  border-radius: var(--radius-md);
  text-align: center;
}

.credits-text {
  font-size: 0.9375rem;
  color: var(--color-secondary-700);
  line-height: 1.6;
  margin: 0;
}

/* Contact Section */
.contact-section {
  margin-bottom: 3rem;
}

.contact-content {
  background: white;
  padding: 2.5rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 2px solid var(--color-neutral-variant-darker);
}

.contact-intro {
  font-size: 1.125rem;
  color: var(--color-secondary-800);
  margin-bottom: 0.75rem;
  text-align: center;
}

.contact-subtitle {
  font-size: 1rem;
  color: var(--color-secondary-700);
  margin-bottom: 2rem;
  text-align: center;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(135deg, var(--color-primary-100) 0%, var(--color-tertiary-100) 100%);
  padding: 1.5rem;
  border-radius: var(--radius-md);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
}

.contact-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  border-color: var(--color-primary);
}

.contact-icon-img {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  padding: 0.5rem;
  background: white;
  border-radius: var(--radius-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.contact-details {
  flex: 1;
}

.contact-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-secondary-700);
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.contact-value {
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--color-secondary-800);
  word-break: break-word;
  overflow-wrap: break-word;
}

.contact-arrow {
  flex-shrink: 0;
  font-size: 1.5rem;
  color: var(--color-primary);
  transition: transform 0.3s ease;
}

.contact-card:hover .contact-arrow {
  transform: translate(4px, -4px);
}

/* Footer CTA */
.footer-cta {
  background: linear-gradient(135deg, var(--color-secondary-100) 0%, var(--color-primary-100) 100%);
  padding: 3rem 2rem;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.cta-title {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-secondary-800);
  margin-bottom: 0.75rem;
}

.cta-text {
  font-size: 1.125rem;
  color: var(--color-secondary-700);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.cta-primary {
  background: var(--color-primary);
  color: white;
  box-shadow: 0 4px 12px rgba(255, 127, 80, 0.3);
}

.cta-primary:hover {
  background: var(--color-primary-600);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 127, 80, 0.4);
}

.cta-secondary {
  background: white;
  color: var(--color-secondary-800);
  border-color: var(--color-secondary-600);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.cta-secondary:hover {
  background: var(--color-secondary);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(34, 139, 34, 0.3);
}

.button-arrow {
  font-size: 1.25rem;
  transition: transform 0.3s ease;
}

.cta-primary:hover .button-arrow {
  transform: translateX(4px);
}

/* Inline Links */
.inline-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.inline-link:hover {
  color: var(--color-primary-600);
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .info-card,
  .privacy-card,
  .terms-card,
  .tech-section,
  .contact-content {
    padding: 1.75rem;
  }

  .tech-grid,
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
    width: 100%;
  }

  .cta-button {
    width: 100%;
    justify-content: center;
  }

  .privacy-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
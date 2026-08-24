<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToGamePage = () => {
  router.push('/queens');
};

const features = [
  {
    icon: '🎨',
    title: 'Dynamic Color Regions',
    description: 'Each puzzle features unique color regions that add an extra layer of challenge. Want a fresh look? Shuffle the colors anytime!'
  },
  {
    icon: '⚡',
    title: 'Smart Generation',
    description: 'The generator creates connected color regions and searches for a board that meets the selected solution target.'
  },
  {
    icon: '🎯',
    title: 'Multiple Difficulty Levels',
    description: 'From beginner-friendly small boards to expert-level large grids — pick a challenge that suits your skill.'
  },
  {
    icon: '🔒',
    title: 'Privacy First',
    description: 'No trackers, no ads, no accounts required. Just pure puzzle-solving fun. Fully open source on GitHub.'
  }
];
</script>

<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-icon">♛</div>
        <h1 class="hero-title">CrownGrid</h1>
        <p class="hero-subtitle">
          Generate and solve color-region Queens puzzles directly in your browser, with selectable board sizes and solution targets.
        </p>
        <button @click="goToGamePage" class="cta-button">
          <span>Start Playing</span>
          <span class="cta-arrow">→</span>
        </button>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="features">
      <h2 class="section-title">Features</h2>
      <div class="features-grid">
        <div
            v-for="(feature, index) in features"
            :key="index"
            class="feature-card"
        >
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- How to Play -->
    <section class="how-to-play">
      <h2 class="section-title">How to Play</h2>
      <div class="rules-container">
        <div class="rule-item">
          <div class="rule-number">1</div>
          <div class="rule-content">
            <h3>Choose Your Board</h3>
            <p>Select a board size and difficulty that matches your skill level. Larger boards with fewer solutions offer a greater challenge!</p>
          </div>
        </div>
        <div class="rule-item">
          <div class="rule-number">2</div>
          <div class="rule-content">
            <h3>Place the Queens</h3>
            <p>Double-click or double-tap a cell to place a queen. No two queens may share a row, column, color region, or touch diagonally at a corner.</p>
          </div>
        </div>
        <div class="rule-item">
          <div class="rule-number">3</div>
          <div class="rule-content">
            <h3>Match the Colors</h3>
            <p>Each color region must contain exactly one queen. Use these color boundaries as hints to guide your solution.</p>
          </div>
        </div>
        <div class="rule-item">
          <div class="rule-number">4</div>
          <div class="rule-content">
            <h3>Solve the Puzzle</h3>
            <p>Place all queens correctly without conflicts to complete the puzzle. Good luck!</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Technical Details -->
    <section class="technical">
      <div class="technical-content">
        <h2 class="section-title">Built with Performance in Mind</h2>
        <p class="technical-text">
          The puzzle generator uses browser-based algorithms to create solvable puzzles efficiently.
          Color regions are intelligently filled to ensure each puzzle has at least one valid solution to the originally generated queens — or multiple solutions if you prefer an easier challenge.
        </p>
        <p class="technical-text">
          Small and medium boards often finish quickly. Larger boards (12×12 and above) may take
          up to a few minutes depending on the selected solution target and browser performance.
        </p>
        <div class="tech-stack">
          <span class="tech-badge">Vue 3</span>
          <span class="tech-badge">TypeScript</span>
          <span class="tech-badge">Vite</span>
          <span class="tech-badge">Composables</span>
        </div>
      </div>
    </section>

    <!-- Open Source -->
    <section class="open-source">
      <div class="open-source-content">
        <h2 class="section-title">Open Source & Free</h2>
        <p class="open-source-text">
          This project is completely open source and free to play. I welcome contributions, bug reports,
          and feature suggestions on GitHub. Feel free to fork the repository, explore the code, learn
          from the implementation, or create your own version. Have fun solving puzzles!
        </p>
        <div class="open-source-links">
          <a
              href="https://github.com/kereszteszsolt/crown-grid"
              target="_blank"
              rel="noopener noreferrer"
              class="link-button link-button-primary"
          >
            <span>View on GitHub</span>
            <span>↗</span>
          </a>
          <a
              href="/queens"
              @click.prevent="goToGamePage"
              class="link-button link-button-secondary"
          >
            <span>Play Now</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Hero Section */
.hero {
  text-align: center;
  padding: 4rem 1rem 6rem;
  background: linear-gradient(135deg, var(--color-primary-100) 0%, var(--color-tertiary-100) 100%);
  border-radius: var(--radius-xl);
  margin-bottom: 4rem;
  box-shadow: var(--shadow-md);
}

.hero-content {
  max-width: 700px;
  margin: 0 auto;
}

.hero-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-secondary-800);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--color-secondary-700);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-primary);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(255, 127, 80, 0.3);
}

.cta-button:hover {
  background: var(--color-primary-600);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 127, 80, 0.4);
}

.cta-arrow {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.cta-button:hover .cta-arrow {
  transform: translateX(4px);
}

/* Section Titles */
.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-secondary-800);
  text-align: center;
  margin-bottom: 3rem;
}

/* Features Section */
.features {
  padding: 4rem 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: var(--radius-md);
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid var(--color-neutral-variant-darker);
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border-color: var(--color-primary);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-secondary-800);
  margin-bottom: 0.75rem;
}

.feature-description {
  font-size: 1rem;
  color: var(--color-secondary-700);
  line-height: 1.6;
}

/* How to Play Section */
.how-to-play {
  padding: 4rem 0;
  background: var(--color-secondary-100);
  border-radius: var(--radius-xl);
  padding: 3rem 2rem;
  margin-bottom: 4rem;
}

.rules-container {
  max-width: 800px;
  margin: 0 auto;
}

.rule-item {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  align-items: flex-start;
}

.rule-number {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  background: var(--color-primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  box-shadow: 0 4px 8px rgba(255, 127, 80, 0.3);
}

.rule-content h3 {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-secondary-800);
  margin-bottom: 0.5rem;
}

.rule-content p {
  font-size: 1rem;
  color: var(--color-secondary-700);
  line-height: 1.6;
}

/* Technical Section */
.technical {
  padding: 4rem 0;
}

.technical-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.technical-text {
  font-size: 1.125rem;
  color: var(--color-secondary-700);
  line-height: 1.8;
  margin-bottom: 2rem;
}

.tech-stack {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.tech-badge {
  background: var(--color-tertiary-500);
  color: white;
  padding: 0.5rem 1.25rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 191, 255, 0.3);
}

/* Open Source Section */
.open-source {
  padding: 4rem 0;
  margin-bottom: 2rem;
}

.open-source-content {
  background: linear-gradient(135deg, var(--color-secondary-100) 0%, var(--color-primary-100) 100%);
  padding: 3rem 2rem;
  border-radius: var(--radius-xl);
  text-align: center;
}

.open-source-text {
  max-width: 700px;
  margin: 0 auto 2rem;
  font-size: 1.125rem;
  color: var(--color-secondary-700);
  line-height: 1.8;
}

.open-source-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.link-button {
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

.link-button-primary {
  background: var(--color-secondary);
  color: white;
  box-shadow: 0 4px 12px rgba(34, 139, 34, 0.3);
}

.link-button-primary:hover {
  background: var(--color-secondary-600);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(34, 139, 34, 0.4);
}

.link-button-secondary {
  background: white;
  color: var(--color-primary);
  border-color: var(--color-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.link-button-secondary:hover {
  background: var(--color-primary);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 127, 80, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .rule-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .open-source-links {
    flex-direction: column;
  }

  .link-button {
    width: 100%;
    justify-content: center;
  }
}
</style>
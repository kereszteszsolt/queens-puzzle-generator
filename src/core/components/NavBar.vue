<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

interface SectionNav {
  id: 'home' | 'queens' | 'about';
  label: string;
  path: string;
}

const route = useRoute();

const sections: SectionNav[] = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'queens', label: 'Queens', path: '/queens' },
  { id: 'about', label: 'About', path: '/about' },
];

const activeSection = computed<SectionNav['id']>(() => {
  const p = route.path || '';
  if (p === '' || p === '/') return 'home';
  if (p.startsWith('/queens')) return 'queens';
  if (p.startsWith('/about')) return 'about';
  return 'home';
});

const activeSectionLabel = computed(() => {
  return sections.find(s => s.id === activeSection.value)?.label ?? 'Queens Game';
});

const menuOpen = ref(false);

// Close the mobile menu on navigation
watch(
    () => route.fullPath,
    () => {
      menuOpen.value = false;
    }
);
</script>

<template>
  <header class="navbar-header">
    <div class="navbar-container">
      <RouterLink class="navbar-brand" to="/" aria-label="Go to home">
        <div class="navbar-logo" aria-hidden="true">♛</div>
        <div class="navbar-title">Queens Game</div>
      </RouterLink>

      <!-- Mobile only: show active section label centered -->
      <div class="navbar-active-label" aria-live="polite">
        {{ activeSectionLabel }}
      </div>

      <!-- Desktop navigation -->
      <nav class="navbar-desktop-nav" aria-label="Primary navigation">
        <RouterLink
            v-for="section in sections"
            :key="section.id"
            :to="section.path"
            class="navbar-nav-link"
            :class="activeSection === section.id ? 'navbar-nav-link-active' : 'navbar-nav-link-inactive'"
        >
          <span class="navbar-nav-link-text">{{ section.label }}</span>
        </RouterLink>
      </nav>

      <!-- Mobile burger -->
      <button
          class="navbar-burger"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="navbar-mobile-nav"
          aria-label="Toggle navigation menu"
          @click="menuOpen = !menuOpen"
      >
        <span class="navbar-burger-line" :class="menuOpen ? 'navbar-burger-line-1-open' : ''" />
        <span class="navbar-burger-line" :class="menuOpen ? 'navbar-burger-line-2-open' : ''" />
        <span class="navbar-burger-line" :class="menuOpen ? 'navbar-burger-line-3-open' : ''" />
      </button>
    </div>

    <!-- Mobile navigation -->
    <nav
        v-if="menuOpen"
        id="navbar-mobile-nav"
        class="navbar-mobile-nav"
        aria-label="Mobile primary navigation"
    >
      <RouterLink
          v-for="section in sections"
          :key="section.id"
          :to="section.path"
          class="navbar-mobile-nav-link"
          :class="activeSection === section.id ? 'navbar-mobile-nav-link-active' : 'navbar-mobile-nav-link-inactive'"
      >
        {{ section.label }}
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.navbar-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100%;
  height: 4rem;
  display: flex;
  background: linear-gradient(to bottom, var(--color-primary), var(--color-primary-700));
  color: var(--color-primary-caption);
  box-shadow: var(--shadow-md);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.navbar-brand {
  display: flex;
  align-items: center;
  margin-left: 0.75rem;
  gap: 0.5rem;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
}

.navbar-logo {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  background-color: var(--color-secondary-400);
  display: grid;
  place-items: center;
  border: 2px solid var(--color-tertiary);
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
  transition: border-color 0.2s;
  user-select: none;
}

.navbar-brand:hover .navbar-logo {
  border-color: var(--color-secondary-400);
}

.navbar-title {
  color: var(--color-primary-caption);
  font-weight: 800;
  font-size: 1.250rem;
  letter-spacing: 1px;
}

.navbar-active-label {
  flex: 1;
  text-align: center;
  font-size: 1rem;
  font-weight: 800;
}

.navbar-desktop-nav {
  display: none;
  align-items: center;
  gap: 0.5rem;
  height: 100%;
  padding: 0 0.75rem;

  border-radius: 0 0 0 var(--radius-xl);
  border-left: 1px solid rgb(34 139 34 / 0.4);
  border-bottom: 1px solid rgb(34 139 34 / 0.4);

  backdrop-filter: blur(12px);
  background: linear-gradient(
      to bottom,
      rgb(112 199 112 / 0.92),
      var(--color-secondary-700)
  );
}

.navbar-nav-link {
  position: relative;
  padding: 0.5rem 0.85rem;
  border-radius: 0.6rem;
  font-size: 1rem;
  font-weight: 700;
  border: 1px solid transparent;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s, border-color 0.2s;
  text-decoration: none;
  color: inherit;
}

.navbar-nav-link-active {
  background: linear-gradient(to bottom, var(--color-secondary-300), var(--color-secondary-100));
  color: var(--color-secondary-900);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.12), 0 4px 6px -4px rgb(0 0 0 / 0.12);
  border-color: var(--color-secondary-200);
}

.navbar-nav-link-inactive {
  color: var(--color-primary-caption);
}

.navbar-nav-link-inactive:hover {
  background-color: rgb(112 199 112 / 0.28);
}

.navbar-nav-link-text {
  position: relative;
  z-index: 1;
}

.navbar-burger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 2.25rem;
  height: 2.25rem;
  gap: 0.3rem;
  margin-right: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
}

.navbar-burger-line {
  display: block;
  width: 1.5rem;
  height: 2px;
  background-color: var(--color-secondary-490);
  transition: transform 0.25s ease, opacity 0.2s ease;
}

.navbar-burger-line-1-open {
  transform: rotate(45deg) translateY(6px);
}

.navbar-burger-line-2-open {
  opacity: 0;
}

.navbar-burger-line-3-open {
  transform: rotate(-45deg) translateY(-6px);
}

.navbar-mobile-nav {
  position: absolute;
  top: 4rem;
  left: 0;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;

  border-radius: 0 0 var(--radius-xl) var(--radius-xl);
  border-top: 1px solid rgb(34 139 34 / 0.4);

  backdrop-filter: blur(12px);
  background: linear-gradient(
      to bottom,
      rgb(112 199 112 / 0.95),
      var(--color-secondary-700)
  );
}

.navbar-mobile-nav-link {
  padding: 0.6rem 1rem;
  border-radius: 0.6rem;
  font-size: 1rem;
  font-weight: 800;
  border: 1px solid transparent;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s, border-color 0.2s;
  text-decoration: none;
  color: inherit;
}

.navbar-mobile-nav-link-active {
  background: linear-gradient(to bottom, var(--color-secondary-300), var(--color-secondary-100));
  color: var(--color-secondary-900);
  box-shadow: 0 4px 6px -2px rgb(0 0 0 / 0.08);
  border-color: var(--color-secondary-200);
}

.navbar-mobile-nav-link-inactive {
  color: var(--color-primary-caption);
}

.navbar-mobile-nav-link-inactive:hover {
  background-color: rgb(112 199 112 / 0.28);
}

@media (min-width: 768px) {
  .navbar-active-label {
    display: none;
  }

  .navbar-desktop-nav {
    display: flex;
  }

  .navbar-burger {
    display: none;
  }

  .navbar-title {
    font-size: 1.25rem;
  }

  .navbar-brand {
    margin-left: 1rem;
  }

  .navbar-logo {
    width: 3rem;
    height: 3rem;
  }

  .navbar-nav-link {
    padding: 0.55rem 1rem;
    font-size: 1.05rem;
  }
}
</style>
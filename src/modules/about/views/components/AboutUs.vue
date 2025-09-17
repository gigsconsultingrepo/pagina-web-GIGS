<script setup>
import { useI18n } from 'vue-i18n'

const messages = {
  es: {
    about: {
      subtitle: 'Sobre Nosotros',
      title: 'Transformamos ideas en soluciones digitales',
      description: 'Somos una empresa de consultoría tecnológica comprometida con la excelencia, la innovación y el éxito de nuestros clientes. Nuestra misión es impulsar la transformación digital de las organizaciones.'
    }
  },
  en: {
    about: {
      subtitle: 'About Us',
      title: 'We transform ideas into digital solutions',
      description: 'We are a technology consulting company committed to excellence, innovation, and the success of our clients. Our mission is to drive the digital transformation of organizations.'
    }
  }
}

const { t } = useI18n({ useScope: 'local', inheritLocale: true, messages })
</script>

<template>
  <section class="about-us-wrap">
    <v-container class="py-8 py-md-14">
      <v-row class="about-row" align="center" justify="space-between" no-gutters>
        <v-col cols="12" md="7" lg="6" class="order-2 order-md-1 text-center text-md-start px-4">
          <div class="subtitle">{{ t('about.subtitle') }}</div>
          <h1 class="about-title">{{ t('about.title') }}</h1>
          <p class="about-desc mx-auto mx-md-0">{{ t('about.description') }}</p>
        </v-col>

        <v-col cols="12" md="5" lg="5" class="order-1 order-md-2 d-flex justify-center px-4 mb-6 mb-md-0">
          <div class="illustration-container">
            <div class="character">
              <!-- Placeholder para la ilustración 3D del personaje -->
              <div class="character-placeholder">
                <img src="@/assets/img/about/about-personaje1.png" alt="Personaje GIGS" class="character-img" />
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.about-us-wrap {
  position: relative;
  overflow: hidden;
  color: var(--vt-c-text-light-1);
  background: var(--color-background-soft);
}


.subtitle {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-primary-dark);
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: .05em;
}

.about-title {
  margin: 0 0 20px;
  line-height: 1.1;
  font-weight: 800;
  font-size: clamp(32px, 6vw, 56px);
  color: var(--vt-c-text-light-1);
}

.about-desc {
  margin: 0;
  max-width: 60ch;
  opacity: .9;
  font-size: 16px;
  line-height: 1.6;
}

.character-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  background: var(--vt-c-white);
}


@media (max-width: 959px) {
  .about-desc {
    max-width: 70ch;
  }
  
  .illustration-container {
    height: 290px;
  }
  
  .character-placeholder {
    margin-top: 100px; 
    width: 150px;
    height: 150px;
  }
  
  .about-row {
    flex-direction: column-reverse;
  }
}
</style>

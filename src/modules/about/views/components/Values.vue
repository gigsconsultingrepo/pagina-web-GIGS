<script setup>
import { useI18n } from 'vue-i18n'

const messages = {
  es: {
    values: {
      title: 'Nos movemos por nuestros valores',
      description: 'Para GIGS Consulting es muy importante ser su aliado estratégico y contribuir con la Transformación Digital de su organización, generando valor para su ecosistema de clientes, proveedores y colaboradores.',
      items: [
        {
          title: 'Crecimiento con resultados',
          text: 'Creamos soluciones tecnológicas que impactan directamente en los objetivos de tu negocio, con medición constante y mejora continua.'
        },
        {
          title: 'Colaboración con el cliente',
          text: 'Trabajamos de la mano con cada cliente para entender su visión, adaptarnos a sus necesidades y construir soluciones personalizadas.'
        },
        {
          title: 'Creatividad basada en datos',
          text: 'Combinamos análisis y diseño para ofrecer productos innovadores que no solo se ven bien, sino que responden a decisiones estratégicas.'
        }
      ]
    }
  },
  en: {
    values: {
      title: 'We move by our values',
      description: 'At GIGS Consulting it is very important to be your strategic ally and contribute to the Digital Transformation of your organization, generating value for its ecosystem of clients, suppliers, and collaborators.',
      items: [
        {
          title: 'Growth with results',
          text: 'We create technological solutions that directly impact your business goals, with constant measurement and continuous improvement.'
        },
        {
          title: 'Client collaboration',
          text: 'We work hand in hand with each client to understand their vision, adapt to their needs and build personalized solutions.'
        },
        {
          title: 'Data-driven creativity',
          text: 'We combine analysis and design to offer innovative products that not only look good but also respond to strategic decisions.'
        }
      ]
    }
  }
}

const { t } = useI18n({ useScope: 'local', inheritLocale: true, messages })
</script>

<template>
  <section class="values-section">
    <v-container class="py-10 py-md-16 text-center">
      <h2 class="values-title">{{ t('values.title') }}</h2>
      <p class="values-desc mx-auto mb-10">{{ t('values.description') }}</p>

      <v-row justify="center" align="stretch" class="values-row">
        <!-- Card 1 -->
        <v-col cols="12" md="4" class="px-6 mb-8 mb-md-0">
          <div class="value-card">
            <div class="value-img">
              <img src="@/assets/img/about/about-valores1.png" alt="Crecimiento con resultados" />
            </div>
            <h3 class="value-title">{{ t('values.items[0].title') }}</h3>
            <p class="value-text">{{ t('values.items[0].text') }}</p>
          </div>
        </v-col>

        <!-- Card 2 -->
        <v-col cols="12" md="4" class="px-6 mb-8 mb-md-0">
          <div class="value-card">
            <div class="value-img">
              <img src="@/assets/img/about/about-valores2.png" alt="Colaboración con el cliente" />
            </div>
            <h3 class="value-title">{{ t('values.items[1].title') }}</h3>
            <p class="value-text">{{ t('values.items[1].text') }}</p>
          </div>
        </v-col>

        <!-- Card 3 -->
        <v-col cols="12" md="4" class="px-6 mb-8 mb-md-0">
          <div class="value-card">
            <div class="value-img">
              <img src="@/assets/img/about/about-valores3.png" alt="Creatividad basada en datos" />
            </div>
            <h3 class="value-title">{{ t('values.items[2].title') }}</h3>
            <p class="value-text">{{ t('values.items[2].text') }}</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.values-section {
  background: var (--vt-c-white);
  color: var (--vt-c-black); 
}

.values-title {
  font-size: clamp(1.75rem, 5vw, 2.5rem);
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--vt-c-black);
}

.values-desc {
  max-width: 75ch;
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.9;
  color: var(--vt-c-black);
}

.value-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.value-img img {
  width: 400px;
  height: auto;
  margin-bottom: 20px;
}

.value-title {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--vt-c-black);
}

.value-text {
  font-size: 0.9375rem;
  line-height: 1.5;
  opacity: 0.85;
  max-width: 50ch;
  color: var(--vt-c-black);
}
</style>

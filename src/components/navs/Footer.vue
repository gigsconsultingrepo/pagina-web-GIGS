<script setup>
import { useI18n } from 'vue-i18n'

const messages = {
  es: {
    footer: {
      homeCol: {
        title: 'INICIO',
        home: 'Inicio'
      },
      servicesCol: {
        title: 'SERVICIOS',
        items: {
          softwareFactory: 'Fábrica de Software',
          taas: 'TaaS (Talent as a Service)',
          digital: 'Transformación Digital',
          helpdesk: 'Mesa de Ayuda/Servicio',
          db: 'Gestión de Bases de Datos',
          maintenance: 'Mantenimiento y Soporte a Aplicaciones'
        }
      },
      contactCol: {
        title: 'Contacto',
        phone: '+57 310 2885249',
        phoneRaw: '+573102885249',
        mail: 'info@gigs.consulting',
        addr: 'CL 23 A BIS # 85 A – 25 OF 707, Bogotá'
      }
    }
  },
  en: {
    footer: {
      homeCol: {
        title: 'HOME',
        home: 'Home'
      },
      servicesCol: {
        title: 'SERVICES',
        items: {
          softwareFactory: 'Software Factory',
          taas: 'TaaS (Talent as a Service)',
          digital: 'Digital Transformation',
          helpdesk: 'Help Desk / Service Desk',
          db: 'Database Management',
          maintenance: 'Application Maintenance & Support'
        }
      },
      contactCol: {
        title: 'Contact',
        phone: '+57 310 2885249',
        phoneRaw: '+573102885249',
        mail: 'info@gigs.consulting',
        addr: 'CL 23 A BIS # 85 A – 25 OF 707, Bogotá'
      }
    }
  }
}

const { t } = useI18n({
  useScope: 'local',
  inheritLocale: true,
  messages
})
</script>

<template>
  <v-footer class="app-footer pa-0" elevation="0">
    <v-container class="py-8 py-md-10">
      <v-row no-gutters align="start" class="ga-8 ga-md-0">
        <v-col cols="12" md="3" class="d-flex align-start justify-start justify-md-start mb-6 mb-md-0">
          <RouterLink :to="{ name: 'home' }" class="logo-link" aria-label="GIGS">
            <img src="@/assets/img/logo-footer.png" alt="GIGS" class="footer-logo" />
          </RouterLink>
        </v-col>

        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="12" sm="2" class="mb-6 mb-sm-0">
              <h4 class="col-title">
                <RouterLink :to="{ name: 'home' }" class="footer-link pa-none">
                  {{ t('footer.homeCol.home') }}
                </RouterLink>
              </h4>
            </v-col>

            <v-col cols="12" sm="6">
              <h4 class="col-title">{{ t('footer.servicesCol.title') }}</h4>
              <ul class="link-list">
                <li>
                  <RouterLink :to="{ name: 'services' }" class="footer-link">{{
                    t('footer.servicesCol.items.softwareFactory') }}</RouterLink>
                </li>
                <li>
                  <RouterLink :to="{ name: 'services' }" class="footer-link">{{
                    t('footer.servicesCol.items.taas') }}</RouterLink>
                </li>
                <li>
                  <RouterLink :to="{ name: 'services' }" class="footer-link">{{
                    t('footer.servicesCol.items.digital') }}</RouterLink>
                </li>
                <li>
                  <RouterLink :to="{ name: 'services' }" class="footer-link">{{
                    t('footer.servicesCol.items.helpdesk') }}</RouterLink>
                </li>
                <li>
                  <RouterLink :to="{ name: 'services' }" class="footer-link">{{
                    t('footer.servicesCol.items.db') }}</RouterLink>
                </li>
                <li>
                  <RouterLink :to="{ name: 'services' }" class="footer-link">{{
                    t('footer.servicesCol.items.maintenance') }}</RouterLink>
                </li>
              </ul>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="3" class="mt-2 mt-md-0">
          <h4 class="col-title">{{ t('footer.contactCol.title') }}</h4>
          <ul class="contact-list">
            <li>
              <a class="footer-link" :href="'tel:' + t('footer.contactCol.phoneRaw')">
                {{ t('footer.contactCol.phone') }}
              </a>
            </li>
            <li>
              <a class="footer-link" :href="'mailto:' + t('footer.contactCol.mail')">
                {{ t('footer.contactCol.mail') }}
              </a>
            </li>
            <li class="addr">
              {{ t('footer.contactCol.addr') }}
            </li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>
.app-footer {
  background: var(--footer-bg, var(--c-navy-900, #0b1330));
  color: var(--footer-fg, var(--vt-c-white, #fff));
}

.footer-logo {
  width: 200px;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 6px 18px rgba(0, 0, 0, .25));
}

.col-title {
  margin: 0 0 12px;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: .04em;
  text-transform: uppercase;
  color: var(--footer-title, var(--vt-c-white, #fff));
}

.link-list,
.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-link {
  display: inline-block;
  padding: 6px 0;
  color: var(--footer-link, rgba(255, 255, 255, .9));
  text-decoration: none;
  transition: opacity .2s ease, transform .15s ease;
}

.footer-link:hover {
  opacity: .85;
  transform: translateX(2px);
}

.addr {
  padding: 6px 0;
  color: var(--footer-muted, rgba(255, 255, 255, .75));
}

.border-top {
  border-top: 1px solid var(--footer-border, rgba(255, 255, 255, .08)) !important;
}

.footer-muted {
  color: var(--footer-muted, rgba(255, 255, 255, .7));
}

@media (max-width: 959px) {

  .app-footer :deep(.v-container) {
    padding-left: 16px;
    padding-right: 16px;
  }

  .footer-logo {
    width: 56px;
    height: 56px;
  }

  .col-title {
    margin-top: 8px;
  }
}
</style>

<script setup>
const footerData = {
  navCol: {
    title: 'Navegación',
    items: {
      home: 'Inicio',
      about: 'Acerca de GIGS',
      clients: 'Clientes',
      challenges: 'Retos',
      services: 'Servicios',
      blog: 'Blog',
      contact: 'Contacto'
    }
  },
  contactCol: {
    title: 'Contacto',
    phone: '+57 310 2885249',
    phoneRaw: '+573102885249',
    mail: 'info@gigs.com',
    addr: 'CL 23 A BIS # 85 A – 25 OF 707, Bogotá'
  }
}
</script>

<template>
  <v-footer class="app-footer pa-0" elevation="0">
    <v-container class="py-8 py-md-10">
      <v-row no-gutters class="ga-8 ga-md-0">
        
        <!-- Logo -->
        <v-col cols="12" md="3" class="d-flex flex-column align-center align-md-center mb-6 mb-md-0">
          <RouterLink :to="{ name: 'home' }" class="logo-link" aria-label="GIGS">
            <img src="@/assets/img/logo-footer.png" alt="GIGS" class="footer-logo" />
          </RouterLink>
        </v-col>

        <!-- Navegación -->
        <v-col cols="12" md="6" class="text-center text-md-start">
          <h4 class="col-title">{{ footerData.navCol.title }}</h4>
          <div class="nav-columns">
            <ul class="link-list">
              <li><RouterLink :to="{ name: 'home' }" class="footer-link">{{ footerData.navCol.items.home }}</RouterLink></li>
              <li><RouterLink :to="{ name: 'about' }" class="footer-link">{{ footerData.navCol.items.about }}</RouterLink></li>
              <li><RouterLink :to="{ name: 'clients' }" class="footer-link">{{ footerData.navCol.items.clients }}</RouterLink></li>
              <li><RouterLink :to="{ name: 'challenges' }" class="footer-link">{{ footerData.navCol.items.challenges }}</RouterLink></li>
            </ul>
            <ul class="link-list">
              <li><RouterLink :to="{ name: 'services' }" class="footer-link">{{ footerData.navCol.items.services }}</RouterLink></li>
              <li><RouterLink :to="{ name: 'blog' }" class="footer-link">{{ footerData.navCol.items.blog }}</RouterLink></li>
              <li><RouterLink :to="{ name: 'contact' }" class="footer-link">{{ footerData.navCol.items.contact }}</RouterLink></li>
            </ul>
          </div>
        </v-col>

        <!-- Contacto -->
        <v-col cols="12" md="3" class="text-center text-md-start">
          <h4 class="col-title">{{ footerData.contactCol.title }}</h4>
          <ul class="contact-list">
            <li>
              <a class="footer-link" :href="'tel:' + footerData.contactCol.phoneRaw">
                {{ footerData.contactCol.phone }}
              </a>
            </li>
            <li>
              <a class="footer-link" :href="'mailto:' + footerData.contactCol.mail">
                {{ footerData.contactCol.mail }}
              </a>
            </li>
            <li class="addr">
              {{ footerData.contactCol.addr }}
            </li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>
.app-footer {
  background: var(--footer-bg, #0b1330);
  color: var(--footer-fg, #fff);
}

.footer-logo {
  width: 160px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
  filter: drop-shadow(0 6px 18px rgba(0, 0, 0, .25));
}

.col-title {
  margin: 0 0 12px;
  font-size: var(--text-sm);
  font-weight: 800;
  letter-spacing: .04em;
  text-transform: uppercase;
  color: var(--footer-title, #fff);
}

.link-list,
.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-link {
  display: inline-block;
  padding: 3px 0;
  color: rgba(255, 255, 255, .9);
  text-decoration: none;
  transition: opacity .2s ease, transform .15s ease;
}

.footer-link:hover {
  opacity: .85;
  transform: translateX(2px);
}

.addr {
  padding: 6px 0;
  color: rgba(255, 255, 255, .75);
}

.nav-columns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

@media (max-width: 959px) {
  .footer-logo {
    width: 100px;
  }

  .nav-columns {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style>

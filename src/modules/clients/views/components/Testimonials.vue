<script setup>
import { useI18n } from "vue-i18n";

const messages = {
  es: {
    testimonials: {
      title: "Lo que dicen nuestros clientes",
      description: "Testimonios reales de empresas satisfechas",
      items: [
        {
          name: "María Elena Vargas",
          role: "CEO - Banco Central",
          feedback:
            "“GIGS CONSULTING transformó completamente nuestra operación digital. El equipo fue profesional, innovador y entregó resultados excepcionales.”",
        },
        {
          name: "Dr. Carlos Mendoza",
          role: "CTO - MediTech",
          feedback:
            "“La implementación del sistema de IA superó nuestras expectativas. Hemos mejorado significativamente la eficiencia operativa.”",
        },
        {
          name: "Roberto Silva",
          role: "Director - ShopMax",
          feedback:
            "“Nuestras ventas online se dispararon después de implementar la nueva plataforma. El ROI fue increíblemente positivo.”",
        },
      ],
    },
  },
  en: {
    testimonials: {
      title: "What our clients say",
      description: "Real testimonials from satisfied companies",
      items: [
        {
          name: "María Elena Vargas",
          role: "CEO - Banco Central",
          feedback:
            "“GIGS CONSULTING completely transformed our digital operations. The team was professional, innovative, and delivered outstanding results.”",
        },
        {
          name: "Dr. Carlos Mendoza",
          role: "CTO - MediTech",
          feedback:
            "“The implementation of the AI system exceeded our expectations. We have significantly improved operational efficiency.”",
        },
        {
          name: "Roberto Silva",
          role: "Director - ShopMax",
          feedback:
            "“Our online sales skyrocketed after implementing the new platform. The ROI was incredibly positive.”",
        },
      ],
    },
  },
};

const { t, locale } = useI18n({
  useScope: "local",
  inheritLocale: true,
  messages,
});
</script>

<template>
  <section class="testimonials-section">
    <v-container class="py-12 text-center">
      <h2 class="testimonials-title">{{ t("testimonials.title") }}</h2>
      <p class="testimonials-subtitle">{{ t("testimonials.description") }}</p>

      <v-row justify="center" class="mt-8">
        <v-col
          v-for="(testimonial, index) in messages[locale].testimonials.items"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          class="testimonial-card"
        >
          <div class="testimonial-avatar"></div>

          <!-- Texto con altura fija -->
          <p class="testimonial-text">
            {{ testimonial.feedback }}
          </p>

          <!-- Autor -->
          <p class="testimonial-author">
            – {{ testimonial.name }}, {{ testimonial.role }}
          </p>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.testimonials-section {
  background: #f5f5f5;
  color: #000;
}

.testimonials-title {
  font-size: clamp(1.625rem, 5vw, 2.125rem);
  font-weight: 700;
  margin-bottom: 6px;
}

.testimonials-subtitle {
  font-size: 0.9375rem;
  opacity: 0.8;
}

.testimonial-card {
  text-align: center;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.testimonial-avatar {
  width: 70px;
  height: 70px;
  background: #dcdcdc;
  border-radius: 50%;
  margin: 0 auto 16px;
}

.testimonial-text {
  font-size: 0.875rem;
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 12px;
  color: #333;
  min-height: 90px; 
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.testimonial-author {
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: auto; 
}
</style>

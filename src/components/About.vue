<template>
  <div class="about">
    <div class="md-layout md-alignment-top-center">
      <div
        class="md-layout-item md-large-size-60 md-medium-size-60 md-small-size-100 md-xsmall-size-100"
      >
        <md-card>
          <md-card-header class="about-card-header">
            <div class="md-title">
              <a href="https://kik.ee/et/"
                ><img
                  src="/webgis-performance/img/kik-logo.png"
                  class="about-card_kik-logo"
                  alt="kik-logo"
              /></a>
            </div>
          </md-card-header>
          <md-card-content class="about-card-content">
            <div class="margin-top-bottom">
              <span class="md-body-1">Lisainfo: </span
              ><a
                href="https://kik.ee/et/elluviimine/keskkonnaprogrammi-projektide-elluviimine"
                >https://kik.ee/et/elluviimine/keskkonnaprogrammi-projektide-elluviimine</a
              >
            </div>

            <div>
              <span class="md-display-1"
                >Projekt "Veekaitsevööndite reostustundlikkuse ja kaldavööndi
                puhverribade rajamise vajalikkuse hinnangute kaardikihtide
                loomine"</span
              >
            </div>
            <div class="md-layout md-alignment-top-left">
              <div class="margin-top-bottom">
                <span class="md-subheading"
                  >Evelyn Uuemaa, Ain Kull, Kiira Mõisja, Alexander Kmoch,
                  Hanna-Ingrid Nurm</span
                >
              </div>
            </div>
            <div>
              <span class="md-headline"
                >Käesoleva projekti peamised eesmärgid olid:</span
              >
            </div>
            <ol>
              <li>
                <span class="md-body-1"
                  >lisada Eesti digitaalsele mullastikukaardile
                  reostustundlikkuse hinnangu andmiseks ja toitainete väljakande
                  modelleerimiseks vajalikud numbrilised parameetrid (savi ja
                  liiva osakaal, orgaanilise süsiniku sisaldus jms), mida saab
                  kasutada enamlevinud mudelite arvutustes;</span
                >
              </li>
              <li>
                <span class="md-body-1"
                  >luua mulla ja reljeefi näitajate põhjal veekaitsevööndite
                  reostustundlikkuse ja soovitusliku puhverriba laiuse hinnangu
                  kaardikiht;</span
                >
              </li>
            </ol>
            <div class="text-justify">
              <span class="md-body-1">
                Töö tulemus võimaldab kuluefektiivsemalt planeerida ja vähendada
                põllumajanduslikust hajureostusest tulenevat koormust
                veekogudes. Loodavate kaardikihtide abil on võimalik kiiresti
                tuvastada probleemsed ja väga reostustundlikud kaldavööndid,
                kuhu oleks soovituslik luua laiem puhverriba.
              </span>
            </div>
            <div class="margin-top-bottom">
              <strong>Projekti on rahastanud: </strong
              ><span class="md-body-1"
                >Keskkonnainvesteeringute Keskus (KIK), Euroopa Komisjoni Marie
                Curie individuaalgrant number 795625
              </span>
            </div>

            <div class="md-layout md-alignment-top-center md-gutter">
              <div
                class="md-layout-item md-large-size-100 md-medium-size-100 md-small-size-100 md-xsmall-size-100"
              >
                <div>
                  <a href="https://www.geograafia.ut.ee/et"
                    ><img
                      class="about-card-logo"
                      src="/webgis-performance/img/geograafia-logo.png"
                      alt="geograafia-logo"
                  /></a>
                </div>
                <div class="margin-top-bottom">
                  <span class="md-body-1">Lisainfo: </span
                  ><a
                    href="https://landscape-geoinformatics.ut.ee/projects-et?lang=et"
                    >https://landscape-geoinformatics.ut.ee/projects-et?lang=et</a
                  >
                </div>
                <div class="margin-top-bottom">
                  <span class="md-body-1">
                    <strong>Veebiarenduse prototüüp: </strong>Alexander Kmoch,
                    Alexander Matsibora
                  </span>
                </div>
              </div>
            </div>
          </md-card-content>
          <md-card-actions>
            <md-button v-on:click="closeAbout()" class="md-accent"
              ><md-icon>cancel</md-icon> CLOSE</md-button
            >
          </md-card-actions>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",

  methods: {
    // emit close about action
    closeAbout() {
      this.$emit("close-about", "");
    },
  },
};
</script>

<style lang="css" scoped>
div.about {
  margin-bottom: 2rem;
}
.about-card-header {
  padding-left: 2rem !important;
  padding-right: 2rem !important;
}
.about-card-content {
  padding-left: 2rem !important;
  padding-right: 2rem !important;
}

img.about-card-logo {
  height: 80px;
  width: auto;
}

img.about-card-logo:hover {
  filter: brightness(50%);
}

img.about-card_kik-logo {
  width: 350px;
  height: auto;
}

img.about-card_kik-logo:hover {
  filter: brightness(80%);
}

div.about li {
  text-align: justify;
  margin-bottom: 0.5rem;
}

.text-justify {
  text-align: justify;
}

.margin-top-bottom {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

/* mobile styles */
@media only screen and (max-width: 768px) {
  img.about-card_kik-logo {
    width: 250px;
  }

  .md-display-1 {
    font-size: 25px !important;
    line-height: 30px !important;
  }
}
</style>


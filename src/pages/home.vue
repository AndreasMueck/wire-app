<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar title="Durchmesser berechnen"></f7-navbar>
    <!-- Input fields -->
    <f7-block-title>Berechnung des Rund-Duchmessers</f7-block-title>
    <f7-block>
      <f7-list form>
        <f7-list-input
          label="Flachdraht-Breite"
          type="number"
          placeholder="mm"
          name="breite"
          v-model:value="breite"
          clear-button
        >
        </f7-list-input>
        <f7-list-input
          label="Flachdraht-Dicke"
          type="number"
          placeholder="mm"
          name="dicke"
          v-model:value="dicke"
          clear-button
        >
        </f7-list-input>
      </f7-list>
    </f7-block>
    <!-- Button -->
    <f7-block>
      <f7-button fill large @click="calculateDiameter">Berechnen</f7-button>
    </f7-block>
    <!-- Result -->
    <f7-block-title>Ergebnis der Berechnung</f7-block-title>
    <f7-block>
      <f7-row>
        <f7-col width="65">Durchmesser [&#8960;] in mm</f7-col>
        <f7-col width="35" style="font-weight: bold; color: green">
          {{ result }}
        </f7-col>
      </f7-row>
    </f7-block>
    <!-- Parameters -->
    <f7-block-title>Parameter der Berechnung</f7-block-title>
    <f7-block>
      <f7-row>
        <f7-col width="75">Seitenverhältnis [ b / d ]</f7-col>
        <f7-col width="25">{{ aspectRatio }}</f7-col>
      </f7-row>
      <f7-row>
        <f7-col width="75">Ermittelter Korrekturfaktor [ kf ]</f7-col>
        <f7-col width="25">{{ kFactorValue }}</f7-col>
      </f7-row>
      <f7-row>
        <f7-col width="75">Querschnittsfläche in mm&#178; [b*d*kf]</f7-col>
        <f7-col width="25">{{ crossSectionArea }}</f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>

<script setup>
import { ref } from "vue";
import { f7, f7ready } from "framework7-vue";
import kFactor from "../data/krArray"; // Grosser Array mit Korrekturfaktoren

const pi = Math.PI;

let breite = ref(null);
let dicke = ref(null);
let result = ref(null);
let kFactorValue = ref(null);
let aspectRatio = ref(null);
let crossSectionArea = ref(null);

function round(num, decimals) {
  let m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / decimals) * Math.sign(num);
}

const calculateDiameter = () => {
  
  let valueDicke = dicke.value;
  let valueBreite = breite.value;

  // Berechne Seitenverhältnis
  let calculatedAspectRatio = round(parseFloat(valueBreite) / parseFloat(valueDicke),100);  // auf 2 Stellen nach dem Komma gerundet
  aspectRatio.value = calculatedAspectRatio;

  // Berechne Korrekturfaktor
  if ((calculatedAspectRatio >= 1 ) && (calculatedAspectRatio <= 5 )) {
    kFactorValue.value = kFactor[calculatedAspectRatio];
  }

  let korrekturfaktor = kFactor[calculatedAspectRatio];
  console.log(korrekturfaktor);

  // Berechne Querschnittsfläche
  let calculatedCrossSectionArea = round(valueDicke * valueBreite * korrekturfaktor,10000);
  crossSectionArea.value = calculatedCrossSectionArea;



  /* f7.dialog.alert(
        "Dicke: " + state.dicke + "<br>Breite: " + state.breite,
        "Rund-Durchmesser",
        () => {
          f7.loginScreen.close();
        }
      ); */
};
</script>

<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar title="Durchmesser berechnen"></f7-navbar>
    <!-- Input fields -->
    <f7-block-title>Berechnung des Rund-Durchmessers</f7-block-title>
    <f7-block>
      <f7-list form id="inputForm" @submit="onSubmit">
        <f7-list-input id="breite" label="Flachdraht-Breite" type="number" placeholder="0,0000" name="breite"
          v-model:value="breite" min="0" max="5" info="Wertebereich bis max. 5,00 mm" step="0.0001" clear-button
          validate @input="name = $event.target.value" required>
        </f7-list-input>
        <f7-list-input id="dicke" label="Flachdraht-Dicke" type="number" placeholder="0,0000" name="dicke"
          v-model:value="dicke" min="0" max="5" info="Wertebereich bis max. 5,00 mm" step="0.0001" clear-button validate
          @input="name = $event.target.value" required>
        </f7-list-input>
        <f7-button fill large type="submit" :disabled="!noValues">Berechnen</f7-button>
      </f7-list>
    </f7-block>
    <!-- Result -->
    <f7-block-title>Ergebnis der Berechnung</f7-block-title>
    <f7-block>
      <f7-row>
        <f7-col width="75">Durchmesser [&#8960;] in mm</f7-col>
        <f7-col width="25" style="font-weight: bold; color: green">
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
import { ref, computed } from "vue";
import { f7, f7ready } from "framework7-vue";
import { useForm } from "vee-validate";
import kFactor from "../data/krArray"; // Grosser Array mit Korrekturfaktoren

const { handleSubmit } = useForm();

const pi = Math.PI;
let d;
let r;

let breite = ref("");
let dicke = ref("");
let result = ref("");
let kFactorValue = ref("");
let aspectRatio = ref("");
let crossSectionArea = ref("");

const noValues = computed(
  () => dicke.value.length > 0 && breite.value.length > 0
);
//const noValues = true;

function round(num, decimals) {
  let m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / decimals) * Math.sign(num);
}

function compareValues(valueDicke, valueBreite) {
  let returnValue;
  returnValue = valueDicke < valueBreite ? true : false;
  return returnValue;
}

const onSubmit = handleSubmit((values) => {
  const valueDicke = parseFloat(dicke.value);
  const valueBreite = parseFloat(breite.value);

  // Berechne Seitenverhältnis
  let calculatedAspectRatio = round(
    parseFloat(valueBreite) / parseFloat(valueDicke),
    100
  ); // 100 bedeutet, auf 2 Dezimalstellen gerundet

  
  if (!compareValues(valueDicke, valueBreite)) {
    f7.dialog.alert(
      "Der Wert DICKE muss kleiner als der WERT Breite sein",
      "Drahtrechner",
      () => {
        f7.loginScreen.close();
      }
    );
  } else if (calculatedAspectRatio > 5) {
    f7.dialog.alert(
      "Korrekturfaktoren sind nur bis zu einem Seitenverhältnis von 5:1 gültig. Berechnetes Seitenverhältnis: " + calculatedAspectRatio + ":1",
      "Drahtrechner",
      () => {
        f7.loginScreen.close();
      }
    );
  } else { // alles ok, berechne Werte für den Durchmesser

    let calculatedAspectRatioTrailingZeros = calculatedAspectRatio.toFixed(2);
    aspectRatio.value = calculatedAspectRatioTrailingZeros + " : 1"; // string!

    // Welcher Korrekturfaktor wird benötigt
    if (calculatedAspectRatio >= 1 && calculatedAspectRatio <= 5.0) {
      kFactorValue.value = kFactor[calculatedAspectRatioTrailingZeros];
    }

    // Berechne Korrekturfaktor für Seitenverhältnis grösser 5 und kleiner 17
    if (calculatedAspectRatio > 5 && calculatedAspectRatio <= 17.0) {
      kFactorValue.value = 0.958;
    }

    // Korrekturfaktor für die Berechnung
    let korrekturfaktor = kFactor[calculatedAspectRatioTrailingZeros];

    // Berechne Querschnittsfläche
    let calculatedCrossSectionArea = valueDicke * valueBreite * korrekturfaktor;
    crossSectionArea.value = calculatedCrossSectionArea.toFixed(4);

    // Berechne Rund-Duchmesser / Endergebnis
    r = Math.sqrt(calculatedCrossSectionArea / pi);
    d = r + r;
    result.value = d.toFixed(4);
  }
});
</script>

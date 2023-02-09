<template>
  <f7-page :page-content="false">
    <f7-navbar title="Maße umrechnen">
      <f7-subnavbar>
        <f7-segmented raised>
          <f7-button tab-link="#tab1" tab-link-active>Länge->Gewicht</f7-button>
          <f7-button tab-link="#tab2">Gewicht->Länge</f7-button>
        </f7-segmented>
      </f7-subnavbar>
    </f7-navbar>
    <f7-tabs>
      <f7-tab id="tab1" tab-active class="page-content">
        <f7-block-title>Umrechnung Drahtlänge in Gewicht</f7-block-title>
        <f7-list form id="inputForm" @submit="onSubmit" no-hairlines-md>
          <f7-list-item title="Werkstoff" smart-select :smart-select-params="{ pageBackLinkText: 'Zurück' }">
            <select v-model="selectedMaterial" @change="onSelectChange($event)">
              <option v-for="material in materialsList" :key="material.dichte" :value="material.dichte">
                {{ material.name }}
              </option>
            </select>
          </f7-list-item>
          <f7-list-input id="diameter" label="Durchmesser in mm" type="number" name="diameter" v-model:value="diameter"
            min="0" max="500" step="000.0001" clear-button validate @input="name = $event.target.value" required>
          </f7-list-input>
          <f7-list-input id="wirelength" label="Drahtlänge in m" type="number" name="wirelength"
            v-model:value="wirelength" min="0" max="9999999" step="0000000.01" clear-button validate
            @input="name = $event.target.value" required>
          </f7-list-input>
          <f7-block>
            <f7-button fill large type="submit" :disabled="!noValues">Berechnen</f7-button>
          </f7-block>
        </f7-list>
        <!-- Result -->
        <f7-block-title>Ergebnis der Berechnung</f7-block-title>
        <f7-block>
          <f7-row>
            <f7-col width="75">Gewicht in kg</f7-col>
            <f7-col width="25" style="font-weight: bold; color: green">
              {{ resultWeight }}
            </f7-col>
          </f7-row>
        </f7-block>
        <!-- Parameters -->
        <f7-block-title>Parameter der Berechnung</f7-block-title>
        <f7-block>
          <f7-row>
            <f7-col width="75">Spezifische Dichte [kg/m3]</f7-col>
            <f7-col width="25">{{ selectedMaterial }}</f7-col>
          </f7-row>
        </f7-block>
      </f7-tab>
      <f7-tab id="tab2" class="page-content">
        <f7-block-title>Umrechnung Gewicht in Drahtlänge</f7-block-title>
        <f7-list form id="inputForm" @submit="onSubmitWeight" no-hairlines-md>
          <f7-list-item title="Werkstoff" smart-select :smart-select-params="{ pageBackLinkText: 'Zurück' }">
            <select v-model="selectedMaterial" @change="onSelectChange($event)">
              <option v-for="material in materialsList" :key="material.dichte" :value="material.dichte">
                {{ material.name }}
              </option>
            </select>
          </f7-list-item>
          <f7-list-input id="diameter" label="Durchmesser in mm" type="number" name="diameter" v-model:value="diameter"
            min="0" max="500" step="000.0001" clear-button validate @input="name = $event.target.value" required>
          </f7-list-input>
          <f7-list-input id="weight" label="Gewicht in kg" type="number" name="weight" v-model:value="weight" min="0"
            max="9999999" step="0000000.01" clear-button validate @input="name = $event.target.value" required>
          </f7-list-input>
          <f7-block>
            <f7-button fill large type="submit" :disabled="!noValues">Berechnen</f7-button>
          </f7-block>
        </f7-list>
        <!-- Result -->
        <f7-block-title>Ergebnis der Berechnung</f7-block-title>
        <f7-block>
          <f7-row>
            <f7-col width="75">Länge in m</f7-col>
            <f7-col width="25" style="font-weight: bold; color: green">
              {{ resultLength }}
            </f7-col>
          </f7-row>
        </f7-block>
        <!-- Parameters -->
        <f7-block-title>Parameter der Berechnung</f7-block-title>
        <f7-block>
          <f7-row>
            <f7-col width="75">Spezifische Dichte [kg/m3]</f7-col>
            <f7-col width="25">{{ selectedMaterial }}</f7-col>
          </f7-row>
        </f7-block>
      </f7-tab>
    </f7-tabs>
  </f7-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useForm } from "vee-validate";

const { handleSubmit } = useForm();

const selectedMaterial = ref('7880');
const diameter = ref('');
const wirelength = ref('');
const weight = ref('');
const resultWeight = ref(null);
const resultLength = ref(null);

const materialsList = ref([
  { dichte: "7880", name: "Edelstahl" },
  { dichte: "7850", name: "Federstahl" },
  { dichte: "8200", name: "Messing" },
  { dichte: "8620", name: "Bronze" },
  { dichte: "2700", name: "Aluminium" },
]);

onMounted(() => {
  console.log("Material: " + selectedMaterial.value);
})

const noValues = computed(
  () => diameter.value.length > 0 && wirelength.value.length > 0
);

const onSelectChange = (event) => {
  console.log("Material: " + selectedMaterial.value);
}

const onSubmit = handleSubmit((values) => {
  const valueDiameter = parseFloat(diameter.value);
  const valueWirelength = parseFloat(wirelength.value);
  const Material = parseFloat(selectedMaterial.value);
  const pi = Math.PI;

  let D = (valueDiameter / 1000); // Durchmesser in m
  let F = (pi * ((D / 2) ** 2)); // Fläche in m2
  let V = F * (valueWirelength); // Volumen in m3
  let result = V * Material;

  resultWeight.value = result.toFixed(2);
});

const onSubmitWeight = handleSubmit((values) => {
  const valueDiameter = parseFloat(diameter.value);
  const valueWeight = parseFloat(weight.value);
  const Material = parseFloat(selectedMaterial.value);
  const pi = Math.PI;

  let D = (valueDiameter / 1000); // Durchmesser in m
  let F = (pi * ((D / 2) ** 2)); // Fläche in m2

  let result = valueWeight / Material / F;
  resultLength.value = result.toFixed(2);
});

</script>


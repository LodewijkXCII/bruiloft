<script setup lang="ts">
import { ref } from "vue";

const responseMessage = ref<string>("");
const buttonmessage = ref<string>("Aanmelden");

async function submit(e: Event) {
  e.preventDefault();
  buttonmessage.value = "Verzenden...";

  const formData = new FormData(e.currentTarget as HTMLFormElement);

  console.log(formData);
  const response = await fetch("/api/aanmelding", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  responseMessage.value = data.message;
  buttonmessage.value = "Verzonden!";
}

const count = ref(1);
</script>

<template>
  <form class="text-light" @submit="submit">
    <h3 class="text-light succes" v-if="responseMessage"> {{ responseMessage }}</h3>
    <div class="input-wrapper">
      <label for="naam">Je naam/namen</label>
      <input type="text" id="naam" name="naam" required />
      <p>Graag met achternaam om misverstanden te voorkomen</p>
    </div>
    <div class="input-wrapper">
      <label for="email">Je e-mail</label>
      <input type="email" id="email" name="email" required />
    </div>
    <div class="input-wrapper">
      <label for="rsvp">Ben je erbij?</label>
      <select name="rsvp" id="rsvp" required>
        <option value="select" disabled selected>Selecteer...</option>
        <option value="ja">Absoluut!</option>
        <option value="nee">Helaas, ik kan niet.</option>
      </select>
    </div>
    <div class="input-wrapper">
      <label for="aantal">Met hoeveel personen kom je?</label>
      <input type="number" id="aantal" name="aantal" v-model="count" required min="1" max="2">
      <p>Zie 'plus one' bij de <a href="#faq">praktische informatie</a></p>
    </div>

    <div v-for="(n) in count" class="input-wrapper-grouped">
      <div class="input-wrapper">
        <label :for="`gerecht${n}`"><span v-if="n==1">Wil je</span><span v-else>Wilt je partner</span> het vlees, vis of vegatarisch menu?</label>
        <select :name="`gerecht${n}`" :id="`gerecht${n}`" required>
          <option value="select" disabled selected>Selecteer...</option>
          <option value="Vlees">Vlees</option>
          <option value="Vis">Vis</option>
          <option value="Vega">Vegatarisch</option>
        </select>
      </div>
      <div class="input-wrapper">
        <label :for="`ontbijt${n}`">Ontbijt <span v-if="n==1">je</span><span v-else>je partner</span> mee?</label>
        <select :name="`ontbijt${n}`" :id="`ontbijt${n}`" >
           <option value="select" disabled selected>Selecteer...</option>
        <option value="1">Absoluut!</option>
        <option value="0">Helaas, ik kan niet.</option>
        </select>
      </div>
    </div>
  
    <div class="input-wrapper">
      <label for="allergien"
        >Allergieën of dieetwensen waar we <span v-show="count >1">voor jou en je partner </span>rekening mee moeten houden?</label
      >
      <input type="text" name="allergien" id="allergien" />
    </div>
<div class="input-wrapper">
  <label for="muziek">Met welk nummer kom jij zeker de dansvloer op?</label>
  <input type="text" name="muziek" id="muziek">
</div>
    <div class="input-wrapper">
      <label for="opmerking">Heb je nog andere opmerkingen?</label>
      <textarea name="opmerkingen" id="opmerkingen"></textarea>
    </div>

    <button class="btn btn-secondary" type="submit">{{buttonmessage}}</button>
    <h3 class="text-light succes" v-if="responseMessage"> {{ responseMessage }}</h3>
    
  </form>
</template>

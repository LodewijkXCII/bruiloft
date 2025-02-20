<script setup lang="ts">
import { ref } from "vue";

const responseMessage = ref<string>("");

async function submit(e: Event) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget as HTMLFormElement);

  console.log(formData);
  const response = await fetch("/api/aanmelding", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  responseMessage.value = data.message;
}
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
      <label for="email">Je email</label>
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
    <!-- <div class="input-wrapper">
    <label for="meal">Wil je het vlees of vis of vegatarisch menu?</label>
    <select name="meal" id="meal">
      <option value="select" disabled selected>Selecteer...</option>
      <option value="Vlees">Vlees</option>
      <option value="Vis">Vis</option>
      <option value="Vega">Vegatarisch</option>
    </select>
  </div> -->
    <div class="input-wrapper">
      <label for="allergien"
        >Allergieën waar we rekening mee moeten houden?</label
      >
      <input type="text" name="allergien" id="allergien" />
    </div>

    <div class="input-wrapper">
      <label for="opmerking">Heb je nog andere opmerkingen?</label>
      <textarea name="opmerkingen" id="opmerkingen"></textarea>
    </div>

    <div class="btn btn-secondary" type="submit">Aanmelden</div>
    <!-- <input type="submit" value="Spel toevoegen" /> -->
  </form>
</template>

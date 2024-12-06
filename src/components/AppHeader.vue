<template>
  <v-app-bar :elevation="5">
    <v-avatar size="35" class="ml-5">
      <v-img src="@/assets/logo.png" alt="Hacker News Logo" />
    </v-avatar>

    <v-app-bar-title>Hacker News V3</v-app-bar-title>

    <v-btn icon="mdi-refresh" title="Get the latest posts" data-test-id="refresh-button" @click="emit('refresh')"></v-btn>
    <v-btn :icon="viewMode === 'Grid' ? 'mdi-list-box-outline' : 'mdi-grid'" :title="'Change to '+ inactiveView +' view'" data-test-id="view-button" @click="toggleView"></v-btn>
    <v-btn :icon="inactiveTheme === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night'" :title="'Change to ' + inactiveTheme + ' color scheme'" data-test-id="theme-button" @click="toggleTheme"></v-btn>
  </v-app-bar>
</template>

<script setup>
  import { useTheme } from 'vuetify';
  import { computed, onMounted } from 'vue';

  const props = defineProps({
    viewMode: {
      type: String,
      default: 'Grid',
    },
  });

  const emit = defineEmits(['change-view', 'refresh']);

  const theme = useTheme();

  const inactiveTheme = computed(() =>
    theme.global.current.value.dark ? 'light' : 'dark'
  );

  const inactiveView = computed(() =>
    props.viewMode === 'List' ? 'Grid' : 'List'
  );

  const toggleTheme = () => {
    const newTheme = inactiveTheme.value;
    theme.global.name.value = newTheme;
    localStorage.setItem('hacker-news-theme', newTheme);
  };

  const toggleView = () => {
    emit('change-view', inactiveView.value);
  };

  onMounted(() => {
    const savedTheme = localStorage.getItem('hacker-news-theme');

    if (savedTheme) {
      theme.global.name.value = savedTheme;
    }
  });
</script>

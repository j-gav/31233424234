<template>
  <AppHeader :view-mode="viewMode" @change-view="changeView" @refresh="refresh" />
  <Loader v-if="isLoading" />
  <StoryList @change-type="updateStoryType" v-else :view-mode="viewMode" :type-of-stories="storyType" :stories="stories" />
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { cleanUpExpiredCache, refreshCache, getStories } from '@/services/articles';

  const isLoading = ref(true);
  const stories = ref([]);

  const storyType = ref('top');
  const viewMode = ref('Grid');

  const changeView = (newView) => {
    viewMode.value = newView;
    localStorage.setItem('hacker-news-view', newView);
  };

  const fetchStories = async (type) => {

    isLoading.value = true;

    try {
      stories.value = await getStories(type);
    } catch (error) {
      console.error('Error fetching stories:', error);
      stories.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  const updateStoryType = async (type) => {
    if (type !== storyType.value) {
      storyType.value = type;
      localStorage.setItem('hacker-news-type', type);
      updateDocTitle();
      await fetchStories(type);
    }
  };

  const updateDocTitle = () => {
    document.title = `${storyType.value.charAt(0).toUpperCase()}${storyType.value.slice(1)} Stories - Hacker News`;
  }

  const refresh = async () => {
    refreshCache();
    await fetchStories(storyType.value);
  }

  onMounted(async () => {

    const savedType = localStorage.getItem('hacker-news-type');
    const savedView = localStorage.getItem('hacker-news-view');

    if (savedType) {
      storyType.value = savedType;
      updateDocTitle();
    }

    if (savedView) {
      viewMode.value = savedView;
    }

    cleanUpExpiredCache();
    await fetchStories(storyType.value);
  });

</script>

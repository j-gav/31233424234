<template>
  <v-select label="What type of posts would you like?" :items="storyTypes" :model-value="selectedType" @update:model-value="handleChangeType" />

  <v-infinite-scroll :items="visibleStories" :onLoad="showMore" :has-more="hasMore">
    <v-row class="px-6">
      <v-col v-for="story in visibleStories" data-test-id="story-column" cols="12" :lg="isGridView ? 4 : 12" :md="isGridView ? 6 : 12">
        <Story data-test-id="story-component" :story-id="story" :view-mode="viewMode" />
      </v-col>
    </v-row>
  </v-infinite-scroll>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue';

  const props = defineProps({
    stories: Array,
    typeOfStories: String,
    viewMode: String,
    storyType: String
  });

  const emit = defineEmits(['change-type']);

  const visibleStories = ref([]);
  const selectedType = ref(props.typeOfStories);
  const hasMore = ref(true);
  const initialAmountOfStories = 12;
  const storiesOnEachLoad = 3;
  let currentPage = 0;

  const storyTypes = [
    { title: 'Best stories', value: 'best' },
    { title: 'New stories', value: 'new' },
    { title: 'Top stories', value: 'top' },
    { title: 'Jobs', value: 'job' },
  ];

  const isGridView = computed(() => props.viewMode === 'Grid');

  const loadInitialStories = () => {
    visibleStories.value = getStoriesForPage();
    currentPage++;
  };

  const showMore = ({ done }) => {
    if (!hasMore.value) {
      done('empty');
      return;
    }

    const newStories = getStoriesForPage(storiesOnEachLoad);

    if (newStories.length < storiesOnEachLoad) {
      hasMore.value = false;
    }

    visibleStories.value.push(...newStories);
    currentPage++;

    done('ok');
  };

  const getStoriesForPage = (count = initialAmountOfStories) => {
    const start = currentPage * count;
    const end = start + count;
    return props.stories.slice(start, end);
  };

  const handleChangeType = (type) => {
    emit('change-type', type);
  };

  onMounted(() => {
    loadInitialStories();
  });
</script>

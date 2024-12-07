<template>
  <div class="story-container" :title="storyDetails.title">
    <v-skeleton-loader type="article" :loading="loading" width="100%">
      <v-card :href="storyDetails.url" target="_blank" flat class="mb-3" elevation="6">
        <template #title>
          <span :class="{ 'font-weight-black': isGridView }">{{ storyDetails.title }}</span>
        </template>

        <template #subtitle>
          <span v-if="formattedDate" :title="formattedDate" data-test-id="formatted-date">
            <v-icon icon="mdi-clock-outline" /> {{ timeAgoString }}
          </span>
          <span class="ml-5" v-if="!isGridView">
            <span title="Score" class="mr-5">
              <v-icon icon="mdi-star-circle" /> {{ storyDetails.score }}
            </span>
            <span title="Comment count" class="mr-5">
              <v-icon icon="mdi-comment" /> {{ commentCount }}
            </span>
            <span title="Author" class="mr-5">
              <v-icon icon="mdi-account" /> {{ storyDetails.by }}
            </span>
          </span>
        </template>

        <template v-if="isGridView" #actions>
          <v-btn title="Type of post" variant="tonal" :base-color="storyTypeColor" class="mr-2" slim>
            {{ storyDetails.type }}
          </v-btn>
          <v-btn title="Score" variant="tonal" base-color="blue" class="mr-2" slim>
            <v-icon icon="mdi-star-circle" /> {{ storyDetails.score }}
          </v-btn>
          <v-btn title="Comment count" variant="tonal" base-color="green" class="mr-2" slim>
            <v-icon icon="mdi-comment" /> {{ commentCount }}
          </v-btn>
          <v-btn title="Author" variant="tonal" base-color="grey" class="mr-2" slim>
            <v-icon icon="mdi-account" /> {{ storyDetails.by }}
          </v-btn>
        </template>
      </v-card>
    </v-skeleton-loader>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue';
  import { getStory } from '@/services/articles';
  import TimeAgo from 'javascript-time-ago';

  const timeAgo = new TimeAgo('en-US');

  const props = defineProps({
    storyId: Number,
    viewMode: String,
  });

  const x = 'foo'

  const storyDetails = ref({});
  const loading = ref(true);

  const formattedDate = computed(() =>
    storyDetails.value.time ? new Date(storyDetails.value.time * 1000) : null
  );

  const timeAgoString = computed(() =>
    formattedDate.value ? timeAgo.format(formattedDate.value) : 'N/A'
  );

  const isGridView = computed(() => props.viewMode === 'Grid');

  const commentCount = computed(() =>
    storyDetails.value.kids ? storyDetails.value.kids.length : 0
  );

  const storyTypeColor = computed(() =>
    storyDetails.value.type === 'story' ? 'red' : 'purple'
  );

  onMounted(async () => {
    try {
      storyDetails.value = await getStory(props.storyId);
    } catch (error) {
      console.error('Error fetching story details:', error);
    } finally {
      loading.value = false;
    }
  });
</script>

<style scoped>
  .story-container {
    margin: 0 auto;
  }

  .v-skeleton-loader {
    display: block;
  }
</style>
